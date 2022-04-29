import { PromptInterface } from "./types";
import { Prompt } from '../Prompt/types';

export class PromptChooseScript implements PromptInterface {
	constructor(private scripts = []) { }

	public getPrompts(choiceMapper: (value: string) => Prompt.Choice): Prompt.PromptQuestion[] {
		return [
			{
				name: 'script',
				message: "Escolha qual template deseja gerar",
				type: 'list',
				parser: null,
				choices: this.scripts.map(choiceMapper)
			}
		]
	}
}

