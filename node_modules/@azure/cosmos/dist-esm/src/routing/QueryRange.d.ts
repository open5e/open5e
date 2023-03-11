import { PartitionKeyRange } from "../client/Container/PartitionKeyRange";
import { QueryRange as ResponseQueryRange } from "../request/ErrorResponse";
/** @hidden */
export declare class QueryRange {
    min: string;
    max: string;
    isMinInclusive: boolean;
    isMaxInclusive: boolean;
    /**
     * Represents a QueryRange.
     *
     * @param rangeMin                - min
     * @param rangeMin                - max
     * @param isMinInclusive         - isMinInclusive
     * @param isMaxInclusive         - isMaxInclusive
     * @hidden
     */
    constructor(rangeMin: string, rangeMax: string, isMinInclusive: boolean, isMaxInclusive: boolean);
    overlaps(other: QueryRange): boolean;
    isFullRange(): boolean;
    isEmpty(): boolean;
    /**
     * Parse a QueryRange from a partitionKeyRange
     * @returns QueryRange
     * @hidden
     */
    static parsePartitionKeyRange(partitionKeyRange: PartitionKeyRange): QueryRange;
    /**
     * Parse a QueryRange from a dictionary
     * @returns QueryRange
     * @hidden
     */
    static parseFromDict(queryRangeDict: ResponseQueryRange): QueryRange;
}
//# sourceMappingURL=QueryRange.d.ts.map