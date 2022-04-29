export declare abstract class Config {
    private config;
    constructor(config?: Record<string, unknown>);
    protected set(key: string, value: string | unknown): void;
    extend(_config?: {}): void;
    get(key: string): any;
    has(key: string): boolean;
    hasCallback(key: string): boolean;
    getConfig(): {};
    protected validate(): boolean;
}
