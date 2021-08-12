import { Prompt } from "./types";
import { BaseListPrompt } from "./BaseListPrompt";
export declare class ListPrompt extends BaseListPrompt {
    constructor(name: Prompt.PromptQuestion["name"], message: Prompt.PromptQuestion["message"], defaultValue: Prompt.PromptQuestion["default"]);
}
