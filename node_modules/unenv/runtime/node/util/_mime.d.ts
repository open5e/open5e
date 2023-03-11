/// <reference types="node" />
import type { MIMEType as MIMETypeT, MIMEParams as MIMEParamsT } from "node:util";
export declare class MIMEType implements MIMETypeT {
    params: MIMEParams;
    type: string;
    subtype: string;
    constructor(input: string | {
        toString: () => string;
    });
    get essence(): string;
    toString(): string;
}
export declare class MIMEParams extends Map<string, string> implements MIMEParamsT {
    get(name: string): any;
    toString(): string;
}
