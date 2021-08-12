import { Answers } from "inquirer";
import { Template } from "../Template";
import { BasePrompt } from "../Prompt/BasePrompt";
import { Step } from "../Step";

export type ScriptConfigEnums = Array<Record<string, string | number | boolean> | string>;
export type ScriptConfig = {
	onParseAllAnswers?: (answers: Answers, config: Record<string, unknown>) => Answers;
	onFilesCalled?: (files: Array<string>, config: Record<string, unknown>) => Array<string>;
	enums?: ScriptConfigEnums | Record<string, ScriptConfigEnums>;
} & Record<string, unknown>;

export class CodeGen {

	private prompts: BasePrompt[] = [];
	private steps: Step[] = [];
	private templates: Template[] = [];

	constructor(private config: ScriptConfig = {}) { }

	public getConfig(): ScriptConfig {
		return this.config;
	}

	public getPrompts(): BasePrompt[] {
		return this.prompts;
	}

	public addPrompt(prompt: BasePrompt) {
		if (!(prompt instanceof BasePrompt)) {
			throw new Error("Invalid prompt type");
		}

		this.prompts.push(prompt);
		return this;
	}

	public addStep(step: Step) {
		if (!(step instanceof Step)) {
			throw new Error("Invalid step");
		}

		this.steps.push(step);
		return this;
	}

	public getSteps(): Step[] {
		return this.steps;
	}

	public setPrompts(prompts: BasePrompt[]) {
		prompts.forEach(prompt => this.addPrompt(prompt));
		return this;
	}

	public setConfig(config: ScriptConfig) {
		this.config = config;
		return this;
	}

	public getTemplates(): Template[] {
		return this.templates;
	}

	/**
	 * @param {Template} template 
	 * */
	public addTemplate(template: Template) {
		if (!(template instanceof Template)) {
			throw new Error("Template inválido, o template deve ser uma instância de 'Template'");
		}

		this.templates.push(template);
		return this;
	}

	public setTemplates(templates: Template[]) {
		templates.forEach(template => this.addTemplate(template));
		return this;
	}

	public static clone(instance: CodeGen) {
		const codeGen = new CodeGen(instance.getConfig());
		codeGen.patch(instance);
		return codeGen;
	}

	public patch(instance: CodeGen) {
		Object.entries(instance).forEach(([key, value]) => {
			if (key in this) {
				this[key] = Array.isArray(this[key])
					? [...this[key], ...value]
					: { ...this[key], ...value };
			}
		})
	}

	public static combine(...instances: CodeGen[]) {
		const result = new CodeGen();

		instances.forEach(instance => result.patch(instance));

		return result;
	}

}


