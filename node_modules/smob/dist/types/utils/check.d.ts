export declare function isObject(item: unknown): item is Record<string, any>;
export declare function isObjectDeeperThan(value: unknown, depth: number): boolean;
export declare function isSafeObject(object: Record<string, any>): boolean;
export declare function isSafeKey(key: string): boolean;
