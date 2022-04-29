import { PromptInterface } from "./types";
import { Prompt } from '../Prompt/types';
export declare class PromptChooseScript implements PromptInterface {
    private scripts;
    constructor(scripts?: any[]);
    getPrompts(choiceMapper: (value: string) => Prompt.Choice): Prompt.PromptQuestion[];
}
