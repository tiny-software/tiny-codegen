import { Answers } from "inquirer";
import { Config } from "../Config";
import { Prompt } from "./types";
import { BasePrompt } from "./BasePrompt";

export abstract class BaseListPrompt extends BasePrompt {
	protected choices: Prompt.Choices;

	constructor(name: Prompt.PromptQuestion["name"], type: Prompt.PromptQuestion["type"], message: Prompt.PromptQuestion["message"], defaultValue: Prompt.PromptQuestion["default"] = "") {
		super(name, type, message, defaultValue);
	}

	public getChoices() {
		return this.choices;
	}

	public setChoices(choices: Prompt.PromptQuestion["choices"]) {
		this.choices = choices;
		return this;
	}

	public parseChoices(config: Config) {
		if (typeof this.choices === 'function') {
			const clone = this.choices;
			this.setChoices((answers: Answers) => {
				return clone(answers, config.getConfig())
			});
		}
	}

	public getPrompt(): Prompt.PromptQuestion {
		return {
			...super.getPrompt(),
			choices: this.getChoices(),
		}
	}

	public isValid(): boolean {
		if (!this.name || typeof this.name !== 'string') {
			return false;
		}

		if (!this.message || !["string", "function"].includes(typeof this.message)) {
			return false;
		}

		if (!["checkbox", "list"].includes(this.type)) {
			return false;
		}

		if (!this.choices) {
			return false;
		}

		if (!Array.isArray(this.choices) && !(typeof this.choices === 'function')) {
			return false;
		}

		if (Array.isArray(this.choices) && !this.choices.length) {
			return false;
		}

		return true;
	}
}
