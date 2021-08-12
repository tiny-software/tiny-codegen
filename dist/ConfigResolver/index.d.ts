import { Script } from "../Script";
import { InitialConfig } from "../Config/InitialConfig";
export declare class ConfigResolver {
    private config;
    constructor(config: InitialConfig);
    resolve(): Promise<Script>;
}
