import { QuestionCollection } from 'inquirer';
import { Prompt } from '../Prompt/types'
export interface PromptInterface {
	getPrompts(choiceMapper: (value: string) => Prompt.Choice): QuestionCollection
}
