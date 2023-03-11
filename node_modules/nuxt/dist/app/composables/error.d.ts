import type { H3Error } from 'h3';
export declare const useError: () => import("vue").Ref<Error | {
    url: string;
    statusCode: number;
    statusMessage: string;
    message: string;
    description: string;
    data?: any;
} | null | undefined>;
export interface NuxtError extends H3Error {
}
export declare const showError: (_err: string | Error | Partial<NuxtError>) => NuxtError;
export declare const clearError: (options?: {
    redirect?: string;
}) => Promise<void>;
export declare const isNuxtError: (err?: string | object) => err is NuxtError;
export declare const createError: (err: string | Partial<NuxtError>) => NuxtError;
