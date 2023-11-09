"use strict";
const common_vendor = require("./vendor.js");
var host = "https://www.liusha-gy.com";
class Util {
  /**
   * 根据域名获取该域名的 cookie 作用域范围列表
   * @param  {String} domain 指定域名
   * @return {String}        cookie 作用域范围列表
   */
  getCookieScopeDomain(domain = "") {
    if (!domain)
      return [];
    domain = domain.replace(/^\.+/gi, "");
    let scopes = domain.split(".").map((k) => [".", domain.slice(domain.indexOf(k))].join(""));
    return [domain].concat(scopes);
  }
  /**
   * 根据最新的 RFC 6265 标准化域名作用域
   * @param  {String} domain 域名
   * @return {String}        标准化后的域名
   */
  normalizeDomain(domain = "") {
    return domain.replace(/^(\.*)?(?=\S)/gi, ".");
  }
}
var util = new Util();
class Cookie {
  /**
   * 构造函数
   */
  constructor(props) {
    this.name = props.name || "";
    this.value = props.value || "";
    this.domain = props.domain || "";
    this.path = props.path || "/";
    this.expires = props.expires ? new Date(props.expires) : null;
    this.maxAge = props.maxAge !== void 0 && props.maxAge !== null ? parseInt(props.maxAge) : null;
    this.httpOnly = !!props.httpOnly;
    this.dateTime = props.dateTime ? new Date(props.dateTime) : /* @__PURE__ */ new Date();
  }
  /**
   * 设置 cookie, 将 set-cookie 字符串转换为 Cookie 对象
   */
  set(setCookieStr = "") {
    var cookie = common_vendor.setCookieExports.parse(setCookieStr, { decodeValues: false })[0];
    if (cookie) {
      Object.assign(this, cookie);
      this.dateTime = /* @__PURE__ */ new Date();
    }
    return this;
  }
  /**
   * 合并 cookie
   * @param  {Cookie} cookie cookie 对象
   * @return {Cookie}        this
   */
  merge(cookie) {
    return Object.assign(this, cookie);
  }
  /**
   * 验证 cookie 是否已过期
   * @return {Boolean} 是否已过期
   */
  isExpired() {
    if (this.maxAge === 0) {
      return true;
    }
    if (this.maxAge > 0) {
      let seconds = (Date.now() - this.dateTime.getTime()) / 1e3;
      return seconds > this.maxAge;
    }
    if (this.expires && this.expires < /* @__PURE__ */ new Date()) {
      return true;
    }
    return false;
  }
  /**
   * 验证 cookie 是否可持久化
   * @return {Boolean} 是否可持久化
   */
  isPersistence() {
    return this.maxAge ? this.maxAge > 0 : true;
  }
  /**
   * 验证 cookie 是否在指定的 domain 范围内
   * @param  {String}  domain    域名
   * @return {Boolean}           是否在指定的 domain 范围内
   */
  isInDomain(domain) {
    let scopeDomains = util.getCookieScopeDomain(domain);
    return scopeDomains.indexOf(this.domain) >= 0;
  }
  /**
   * 验证 cookie 是否在指定的 path 范围内
   * @param  {String}  path    url路径
   * @return {Boolean}         是否在指定的 path 范围内
   */
  isInPath(path) {
    return path.indexOf(this.path) === 0 || this.path.replace(/\/$/, "") === path;
  }
  /**
   * 重写对象的 toString 方法
   */
  toString() {
    return [this.name, this.value].join("=");
  }
}
function getApi() {
  if (typeof my !== "undefined") {
    my.platform = "my";
    return my;
  } else if (typeof tt !== "undefined") {
    tt.platform = "tt";
    return tt;
  } else if (typeof swan !== "undefined") {
    swan.platform = "swan";
    return swan;
  } else if (typeof qq !== "undefined") {
    qq.platform = "qq";
    return qq;
  } else if (typeof common_vendor.wx$1 !== "undefined") {
    common_vendor.wx$1.platform = typeof window !== "undefined" && typeof location !== "undefined" ? "h5" : "wx";
    return common_vendor.wx$1;
  }
  return { platform: "none" };
}
var api = getApi();
class LocalStorage {
  /**
   * 获取数据项
   * @param {String} key   键
   */
  getItem(key) {
    if (api.platform === "my") {
      return api.getStorageSync({ key }).data;
    }
    return api.getStorageSync(key);
  }
  /**
   * 设置数据项
   * @param {String} key   键
   * @param {Any} value 值
   */
  setItem(key, value) {
    if (api.platform === "my") {
      return api.setStorageSync({ key, data: value });
    }
    return api.setStorageSync(key, value);
  }
}
var localStorage = new LocalStorage(api);
class CookieStore {
  /**
   * 构造函数
   */
  constructor() {
    this.__storageKey = "__cookie_store__";
    this.__cookiesMap = this.__readFromStorage() || /* @__PURE__ */ new Map();
  }
  /**
   * 是否存在某个 cookie
   * @param  {String}  name       cookie 名称
   * @param  {String}  [domain]   指定域名（可选）
   * @param  {String}  [path]     指定path（可选）
   * @return {Boolean}            是否存在
   */
  has(name, domain, path) {
    return this.getCookie(name, domain, path) !== void 0;
  }
  /**
   * 获取 cookie 值
   * @param {String} name       cookie 名称
   * @param {String} [domain]   指定域名（可选）
   * @param {String} [path]     指定path（可选）
   * @return {String}           cookie 值
   */
  get(name = "", domain = "", path = "/") {
    let cookie = this.getCookie(name, domain, path);
    return cookie ? cookie.value : void 0;
  }
  /**
   * 设置域名 cookie
   * @param {String}  name              cookie 名称
   * @param {String}  value             cookie 值
   * @param {Object}  options           cookie 选项
   * @param {String}  options.domain
   * @param {String}  [options.path]
   * @param {Date}    [options.expires]
   * @param {Number}  [options.maxAge]
   * @param {Boolean} [options.httpOnly]
   * @return {Cookie}           cookie 对象
   */
  set(name = "", value = "", options = {}) {
    let domain = options.domain;
    if (!domain || !name)
      throw new Error("name 和 options.domain 值不正确！");
    let cookie = new Cookie(
      Object.assign(options, {
        name,
        value
      })
    );
    let cookies = this.__cookiesMap.get(domain) || /* @__PURE__ */ new Map();
    cookies.set(name, cookie);
    this.__cookiesMap.set(domain, cookies);
    this.__saveToStorage();
    return cookie;
  }
  /**
   * 获取所有域名和 cookies 结构
   * @return {Object}  obj  结构JSON对象
   */
  dir() {
    let dirObj = {};
    for (let domain of this.__cookiesMap.keys()) {
      dirObj[domain] = this.getCookies(domain);
    }
    return dirObj;
  }
  /**
   * 删除 cookie
   * @param  {Array}  name      cookie 键
   * @param  {String} [domain]  指定域名（可选）
   * @return {Boolean}          是否删除成功
   */
  remove(name = "", domain = "") {
    if (domain) {
      let cookies = this.__cookiesMap.get(domain);
      cookies && cookies.delete(name);
      cookies = this.__cookiesMap.get(util.normalizeDomain(domain));
      cookies && cookies.delete(name);
    } else {
      for (let cookies of this.__cookiesMap.values()) {
        cookies.delete(name);
      }
    }
    this.__saveToStorage();
    return true;
  }
  /**
   * 获取 cookie 对象
   * @param {String} name       cookie 名称
   * @param {String} [domain]   指定域名（可选）
   * @param {String} [path]     指定path（可选）
   * @return {Cookie}           cookie 对象
   */
  getCookie(name = "", domain = "", path = "/") {
    let cookie;
    let scopeDomains = util.getCookieScopeDomain(domain);
    for (let [key, cookies] of this.__cookiesMap.entries()) {
      if (domain && scopeDomains.indexOf(key) < 0)
        continue;
      cookie = cookies.get(name);
      if (cookie && cookie.isInPath(path) && !cookie.isExpired())
        break;
      cookie = void 0;
    }
    return cookie;
  }
  /**
   * 获取 cookies key/value 对象
   * @param  {String} [domain]  指定域名（可选）
   * @return {Object}           cookie 值列表对象
   */
  getCookies(domain, path) {
    let cookieValues = {};
    this.getCookiesArray(domain, path).forEach((cookie) => {
      cookieValues[cookie.name] = cookie.value;
    });
    return cookieValues;
  }
  /**
   * 获取 cookies 对象数组
   * @param  {String} [domain]  指定域名（可选）
   * @return {Array}            Cookie 对象数组
   */
  getCookiesArray(domain = "", path = "/") {
    let cookiesArr = [];
    let scopeDomains = util.getCookieScopeDomain(domain);
    for (let [key, cookies] of this.__cookiesMap.entries()) {
      if (domain && scopeDomains.indexOf(key) < 0)
        continue;
      for (let cookie of cookies.values()) {
        if (cookie.isInPath(path) && !cookie.isExpired()) {
          cookiesArr.push(cookie);
        }
      }
    }
    return cookiesArr;
  }
  /**
   * 设置 cookies 对象数组到 store
   * @param  {Array} cookies  Cookie 对象数组
   * @return {Map}            cookies Map 对象
   */
  setCookiesArray(cookies = []) {
    this.__cookiesMap = this.__cookiesMap || /* @__PURE__ */ new Map();
    cookies.forEach((cookie) => {
      let cookieMap = this.__cookiesMap.get(cookie.domain);
      if (!cookieMap) {
        cookieMap = /* @__PURE__ */ new Map();
        this.__cookiesMap.set(cookie.domain, cookieMap);
      }
      cookieMap.set(cookie.name, cookie);
    });
    this.__saveToStorage();
    return this.__cookiesMap;
  }
  /**
   * 清除 cookies
   * @param  {String} [domain]  指定域名（可选）
   * @return {Boolean}          是否清除成功
   */
  clearCookies(domain) {
    if (domain) {
      let cookies = this.__cookiesMap.get(domain);
      cookies && cookies.clear();
    } else {
      this.__cookiesMap.clear();
    }
    this.__saveToStorage();
    return true;
  }
  /**
   * 获取 request cookies
   * @param  {String} domain 指定域名
   * @return {String}        request cookies 字符串
   */
  getRequestCookies(domain, path) {
    let cookiesArr = this.getCookiesArray(domain, path);
    return this.stringify(cookiesArr);
  }
  getRequestQueries(domain, path) {
    let cookiesArr = this.getCookiesArray(domain, path);
    return this.querify(cookiesArr);
  }
  /**
   * 设置 response cookies
   * @param {String} setCookieStr response set-cookie 字符串
   * @param {String} domain       默认域名（如果 set-cookie 中没有设置 domain 则使用该域名）
   */
  setResponseCookies(setCookieStr, domain) {
    let parsedCookies = this.parse(setCookieStr, domain);
    return this.setCookiesArray(parsedCookies);
  }
  /**
   * 解析 response set-cookie 字段
   * @param  {String} setCookieStr response set-cookie 字符串
   * @param  {String} domain       默认域名（如果 set-cookie 中没有设置 domain 则使用该域名）
   * @return {Array}               Cookie 对象数组
   */
  parse(setCookieStr = "", domain) {
    var cookies = common_vendor.setCookieExports.parse(common_vendor.setCookieExports.splitCookiesString(setCookieStr), { decodeValues: false });
    return cookies.map((item) => {
      item.domain = util.normalizeDomain(item.domain) || domain;
      return new Cookie(item);
    });
  }
  /**
   * 将 cookies 字符串化，转化为 request cookies 字符串
   * @param  {Array} cookies Cookie 对象数组
   * @return {String}        cookie 字符串
   */
  stringify(cookies) {
    return cookies.map((item) => item.toString()).join("; ");
  }
  /**
   * 将cookies 字符串化，转化为 字符查询参数 字符串
   * @param {any} cookies
   * @returns
   */
  querify(cookies) {
    return cookies.map((t) => t.toString()).join("&");
  }
  /**
   * 将 cookies 保存到 Storage
   */
  __saveToStorage() {
    try {
      let saveCookies = [];
      for (let cookies of this.__cookiesMap.values()) {
        for (let cookie of cookies.values()) {
          if (cookie.isExpired()) {
            cookies.delete(cookie.name);
          } else if (cookie.isPersistence()) {
            saveCookies.push(cookie);
          }
        }
      }
      localStorage.setItem(this.__storageKey, saveCookies);
    } catch (err) {
      console.warn("Cookie 存储异常：", err);
    }
  }
  /**
   * 从 Storage 读取 cookies
   */
  __readFromStorage() {
    try {
      let cookies = localStorage.getItem(this.__storageKey) || [];
      cookies = cookies.map((item) => new Cookie(item));
      return this.setCookiesArray(cookies);
    } catch (err) {
      console.warn("Cookie 读取异常：", err);
    }
  }
}
const cookieStore = new CookieStore();
(function(cookieStore2) {
  let hasRefresh = false;
  function cookieRequestProxy(options) {
    options.cookie = options.cookie === void 0 || !!options.cookie;
    options.dataType = options.dataType || "json";
    options.header = options.headers = options.header || options.headers || {};
    options.header["X-Requested-With"] = "XMLHttpRequest";
    if (options.dataType === "json") {
      options.header["Accept"] = "application/json, text/plain, */*";
    }
    let urlinfo = (options.url || "").split("/");
    let [parameters] = urlinfo.slice(-1);
    let domain = urlinfo[2].split(":")[0];
    if (common_vendor.wx$1) {
      let cookieQuery = cookieStore2.getCookie("accesstoken", domain);
      let cookieqstr = cookieQuery ? cookieQuery.toString() : "";
      let index = parameters.indexOf("?");
      if (index === -1) {
        options.url = options.url + "?" + cookieqstr;
      } else {
        let reqUrlWithoutPara = options.url.slice(0, options.url.indexOf("?"));
        let parmstr = parameters.slice(index + 1, parameters.length);
        let parms = parmstr.split("&");
        let orignquery = "";
        for (let x of parms) {
          if (!x.startsWith("accesstoken") && !x.startsWith("refreshToken")) {
            orignquery += x + "&";
          }
        }
        options.url = reqUrlWithoutPara + "?" + orignquery + cookieqstr;
      }
      let successCallback = options.success;
      options.success = function(u) {
        let cookiestr = cookieStore2.getRequestQueries(domain, "/");
        if (!hasRefresh && cookiestr) {
          if (u.statusCode === 401) {
            common_vendor.index.request({
              url: host + "/api/Account/refresh-token?" + cookiestr,
              success(res) {
                hasRefresh = true;
                if (res.statusCode !== 200) {
                  common_vendor.index.showToast({
                    title: "登录过期！",
                    duration: 1e3
                  });
                  common_vendor.index.reLaunch({
                    url: "/pages/login/login"
                  });
                } else {
                  cookieStore2.setResponseCookies(res.data.accessToken, domain);
                  cookieStore2.setResponseCookies(res.data.refreshToken, domain);
                  setTimeout(() => {
                    cookieRequestProxy(options);
                  }, 1e3);
                }
              }
            });
          }
        }
        hasRefresh = false;
        successCallback && successCallback(u);
      };
    } else if (api.platform !== "h5" && options.cookie) {
      let path = options.url.split(domain).pop();
      let requestCookies = cookieStore2.getRequestCookies(domain, path);
      options.header["Cookie"] = requestCookies;
      let successCallback = options.success;
      options.success = function(response) {
        response.header = response.header || response.headers;
        let responseCookies = response.header ? response.header["Set-Cookie"] || response.header["set-cookie"] : "";
        if (responseCookies) {
          responseCookies = responseCookies.replace(/\;([^\s\;]*?(?=\=))/gi, ",$1");
          cookieStore2.setResponseCookies(responseCookies, domain);
        }
        successCallback && successCallback(response);
      };
    }
    return this(options);
  }
  const requestProxy = cookieRequestProxy.bind(api.request);
  const uploadFileProxy = cookieRequestProxy.bind(api.uploadFile);
  const downloadFileProxy = cookieRequestProxy.bind(api.downloadFile);
  try {
    Object.defineProperties(api, {
      // request
      requestWithCookie: {
        value: requestProxy
      },
      // uploadFile
      uploadFileWithCookie: {
        value: uploadFileProxy
      },
      // downloadFile
      downloadFileWithCookie: {
        value: downloadFileProxy
      }
    });
    Object.defineProperties(api, {
      // request
      request: {
        value: requestProxy
      },
      // uploadFile
      uploadFile: {
        value: uploadFileProxy
      },
      // downloadFile
      downloadFile: {
        value: downloadFileProxy
      }
    });
  } catch (err) {
    console.error("weapp-cookie: ", err);
  }
  cookieStore2.config = function(options) {
    options = Object.assign(
      {
        requestAlias: "requestWithCookie",
        uploadFileAlias: "uploadFileWithCookie",
        downloadFileAlias: "downloadFileWithCookie"
      },
      options
    );
    if (options.requestAlias) {
      Object.defineProperty(api, options.requestAlias, { value: requestProxy });
    }
    if (options.uploadFileAlias) {
      Object.defineProperty(api, options.uploadFileAlias, {
        value: uploadFileProxy
      });
    }
    if (options.downloadFileAlias) {
      Object.defineProperty(api, options.downloadFileAlias, {
        value: downloadFileProxy
      });
    }
  };
})(cookieStore);
exports.cookieManager = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  "default": cookieStore
});
exports.cookieManager = void 0;
