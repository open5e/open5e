type JSValue = string | number | bigint | boolean | symbol | Function | Array<any> | undefined | object | null;
type JSType = "string" | "number" | "bigint" | "boolean" | "symbol" | "function" | "object" | "any" | "array";
type ResolveFn = (value: any, get: (key: string) => any) => JSValue | Promise<JSValue>;
interface TypeDescriptor {
    /** Used internally to handle schema types */
    type?: JSType | JSType[];
    /** Fully resolved correct TypeScript type for generated TS declarations */
    tsType?: string;
    /** Human-readable type description for use in generated documentation */
    markdownType?: string;
    items?: TypeDescriptor | TypeDescriptor[];
}
interface FunctionArg extends TypeDescriptor {
    name?: string;
    default?: JSValue;
    optional?: boolean;
}
interface Schema extends TypeDescriptor {
    id?: string;
    default?: JSValue;
    resolve?: ResolveFn;
    properties?: {
        [key: string]: Schema;
    };
    required?: string[];
    title?: string;
    description?: string;
    $schema?: string;
    tags?: string[];
    args?: FunctionArg[];
    returns?: TypeDescriptor;
}
interface InputObject {
    $schema?: Schema;
    $resolve?: ResolveFn;
    $default?: any;
    [key: string]: any;
}
type InputValue = InputObject | JSValue;
type SchemaDefinition = {
    [x: string]: JSValue | InputObject | SchemaDefinition;
};

declare function resolveSchema(obj: InputObject, defaults?: InputObject): Promise<Schema>;
declare function applyDefaults(ref: InputObject, input: InputObject): Promise<InputObject>;

interface GenerateTypesOptions {
    interfaceName?: string;
    addExport?: boolean;
    addDefaults?: boolean;
    defaultDescrption?: string;
    indentation?: number;
    allowExtraKeys?: boolean;
    partial?: boolean;
}
declare function generateTypes(schema: Schema, opts?: GenerateTypesOptions): string;

declare function generateMarkdown(schema: Schema): string;

declare function defineUntypedSchema(options: SchemaDefinition): SchemaDefinition;

export { FunctionArg, InputObject, InputValue, JSType, JSValue, ResolveFn, Schema, SchemaDefinition, TypeDescriptor, applyDefaults, defineUntypedSchema, generateMarkdown, generateTypes, resolveSchema };
