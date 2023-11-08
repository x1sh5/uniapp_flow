import cookieParser from 'set-cookie-parser';

/**
 * Util 类
 */
var host = "https://www.liusha-gy.com"
//var host = "https://localhost:7221"
class Util {
  /**
   * 根据域名获取该域名的 cookie 作用域范围列表
   * @param  {String} domain 指定域名
   * @return {String}        cookie 作用域范围列表
   */
  getCookieScopeDomain(domain = '') {
    if (!domain) return [];

    // 获取 cookie 作用域范围列表
    domain = domain.replace(/^\.+/gi, '');
    let scopes = domain.split('.').map((k) => ['.', domain.slice(domain.indexOf(k))].join(''));

    return [domain].concat(scopes);
  }

  /**
   * 根据最新的 RFC 6265 标准化域名作用域
   * @param  {String} domain 域名
   * @return {String}        标准化后的域名
   */
  normalizeDomain(domain = '') {
    return domain.replace(/^(\.*)?(?=\S)/gi, '.');
  }
}

var util = new Util();

/**
 * Cookie 类
 */
class Cookie {
  /**
   * 构造函数
   */
  constructor(props) {
    this.name = props.name || '';
    this.value = props.value || '';
    // other
    this.domain = props.domain || '';
    this.path = props.path || '/';
    this.expires = props.expires ? new Date(props.expires) : null;
    this.maxAge = props.maxAge !== undefined && props.maxAge !== null ? parseInt(props.maxAge) : null;
    this.httpOnly = !!props.httpOnly;
    // 记录时间
    this.dateTime = props.dateTime ? new Date(props.dateTime) : new Date();
  }

