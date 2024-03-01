import * as dayjs from 'dayjs';
import { baseUrl } from "../common/const.js";
import hmacsha1 from 'hmacsha1';
import encodeUtf8 from 'encode-utf8';
import { md5 } from 'js-md5';


class UrlManager{
	constructor(){
		
	}
}

class STSToken{
	constructor(AccessKeyId,AccessKeySecret,Expiration,SecurityToken){
		this.AccessKeyId=AccessKeyId;
		this.AccessKeySecret=AccessKeySecret;
		this.Expiration=dayjs(Expiration);
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

export async function putObject(requestObj,osspath){
		
	let url = await ossUrl(requestObj,osspath);
	requestObj.url = url;
	uni.request(requestObj);
}


export async function ossGetUrl(osspath){
	let requestObj = {
		url:"https://sdfsdafasdf.oss-cn-shanghai.aliyuncs.com",
		method:"GET",
		header:{
			
		}
	}
	
	return await ossUrl(requestObj,osspath);
}

async function ossUrl(requestObj,osspath){
	let urlpath=osspath.substring(osspath.indexOf("/",1));
	const token = await tokenManager.getOrUpdateToken();
	let expires = dayjs("Sun Mar 03 2024 13:36:01 GMT").unix();//dayjs().add(1,"h").unix();
	
	let resourceMap = new Map();
	if(requestObj.callback){resourceMap.set("callback",btoa(JSON.stringify(requestObj.callback)))}
	if(requestObj.callback_var){resourceMap.set("callback-var",btoa(JSON.stringify(requestObj.callback_var)))}
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
	console.log(strToSign);
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
