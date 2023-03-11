import { CosmosHeaders } from "../queryExecutionContext";
import { SessionContext } from "./SessionContext";
import { VectorSessionToken } from "./VectorSessionToken";
/** @hidden */
export declare class SessionContainer {
    private collectionNameToCollectionResourceId;
    private collectionResourceIdToSessionTokens;
    private static readonly EMPTY_SESSION_TOKEN;
    private static readonly SESSION_TOKEN_SEPARATOR;
    private static readonly SESSION_TOKEN_PARTITION_SPLITTER;
    constructor(collectionNameToCollectionResourceId?: Map<string, string>, collectionResourceIdToSessionTokens?: Map<string, Map<string, VectorSessionToken>>);
    get(request: SessionContext): string;
    remove(request: SessionContext): void;
    set(request: SessionContext, resHeaders: CosmosHeaders): void;
    private validateOwnerID;
    private getPartitionKeyRangeIdToTokenMap;
    private static getCombinedSessionTokenString;
    private static compareAndSetToken;
    private static isReadingFromMaster;
    private getContainerName;
}
//# sourceMappingURL=sessionContainer.d.ts.map