  /**
   * 设置 cookie, 将 set-cookie 字符串转换为 Cookie 对象
   */
  set(setCookieStr = '') {
    var cookie = cookieParser.parse(setCookieStr, { decodeValues: false })[0];
    if (cookie) {
      Object.assign(this, cookie);
      // 更新设置时间
      this.dateTime = new Date();
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
    // maxAge 为 0，无效
    if (this.maxAge === 0) {
      return true;
    }
    // 存活秒数超出 maxAge，无效
    if (this.maxAge > 0) {
      let seconds = (Date.now() - this.dateTime.getTime()) / 1000;
      return seconds > this.maxAge;
    }
    // expires 小于当前时间，无效
    if (this.expires && this.expires < new Date()) {
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
    return path.indexOf(this.path) === 0 || this.path.replace(/\/$/, '') === path;
  }

  /**
   * 重写对象的 toString 方法
   */
  toString() {
    return [this.name, this.value].join('=');
  }
}

/**
 * 适配小程序API宿主对象
 */

function getApi() {
  if (typeof my !== 'undefined') {
    my.platform = 'my';
    return my;
  } else if (typeof tt !== 'undefined') {
    tt.platform = 'tt';
    return tt;
  } else if (typeof swan !== 'undefined') {
    swan.platform = 'swan';
    return swan;
  } else if (typeof qq !== 'undefined') {
    qq.platform = 'qq';
    return qq;
  } else if (typeof wx !== 'undefined') {
    wx.platform = typeof window !== 'undefined' && typeof location !== 'undefined' ? 'h5' : 'wx';
    return wx;
  }
  return { platform: 'none' };
}

var api = getApi();

/**
 * LocalStorage 类
 */
class LocalStorage {
  /**
   * 获取数据项
   * @param {String} key   键
   */
  getItem(key) {
    // 屏蔽支付宝小程序语法差异
    if (api.platform === 'my') {
      return api.getStorageSync({ key: key }).data;
    }
    return api.getStorageSync(key);
  }

  /**
   * 设置数据项
   * @param {String} key   键
   * @param {Any} value 值
   */
  setItem(key, value) {
    // 屏蔽支付宝小程序语法差异
    if (api.platform === 'my') {
      return api.setStorageSync({ key: key, data: value });
    }
    return api.setStorageSync(key, value);
  }
}

// 单例
var localStorage = new LocalStorage(api);

/**
 * CookieStore 类
 */
class CookieStore {
  /**
   * 构造函数
   */
  constructor() {
    // storageKey
    this.__storageKey = '__cookie_store__';
    // cookies Map缓存（domain -> cookie 二级结构）
    this.__cookiesMap = this.__readFromStorage() || new Map();
  }

  /**
   * 是否存在某个 cookie
   * @param  {String}  name       cookie 名称
   * @param  {String}  [domain]   指定域名（可选）
   * @param  {String}  [path]     指定path（可选）
   * @return {Boolean}            是否存在
   */
  has(name, domain, path) {
    // 返回是否存在 cookie 值
    return this.getCookie(name, domain, path) !== undefined;
  }

  /**
   * 获取 cookie 值
   * @param {String} name       cookie 名称
   * @param {String} [domain]   指定域名（可选）
   * @param {String} [path]     指定path（可选）
   * @return {String}           cookie 值
   */
  get(name = '', domain = '', path = '/') {
    // 获取 cookie
    let cookie = this.getCookie(name, domain, path);

    // 返回 cookie 值
    return cookie ? cookie.value : undefined;
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
  set(name = '', value = '', options = {}) {
    // 构建 Cookie 实例
    let domain = options.domain;
    if (!domain || !name) throw new Error('name 和 options.domain 值不正确！');

    let cookie = new Cookie(
      Object.assign(options, {
        name: name,
        value: value,
      })
    );

    // 设置到指定域名
    let cookies = this.__cookiesMap.get(domain) || new Map();
    cookies.set(name, cookie);
    this.__cookiesMap.set(domain, cookies);

    // 保存到 Storage
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
  remove(name = '', domain = '') {
    if (domain) {
      // 删除指定域名的 cookie
      let cookies = this.__cookiesMap.get(domain);
      cookies && cookies.delete(name);
      cookies = this.__cookiesMap.get(util.normalizeDomain(domain));
      cookies && cookies.delete(name);
    } else {
      // 删除所有域名的 cookie
      for (let cookies of this.__cookiesMap.values()) {
        cookies.delete(name);
      }
    }

    // 保存到 Storage
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
  getCookie(name = '', domain = '', path = '/') {
    let cookie;

    // 获取 cookie scope 域名数组
    let scopeDomains = util.getCookieScopeDomain(domain);

    // 获取任意域名的 cookie
    for (let [key, cookies] of this.__cookiesMap.entries()) {
      // 如果有域名，则根据域名过滤
      if (domain && scopeDomains.indexOf(key) < 0) continue;
      // 获取 cookie
      cookie = cookies.get(name);
      if (cookie && cookie.isInPath(path) && !cookie.isExpired()) break;
      cookie = undefined;
    }

    // 返回 cookie 值
    return cookie;
  }

  /**
   * 获取 cookies key/value 对象
   * @param  {String} [domain]  指定域名（可选）
   * @return {Object}           cookie 值列表对象
   */
  getCookies(domain, path) {
    let cookieValues = {};

    // 将 cookie 值添加到对象
    this.getCookiesArray(domain, path).forEach((cookie) => {
      cookieValues[cookie.name] = cookie.value;
    });

    // 返回获取的 cookie 值对象
    return cookieValues;
  }

  /**
   * 获取 cookies 对象数组
   * @param  {String} [domain]  指定域名（可选）
   * @return {Array}            Cookie 对象数组
   */
  getCookiesArray(domain = '', path = '/') {
    let cookiesArr = [];

    // 获取 cookie scope 域名数组
    let scopeDomains = util.getCookieScopeDomain(domain);

    // 获取任意域名的 cookie
    for (let [key, cookies] of this.__cookiesMap.entries()) {
      // 如果有域名，则根据域名过滤
      if (domain && scopeDomains.indexOf(key) < 0) continue;
      // 循环当前域名下所有 cookie
      for (let cookie of cookies.values()) {
        // 筛选符合 path 条件并且未过期的 cookie
        if (cookie.isInPath(path) && !cookie.isExpired()) {
          cookiesArr.push(cookie);
        }
      }
    }

    // 返回获取的 cookie 值对象
    return cookiesArr;
  }

  /**
   * 设置 cookies 对象数组到 store
   * @param  {Array} cookies  Cookie 对象数组
   * @return {Map}            cookies Map 对象
   */
  setCookiesArray(cookies = []) {
    this.__cookiesMap = this.__cookiesMap || new Map();

    // Cookie 数组转换 Map 对象
    cookies.forEach((cookie) => {
      let cookieMap = this.__cookiesMap.get(cookie.domain);
      if (!cookieMap) {
        cookieMap = new Map();
        this.__cookiesMap.set(cookie.domain, cookieMap);
      }
      cookieMap.set(cookie.name, cookie);
    });

    // 保存到 Storage
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

    // 保存到 Storage
    this.__saveToStorage();

    return true;
  }

  /**
   * 获取 request cookies
   * @param  {String} domain 指定域名
   * @return {String}        request cookies 字符串
   */
  getRequestCookies(domain, path) {
    // cookies 数组
    let cookiesArr = this.getCookiesArray(domain, path);

    // 转化为 request cookies 字符串
    return this.stringify(cookiesArr);
  }

    getRequestQueries(domain, path) { // cookies 数组
        let cookiesArr = this.getCookiesArray(domain, path);
        return this.querify(cookiesArr)
    }

  /**
   * 设置 response cookies
   * @param {String} setCookieStr response set-cookie 字符串
   * @param {String} domain       默认域名（如果 set-cookie 中没有设置 domain 则使用该域名）
   */
  setResponseCookies(setCookieStr, domain) {
    // 转换为 cookie 对象数组
    let parsedCookies = this.parse(setCookieStr, domain);

    // 设置 cookies
    return this.setCookiesArray(parsedCookies);
  }

  /**
   * 解析 response set-cookie 字段
   * @param  {String} setCookieStr response set-cookie 字符串
   * @param  {String} domain       默认域名（如果 set-cookie 中没有设置 domain 则使用该域名）
   * @return {Array}               Cookie 对象数组
   */
  parse(setCookieStr = '', domain) {
    // parse
    var cookies = cookieParser.parse(cookieParser.splitCookiesString(setCookieStr), { decodeValues: false });
    // 转换为 Cookie 对象
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
    return cookies.map((item) => item.toString()).join('; ');
  }

  /**
   * 将cookies 字符串化，转化为 字符查询参数 字符串
   * @param {any} cookies
   * @returns
   */
    querify(cookies) {
        return cookies.map(t => t.toString()).join("&");
    }

  /**
   * 将 cookies 保存到 Storage
   */
  __saveToStorage() {
    try {
      let saveCookies = [];

      // 获取需要持久化的 cookie
      for (let cookies of this.__cookiesMap.values()) {
        for (let cookie of cookies.values()) {
          if (cookie.isExpired()) {
            // 清除无效 cookie
            cookies.delete(cookie.name);
          } else if (cookie.isPersistence()) {
            // 只存储可持久化 cookie
            saveCookies.push(cookie);
          }
        }
      }

      // 保存到本地存储
      localStorage.setItem(this.__storageKey, saveCookies);
    } catch (err) {
      console.warn('Cookie 存储异常：', err);
    }
  }

  /**
   * 从 Storage 读取 cookies
   */
  __readFromStorage() {
    try {
      // 从本地存储读取 cookie 数据数组
      let cookies = localStorage.getItem(this.__storageKey) || [];

      // 转化为 Cookie 对象数组
      cookies = cookies.map((item) => new Cookie(item));

      // 转化为 cookie map 对象
      return this.setCookiesArray(cookies);
    } catch (err) {
      console.warn('Cookie 读取异常：', err);
    }
  }
}

/**
 * 微信 Cookie 代理
 */

  // 创建 cookieStore 实例
const cookieStore = new CookieStore();

(function (cookieStore) {

    //self add
    let hasRefresh = false;
  /**
   * 定义请求 cookie 代理函数
   * @param  {Object} options 请求参数
   */
  function cookieRequestProxy(options) {
    // 是否启用 cookie（默认 true）
    options.cookie = options.cookie === undefined || !!options.cookie;
    // 数据类型
    options.dataType = options.dataType || 'json';
    options.header = options.headers = options.header || options.headers || {};
    options.header['X-Requested-With'] = 'XMLHttpRequest';
    if (options.dataType === 'json') {
      options.header['Accept'] = 'application/json, text/plain, */*';
    }

      // 域名
    let urlinfo = (options.url || "").split("/");
    let [parameters] = urlinfo.slice(-1);
    let domain = urlinfo[2].split(":")[0];
    // 判断在小程序环境是否启用 cookie
    if (wx) {

            //l = i.url.split(o).pop(), 
            //h = a.getRequestCookies(o, "/");
        let cookieQuery = cookieStore.getCookie("accesstoken", domain);
		let cookieqstr = cookieQuery?cookieQuery.toString():"";
        let index = parameters.indexOf("?");
        //i.header.Cookie = h; 
        if (index === -1) {
            options.url = options.url + "?" + cookieqstr;
        } else {
            let reqUrlWithoutPara = options.url.slice(0, options.url.indexOf("?"))
            let parmstr = parameters.slice(index + 1, parameters.length);
            let parms = parmstr.split("&");
            let orignquery = "";
			//去掉重复的accesstoken和refreshToken
            for (let x of parms) {
               if (!x.startsWith("accesstoken") && !x.startsWith("refreshToken")) {
                   orignquery += x + "&";
               }
            }
            options.url = reqUrlWithoutPara + "?" + orignquery + cookieqstr;
        }

        //end
        let successCallback = options.success;
        options.success = function (u) {
            //self add
			let cookiestr = cookieStore.getRequestQueries(domain, "/");
            if (!hasRefresh&&cookiestr) {
                if (u.statusCode === 401) {
                    uni.request({
                        url: host+"/api/Account/refresh-token?" + cookiestr,
                        success(res) {
                            hasRefresh = true;
                            if (res.statusCode !== 200) {
                                uni.showToast({
                                    title: "登录过期！",
                                    duration: 1000
                                });
                                uni.reLaunch({
                                    url: "/pages/login/login"
                                });
                            }
                            else {
								cookieStore.setResponseCookies(res.data.accessToken,domain);
								cookieStore.setResponseCookies(res.data.refreshToken,domain);
                                //hasRefresh = false;
								setTimeout(()=>{
									cookieRequestProxy(options);
								},1000)
                                
                            }
                        }
                    });
                }

            }
			hasRefresh = false;
            //end

            successCallback && successCallback(u);
        };
    }
    else if (api.platform !== 'h5' && options.cookie) {

      let path = options.url.split(domain).pop();

      // 获取请求 cookies
      let requestCookies = cookieStore.getRequestCookies(domain, path);

      // 请求时带上设置的 cookies
      options.header['Cookie'] = requestCookies;

      // 请求成功回调
      let successCallback = options.success;
      options.success = function (response) {
        response.header = response.header || response.headers;
        // 获取响应 cookies
        let responseCookies = response.header ? response.header['Set-Cookie'] || response.header['set-cookie'] : '';
        if (responseCookies) {
          // 处理QQ小程序下cookie分隔符问题：https://github.com/charleslo1/weapp-cookie/issues/39
          responseCookies = responseCookies.replace(/\;([^\s\;]*?(?=\=))/gi, ',$1');
          // 设置 cookies，以便下次请求带上
          cookieStore.setResponseCookies(responseCookies, domain);
        }
        // 调用成功回调函数
        successCallback && successCallback(response);
      };
    }

    // 发送网络请求
    return this(options);
  }

  // 绑定新的
  const requestProxy = cookieRequestProxy.bind(api.request);
  const uploadFileProxy = cookieRequestProxy.bind(api.uploadFile);
  const downloadFileProxy = cookieRequestProxy.bind(api.downloadFile);

  try {
    // 增加 requestWithCookie、uploadFileWithCookie、downloadFileWithCookie 接口
    Object.defineProperties(api, {
      // request
      requestWithCookie: {
        value: requestProxy,
      },
      // uploadFile
      uploadFileWithCookie: {
        value: uploadFileProxy,
      },
      // downloadFile
      downloadFileWithCookie: {
        value: downloadFileProxy,
      },

    });

    // 使用 requestProxy 覆盖微信原生 request、uploadFile、downloadFile 接口
    Object.defineProperties(api, {
      // request
      request: {
        value: requestProxy,
      },
      // uploadFile
      uploadFile: {
        value: uploadFileProxy,
      },
      // downloadFile
      downloadFile: {
        value: downloadFileProxy,
      },
    });
  } catch (err) {
    console.error('weapp-cookie: ', err);
  }

  // 配置
  cookieStore.config = function (options) {
    options = Object.assign(
      {
        requestAlias: 'requestWithCookie',
        uploadFileAlias: 'uploadFileWithCookie',
        downloadFileAlias: 'downloadFileWithCookie'
      },options);
    // 配置请求别名
    if (options.requestAlias) {
      Object.defineProperty(api, options.requestAlias, { value: requestProxy });
    }
    if (options.uploadFileAlias) {
      Object.defineProperty(api, options.uploadFileAlias, {
        value: uploadFileProxy,
      });
    }
    if (options.downloadFileAlias) {
      Object.defineProperty(api, options.downloadFileAlias, {
        value: downloadFileProxy,
      });
    }

    };
})(cookieStore);

var cookieManager = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': cookieStore
});


//export { cookieManager as default} ; 修改成下面
export var cookieManager ;