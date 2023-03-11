import "#internal/nitro/virtual/polyfill";
import type { HandlerResponse, HandlerContext, HandlerEvent } from "@netlify/functions/dist/main";
export declare function lambda(event: HandlerEvent, context: HandlerContext): Promise<HandlerResponse>;
