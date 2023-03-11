import { HasHeaders } from './graph_token.js';
declare const services: {
    gitHub: null;
    spotify: null;
    salesforce: null;
    stripe: null;
};
export type Service = {
    friendlyServiceName: string;
    service: string;
    isLoggedIn: boolean;
    bearerToken: string | null;
    grantedScopes: Array<{
        scope: string;
        scopeInfo: {
            category: string | null;
            scope: string;
            display: string;
            isDefault: boolean;
            isRequired: boolean;
            description: string | null;
            title: string | null;
        };
    }> | null;
};
export type Services = typeof services;
export type ServiceKey = keyof Services;
export type ServiceTokens = Service;
export type NetlifySecrets = {
    [K in ServiceKey]?: Service;
} & {
    [key: string]: Service;
};
export declare const getSecrets: (event?: HasHeaders | null | undefined) => Promise<NetlifySecrets>;
export declare const getSecretsForBuild: () => Promise<NetlifySecrets>;
export {};
