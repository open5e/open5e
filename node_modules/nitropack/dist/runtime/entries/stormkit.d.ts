import type { Handler } from "aws-lambda";
import "#internal/nitro/virtual/polyfill";
interface StormkitEvent {
    url: string;
    path: string;
    method: string;
    body?: string;
    query?: Record<string, Array<string>>;
    headers?: Record<string, string>;
    rawHeaders?: Array<string>;
}
export interface StormkitResult {
    statusCode: number;
    headers?: {
        [header: string]: boolean | number | string;
    } | undefined;
    body?: string | undefined;
}
export declare const handler: Handler<StormkitEvent, StormkitResult>;
export {};
