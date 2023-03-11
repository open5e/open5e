export declare type PatchOperation = ExistingKeyOperation | RemoveOperation;
export declare const PatchOperationType: {
    readonly add: "add";
    readonly replace: "replace";
    readonly remove: "remove";
    readonly set: "set";
    readonly incr: "incr";
};
export declare type ExistingKeyOperation = {
    op: keyof typeof PatchOperationType;
    value: any;
    path: string;
};
export declare type RemoveOperation = {
    op: "remove";
    path: string;
};
export declare type PatchRequestBody = {
    operations: PatchOperation[];
    condition?: string;
} | PatchOperation[];
//# sourceMappingURL=patch.d.ts.map