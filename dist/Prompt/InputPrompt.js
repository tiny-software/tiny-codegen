"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InputPrompt = void 0;
const BasePrompt_1 = require("./BasePrompt");
class InputPrompt extends BasePrompt_1.BasePrompt {
    constructor(name, message) {
        super(name, "input", message);
    }
    isValid() {
        if (!this.name || typeof this.name !== 'string') {
            return false;
        }
        if (!this.message || !["string", "function"].includes(typeof this.message)) {
            return false;
        }
        if (!["input"].includes(this.type)) {
            return false;
        }
        return true;
    }
}
exports.InputPrompt = InputPrompt;
//# sourceMappingURL=InputPrompt.js.map