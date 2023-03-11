/// <reference types="node" />
/// <reference types="node" />
import type * as stream from "node:stream";
import { Duplex } from "./duplex";
export declare class Transform extends Duplex implements stream.Transform {
    _transform(chunk: any, encoding: globalThis.BufferEncoding, callback: stream.TransformCallback): void;
    _flush(callback: stream.TransformCallback): void;
}
