import inquirer from "inquirer";
import { BasePrompt } from "src/Prompt/BasePrompt";
import { IPromptProvider } from "../IPromptProvider";


export class InquirerPromptProvider implements IPromptProvider {
	askPrompts<G = Record<string, unknown>>(prompts: BasePrompt[]): Promise<G> {
		return inquirer.prompt(prompts.map(p => p.getPrompt()));
	}
}
