"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseListPrompt = void 0;
const BasePrompt_1 = require("./BasePrompt");
class BaseListPrompt extends BasePrompt_1.BasePrompt {
    constructor(name, type, message, defaultValue = "") {
        super(name, type, message, defaultValue);
    }
    getChoices() {
        return this.choices;
    }
    setChoices(choices) {
        this.choices = choices;
        return this;
    }
    parseChoices(config) {
        if (typeof this.choices === 'function') {
            const clone = this.choices;
            this.setChoices((answers) => {
                return clone(answers, config.getConfig());
            });
        }
    }
    getPrompt() {
        return Object.assign(Object.assign({}, super.getPrompt()), { choices: this.getChoices() });
    }
    isValid() {
        if (!this.name || typeof this.name !== 'string') {
            return false;
        }
        if (!this.message || !["string", "function"].includes(typeof this.message)) {
            return false;
        }
        if (!["checkbox", "list"].includes(this.type)) {
            return false;
        }
        if (!this.choices) {
            return false;
        }
        if (!Array.isArray(this.choices) && !(typeof this.choices === 'function')) {
            return false;
        }
        if (Array.isArray(this.choices) && !this.choices.length) {
            return false;
        }
        return true;
    }
}
exports.BaseListPrompt = BaseListPrompt;
//# sourceMappingURL=BaseListPrompt.js.map