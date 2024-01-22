import * as dayjs from 'dayjs';
import { baseUrl } from "../common/const.js";
import hmac from 'js-crypto-hmac'; 
import encodeUtf8 from 'encode-utf8';


export function putObject(request){
		
	function sign(stringToSign){
	}
	
	function buildSignString(request){
		return "";
	}
	let signstr = sign(buildSignString(request));
	request.headers['Signature']=signstr;
}

function buildSignature(requestObj,resourcePath,securityToken,accessKeySecret){
	let contentmd5 = requestObj.header["Content-MD5"]==void 0?"":requestObj.header["Content-MD5"];
	let contentType = requestObj.header["Content-Type"]==void 0?"":requestObj.header["Content-Type"];
	let expires = "";
	let  strToSign = `${requestObj.method}\n${contentmd5}\n${contentType}\n${expires}\n${resourcePath}?security-token=${securityToken}`;
	let sign;
	hmacEncode(accessKeySecret,strToSign).then((result)=>{
		const binString = String.fromCodePoint(...result);
		sign = btoa(binString);
	})
	return sign;
}

function ossGetUrl(osspath){
	let requestObj = {
		url:"",
		method:"GET",
		header:{
			
		}
	}
	
	const token = tokenManager.getOrUpdateToken();
	let signature = buildSignature(requestObj,osspath,token.SecurityToken,token.AccessKeySecret);
	let url = `?OSSAccessKeyId=${token.AccessKeyId}&Expires=${ex}&Signature=${signature}&security-token=${token.SecurityToken}`;
	
	return requestObj.url+url;
}

function hmacEncode(key,data){
	
	return hmac.compute(encodeUtf8(key),encodeUtf8(data),"SHA-1")
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
		return this.token instanceof Token;
	}
	
	
	getOrUpdateToken(){
		if(this.isExpiration()){
			new Promise((resolve,reject)=>{
				uni.request({
					url:baseUrl+"/api/Information/ststoken",
					success: (res) => {
						if(res.statusCode===200){
							let data = res.data;
							resolve(data);
						}
					}
				})
			}).then((data)=>{
				this.token = new STSToken(data.AccessKeyId,
				data.AccessKeySecret,
				data.Expiration,
				data.SecurityToken)
			})

		}
		return this.token;
	}
	

}

class STSToken{
	constructor(AccessKeyId,AccessKeySecret,Expiration,SecurityToken){
		this.AccessKeyId=AccessKeyId;
		this.AccessKeySecret=AccessKeySecret;
		this.Expiration=Expiration;
		this.SecurityToken=SecurityToken;
	}
}

var tokenManager = new TokenManager();