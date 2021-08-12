import { BasePrompt } from "src/Prompt/BasePrompt";
import { IPromptProvider } from "../IPromptProvider";
export declare class InquirerPromptProvider implements IPromptProvider {
    askPrompts<G = Record<string, unknown>>(prompts: BasePrompt[]): Promise<G>;
}
