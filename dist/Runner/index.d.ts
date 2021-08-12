import { Script } from '../Script';
import { IPromptProvider } from 'src/Providers/PromptProvider/IPromptProvider';
export declare class Runner {
    private script;
    private PromptProvider;
    constructor(script: Script, PromptProvider: IPromptProvider);
    run(): Promise<void>;
    private getRunner;
}
