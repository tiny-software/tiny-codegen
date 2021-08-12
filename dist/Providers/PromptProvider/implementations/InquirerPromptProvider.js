"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InquirerPromptProvider = void 0;
const inquirer_1 = __importDefault(require("inquirer"));
class InquirerPromptProvider {
    askPrompts(prompts) {
        return inquirer_1.default.prompt(prompts.map(p => p.getPrompt()));
    }
}
exports.InquirerPromptProvider = InquirerPromptProvider;
//# sourceMappingURL=InquirerPromptProvider.js.map