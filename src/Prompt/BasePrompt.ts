import { Answers } from "inquirer";
import { Config } from "../Config";
import { Prompt } from "./types";

export abstract class BasePrompt {
	protected type: Prompt.PromptQuestion["type"];
	protected name: Prompt.PromptQuestion["name"];
	protected message: Prompt.PromptQuestion["message"];
	protected default?: Prompt.PromptQuestion["default"];
	protected prefix?: Prompt.PromptQuestion["prefix"];
	protected suffix?: Prompt.PromptQuestion["suffix"];
	protected filter?: Prompt.PromptQuestion["filter"];
	protected when?: Prompt.PromptQuestion["when"];
	protected parser?: Prompt.PromptQuestion["parser"];
	protected validate?(input: any, config: Record<string, unknown>, answers?: any): string | boolean | Promise<string | boolean>;

	constructor(name: Prompt.PromptQuestion["name"], type: Prompt.PromptQuestion["type"], message: Prompt.PromptQuestion["message"], defaultValue: Prompt.PromptQuestion["default"] = "", prefix = "", suffix = "") {
		this.name = name;
		this.type = type;
		this.message = message;
		this.default = defaultValue;
		this.prefix = prefix;
		this.suffix = suffix;
	}

	public getName() {
		const suffix = this.suffix ?? "";
		const prefix = this.prefix ?? "";
		return `${prefix}${this.name}${suffix}`;
	}

	public getType() {
		return this.type;
	}

	public getMessage() {
		return this.message;
	}

	public getDefault() {
		return this.default;
	}

	public getPrefix() {
		return this.prefix;
	}

	public getSuffix() {
		return this.suffix;
	}

	public getFilter() {
		return this.filter;
	}

	public getWhen() {
		return this.when;
	}

	public getParser() {
		return this.parser;
	}

	public getValidate() {
		return this.validate;
	}

	public hasParser() {
		return this.parser && typeof this.parser === 'function';
	}

	public hasValidate() {
		return this.validate && typeof this.validate === 'function';
	}

	public hasWhen() {
		return this.when && typeof this.when === 'function';
	}

	public hasDefault() {
		return this.default !== undefined;
	}

	public hasFilter() {
		return this.filter && typeof this.filter === 'function';
	}

	public hasPrefix() {
		return this.prefix && typeof this.prefix === 'string';
	}

	public hasSuffix() {
		return this.suffix && typeof this.suffix === 'string';
	}

	public setParser(parser: Prompt.PromptQuestion["parser"]) {
		this.parser = parser;
		return this;
	}

	public setValidate(validate: Prompt.PromptQuestion["validate"]) {
		this.validate = validate;
		return this;
	}

	public parseMethods(config: Config) {
		this.parseValidate(config);
		this.parseWhen(config);
		this.parseFilter(config);
		this.parseDefault(config);
	}

	private parseValidate(config: Config) {
		if (this.hasValidate()) {
			const clone = this.validate;
			return this.setValidate((input: string, answers: Answers) => {
				return clone(input, answers, config.getConfig());
			});
		}

		this.setValidate(null);
	}

	private parseWhen(config: Config) {
		if (this.hasWhen()) {
			const clone = this.when;
			return this.setWhen((answers: Answers) => {
				return clone(answers, config.getConfig());
			});
		}

		this.setWhen(null);
	}

	private parseFilter(config: Config) {
		if (this.hasFilter()) {
			const clone = this.filter;
			return this.setFilter((input, answers: Answers) => {
				return clone(input, answers, config.getConfig());
			});
		}

		this.setFilter(null);
	}

	private parseDefault(config: Config) {
		if (this.hasDefault() && typeof this.default === 'function') {
			const clone = this.default;
			return this.setDefault((answers: Answers) => {
				return clone(answers, config.getConfig());
			});
		}
	}

	public setWhen(when: Prompt.PromptQuestion["when"]) {
		this.when = when;
		return this;
	}

	public setDefault(defaultValue: Prompt.PromptQuestion["default"]) {
		this.default = defaultValue;
		return this;
	}

	public setPrefix(prefix: Prompt.PromptQuestion["prefix"]) {
		this.prefix = prefix;
		return this;
	}

	public setSuffix(suffix: Prompt.PromptQuestion["suffix"]) {
		this.suffix = suffix;
		return this;
	}

	public setFilter(filter: Prompt.PromptQuestion["filter"]) {
		this.filter = filter;
		return this;
	}

	public getPrompt(): Prompt.PromptQuestion {
		let prompt = {
			name: this.getName(),
			type: this.getType(),
			message: this.getMessage(),
		};

		if (this.hasDefault()) Object.assign(prompt, { default: this.getDefault() });
		if (this.hasParser()) Object.assign(prompt, { parser: this.getParser() });
		if (this.hasValidate()) Object.assign(prompt, { validate: this.getValidate() });
		if (this.hasFilter()) Object.assign(prompt, { filter: this.getFilter() });
		if (this.hasWhen()) Object.assign(prompt, { when: this.getWhen() });
		return prompt;
	}

	public abstract isValid(): boolean;

}
