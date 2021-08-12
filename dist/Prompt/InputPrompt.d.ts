import { BasePrompt } from "./BasePrompt";
export declare class InputPrompt extends BasePrompt {
    constructor(name: string, message: string);
    isValid(): boolean;
}
