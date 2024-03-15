"use strict";
const common_vendor = require("./vendor.js");
const common_const = require("./const.js");
class STSToken {
  constructor(AccessKeyId, AccessKeySecret, Expiration, SecurityToken) {
    this.AccessKeyId = AccessKeyId;
    this.AccessKeySecret = AccessKeySecret;
    this.Expiration = common_vendor.dayjs_minExports(Expiration);
    this.SecurityToken = SecurityToken;
  }
}
class TokenManager {
  constructor() {
    this.token = null;
  }
  isExpiration() {
    if (this.valid()) {
      return this.token.Expiration.add(8, "hour").isBefore(common_vendor.dayjs.default());
    }
    return true;
  }
  valid() {
    return this.token instanceof STSToken;
  }
  async getOrUpdateToken() {
    function getOne() {
      return new Promise((resolve, reject) => {
        common_vendor.index.requestWithCookie({
          url: common_const.baseUrl + "/api/Information/ststoken",
          success: (res) => {
            if (res.statusCode === 200) {
              let data = res.data;
              resolve(data);
            }
          }
        });
      });
    }
    if (this.isExpiration()) {
      const data = await getOne();
      this.token = new STSToken(
        data.AccessKeyId,
        data.AccessKeySecret,
        data.Expiration,
        data.SecurityToken
      );
    }
    return this.token;
  }
}
var tokenManager = new TokenManager();
var encoder = new TextEncoder();
async function putObject(requestObj, osspath) {
  let url = await ossUrl(requestObj, osspath);
  requestObj.url = url;
  common_vendor.index.request(requestObj);
}
function uploadFile(file, ossdir = "files/", callback = (resl) => {
  if (resl.statusCode === 200) {
    common_vendor.index.showToast({
      title: "上传成功！"
    });
    console.log(resl.data.url);
  } else {
    common_vendor.index.showToast({
      title: file.name + " :上传失败！"
    });
  }
}) {
  let mdstr = common_vendor.md5Exports.md5.base64(new Uint8Array(file.data));
  let suffs = file.name.split(".");
  let suffix = suffs.length > 1 ? suffs.pop() : "";
  suffix = /[\u4e00-\u9fa5]/.test(suffix) ? "" : "." + suffix;
  let name = common_vendor.md5Exports.md5(new Uint8Array(file.data)) + suffix;
  let resourcePath = "/liusha-images/" + ossdir + name;
  let requestObj = {
    url: "https://liusha-images.oss-cn-chengdu.aliyuncs.com",
    method: "PUT",
    header: {
      "Content-Type": file.type ? file.type : "application/octet-stream",
      // "Content-Length": file.size,
      "Content-MD5": mdstr,
      "cache-control": "no-cache"
    },
    callback: {
      "callbackUrl": "https://www.liusha-gy.com/api/OSSNotify/callback",
      "callbackBody": `bucket=liusha-images&object=${ossdir + name}&size=${file.size}&mimeType=${file.type}&contentMd5=${mdstr}&userid=\${x:userid}`
    },
    data: file.data,
    success: callback,
    callback_var: { "x:userid": "1" }
  };
  putObject(requestObj, resourcePath);
}
async function ossGetUrl(osspath) {
  let requestObj = {
    url: "https://liusha-images.oss-cn-chengdu.aliyuncs.com",
    method: "GET",
    header: {}
  };
  return await ossUrl(requestObj, osspath);
}
async function ossUrl(requestObj, osspath) {
  let urlpath = osspath.substring(osspath.indexOf("/", 1));
  const token = await tokenManager.getOrUpdateToken();
  let expires = common_vendor.dayjs.default().add(1, "h").unix();
  let resourceMap = /* @__PURE__ */ new Map();
  if (requestObj.callback) {
    resourceMap.set("callback", common_vendor.encode(encoder.encode(JSON.stringify(requestObj.callback))));
  }
  if (requestObj.callback_var) {
    resourceMap.set("callback-var", common_vendor.encode(encoder.encode(JSON.stringify(requestObj.callback_var))));
  }
  resourceMap.set("security-token", token.SecurityToken);
  let canaResource = buildResource(osspath, resourceMap);
  let signature = buildSignature(requestObj, canaResource, token.AccessKeySecret, expires);
  let query;
  if (requestObj.callback) {
    query = buildUrlQuery1(token, expires, signature, resourceMap.get("callback"), resourceMap.get("callback-var"));
  } else {
    query = buildUrlQuery(token, expires, signature);
  }
  return requestObj.url + urlpath + query;
}
function buildSignature(requestObj, canaResource, accessKeySecret, expires) {
  let contentmd5 = requestObj.header["Content-MD5"] == void 0 ? "" : requestObj.header["Content-MD5"];
  let contentType = requestObj.header["Content-Type"] == void 0 ? "" : requestObj.header["Content-Type"];
  let strToSign = `${requestObj.method}
${contentmd5}
${contentType}
${expires}
${canaResource}`;
  const result = hmacEncode(accessKeySecret, strToSign);
  return result;
}
function buildResource(osspath, resourceMap) {
  let r = `${osspath}?`;
  for (let a of resourceMap) {
    r += `${a[0]}=${a[1]}&`;
  }
  return r.slice(0, -1);
}
function buildUrlQuery(token, expires, signature) {
  return `?OSSAccessKeyId=${encodeURIComponent(token.AccessKeyId)}&Expires=${expires}&Signature=${encodeURIComponent(signature)}&security-token=${encodeURIComponent(token.SecurityToken)}`;
}
function buildUrlQuery1(token, expires, signature, callback, callback_var) {
  return `?OSSAccessKeyId=${encodeURIComponent(token.AccessKeyId)}&Expires=${expires}&Signature=${encodeURIComponent(signature)}&security-token=${encodeURIComponent(token.SecurityToken)}&callback=${encodeURIComponent(callback)}&callback-var=${callback_var}`;
}
function hmacEncode(key, data) {
  return common_vendor.hmacsha1(key, data);
}
exports.ossGetUrl = ossGetUrl;
exports.uploadFile = uploadFile;
