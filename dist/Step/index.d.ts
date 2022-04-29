import { Answers } from 'inquirer';
import { BasePrompt } from '../Prompt/BasePrompt';
export declare type StepParam = ((answers: Answers, config: Record<string, unknown>) => BasePrompt[]) | BasePrompt[] | BasePrompt;
export declare class Step {
    private prompts;
    private answers;
    private config;
    private promptsResolver;
    constructor(param: StepParam);
    getPrompts(): BasePrompt[];
    setAnswers(answers: Answers): void;
    setConfig(config: Record<string, unknown>): void;
    isValid(): boolean;
}
