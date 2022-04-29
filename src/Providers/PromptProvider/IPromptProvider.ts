import { BasePrompt } from "src/Prompt/BasePrompt";

export interface IPromptProvider {
	askPrompts<G = Record<string, unknown>>(prompts: BasePrompt[]): Promise<G>;
}
