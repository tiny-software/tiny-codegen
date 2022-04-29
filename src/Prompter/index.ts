import inquirer from "inquirer";
import { join } from "path";
import { file } from "../helpers/file.helpers";
import { InitialConfig } from "../Config/InitialConfig";
import { Prompt } from "../Prompt/types";
import { PromptChooseScript } from "./PromptChooseScript";

type ReturnPrompt = {
	script: string;
}

export class Prompter {

	constructor(private config: InitialConfig) {}

	private async prompt<T>(prompts: Prompt.PromptQuestion[]) {
		return inquirer.prompt<T>(prompts);
	}

	public async PromptChooseScript(scripts: string[]) {
		return this.prompt<ReturnPrompt>(new PromptChooseScript(scripts).getPrompts(value => ({
			name: value,
			value: this.adaptPath(value),
		})))
	}

	private SingleScript(scripts: string) {
		return {
			script: this.adaptPath(scripts)
		}
	}

	public async resolve() {
		const scripts = this.config.getScripts();
		if (scripts.length > 1) {
			return this.PromptChooseScript(scripts);
		}

		return this.SingleScript(scripts[0]);

	}

	private adaptPath = (path: string) => {
		return file.resolvePath(join(path, this.config.get('scriptDefaultName')), this.config.get('cwd'));
	}

}

