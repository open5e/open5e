import { H3Event } from "h3";
import type { NitroRouteRules } from "nitropack";
export declare function createRouteRulesHandler(): import("h3").EventHandler<any>;
export declare function getRouteRules(event: H3Event): NitroRouteRules;
export declare function getRouteRulesForPath(path: string): NitroRouteRules;
