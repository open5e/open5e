import { AuthenticationResult, AuthError, AccountInfo } from "@azure/msal-common";
import { EventType } from "./EventType";
import { InteractionStatus, InteractionType } from "../utils/BrowserConstants";
import { PopupRequest, RedirectRequest, SilentRequest, SsoSilentRequest, EndSessionRequest } from "..";
export declare type EventMessage = {
    eventType: EventType;
    interactionType: InteractionType | null;
    payload: EventPayload;
    error: EventError;
    timestamp: number;
};
export declare type PopupEvent = {
    popupWindow: Window;
};
export declare type EventPayload = AccountInfo | PopupRequest | RedirectRequest | SilentRequest | SsoSilentRequest | EndSessionRequest | AuthenticationResult | PopupEvent | null;
export declare type EventError = AuthError | Error | null;
export declare type EventCallbackFunction = (message: EventMessage) => void;
export declare class EventMessageUtils {
    /**
     * Gets interaction status from event message
     * @param message
     * @param currentStatus
     */
    static getInteractionStatusFromEvent(message: EventMessage, currentStatus?: InteractionStatus): InteractionStatus | null;
}
//# sourceMappingURL=EventMessage.d.ts.map