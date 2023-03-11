import { Server, RequestListener } from 'node:http';
import { Server as Server$1 } from 'node:https';
import { GetPortInput } from 'get-port-please';

interface Certificate {
    key: string;
    cert: string;
}
interface HTTPSOptions {
    cert: string;
    key: string;
    domains?: string[];
    validityDays?: number;
}
interface ListenOptions {
    name: string;
    port?: GetPortInput;
    hostname: string;
    showURL: boolean;
    baseURL: string;
    open: boolean;
    https: boolean | HTTPSOptions;
    clipboard: boolean;
    isTest: boolean;
    isProd: boolean;
    autoClose: boolean;
    autoCloseSignals: string[];
}
interface ShowURLOptions {
    baseURL: string;
    name?: string;
}
interface Listener {
    url: string;
    address: any;
    server: Server | Server$1;
    https: false | Certificate;
    close: () => Promise<void>;
    open: () => Promise<void>;
    showURL: (options?: Pick<ListenOptions, "baseURL">) => void;
}
declare function listen(handle: RequestListener, options_?: Partial<ListenOptions>): Promise<Listener>;

export { Certificate, HTTPSOptions, ListenOptions, Listener, ShowURLOptions, listen };
