"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Step = void 0;
const BasePrompt_1 = require("../Prompt/BasePrompt");
class Step {
    constructor(param) {
        this.promptsResolver = param;
    }
    getPrompts() {
        if (typeof this.promptsResolver === 'function') {
            this.prompts = this.promptsResolver(this.answers, this.config);
        }
        else if (Array.isArray(this.promptsResolver)) {
            this.prompts = this.promptsResolver;
        }
        else if (this.promptsResolver instanceof BasePrompt_1.BasePrompt) {
            this.prompts = [this.promptsResolver];
        }
        if (!this.isValid()) {
            throw new Error('Todos os prompts devem ser uma instância de BasePrompt');
        }
        return this.prompts;
    }
    setAnswers(answers) {
        this.answers = answers;
    }
    setConfig(config) {
        this.config = config;
    }
    isValid() {
        return Array.isArray(this.prompts) && this.prompts.every(p => (p instanceof BasePrompt_1.BasePrompt) && p.isValid());
    }
}
exports.Step = Step;
//# sourceMappingURL=index.js.map