import { DocumentProducer } from "./documentProducer";
import { ExecutionContext } from "./ExecutionContext";
import { ParallelQueryExecutionContextBase } from "./parallelQueryExecutionContextBase";
/**
 * Provides the ParallelQueryExecutionContext.
 * This class is capable of handling parallelized queries and derives from ParallelQueryExecutionContextBase.
 * @hidden
 */
export declare class ParallelQueryExecutionContext extends ParallelQueryExecutionContextBase implements ExecutionContext {
    /**
     * Provides a Comparator for document producers using the min value of the corresponding target partition.
     * @returns Comparator Function
     * @hidden
     */
    documentProducerComparator(docProd1: DocumentProducer, docProd2: DocumentProducer): number;
}
//# sourceMappingURL=parallelQueryExecutionContext.d.ts.map