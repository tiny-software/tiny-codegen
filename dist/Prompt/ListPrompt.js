"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListPrompt = void 0;
const BaseListPrompt_1 = require("./BaseListPrompt");
class ListPrompt extends BaseListPrompt_1.BaseListPrompt {
    constructor(name, message, defaultValue) {
        super(name, "list", message, defaultValue);
    }
}
exports.ListPrompt = ListPrompt;
//# sourceMappingURL=ListPrompt.js.map