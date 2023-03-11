declare const _default: import("vue").DefineComponent<{
    name: {
        type: StringConstructor;
        required: true;
    };
    props: {
        type: ObjectConstructor;
        default: () => undefined;
    };
    context: {
        type: ObjectConstructor;
        default: () => {};
    };
}, () => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}>, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    name: {
        type: StringConstructor;
        required: true;
    };
    props: {
        type: ObjectConstructor;
        default: () => undefined;
    };
    context: {
        type: ObjectConstructor;
        default: () => {};
    };
}>>, {
    props: Record<string, any>;
    context: Record<string, any>;
}>;
export default _default;
