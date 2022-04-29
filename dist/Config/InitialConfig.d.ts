import { Config } from '.';
export declare class InitialConfig extends Config {
    private constructor();
    static getInstance(config?: Record<string, unknown>): InitialConfig;
    setInstance(): void;
    protected set(key: string, value: string | unknown): void;
    private rootDirExists;
    getScripts(): string[];
    protected validate(): boolean;
}
