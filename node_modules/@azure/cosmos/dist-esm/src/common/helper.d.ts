import { CosmosClientOptions } from "../CosmosClientOptions";
import { OperationType, ResourceType } from "./constants";
/** @hidden */
export declare function jsonStringifyAndEscapeNonASCII(arg: unknown): string;
/**
 * @hidden
 */
export declare function parseLink(resourcePath: string): {
    type: ResourceType;
    objectBody: {
        id: string;
        self: string;
    };
};
/**
 * @hidden
 */
export declare function isReadRequest(operationType: OperationType): boolean;
/**
 * @hidden
 */
export declare function sleep(time: number): Promise<void>;
/**
 * @hidden
 */
export declare function getContainerLink(link: string): string;
/**
 * @hidden
 */
export declare function trimSlashes(source: string): string;
/**
 * @hidden
 */
export declare function getHexaDigit(): string;
/**
 * @hidden
 */
export declare function parsePath(path: string): string[];
/**
 * @hidden
 */
export declare function isResourceValid(resource: {
    id?: string;
}, err: {
    message?: string;
}): boolean;
/**
 * @hidden
 */
export declare function isItemResourceValid(resource: {
    id?: string;
}, err: {
    message?: string;
}): boolean;
/** @hidden */
export declare function getIdFromLink(resourceLink: string): string;
/** @hidden */
export declare function getPathFromLink(resourceLink: string, resourceType?: string): string;
/**
 * @hidden
 */
export declare function isStringNullOrEmpty(inputString: string): boolean;
/**
 * @hidden
 */
export declare function trimSlashFromLeftAndRight(inputString: string): string;
/**
 * @hidden
 */
export declare function validateResourceId(resourceId: string): boolean;
/**
 * @hidden
 */
export declare function validateItemResourceId(resourceId: string): boolean;
/**
 * @hidden
 */
export declare function getResourceIdFromPath(resourcePath: string): string;
/**
 * @hidden
 */
export declare function parseConnectionString(connectionString: string): CosmosClientOptions;
//# sourceMappingURL=helper.d.ts.map