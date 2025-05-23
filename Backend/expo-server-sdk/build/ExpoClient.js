"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Expo = void 0;
/**
 * expo-server-sdk
 *
 * Use this if you are running Node on your server backend when you are working with Expo
 * https://expo.io
 */
const assert_1 = __importDefault(require("assert"));
const node_fetch_1 = __importStar(require("node-fetch"));
const promise_limit_1 = __importDefault(require("promise-limit"));
const promise_retry_1 = __importDefault(require("promise-retry"));
const zlib_1 = __importDefault(require("zlib"));
const ExpoClientValues_1 = require("./ExpoClientValues");
const BASE_URL = 'https://exp.host';
const BASE_API_URL = `${BASE_URL}/--/api/v2`;
/**
 * The max number of push notifications to be sent at once. Since we can't automatically upgrade
 * everyone using this library, we should strongly try not to decrease it.
 */
const PUSH_NOTIFICATION_CHUNK_LIMIT = 100;
/**
 * The max number of push notification receipts to request at once.
 */
const PUSH_NOTIFICATION_RECEIPT_CHUNK_LIMIT = 300;
/**
 * The default max number of concurrent HTTP requests to send at once and spread out the load,
 * increasing the reliability of notification delivery.
 */
const DEFAULT_CONCURRENT_REQUEST_LIMIT = 6;
class Expo {
    constructor(options = {}) {
        this.httpAgent = options.httpAgent;
        this.limitConcurrentRequests = promise_limit_1.default(options.maxConcurrentRequests != null
            ? options.maxConcurrentRequests
            : DEFAULT_CONCURRENT_REQUEST_LIMIT);
        this.accessToken = options.accessToken;
        this.useFcmV1 = options.useFcmV1;
    }
    /**
     * Returns `true` if the token is an Expo push token
     */
    static isExpoPushToken(token) {
        return (typeof token === 'string' &&
            (((token.startsWith('ExponentPushToken[') || token.startsWith('ExpoPushToken[')) &&
                token.endsWith(']')) ||
                /^[a-z\d]{8}-[a-z\d]{4}-[a-z\d]{4}-[a-z\d]{4}-[a-z\d]{12}$/i.test(token)));
    }
    /**
     * Sends the given messages to their recipients via push notifications and returns an array of
     * push tickets. Each ticket corresponds to the message at its respective index (the nth receipt
     * is for the nth message) and contains a receipt ID. Later, after Expo attempts to deliver the
     * messages to the underlying push notification services, the receipts with those IDs will be
     * available for a period of time (approximately a day).
     *
     * There is a limit on the number of push notifications you can send at once. Use
     * `chunkPushNotifications` to divide an array of push notification messages into appropriately
     * sized chunks.
     */
    sendPushNotificationsAsync(messages) {
        return __awaiter(this, void 0, void 0, function* () {
            // @ts-expect-error We don't yet have type declarations for URL
            const url = new URL(`${BASE_API_URL}/push/send`);
            if (typeof this.useFcmV1 === 'boolean') {
                url.searchParams.append('useFcmV1', this.useFcmV1);
            }
            const actualMessagesCount = Expo._getActualMessageCount(messages);
            const data = yield this.limitConcurrentRequests(() => __awaiter(this, void 0, void 0, function* () {
                return yield promise_retry_1.default((retry) => __awaiter(this, void 0, void 0, function* () {
                    try {
                        return yield this.requestAsync(url.toString(), {
                            httpMethod: 'post',
                            body: messages,
                            shouldCompress(body) {
                                return body.length > 1024;
                            },
                        });
                    }
                    catch (e) {
                        // if Expo servers rate limit, retry with exponential backoff
                        if (e.statusCode === 429) {
                            return retry(e);
                        }
                        throw e;
                    }
                }), {
                    retries: 2,
                    factor: 2,
                    minTimeout: ExpoClientValues_1.requestRetryMinTimeout,
                });
            }));
            if (!Array.isArray(data) || data.length !== actualMessagesCount) {
                const apiError = new Error(`Expected Expo to respond with ${actualMessagesCount} ${actualMessagesCount === 1 ? 'ticket' : 'tickets'} but got ${data.length}`);
                apiError.data = data;
                throw apiError;
            }
            return data;
        });
    }
    getPushNotificationReceiptsAsync(receiptIds) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.requestAsync(`${BASE_API_URL}/push/getReceipts`, {
                httpMethod: 'post',
                body: { ids: receiptIds },
                shouldCompress(body) {
                    return body.length > 1024;
                },
            });
            if (!data || typeof data !== 'object' || Array.isArray(data)) {
                const apiError = new Error(`Expected Expo to respond with a map from receipt IDs to receipts but received data of another type`);
                apiError.data = data;
                throw apiError;
            }
            return data;
        });
    }
    chunkPushNotifications(messages) {
        const chunks = [];
        let chunk = [];
        let chunkMessagesCount = 0;
        for (const message of messages) {
            if (Array.isArray(message.to)) {
                let partialTo = [];
                for (const recipient of message.to) {
                    partialTo.push(recipient);
                    chunkMessagesCount++;
                    if (chunkMessagesCount >= PUSH_NOTIFICATION_CHUNK_LIMIT) {
                        // Cap this chunk here if it already exceeds PUSH_NOTIFICATION_CHUNK_LIMIT.
                        // Then create a new chunk to continue on the remaining recipients for this message.
                        chunk.push(Object.assign(Object.assign({}, message), { to: partialTo }));
                        chunks.push(chunk);
                        chunk = [];
                        chunkMessagesCount = 0;
                        partialTo = [];
                    }
                }
                if (partialTo.length) {
                    // Add remaining `partialTo` to the chunk.
                    chunk.push(Object.assign(Object.assign({}, message), { to: partialTo }));
                }
            }
            else {
                chunk.push(message);
                chunkMessagesCount++;
            }
            if (chunkMessagesCount >= PUSH_NOTIFICATION_CHUNK_LIMIT) {
                // Cap this chunk if it exceeds PUSH_NOTIFICATION_CHUNK_LIMIT.
                // Then create a new chunk to continue on the remaining messages.
                chunks.push(chunk);
                chunk = [];
                chunkMessagesCount = 0;
            }
        }
        if (chunkMessagesCount) {
            // Add the remaining chunk to the chunks.
            chunks.push(chunk);
        }
        return chunks;
    }
    chunkPushNotificationReceiptIds(receiptIds) {
        return this.chunkItems(receiptIds, PUSH_NOTIFICATION_RECEIPT_CHUNK_LIMIT);
    }
    chunkItems(items, chunkSize) {
        const chunks = [];
        let chunk = [];
        for (const item of items) {
            chunk.push(item);
            if (chunk.length >= chunkSize) {
                chunks.push(chunk);
                chunk = [];
            }
        }
        if (chunk.length) {
            chunks.push(chunk);
        }
        return chunks;
    }
    requestAsync(url, options) {
        return __awaiter(this, void 0, void 0, function* () {
            let requestBody;
            const sdkVersion = require('../package.json').version;
            const requestHeaders = new node_fetch_1.Headers({
                Accept: 'application/json',
                'Accept-Encoding': 'gzip, deflate',
                'User-Agent': `expo-server-sdk-node/${sdkVersion}`,
            });
            if (this.accessToken) {
                requestHeaders.set('Authorization', `Bearer ${this.accessToken}`);
            }
            if (options.body != null) {
                const json = JSON.stringify(options.body);
                assert_1.default(json != null, `JSON request body must not be null`);
                if (options.shouldCompress(json)) {
                    requestBody = yield gzipAsync(Buffer.from(json));
                    requestHeaders.set('Content-Encoding', 'gzip');
                }
                else {
                    requestBody = json;
                }
                requestHeaders.set('Content-Type', 'application/json');
            }
            const response = yield node_fetch_1.default(url, {
                method: options.httpMethod,
                body: requestBody,
                headers: requestHeaders,
                agent: this.httpAgent,
            });
            if (response.status !== 200) {
                const apiError = yield this.parseErrorResponseAsync(response);
                throw apiError;
            }
            const textBody = yield response.text();
            // We expect the API response body to be JSON
            let result;
            try {
                result = JSON.parse(textBody);
            }
            catch (e) {
                const apiError = yield this.getTextResponseErrorAsync(response, textBody);
                throw apiError;
            }
            if (result.errors) {
                const apiError = this.getErrorFromResult(response, result);
                throw apiError;
            }
            return result.data;
        });
    }
    parseErrorResponseAsync(response) {
        return __awaiter(this, void 0, void 0, function* () {
            const textBody = yield response.text();
            let result;
            try {
                result = JSON.parse(textBody);
            }
            catch (e) {
                return yield this.getTextResponseErrorAsync(response, textBody);
            }
            if (!result.errors || !Array.isArray(result.errors) || !result.errors.length) {
                const apiError = yield this.getTextResponseErrorAsync(response, textBody);
                apiError.errorData = result;
                return apiError;
            }
            return this.getErrorFromResult(response, result);
        });
    }
    getTextResponseErrorAsync(response, text) {
        return __awaiter(this, void 0, void 0, function* () {
            const apiError = new Error(`Expo responded with an error with status code ${response.status}: ` + text);
            apiError.statusCode = response.status;
            apiError.errorText = text;
            return apiError;
        });
    }
    /**
     * Returns an error for the first API error in the result, with an optional `others` field that
     * contains any other errors.
     */
    getErrorFromResult(response, result) {
        assert_1.default(result.errors && result.errors.length > 0, `Expected at least one error from Expo`);
        const [errorData, ...otherErrorData] = result.errors;
        const error = this.getErrorFromResultError(errorData);
        if (otherErrorData.length) {
            error.others = otherErrorData.map((data) => this.getErrorFromResultError(data));
        }
        error.statusCode = response.status;
        return error;
    }
    /**
     * Returns an error for a single API error
     */
    getErrorFromResultError(errorData) {
        const error = new Error(errorData.message);
        error.code = errorData.code;
        if (errorData.details != null) {
            error.details = errorData.details;
        }
        if (errorData.stack != null) {
            error.serverStack = errorData.stack;
        }
        return error;
    }
    static _getActualMessageCount(messages) {
        return messages.reduce((total, message) => {
            if (Array.isArray(message.to)) {
                total += message.to.length;
            }
            else {
                total++;
            }
            return total;
        }, 0);
    }
}
exports.Expo = Expo;
Expo.pushNotificationChunkSizeLimit = PUSH_NOTIFICATION_CHUNK_LIMIT;
Expo.pushNotificationReceiptChunkSizeLimit = PUSH_NOTIFICATION_RECEIPT_CHUNK_LIMIT;
exports.default = Expo;
function gzipAsync(data) {
    return new Promise((resolve, reject) => {
        zlib_1.default.gzip(data, (error, result) => {
            if (error) {
                reject(error);
            }
            else {
                resolve(result);
            }
        });
    });
}
class ExtensibleError extends Error {
}
//# sourceMappingURL=ExpoClient.js.map