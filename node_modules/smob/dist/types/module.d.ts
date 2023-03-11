import { Merger, MergerResult, Options } from './type';
export declare function baseMerger<A extends Record<string, any>, B extends Record<string, any>>(options: Options, target: A, ...sources: B[]): MergerResult<A, B>;
export declare function createMerger(input?: Partial<Options>): Merger;
export declare const merge: Merger;
