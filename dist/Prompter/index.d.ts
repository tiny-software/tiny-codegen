import { InitialConfig } from "../Config/InitialConfig";
declare type ReturnPrompt = {
    script: string;
};
export declare class Prompter {
    private config;
    constructor(config: InitialConfig);
    private prompt;
    PromptChooseScript(scripts: string[]): Promise<ReturnPrompt>;
    private SingleScript;
    resolve(): Promise<ReturnPrompt>;
    private adaptPath;
}
export {};
