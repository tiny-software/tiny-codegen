export declare const parse: {
    argumentsToObject: (_args?: string[]) => Promise<{
        answers: {};
        config: {};
    }>;
    phpEnum: (phpFile?: string, config?: Record<string, unknown>) => any;
};
