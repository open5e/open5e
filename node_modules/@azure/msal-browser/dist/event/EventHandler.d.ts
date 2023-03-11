import { ICrypto, Logger } from "@azure/msal-common";
import { InteractionType } from "../utils/BrowserConstants";
import { EventCallbackFunction, EventError, EventPayload } from "./EventMessage";
import { EventType } from "./EventType";
export declare class EventHandler {
    private eventCallbacks;
    private logger;
    private browserCrypto;
    private listeningToStorageEvents;
    constructor(logger: Logger, browserCrypto: ICrypto);
    /**
     * Adds event callbacks to array
     * @param callback
     */
    addEventCallback(callback: EventCallbackFunction): string | null;
    /**
     * Removes callback with provided id from callback array
     * @param callbackId
     */
    removeEventCallback(callbackId: string): void;
    /**
     * Adds event listener that emits an event when a user account is added or removed from localstorage in a different browser tab or window
     */
    enableAccountStorageEvents(): void;
    /**
     * Removes event listener that emits an event when a user account is added or removed from localstorage in a different browser tab or window
     */
    disableAccountStorageEvents(): void;
    /**
     * Emits events by calling callback with event message
     * @param eventType
     * @param interactionType
     * @param payload
     * @param error
     */
    emitEvent(eventType: EventType, interactionType?: InteractionType, payload?: EventPayload, error?: EventError): void;
    /**
     * Emit account added/removed events when cached accounts are changed in a different tab or frame
     */
    private handleAccountCacheChange;
}
//# sourceMappingURL=EventHandler.d.ts.map