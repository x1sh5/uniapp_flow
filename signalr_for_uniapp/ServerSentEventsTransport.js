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
import { LogLevel } from "./ILogger";
import { TransferFormat } from "./ITransport";
import { Arg, getDataDetail, getUserAgentHeader, Platform, sendMessage } from "./Utils";
/** @private */
export class ServerSentEventsTransport {
    constructor(httpClient, accessToken, logger, options) {
        this._httpClient = httpClient;
        this._accessToken = accessToken;
        this._logger = logger;
        this._options = options;
        this.onreceive = null;
        this.onclose = null;
    }
    connect(url, transferFormat) {
        return __awaiter(this, void 0, void 0, function* () {
            Arg.isRequired(url, "url");
            Arg.isRequired(transferFormat, "transferFormat");
            Arg.isIn(transferFormat, TransferFormat, "transferFormat");
            this._logger.log(LogLevel.Trace, "(SSE transport) Connecting.");
            // set url before accessTokenFactory because this._url is only for send and we set the auth header instead of the query string for send
            this._url = url;
            if (this._accessToken) {
                url += (url.indexOf("?") < 0 ? "?" : "&") + `access_token=${encodeURIComponent(this._accessToken)}`;
            }
            return new Promise((resolve, reject) => {
                let opened = false;
                if (transferFormat !== TransferFormat.Text) {
                    reject(new Error("The Server-Sent Events transport only supports the 'Text' transfer format"));
                    return;
                }
                let eventSource;
                if (Platform.isBrowser || Platform.isWebWorker) {
                    eventSource = new this._options.EventSource(url, { withCredentials: this._options.withCredentials });
                }
                else {
                    // Non-browser passes cookies via the dictionary
                    const cookies = this._httpClient.getCookieString(url);
                    const headers = {};
                    headers.Cookie = cookies;
                    const [name, value] = getUserAgentHeader();
                    headers[name] = value;
                    eventSource = new this._options.EventSource(url, { withCredentials: this._options.withCredentials, headers: Object.assign(Object.assign({}, headers), this._options.headers) });
                }
                try {
                    eventSource.onmessage = (e) => {
                        if (this.onreceive) {
                            try {
                                this._logger.log(LogLevel.Trace, `(SSE transport) data received. ${getDataDetail(e.data, this._options.logMessageContent)}.`);
                                this.onreceive(e.data);
                            }
                            catch (error) {
                                if (error instanceof Error) {
                                    this._close(error);
                                }
                                else {
                                    this._close(new Error("An unknown error occurred."));
                                }
                                return;
                            }
                        }
                    };
                    // @ts-ignore: not using event on purpose
                    eventSource.onerror = (e) => {
                        // EventSource doesn't give any useful information about server side closes.
                        if (opened) {
                            this._close();
                        }
                        else {
                            reject(new Error("EventSource failed to connect. The connection could not be found on the server,"
                                + " either the connection ID is not present on the server, or a proxy is refusing/buffering the connection."
                                + " If you have multiple servers check that sticky sessions are enabled."));
                        }
                    };
                    eventSource.onopen = () => {
                        this._logger.log(LogLevel.Information, `SSE connected to ${this._url}`);
                        this._eventSource = eventSource;
                        opened = true;
                        resolve();
                    };
                }
                catch (e) {
                    reject(e);
                    return;
                }
            });
        });
    }
    send(data) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this._eventSource) {
                return Promise.reject(new Error("Cannot send until the transport is connected"));
            }
            return sendMessage(this._logger, "SSE", this._httpClient, this._url, data, this._options);
        });
    }
    stop() {
        this._close();
        return Promise.resolve();
    }
    _close(e) {
        if (this._eventSource) {
            this._eventSource.close();
            this._eventSource = undefined;
            if (this.onclose) {
                this.onclose(e);
            }
        }
    }
}
//# sourceMappingURL=ServerSentEventsTransport.js.map