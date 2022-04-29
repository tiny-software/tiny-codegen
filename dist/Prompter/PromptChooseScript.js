"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PromptChooseScript = void 0;
class PromptChooseScript {
    constructor(scripts = []) {
        this.scripts = scripts;
    }
    getPrompts(choiceMapper) {
        return [
            {
                name: 'script',
                message: "Escolha qual template deseja gerar",
                type: 'list',
                parser: null,
                choices: this.scripts.map(choiceMapper)
            }
        ];
    }
}
exports.PromptChooseScript = PromptChooseScript;
//# sourceMappingURL=PromptChooseScript.js.map