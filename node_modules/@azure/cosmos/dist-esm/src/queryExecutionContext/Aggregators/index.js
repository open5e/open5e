// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { AverageAggregator } from "./AverageAggregator";
import { CountAggregator } from "./CountAggregator";
import { MaxAggregator } from "./MaxAggregator";
import { MinAggregator } from "./MinAggregator";
import { SumAggregator } from "./SumAggregator";
import { StaticValueAggregator } from "./StaticValueAggregator";
export function createAggregator(aggregateType) {
    switch (aggregateType) {
        case "Average":
            return new AverageAggregator();
        case "Count":
            return new CountAggregator();
        case "Max":
            return new MaxAggregator();
        case "Min":
            return new MinAggregator();
        case "Sum":
            return new SumAggregator();
        default:
            return new StaticValueAggregator();
    }
}
export { AverageAggregator, CountAggregator, MaxAggregator, MinAggregator, SumAggregator };
//# sourceMappingURL=index.js.map