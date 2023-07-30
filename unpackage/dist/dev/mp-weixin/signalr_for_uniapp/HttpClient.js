"use strict";
class HttpResponse {
  constructor(statusCode, statusText, content) {
    this.statusCode = statusCode;
    this.statusText = statusText;
    this.content = content;
  }
}
class HttpClient {
  get(url, options) {
    return this.send(Object.assign(Object.assign({}, options), { method: "GET", url }));
  }
  post(url, options) {
    return this.send(Object.assign(Object.assign({}, options), { method: "POST", url }));
  }
  delete(url, options) {
    return this.send(Object.assign(Object.assign({}, options), { method: "DELETE", url }));
  }
  /** Gets all cookies that apply to the specified URL.
   *
   * @param url The URL that the cookies are valid for.
   * @returns {string} A string containing all the key-value cookie pairs for the specified URL.
   */
  // @ts-ignore
  getCookieString(url) {
    return "";
  }
}
exports.HttpClient = HttpClient;
exports.HttpResponse = HttpResponse;
