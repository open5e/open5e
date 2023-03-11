import { IncomingMessage } from "../node/http/_request";
import { ServerResponse } from "../node/http/_response";
export type Handle = (req: IncomingMessage, res: ServerResponse) => Promise<any>;
export type CallHandle = ReturnType<typeof createCall>;
export interface CallContext {
    [key: string]: any;
    url?: string;
    method?: string;
    headers?: Headers | {
        [key: string]: string | string[];
    };
    protocol?: string;
    body?: any;
}
export declare function createCall(handle: Handle): (context: CallContext) => Promise<{
    body: BodyInit;
    headers: import("../_internal/types").HeadersObject;
    status: number;
    statusText: string;
}>;
