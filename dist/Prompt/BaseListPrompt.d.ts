import { Config } from "../Config";
import { Prompt } from "./types";
import { BasePrompt } from "./BasePrompt";
export declare abstract class BaseListPrompt extends BasePrompt {
    protected choices: Prompt.Choices;
    constructor(name: Prompt.PromptQuestion["name"], type: Prompt.PromptQuestion["type"], message: Prompt.PromptQuestion["message"], defaultValue?: Prompt.PromptQuestion["default"]);
    getChoices(): Prompt.Choices<any>;
    setChoices(choices: Prompt.PromptQuestion["choices"]): this;
    parseChoices(config: Config): void;
    getPrompt(): Prompt.PromptQuestion;
    isValid(): boolean;
}
