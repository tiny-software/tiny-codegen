"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckboxPrompt = void 0;
const BaseListPrompt_1 = require("./BaseListPrompt");
class CheckboxPrompt extends BaseListPrompt_1.BaseListPrompt {
    constructor(name, message) {
        super(name, "checkbox", message);
    }
}
exports.CheckboxPrompt = CheckboxPrompt;
//# sourceMappingURL=CheckboxPrompt.js.map