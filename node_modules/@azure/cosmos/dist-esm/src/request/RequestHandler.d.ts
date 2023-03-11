import { RequestContext } from "./RequestContext";
import { Response as CosmosResponse } from "./Response";
/**
 * @hidden
 */
declare function request<T>(requestContext: RequestContext): Promise<CosmosResponse<T>>;
export declare const RequestHandler: {
    request: typeof request;
};
export {};
//# sourceMappingURL=RequestHandler.d.ts.map