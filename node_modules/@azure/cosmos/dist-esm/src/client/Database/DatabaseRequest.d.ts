import { DatabaseDefinition } from "./DatabaseDefinition";
export interface DatabaseRequest extends DatabaseDefinition {
    /** Throughput for this database. */
    throughput?: number;
    maxThroughput?: number;
    autoUpgradePolicy?: {
        throughputPolicy: {
            incrementPercent: number;
        };
    };
}
//# sourceMappingURL=DatabaseRequest.d.ts.map