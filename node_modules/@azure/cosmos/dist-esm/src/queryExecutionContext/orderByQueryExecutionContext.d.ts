import { ClientContext } from "../ClientContext";
import { PartitionedQueryExecutionInfo } from "../request/ErrorResponse";
import { FeedOptions } from "../request/FeedOptions";
import { DocumentProducer } from "./documentProducer";
import { ExecutionContext } from "./ExecutionContext";
import { ParallelQueryExecutionContextBase } from "./parallelQueryExecutionContextBase";
import { SqlQuerySpec } from "./SqlQuerySpec";
/** @hidden */
export declare class OrderByQueryExecutionContext extends ParallelQueryExecutionContextBase implements ExecutionContext {
    private orderByComparator;
    /**
     * Provides the OrderByQueryExecutionContext.
     * This class is capable of handling orderby queries and dervives from ParallelQueryExecutionContextBase.
     *
     * When handling a parallelized query, it instantiates one instance of
     * DocumentProcuder per target partition key range and aggregates the result of each.
     *
     * @param clientContext - The service endpoint to use to create the client.
     * @param collectionLink - The Collection Link
     * @param options - Represents the feed options.
     * @param partitionedQueryExecutionInfo - PartitionedQueryExecutionInfo
     * @hidden
     */
    constructor(clientContext: ClientContext, collectionLink: string, query: string | SqlQuerySpec, options: FeedOptions, partitionedQueryExecutionInfo: PartitionedQueryExecutionInfo);
    /**
     * Provides a Comparator for document producers which respects orderby sort order.
     * @returns Comparator Function
     * @hidden
     */
    documentProducerComparator(docProd1: DocumentProducer, docProd2: DocumentProducer): any;
}
//# sourceMappingURL=orderByQueryExecutionContext.d.ts.map