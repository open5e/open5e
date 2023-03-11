/// <reference types="node" />
import type * as stream from "node:stream";
type DuplexClass = new () => stream.Duplex;
export declare const Duplex: DuplexClass;
export {};
