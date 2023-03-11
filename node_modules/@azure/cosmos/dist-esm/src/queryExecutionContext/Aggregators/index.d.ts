import { AverageAggregator } from "./AverageAggregator";
import { CountAggregator } from "./CountAggregator";
import { MaxAggregator } from "./MaxAggregator";
import { MinAggregator } from "./MinAggregator";
import { SumAggregator } from "./SumAggregator";
import { StaticValueAggregator } from "./StaticValueAggregator";
import { AggregateType } from "../../request/ErrorResponse";
export declare function createAggregator(aggregateType: AggregateType): AverageAggregator | CountAggregator | MaxAggregator | MinAggregator | SumAggregator | StaticValueAggregator;
export { AverageAggregator, CountAggregator, MaxAggregator, MinAggregator, SumAggregator };
export { Aggregator } from "./Aggregator";
//# sourceMappingURL=index.d.ts.map