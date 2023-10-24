"use strict";const e=require("./vendor.js");var t=new class{getCookieScopeDomain(e=""){if(!e)return[];let t=(e=e.replace(/^\.+/gi,"")).split(".").map((t=>[".",e.slice(e.indexOf(t))].join("")));return[e].concat(t)}normalizeDomain(e=""){return e.replace(/^(\.*)?(?=\S)/gi,".")}};class o{constructor(e){this.name=e.name||"",this.value=e.value||"",this.domain=e.domain||"",this.path=e.path||"/",this.expires=e.expires?new Date(e.expires):null,this.maxAge=void 0!==e.maxAge&&null!==e.maxAge?parseInt(e.maxAge):null,this.httpOnly=!!e.httpOnly,this.dateTime=e.dateTime?new Date(e.dateTime):new Date}set(t=""){var o=e.setCookieExports.parse(t,{decodeValues:!1})[0];return o&&(Object.assign(this,o),this.dateTime=new Date),this}merge(e){return Object.assign(this,e)}isExpired(){if(0===this.maxAge)return!0;if(this.maxAge>0){return(Date.now()-this.dateTime.getTime())/1e3>this.maxAge}return!!(this.expires&&this.expires<new Date)}isPersistence(){return!this.maxAge||this.maxAge>0}isInDomain(e){return t.getCookieScopeDomain(e).indexOf(this.domain)>=0}isInPath(e){return 0===e.indexOf(this.path)||this.path.replace(/\/$/,"")===e}toString(){return[this.name,this.value].join("=")}}var i="undefined"!=typeof my?(my.platform="my",my):"undefined"!=typeof tt?(tt.platform="tt",tt):"undefined"!=typeof swan?(swan.platform="swan",swan):"undefined"!=typeof qq?(qq.platform="qq",qq):void 0!==e.wx$1?(e.wx$1.platform="undefined"!=typeof window&&"undefined"!=typeof location?"h5":"wx",e.wx$1):{platform:"none"};var s=new class{getItem(e){return"my"===i.platform?i.getStorageSync({key:e}).data:i.getStorageSync(e)}setItem(e,t){return"my"===i.platform?i.setStorageSync({key:e,data:t}):i.setStorageSync(e,t)}}(i);const a=new class{constructor(){this.__storageKey="__cookie_store__",this.__cookiesMap=this.__readFromStorage()||new Map}has(e,t,o){return void 0!==this.getCookie(e,t,o)}get(e="",t="",o="/"){let i=this.getCookie(e,t,o);return i?i.value:void 0}set(e="",t="",i={}){let s=i.domain;if(!s||!e)throw new Error("name 和 options.domain 值不正确！");let a=new o(Object.assign(i,{name:e,value:t})),r=this.__cookiesMap.get(s)||new Map;return r.set(e,a),this.__cookiesMap.set(s,r),this.__saveToStorage(),a}dir(){let e={};for(let t of this.__cookiesMap.keys())e[t]=this.getCookies(t);return e}remove(e="",o=""){if(o){let i=this.__cookiesMap.get(o);i&&i.delete(e),i=this.__cookiesMap.get(t.normalizeDomain(o)),i&&i.delete(e)}else for(let t of this.__cookiesMap.values())t.delete(e);return this.__saveToStorage(),!0}getCookie(e="",o="",i="/"){let s,a=t.getCookieScopeDomain(o);for(let[t,r]of this.__cookiesMap.entries())if(!(o&&a.indexOf(t)<0)){if(s=r.get(e),s&&s.isInPath(i)&&!s.isExpired())break;s=void 0}return s}getCookies(e,t){let o={};return this.getCookiesArray(e,t).forEach((e=>{o[e.name]=e.value})),o}getCookiesArray(e="",o="/"){let i=[],s=t.getCookieScopeDomain(e);for(let[t,a]of this.__cookiesMap.entries())if(!(e&&s.indexOf(t)<0))for(let e of a.values())e.isInPath(o)&&!e.isExpired()&&i.push(e);return i}setCookiesArray(e=[]){return this.__cookiesMap=this.__cookiesMap||new Map,e.forEach((e=>{let t=this.__cookiesMap.get(e.domain);t||(t=new Map,this.__cookiesMap.set(e.domain,t)),t.set(e.name,e)})),this.__saveToStorage(),this.__cookiesMap}clearCookies(e){if(e){let t=this.__cookiesMap.get(e);t&&t.clear()}else this.__cookiesMap.clear();return this.__saveToStorage(),!0}getRequestCookies(e,t){let o=this.getCookiesArray(e,t);return this.stringify(o)}getRequestQueries(e,t){let o=this.getCookiesArray(e,t);return this.querify(o)}setResponseCookies(e,t){let o=this.parse(e,t);return this.setCookiesArray(o)}parse(i="",s){return e.setCookieExports.parse(e.setCookieExports.splitCookiesString(i),{decodeValues:!1}).map((e=>(e.domain=t.normalizeDomain(e.domain)||s,new o(e))))}stringify(e){return e.map((e=>e.toString())).join("; ")}querify(e){return e.map((e=>e.toString())).join("&")}__saveToStorage(){try{let e=[];for(let t of this.__cookiesMap.values())for(let o of t.values())o.isExpired()?t.delete(o.name):o.isPersistence()&&e.push(o);s.setItem(this.__storageKey,e)}catch(e){console.warn("Cookie 存储异常：",e)}}__readFromStorage(){try{let e=s.getItem(this.__storageKey)||[];return e=e.map((e=>new o(e))),this.setCookiesArray(e)}catch(e){console.warn("Cookie 读取异常：",e)}}};!function(t){let o=!1;function s(a){a.cookie=void 0===a.cookie||!!a.cookie,a.dataType=a.dataType||"json",a.header=a.headers=a.header||a.headers||{},a.header["X-Requested-With"]="XMLHttpRequest","json"===a.dataType&&(a.header.Accept="application/json, text/plain, */*");let r=(a.url||"").split("/"),[n]=r.slice(-1),l=r[2].split(":")[0];if(e.wx$1){let i=t.getCookie("accesstoken",l),r=i?i.toString():"",u=n.indexOf("?");if(-1===u)a.url=a.url+"?"+r;else{let e=a.url.slice(0,a.url.indexOf("?")),t=n.slice(u+1,n.length).split("&"),o="";for(let i of t)i.startsWith("accesstoken")||i.startsWith("refreshToken")||(o+=i+"&");a.url=e+"?"+o+r}let p=a.success;a.success=function(i){o||401===i.statusCode&&e.index.request({url:"https://localhost:7221/api/Account/refresh-token?"+t.getRequestQueries(l,"/"),success(t){o=!0,200!==t.statusCode?(e.index.showToast({title:"登录过期！",duration:1e3}),e.index.reLaunch({url:"/pages/login/login"})):(o=!1,s(a))}}),p&&p(i)}}else if("h5"!==i.platform&&a.cookie){let e=a.url.split(l).pop(),o=t.getRequestCookies(l,e);a.header.Cookie=o;let i=a.success;a.success=function(e){e.header=e.header||e.headers;let o=e.header?e.header["Set-Cookie"]||e.header["set-cookie"]:"";o&&(o=o.replace(/\;([^\s\;]*?(?=\=))/gi,",$1"),t.setResponseCookies(o,l)),i&&i(e)}}return this(a)}const a=s.bind(i.request),r=s.bind(i.uploadFile),n=s.bind(i.downloadFile);try{Object.defineProperties(i,{requestWithCookie:{value:a},uploadFileWithCookie:{value:r},downloadFileWithCookie:{value:n}}),Object.defineProperties(i,{request:{value:a},uploadFile:{value:r},downloadFile:{value:n}})}catch(l){console.error("weapp-cookie: ",l)}t.config=function(e){(e=Object.assign({requestAlias:"requestWithCookie",uploadFileAlias:"uploadFileWithCookie",downloadFileAlias:"downloadFileWithCookie"},e)).requestAlias&&Object.defineProperty(i,e.requestAlias,{value:a}),e.uploadFileAlias&&Object.defineProperty(i,e.uploadFileAlias,{value:r}),e.downloadFileAlias&&Object.defineProperty(i,e.downloadFileAlias,{value:n})}}(a),exports.cookieManager=Object.freeze({__proto__:null,default:a}),exports.cookieManager=void 0;