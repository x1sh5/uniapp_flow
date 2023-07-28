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
import { LogLevel } from "./ILogger";
import { TransferFormat } from "./ITransport";
import { Arg, getDataDetail, getUserAgentHeader, Platform } from "./Utils";
/** @private */
export class SocketTaskTransport {
    constructor(httpClient, accessTokenFactory, logger, logMessageContent, socketTaskConstructor, headers) {
        this._logger = logger;
        this._accessTokenFactory = accessTokenFactory;
        this._logMessageContent = logMessageContent;
        this._socketTaskConstructor = socketTaskConstructor;
        this._httpClient = httpClient;
        this.onreceive = null;
        this.onclose = null;
        this._headers = headers;
        this._headers["Host"];
    }
    connect(url, transferFormat) {
        return __awaiter(this, void 0, void 0, function* () {
            Arg.isRequired(url, "url");
            Arg.isRequired(transferFormat, "transferFormat");
            Arg.isIn(transferFormat, TransferFormat, "transferFormat");
            this._logger.log(LogLevel.Trace, "(SocketTasks transport) Connecting.");
            let token;
            if (this._accessTokenFactory) {
                token = yield this._accessTokenFactory();
            }
            return new Promise((resolve, reject) => {
                url = url.replace(/^http/, "ws");
                let socketTask;
                const cookies = this._httpClient.getCookieString(url);
                let opened = false;
                if (Platform.isNode || Platform.isReactNative) {
                    const headers = {};
                    const [name, value] = getUserAgentHeader();
                    headers[name] = value;
                    if (token) {
                        headers[HeaderNames.Authorization] = `Bearer ${token}`;
                    }
                    if (cookies) {
                        headers[HeaderNames.Cookie] = cookies;
                    }
                    // Only pass headers when in non-browser environments
                    socketTask = this._socketTaskConstructor.connectSocket({ url: url, header: headers });
                }
                else {
                    if (token) {
                        url += (url.indexOf("?") < 0 ? "?" : "&") + `access_token=${encodeURIComponent(token)}`;
                    }
                }
                // if (!socketTask) {
                //     // Chrome is not happy with passing 'undefined' as protocol
                //     socketTask = new this._socketTaskConstructor(url);
                // }
                // if (transferFormat === TransferFormat.Binary) {
                //     socketTask.binaryType = "arraybuffer";
                // }
                socketTask.onOpen((result) => {
                    this._logger.log(LogLevel.Information, `SocketTask connected to ${url}.`);
                    this._socketTask = socketTask;
                    opened = true;
                    resolve(result.header);
                });
                socketTask.onError((result) => {
                    let error = null;
                    // ErrorEvent is a browser only type we need to check if the type exists before using it
                    // if (typeof ErrorEvent !== "undefined" && event instanceof ErrorEvent) {
                    //     error = event.error;
                    // } else {
                    //     error = "There was an error with the transport";
                    // }
                    error = result.errMsg;
                    this._logger.log(LogLevel.Information, `(SocketTasks transport) ${error}.`);
                });
                socketTask.onMessage((message) => {
                    this._logger.log(LogLevel.Trace, `(SocketTasks transport) data received. ${getDataDetail(message.data, this._logMessageContent)}.`);
                    if (this.onreceive) {
                        try {
                            const data = message.data || '';
                            this.onreceive(data);
                        }
                        catch (error) {
                            this._close(error);
                            return;
                        }
                    }
                });
                socketTask.onClose(() => {
                    // Don't call close handler if connection was never established
                    // We'll reject the connect call instead
                    let result = new CloseEvent("SocketTask closed", { code: 1006, reason: "SocketTask disconnected" });
                    if (opened) {
                        this._close(result);
                    }
                    else {
                        let error = null;
                        // ErrorEvent is a browser only type we need to check if the type exists before using it
                        if (typeof ErrorEvent !== "undefined" && result instanceof ErrorEvent) {
                            error = result.error;
                        }
                        else {
                            error = "SocketTask failed to connect. The connection could not be found on the server,"
                                + " either the endpoint may not be a SignalR endpoint,"
                                + " the connection ID is not present on the server, or there is a proxy blocking SocketTasks."
                                + " If you have multiple servers check that sticky sessions are enabled.";
                        }
                        reject(new Error(error));
                    }
                });
            });
        });
    }
    send(data) {
        if (this._socketTask && this._socketTask.readyState === this._socketTaskConstructor.OPEN) {
            this._logger.log(LogLevel.Trace, `(SocketTasks transport) sending data. ${getDataDetail(data, this._logMessageContent)}.`);
            this._socketTask.send(data);
            return Promise.resolve();
        }
        return Promise.reject("SocketTask is not in the OPEN state");
    }
    stop() {
        if (this._socketTask) {
            // Manually invoke onclose callback inline so we know the HttpConnection was closed properly before returning
            // This also solves an issue where websocket.onclose could take 18+ seconds to trigger during network disconnects
            this._close(undefined);
        }
        return Promise.resolve();
    }
    _close(event) {
        // socketTask will be null if the transport did not start successfully
        if (this._socketTask) {
            // Clear websocket handlers because we are considering the socket closed now
            this._socketTask.onClose = () => { };
            this._socketTask.onMessage = () => { };
            this._socketTask.onError = () => { };
            this._socketTask.close({});
            this._socketTask = undefined;
        }
        this._logger.log(LogLevel.Trace, "(SocketTasks transport) socket closed.");
        if (this.onclose) {
            if (this._isCloseEvent(event) && (event.wasClean === false || event.code !== 1000)) {
                this.onclose(new Error(`SocketTask closed with status code: ${event.code} (${event.reason || "no reason given"}).`));
            }
            else if (event instanceof Error) {
                this.onclose(event);
            }
            else {
                this.onclose();
            }
        }
    }
    _isCloseEvent(event) {
        return event && typeof event.wasClean === "boolean" && typeof event.code === "number";
    }
}
//# sourceMappingURL=WebSocketTransport.js.map