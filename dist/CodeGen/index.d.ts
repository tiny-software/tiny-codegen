import { Answers } from "inquirer";
import { Template } from "../Template";
import { BasePrompt } from "../Prompt/BasePrompt";
import { Step } from "../Step";
export declare type ScriptConfigEnums = Array<Record<string, string | number | boolean> | string>;
export declare type ScriptConfig = {
    setInitialTemplateAutomatically?: boolean;
    onParseAllAnswers?: (answers: Answers, config: Record<string, unknown>, self: CodeGen) => Answers;
    onFilesCreated?: (files: Array<string>, config: Record<string, unknown>, self: CodeGen) => Array<string>;
    enums?: ScriptConfigEnums | Record<string, ScriptConfigEnums>;
    returnRawPhpFile?: boolean;
} & Record<string, unknown>;
export declare class CodeGen {
    private prompts;
    private steps;
    private templates;
    private config;
    constructor(config?: ScriptConfig);
    getConfig(): ScriptConfig;
    getPrompts(): BasePrompt[];
    addPrompt(prompt: BasePrompt): this;
    addStep(step: Step): this;
    getSteps(): Step[];
    setPrompts(prompts: BasePrompt[]): this;
    setConfig(config: ScriptConfig): this;
    getTemplates(): Template[];
    /**
     * @param {Template} template
     * */
    addTemplate(template: Template): this;
    setTemplates(templates: Template[]): this;
    static clone(instance: CodeGen): CodeGen;
    patch(instance: CodeGen): void;
    static combine(...instances: CodeGen[]): CodeGen;
}
