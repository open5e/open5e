export declare type MergerResult<A, B> = A extends B ? B extends A ? (A extends {} ? B : A) : (A & B) : (A & B);
export declare type Merger = <A extends Record<string, any>, B extends Record<string, any>>(target: A, ...sources: B[]) => MergerResult<A, B>;
export declare type Options = {
    array: boolean;
    arrayDistinct: boolean;
    strategy?: (target: Record<string, any>, key: string, value: unknown) => Record<string, any> | undefined;
    priority: 'left' | 'right';
};
