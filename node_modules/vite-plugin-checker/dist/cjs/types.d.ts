import { ConfigEnv, ErrorPayload } from 'vite';
import { Worker } from 'worker_threads';
import { ESLint } from 'eslint';
import * as Stylelint from 'stylelint';
import { VlsOptions } from './checkers/vls/initParams.js';
import 'vscode-uri';
import 'vscode-languageserver/node';

interface TsConfigOptions {
    /**
     * path to tsconfig.json file
     */
    tsconfigPath: string;
    /**
     * root path of cwd
     */
    root: string;
    /**
     * root path of cwd
     */
    buildMode: boolean;
}
/**
 * TypeScript checker configuration
 * @default true
 */
declare type TscConfig = 
/**
 * - set to `true` to enable type checking with default configuration
 * - set to `false` to disable type checking, you can also remove `config.typescript` directly
 */
boolean | Partial<TsConfigOptions>;
/** vue-tsc checker configuration */
declare type VueTscConfig = 
/**
 * - set to `true` to enable type checking with default configuration
 * - set to `false` to disable type checking, you can also remove `config.vueTsc` directly
 */
boolean | Partial<Omit<TsConfigOptions, 'buildMode'>>;
/** vls checker configuration */
declare type VlsConfig = boolean | DeepPartial<VlsOptions>;
/** ESLint checker configuration */
declare type EslintConfig = false | {
    /**
     * lintCommand will be executed at build mode, and will also be used as
     * default config for dev mode when options.eslint.dev.eslint is nullable.
     */
    lintCommand: string;
    dev?: Partial<{
        /** You can override the options of translated from lintCommand. */
        overrideConfig: ESLint.Options;
        /** which level of the diagnostic will be emitted from plugin */
        logLevel: ('error' | 'warning')[];
    }>;
};
/** Stylelint checker configuration */
declare type StylelintConfig = false | {
    /**
     * lintCommand will be executed at build mode, and will also be used as
     * default config for dev mode when options.stylelint.dev.stylelint is nullable.
     */
    lintCommand: string;
    dev?: Partial<{
        /** You can override the options of translated from lintCommand. */
        overrideConfig: Stylelint.LinterOptions;
        /** which level of the diagnostic will be emitted from plugin */
        logLevel: ('error' | 'warning')[];
    }>;
};
declare enum DiagnosticLevel {
    Warning = 0,
    Error = 1,
    Suggestion = 2,
    Message = 3
}
declare type ErrorPayloadErr = ErrorPayload['err'];
interface DiagnosticToRuntime extends ErrorPayloadErr {
    checkerId: string;
    level?: DiagnosticLevel;
}
interface ClientDiagnosticPayload {
    event: 'vite-plugin-checker:error';
    data: {
        checkerId: string;
        diagnostics: DiagnosticToRuntime[];
    };
}
interface ClientReconnectPayload {
    event: 'vite-plugin-checker:reconnect';
    data: ClientDiagnosticPayload[];
}
declare type ClientPayload = ClientDiagnosticPayload | ClientReconnectPayload;
/** checkers shared configuration */
interface SharedConfig {
    /**
     * Show overlay on UI view when there are errors or warnings in dev mode.
     * - Set `true` to show overlay
     * - Set `false` to disable overlay
     * - Set with a object to customize overlay
     *
     * @defaultValue `true`
     */
    overlay: boolean | {
        /**
         * Set this true if you want the overlay to default to being open if
         * errors/warnings are found
         * @defaultValue `true`
         */
        initialIsOpen?: boolean;
        /**
         * The position of the vite-plugin-checker badge to open and close
         * the diagnostics panel
         * @default `bl`
         */
        position?: 'tl' | 'tr' | 'bl' | 'br';
        /**
         * Use this to add extra style string to the badge button, the string format is
         * [Svelte style](https://svelte.dev/docs#template-syntax-element-directives-style-property)
         * For example, if you want to hide the badge,
         * you can pass `display: none;` to the badgeStyle property
         * @default no default value
         */
        badgeStyle?: string;
        /**
         * Use this to add extra style string to the diagnostic panel, the string format is
         * [Svelte style](https://svelte.dev/docs#template-syntax-element-directives-style-property)
         * For example, if you want to change the opacity of the panel,
         * you can pass `opacity: 0.8;` to the panelStyle property
         * @default no default value
         */
        panelStyle?: string;
    };
    /**
     * stdout in terminal which starts the Vite server in dev mode.
     * - Set `true` to enable
     * - Set `false` to disable
     *
     * @defaultValue `true`
     */
    terminal: boolean;
    /**
     * Enable checking in build mode
     * @defaultValue `true`
     */
    enableBuild: boolean;
}
interface BuildInCheckers {
    typescript: TscConfig;
    vueTsc: VueTscConfig;
    vls: VlsConfig;
    eslint: EslintConfig;
    stylelint: StylelintConfig;
}
declare type BuildInCheckerNames = keyof BuildInCheckers;
declare type PluginConfig = SharedConfig & BuildInCheckers;
/** Userland plugin configuration */
declare type UserPluginConfig = Partial<PluginConfig>;
declare enum ACTION_TYPES {
    config = "config",
    configureServer = "configureServer",
    overlayError = "overlayError",
    console = "console",
    unref = "unref"
}
interface AbstractAction {
    type: string;
    payload: unknown;
}
interface OverlayErrorAction extends AbstractAction {
    type: ACTION_TYPES.overlayError;
    /**
     * send `ClientPayload` to raise error overlay
     * send `null` to clear overlay for current checker
     */
    payload: ClientPayload;
}
interface ConfigAction extends AbstractAction {
    type: ACTION_TYPES.config;
    payload: ConfigActionPayload;
}
interface ConfigureServerAction extends AbstractAction {
    type: ACTION_TYPES.configureServer;
    payload: {
        root: string;
    };
}
interface ConsoleAction extends AbstractAction {
    type: ACTION_TYPES.console;
    payload: string;
}
interface UnrefAction extends AbstractAction {
    type: ACTION_TYPES.unref;
}
interface ConfigActionPayload {
    enableOverlay: boolean;
    enableTerminal: boolean;
    env: ConfigEnv;
}
declare type Action = ConfigAction | ConfigureServerAction | ConsoleAction | OverlayErrorAction | UnrefAction;
declare type BuildCheckBin = BuildCheckBinStr | BuildCheckBinFn;
declare type BuildCheckBinStr = [string, ReadonlyArray<string>];
declare type BuildCheckBinFn = (config: UserPluginConfig) => [string, ReadonlyArray<string>];
interface ConfigureServeChecker {
    worker: Worker;
    config: (config: ConfigAction['payload']) => void;
    configureServer: (serverConfig: ConfigureServerAction['payload']) => void;
}
interface ServeAndBuildChecker {
    serve: ConfigureServeChecker;
    build: {
        buildBin: BuildCheckBin;
        buildFile?: string;
    };
}
/**
 * create serve & build checker
 */
interface ServeChecker<T extends BuildInCheckerNames = any> {
    createDiagnostic: CreateDiagnostic<T>;
}
interface CheckerDiagnostic {
    config: (options: ConfigActionPayload) => unknown;
    configureServer: (options: {
        root: string;
    }) => unknown;
}
declare type CreateDiagnostic<T extends BuildInCheckerNames = any> = (config: Pick<BuildInCheckers, T> & SharedConfig) => CheckerDiagnostic;
declare type DeepPartial<T> = {
    [P in keyof T]?: DeepPartial<T[P]>;
};

export { ACTION_TYPES, Action, BuildCheckBin, BuildCheckBinFn, BuildCheckBinStr, BuildInCheckerNames, BuildInCheckers, CheckerDiagnostic, ClientDiagnosticPayload, ClientPayload, ClientReconnectPayload, ConfigAction, ConfigureServeChecker, ConfigureServerAction, ConsoleAction, CreateDiagnostic, DeepPartial, DiagnosticLevel, DiagnosticToRuntime, EslintConfig, OverlayErrorAction, PluginConfig, ServeAndBuildChecker, ServeChecker, SharedConfig, StylelintConfig, TscConfig, UnrefAction, UserPluginConfig, VlsConfig, VueTscConfig };
