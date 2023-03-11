import { ContainerDefinition } from "./ContainerDefinition";
import { PartitionKeyDefinition } from "../../documents";
import { VerboseOmit } from "../../utils/types";
export interface ContainerRequest extends VerboseOmit<ContainerDefinition, "partitionKey"> {
    throughput?: number;
    maxThroughput?: number;
    autoUpgradePolicy?: {
        throughputPolicy: {
            incrementPercent: number;
        };
    };
    partitionKey?: string | PartitionKeyDefinition;
}
//# sourceMappingURL=ContainerRequest.d.ts.map