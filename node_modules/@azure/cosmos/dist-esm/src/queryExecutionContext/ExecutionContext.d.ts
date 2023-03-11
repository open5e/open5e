import { Response } from "../request";
/** @hidden */
export interface ExecutionContext {
    nextItem: () => Promise<Response<any>>;
    hasMoreResults: () => boolean;
    fetchMore?: () => Promise<Response<any>>;
}
//# sourceMappingURL=ExecutionContext.d.ts.map