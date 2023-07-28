// Licensed to the .NET Foundation under one or more agreements.
// The .NET Foundation licenses this file to you under the MIT license.
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { HeaderNames } from "./HeaderNames";
import { HttpClient } from "./HttpClient";
/** @private */
export class AccessTokenHttpClient extends HttpClient {
    constructor(innerClient, accessTokenFactory) {
        super();
        this._innerClient = innerClient;
        this._accessTokenFactory = accessTokenFactory;
    }
    send(request) {
        return __awaiter(this, void 0, void 0, function* () {
            let allowRetry = true;
            if (this._accessTokenFactory && (!this._accessToken || (request.url && request.url.indexOf("/negotiate?") > 0))) {
                // don't retry if the request is a negotiate or if we just got a potentially new token from the access token factory
                allowRetry = false;
                this._accessToken = yield this._accessTokenFactory();
            }
            this._setAuthorizationHeader(request);
            const response = yield this._innerClient.send(request);
            if (allowRetry && response.statusCode === 401 && this._accessTokenFactory) {
                this._accessToken = yield this._accessTokenFactory();
                this._setAuthorizationHeader(request);
                return yield this._innerClient.send(request);
            }
            return response;
        });
    }
    _setAuthorizationHeader(request) {
        if (!request.headers) {
            request.headers = {};
        }
        if (this._accessToken) {
            request.headers[HeaderNames.Authorization] = `Bearer ${this._accessToken}`;
        }
        // don't remove the header if there isn't an access token factory, the user manually added the header in this case
        else if (this._accessTokenFactory) {
            if (request.headers[HeaderNames.Authorization]) {
                delete request.headers[HeaderNames.Authorization];
            }
        }
    }
    getCookieString(url) {
        return this._innerClient.getCookieString(url);
    }
}
//# sourceMappingURL=AccessTokenHttpClient.js.map