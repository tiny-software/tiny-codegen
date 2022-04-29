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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Script = void 0;
const fs_1 = require("fs");
const parsing_helpers_1 = require("../helpers/parsing.helpers");
const path_1 = require("path");
const InitialConfig_1 = require("../Config/InitialConfig");
const TemplateResolver_1 = require("../TemplateResolver");
const CodeGen_1 = require("../CodeGen");
const Template_1 = require("../Template");
const file_helpers_1 = require("../helpers/file.helpers");
const path_2 = require("path");
const Step_1 = require("../Step");
class Script {
    constructor(scriptPath) {
        this.currentStep = 0;
        this.codeGen = null;
        this.getConfig = () => {
            return this.config;
        };
        this.getPrompts = () => {
            return this.parsePrompts(this.getCurrentPrompts());
        };
        this.parsePrompts = (prompts) => {
            return prompts.map(prompt => {
                prompt.parseMethods(this.config);
                return prompt;
            });
        };
        this.config = InitialConfig_1.InitialConfig.getInstance();
        this.scriptPath = file_helpers_1.file.resolvePath(scriptPath, this.config.get("cwd"));
        if (!this.scriptPath.endsWith(this.config.get("scriptDefaultName"))) {
            this.scriptPath = path_2.join(this.scriptPath, "codegen.js");
        }
        if (fs_1.existsSync(this.scriptPath)) {
            this.codeGen = require(this.scriptPath);
        }
        if (!this.codeGen) {
            throw new Error(`Script ${this.scriptPath} not found`);
        }
        if (!(this.codeGen instanceof CodeGen_1.CodeGen)) {
            throw new Error(`Script ${scriptPath} must export an instance of CodeGen`);
        }
        this.config.extend(Object.assign({ onParseAllAnswers: null }, this.codeGen.getConfig()));
        this.templates = this.codeGen.getTemplates();
        if (this.templates.length === 0 && this.codeGen.getConfig().setInitialTemplateAutomatically) {
            this.templates.push(new Template_1.Template(path_1.resolve(this.scriptPath, '..', TemplateResolver_1.TemplateResolver.templatesFolder)));
        }
        this.steps = this.codeGen.getSteps();
        if (this.steps.length === 0) {
            this.steps.push(new Step_1.Step(this.codeGen.getPrompts()));
        }
        this.validate();
        this.evalConfigEnums();
    }
    validate() {
        if (!this.steps.every(step => step instanceof Step_1.Step)) {
            throw new Error("Step inválido, todos os steps devem ser uma instância de Step");
        }
    }
    evalConfigEnums() {
        const enums = this.config.get('enums') || {};
        let parsedEnums = {};
        Object.entries(enums).forEach(([k, v]) => {
            if (typeof v === 'function') {
                parsedEnums[k] = v(this.config.getConfig());
            }
            else if (typeof v === 'string' && v.endsWith(".php")) {
                parsedEnums[k] = parsing_helpers_1.parse.phpEnum(path_1.resolve(process.cwd(), v), this.config.getConfig());
            }
            else if (typeof v === 'object') {
                parsedEnums[k] = v;
            }
        });
        this.config.extend({ enums: parsedEnums });
    }
    getNextStep() {
        const step = this.steps[this.currentStep];
        this.currentStep++;
        return step;
    }
    getCurrentPrompts() {
        return this.steps[this.currentStep].getPrompts();
    }
    setConfig(config) {
        this.config = config;
    }
    getParsers(prompts) {
        return prompts.reduce((acc, prompt) => {
            if (prompt.hasParser()) {
                return Object.assign(Object.assign({}, acc), { [prompt.getName()]: prompt.getParser() });
            }
            return Object.assign({}, acc);
        }, {});
    }
    parseAnswers(prompts, answers) {
        let parsedAnswers = answers;
        const parsers = this.getParsers(prompts);
        Object.entries(parsedAnswers).forEach(([key, value]) => {
            let parsedAnswer = value;
            const parser = parsers[key];
            if (parser) {
                let result = parser(value, answers, this.config.getConfig());
                parsedAnswer = result;
            }
            parsedAnswers[key] = parsedAnswer;
        });
        return parsedAnswers;
    }
    parseAllAnswers(answers) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.config.hasCallback('onParseAllAnswers')) {
                const onParseAllAnswers = this.config.get('onParseAllAnswers');
                const parsedAnswersCallbackAfter = yield onParseAllAnswers(answers, this.config.getConfig(), this.codeGen);
                return Object.assign(Object.assign({}, answers), parsedAnswersCallbackAfter);
            }
            return answers;
        });
    }
    getScriptPath() {
        return this.scriptPath;
    }
    getTemplates() {
        if (!this.templates.length) {
            throw new Error(`Nenhuma template encontrada ou informada, você precisa:
				Adicionar templates à instância CodeGen utilizando o método 'addTemplate()', ou
				Criar uma pasta 'templates' no diretório do script.`);
        }
        ;
        return this.templates;
    }
    onFilesCreated(files) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.config.hasCallback('onFilesCreated')) {
                yield this.config.get('onFilesCreated')(files, this.config.getConfig(), this.codeGen);
            }
        });
    }
}
exports.Script = Script;
//# sourceMappingURL=index.js.map