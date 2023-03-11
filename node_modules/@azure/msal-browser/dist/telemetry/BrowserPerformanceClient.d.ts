import { Logger, PerformanceEvents, IPerformanceClient, PerformanceClient, IPerformanceMeasurement, InProgressPerformanceEvent, ApplicationTelemetry } from "@azure/msal-common";
import { CryptoOptions } from "../config/Configuration";
export declare class BrowserPerformanceClient extends PerformanceClient implements IPerformanceClient {
    private browserCrypto;
    private guidGenerator;
    constructor(clientId: string, authority: string, logger: Logger, libraryName: string, libraryVersion: string, applicationTelemetry: ApplicationTelemetry, cryptoOptions: CryptoOptions);
    startPerformanceMeasuremeant(measureName: string, correlationId: string): IPerformanceMeasurement;
    generateId(): string;
    private getPageVisibility;
    private deleteIncompleteSubMeasurements;
    supportsBrowserPerformanceNow(): boolean;
    /**
     * Starts measuring performance for a given operation. Returns a function that should be used to end the measurement.
     * Also captures browser page visibilityState.
     *
     * @param {PerformanceEvents} measureName
     * @param {?string} [correlationId]
     * @returns {((event?: Partial<PerformanceEvent>) => PerformanceEvent| null)}
     */
    startMeasurement(measureName: PerformanceEvents, correlationId?: string): InProgressPerformanceEvent;
    /**
     * Adds pre-queue time to preQueueTimeByCorrelationId map.
     * @param {PerformanceEvents} eventName
     * @param {?string} correlationId
     * @returns
     */
    setPreQueueTime(eventName: PerformanceEvents, correlationId?: string): void;
    /**
     * Calculates and adds queue time measurement for given performance event.
     *
     * @param {PerformanceEvents} eventName
     * @param {?string} correlationId
     * @param {?number} queueTime
     * @param {?boolean} manuallyCompleted - indicator for manually completed queue measurements
     * @returns
     */
    addQueueMeasurement(eventName: PerformanceEvents, correlationId?: string, queueTime?: number, manuallyCompleted?: boolean): void;
}
//# sourceMappingURL=BrowserPerformanceClient.d.ts.map