import { Answers } from 'inquirer';
import { RunnerResult } from 'hygen/dist/types';
import { Template } from '../Template';
export declare type TemplatesRunnerType = (argv: string[], templatesPath: string) => Promise<RunnerResult>;
export declare class TemplateResolver {
    private templates;
    constructor(templates: Template[]);
    private parseArgvToHygen;
    applyAnswers(answers: Answers, runner: TemplatesRunnerType): Promise<{
        paths: any[];
    }>;
}
