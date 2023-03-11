import { Context as HandlerContext, Context } from '../function/context.js';
import { Event as HandlerEvent } from '../function/event.js';
import { BaseHandler, HandlerCallback } from '../function/handler.js';
import { Response } from '../function/response.js';
import { NetlifySecrets } from './secrets_helper.js';
export { getSecrets, getSecretsForBuild } from './secrets_helper.js';
export { getNetlifyGraphToken, getNetlifyGraphTokenForBuild, GraphTokenResponse, HasHeaders } from './graph_token.js';
export interface ContextWithSecrets extends Context {
    secrets: NetlifySecrets;
}
export type HandlerWithSecrets = BaseHandler<Response, ContextWithSecrets>;
export declare const withSecrets: (handler: BaseHandler<Response, ContextWithSecrets>) => (event: HandlerEvent, context: HandlerContext, callback: HandlerCallback<Response>) => Promise<void | Response>;
