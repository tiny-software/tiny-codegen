
import { Answers } from 'inquirer';
import { BasePrompt } from '../Prompt/BasePrompt';
export type StepParam = ((answers: Answers, config: Record<string, unknown>) => BasePrompt[]) | BasePrompt[] | BasePrompt;

export class Step {

	private prompts: BasePrompt[];
	private answers: Answers;
	private config: Record<string, unknown>;
	private promptsResolver: StepParam;

	constructor(param: StepParam) {
		this.promptsResolver = param;
	}

	public getPrompts(): BasePrompt[] {
		if (typeof this.promptsResolver === 'function') {
			this.prompts = this.promptsResolver(this.answers, this.config);
		} else if (Array.isArray(this.promptsResolver)) {
			this.prompts = this.promptsResolver;
		} else if (this.promptsResolver instanceof BasePrompt) {
			this.prompts = [this.promptsResolver];
		}

		if (!this.isValid()) {
			throw new Error('Todos os prompts devem ser uma instância de BasePrompt');
		}

		return this.prompts;
	}

	public setAnswers(answers: Answers): void {
		this.answers = answers;
	}

	public setConfig(config: Record<string, unknown>): void {
		this.config = config;
	}

	public isValid(): boolean {
		return Array.isArray(this.prompts) && this.prompts.every(p => (p instanceof BasePrompt) && p.isValid());
	}

}
