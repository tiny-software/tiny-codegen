import { Config } from '../Config';
import { Answers } from 'inquirer';
import { BasePrompt } from '../Prompt/BasePrompt';
import { Template } from '../Template';
import { Step } from '../Step';
export declare class Script {
    private config;
    private steps;
    private scriptPath;
    private templates;
    private currentStep;
    private codeGen;
    constructor(scriptPath: string);
    private validate;
    private evalConfigEnums;
    getConfig: () => Config;
    getPrompts: () => BasePrompt[];
    getNextStep(): Step;
    private getCurrentPrompts;
    setConfig(config: Config): void;
    private parsePrompts;
    private getParsers;
    parseAnswers(prompts: BasePrompt[], answers: Answers): Answers;
    parseAllAnswers(answers: Answers): Promise<Answers>;
    getScriptPath(): string;
    getTemplates(): Template[];
    onFilesCreated(files: string[]): Promise<void>;
}
