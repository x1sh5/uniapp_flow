import { AbortError } from "./Errors";
import { HttpClient, HttpResponse } from "./HttpClient";
import { isArrayBuffer } from "./Utils";

export class UniHttpClient extends HttpClient {
    constructor(logger) {
        super();
        this._logger = logger;
    }
    /** @inheritDoc */
    send(request) {
        // Check that abort was not signaled before calling send
		request.withCredentials = false;
        if (request.abortSignal && request.abortSignal.aborted) {
            return Promise.reject(new AbortError());
        }
        if (!request.method) {
            return Promise.reject(new Error("No method defined."));
        }
        if (!request.url) {
            return Promise.reject(new Error("No url defined."));
        }
        request.headers["X-Requested-With"] = "XMLHttpRequest";
        if (request.content === "") {
            request.content = undefined;
        }
        if (request.content) {
            // Explicitly setting the Content-Type header for React Native on Android platform.
            if (isArrayBuffer(request.content)) {
                request.headers["Content-Type"] = "application/octet-stream";
            }
            else {
                request.headers["Content-Type"] = "text/plain;charset=UTF-8";
            }
        }
        let requstTask = uni.requestWithCookie(request);
        let options = request;
        return new Promise((resolve, reject) => {
            options.success = (response) => {
                let res = new HttpResponse(response.statusCode, response.data, response.headers);
                resolve(res);
            };
            options.fail = (response) => {
                reject(new Error(response === null || response === void 0 ? void 0 : response.errMsg));
            };
            requstTask = uni.requestWithCookie(request);
        });
    }
}
//# sourceMappingURL=UniHttpClient.js.map