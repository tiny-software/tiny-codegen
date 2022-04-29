import { Prompt } from "./types";
import { BaseListPrompt } from "./BaseListPrompt";
export declare class CheckboxPrompt extends BaseListPrompt {
    constructor(name: Prompt.PromptQuestion["name"], message: Prompt.PromptQuestion["message"]);
}
