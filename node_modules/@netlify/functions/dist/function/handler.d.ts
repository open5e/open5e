import type { Context } from './context.js';
import type { Event } from './event.js';
import type { Response, BuilderResponse } from './response.js';
export interface HandlerCallback<ResponseType extends Response = Response> {
    (error: any, response: ResponseType): void;
}
export interface BaseHandler<ResponseType extends Response = Response, C extends Context = Context> {
    (event: Event, context: C, callback?: HandlerCallback<ResponseType>): void | Promise<ResponseType>;
}
export interface BackgroundHandler<C extends Context = Context> {
    (event: Event, context: C): void | Promise<void>;
}
export type Handler = BaseHandler<Response, Context>;
export type BuilderHandler = BaseHandler<BuilderResponse, Context>;
