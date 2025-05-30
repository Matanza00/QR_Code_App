/// <reference types="node" />
import { Agent } from 'http';
export declare class Expo {
    static pushNotificationChunkSizeLimit: number;
    static pushNotificationReceiptChunkSizeLimit: number;
    private httpAgent;
    private limitConcurrentRequests;
    private accessToken;
    private useFcmV1;
    constructor(options?: ExpoClientOptions);
    /**
     * Returns `true` if the token is an Expo push token
     */
    static isExpoPushToken(token: unknown): token is ExpoPushToken;
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
    sendPushNotificationsAsync(messages: ExpoPushMessage[]): Promise<ExpoPushTicket[]>;
    getPushNotificationReceiptsAsync(receiptIds: ExpoPushReceiptId[]): Promise<{
        [id: string]: ExpoPushReceipt;
    }>;
    chunkPushNotifications(messages: ExpoPushMessage[]): ExpoPushMessage[][];
    chunkPushNotificationReceiptIds(receiptIds: ExpoPushReceiptId[]): ExpoPushReceiptId[][];
    private chunkItems;
    private requestAsync;
    private parseErrorResponseAsync;
    private getTextResponseErrorAsync;
    /**
     * Returns an error for the first API error in the result, with an optional `others` field that
     * contains any other errors.
     */
    private getErrorFromResult;
    /**
     * Returns an error for a single API error
     */
    private getErrorFromResultError;
    static _getActualMessageCount(messages: ExpoPushMessage[]): number;
}
export default Expo;
export declare type ExpoClientOptions = {
    httpAgent?: Agent;
    maxConcurrentRequests?: number;
    accessToken?: string;
    useFcmV1?: boolean;
};
export declare type ExpoPushToken = string;
export declare type ExpoPushMessage = {
    to: ExpoPushToken | ExpoPushToken[];
    data?: object;
    title?: string;
    subtitle?: string;
    body?: string;
    sound?: 'default' | null | {
        critical?: boolean;
        name?: 'default' | null;
        volume?: number;
    };
    ttl?: number;
    expiration?: number;
    priority?: 'default' | 'normal' | 'high';
    badge?: number;
    channelId?: string;
    categoryId?: string;
    mutableContent?: boolean;
};
export declare type ExpoPushReceiptId = string;
export declare type ExpoPushSuccessTicket = {
    status: 'ok';
    id: ExpoPushReceiptId;
};
export declare type ExpoPushErrorTicket = ExpoPushErrorReceipt;
export declare type ExpoPushTicket = ExpoPushSuccessTicket | ExpoPushErrorTicket;
export declare type ExpoPushSuccessReceipt = {
    status: 'ok';
    details?: object;
    __debug?: any;
};
export declare type ExpoPushErrorReceipt = {
    status: 'error';
    message: string;
    details?: {
        error?: 'DeveloperError' | 'DeviceNotRegistered' | 'ExpoError' | 'InvalidCredentials' | 'MessageRateExceeded' | 'MessageTooBig' | 'ProviderError';
    };
    __debug?: any;
};
export declare type ExpoPushReceipt = ExpoPushSuccessReceipt | ExpoPushErrorReceipt;
