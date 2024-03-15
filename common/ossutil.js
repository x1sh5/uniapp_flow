import * as dayjs from 'dayjs';
import { baseUrl } from "../common/const.js";
import hmacsha1 from 'hmacsha1';
import encodeUtf8 from 'encode-utf8';
import { md5 } from 'js-md5';
import {encode as encodeBase64} from "base64-arraybuffer"


class UrlManager{
	constructor(){
		
	}
}

class STSToken{
	constructor(AccessKeyId,AccessKeySecret,Expiration,SecurityToken){
		this.AccessKeyId=AccessKeyId;
		this.AccessKeySecret=AccessKeySecret;
		this.Expiration=dayjs.default(Expiration);
		this.SecurityToken=SecurityToken;
	}
}

class TokenManager{
	constructor(){
		this.token = null
	}
	
	isExpiration(){
		if(this.valid()){
			return this.token.Expiration.add(8,'hour').isBefore(dayjs())
		}
		return true;
	}
	
	valid(){
		return this.token instanceof STSToken;
	}
	
	
	async getOrUpdateToken(){
		function getOne(){
			return new Promise((resolve,reject)=>{
				uni.requestWithCookie({
					url:baseUrl+"/api/Information/ststoken",
					success: (res) => {
						if(res.statusCode===200){
							let data = res.data;
							resolve(data);
						}
					}
				})
			})
		}
		if(this.isExpiration()){
			const data = await getOne();
			this.token = new STSToken(data.AccessKeyId,
			data.AccessKeySecret,
			data.Expiration,
			data.SecurityToken)

		}
		return this.token;
	}
	

}

var tokenManager = new TokenManager();
var encoder = new TextEncoder();

export async function putObject(requestObj,osspath){
		
	let url = await ossUrl(requestObj,osspath);
	requestObj.url = url;
	uni.request(requestObj);
}

export function uploadFile(file, ossdir="files/",callback=(resl)=>{
				if(resl.statusCode === 200){
					uni.showToast({
						title:"上传成功！",
					})
					console.log(resl.data.url)
				}else{
						uni.showToast({
							title:file.name+" :上传失败！",
						})
					}
			}
){
	// #ifdef MP-WEIXIN
	let mdstr = md5.base64(file.data);
	let suffs = file.name.split(".");
	let suffix = suffs.length>1?suffs.pop():"";
	suffix = /[\u4e00-\u9fa5]/.test(suffix)?"":"."+suffix;
	let name=md5(file.data)+suffix;
	let resourcePath = "/liusha-images/"+ossdir+name;
	let requestObj = {
		url:"https://liusha-images.oss-cn-chengdu.aliyuncs.com",
		method:"PUT",
		header:{
			"Content-Type": file.type?file.type:"application/octet-stream",
			// "Content-Length": file.size,
			"Content-MD5": mdstr,
			"cache-control":"no-cache"
		},
		callback:{
			"callbackUrl":"https://www.liusha-gy.com/api/OSSNotify/callback",
			"callbackBody":`bucket=liusha-images&object=${ossdir+name}&size=${file.size}&mimeType=${file.type}&contentMd5=${mdstr}&userid=$\{x:userid\}`
		},
		data:file.data,
		success:callback,
		callback_var:{"x:userid":"1"}
	}
	//console.log(encodeURIComponent(mdstr));
	putObject(requestObj,resourcePath)
	// #endif
	
	// #ifdef H5
	file.slice().arrayBuffer().then((res)=>{
		console.log(res);
		let mdstr = md5.base64(res);
		let suffs = file.name.split(".");
		let suffix = suffs.length>1?suffs.pop():"";
		suffix = /[\u4e00-\u9fa5]/.test(suffix)?"":"."+suffix;
		let name=md5(res)+suffix;
		let resourcePath = "/liusha-images/"+ossdir+name;
		let requestObj = {
			url:"https://liusha-images.oss-cn-chengdu.aliyuncs.com",
			method:"PUT",
			header:{
				"Content-Type": file.type?file.type:"application/octet-stream",
				// "Content-Length": file.size,
				"Content-MD5": mdstr,
				"cache-control":"no-cache"
			},
			callback:{
				"callbackUrl":"https://www.liusha-gy.com/api/OSSNotify/callback",
				"callbackBody":`bucket=liusha-images&object=${ossdir+name}&size=${file.size}&mimeType=${file.type}&contentMd5=${mdstr}&userid=$\{x:userid\}`
			},
			data:res,
			success:callback,
			callback_var:{"x:userid":"1"}
		}
		//console.log(encodeURIComponent(mdstr));
		putObject(requestObj,resourcePath)
	})
	// #endif

}

export async function ossGetUrl(osspath){
	let requestObj = {
		url:"https://liusha-images.oss-cn-chengdu.aliyuncs.com",
		method:"GET",
		header:{
			
		}
	}
	
	return await ossUrl(requestObj,osspath);
}

async function ossUrl(requestObj,osspath){
	let urlpath=osspath.substring(osspath.indexOf("/",1));
	const token = await tokenManager.getOrUpdateToken();
	let expires = dayjs().add(1,"h").unix();
	
	let resourceMap = new Map();
	if(requestObj.callback){resourceMap.set("callback",encodeBase64(encoder.encode(JSON.stringify(requestObj.callback))))}
	if(requestObj.callback_var){resourceMap.set("callback-var",encodeBase64(encoder.encode(JSON.stringify(requestObj.callback_var))))}
	resourceMap.set("security-token",token.SecurityToken);
	
	let canaResource = buildResource(osspath,resourceMap);
	let signature = buildSignature(requestObj,canaResource,token.AccessKeySecret,expires);
	let query;
	if(requestObj.callback){
		query = buildUrlQuery1(token,expires,signature,resourceMap.get("callback"),resourceMap.get("callback-var"));
	}else{
		query = buildUrlQuery(token,expires,signature);
	}
	
	
	return requestObj.url + urlpath +query;
}

function buildSignature(requestObj,canaResource,accessKeySecret,expires){
	let contentmd5 = requestObj.header["Content-MD5"]==void 0?"":requestObj.header["Content-MD5"];
	let contentType = requestObj.header["Content-Type"]==void 0?"":requestObj.header["Content-Type"];
	
	let  strToSign = `${requestObj.method}\n${contentmd5}\n${contentType}\n${expires}\n${canaResource}`;
	//console.log(strToSign);
	let sign;
	const result = hmacEncode(accessKeySecret,strToSign);

	return result;
}

function buildResource(osspath,resourceMap){
	let r = `${osspath}?`;
	for(let a of resourceMap){
		r+=`${a[0]}=${a[1]}&`;
	}
	
	return r.slice(0, -1);;
}

function buildUrlQuery(token,expires,signature){
	return `?OSSAccessKeyId=${encodeURIComponent(token.AccessKeyId)}&Expires=${expires}&Signature=${encodeURIComponent(signature)}&security-token=${encodeURIComponent(token.SecurityToken)}`;
}

function buildUrlQuery1(token,expires,signature,callback,callback_var){
	return `?OSSAccessKeyId=${encodeURIComponent(token.AccessKeyId)}&Expires=${expires}&Signature=${encodeURIComponent(signature)}&security-token=${encodeURIComponent(token.SecurityToken)}&callback=${encodeURIComponent(callback)}&callback-var=${callback_var}`;
}

function hmacEncode(key,data){
	
	return hmacsha1(key,data)
}
