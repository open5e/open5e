import { CosmosHeaders } from "../index";
/**
 * @hidden
 */
export interface Response<T> {
    headers: CosmosHeaders;
    result?: T;
    code?: number;
    substatus?: number;
}
//# sourceMappingURL=Response.d.ts.map