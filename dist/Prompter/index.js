"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Prompter = void 0;
const inquirer_1 = __importDefault(require("inquirer"));
const path_1 = require("path");
const file_helpers_1 = require("../helpers/file.helpers");
const PromptChooseScript_1 = require("./PromptChooseScript");
class Prompter {
    constructor(config) {
        this.config = config;
        this.adaptPath = (path) => {
            return file_helpers_1.file.resolvePath(path_1.join(path, this.config.get('scriptDefaultName')), this.config.get('cwd'));
        };
    }
    prompt(prompts) {
        return __awaiter(this, void 0, void 0, function* () {
            return inquirer_1.default.prompt(prompts);
        });
    }
    PromptChooseScript(scripts) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.prompt(new PromptChooseScript_1.PromptChooseScript(scripts).getPrompts(value => ({
                name: value,
                value: this.adaptPath(value),
            })));
        });
    }
    SingleScript(scripts) {
        return {
            script: this.adaptPath(scripts)
        };
    }
    resolve() {
        return __awaiter(this, void 0, void 0, function* () {
            const scripts = this.config.getScripts();
            if (scripts.length > 1) {
                return this.PromptChooseScript(scripts);
            }
            return this.SingleScript(scripts[0]);
        });
    }
}
exports.Prompter = Prompter;
//# sourceMappingURL=index.js.map