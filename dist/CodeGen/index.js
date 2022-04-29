"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CodeGen = void 0;
const Template_1 = require("../Template");
const BasePrompt_1 = require("../Prompt/BasePrompt");
const Step_1 = require("../Step");
class CodeGen {
    constructor(config = {}) {
        this.prompts = [];
        this.steps = [];
        this.templates = [];
        this.config = {};
        this.config = Object.assign({ setInitialTemplateAutomatically: true }, config);
    }
    getConfig() {
        return this.config;
    }
    getPrompts() {
        return this.prompts;
    }
    addPrompt(prompt) {
        if (!(prompt instanceof BasePrompt_1.BasePrompt)) {
            throw new Error("Invalid prompt type");
        }
        this.prompts.push(prompt);
        return this;
    }
    addStep(step) {
        if (!(step instanceof Step_1.Step)) {
            throw new Error("Invalid step");
        }
        this.steps.push(step);
        return this;
    }
    getSteps() {
        return this.steps;
    }
    setPrompts(prompts) {
        prompts.forEach(prompt => this.addPrompt(prompt));
        return this;
    }
    setConfig(config) {
        this.config = Object.assign(Object.assign({}, this.config), config);
        return this;
    }
    getTemplates() {
        return this.templates;
    }
    /**
     * @param {Template} template
     * */
    addTemplate(template) {
        if (!(template instanceof Template_1.Template)) {
            throw new Error("Template inválido, o template deve ser uma instância de 'Template'");
        }
        this.templates.push(template);
        return this;
    }
    setTemplates(templates) {
        templates.forEach(template => this.addTemplate(template));
        return this;
    }
    static clone(instance) {
        const codeGen = new CodeGen(instance.getConfig());
        codeGen.patch(instance);
        return codeGen;
    }
    patch(instance) {
        Object.entries(instance).forEach(([key, value]) => {
            if (key in this) {
                this[key] = Array.isArray(this[key])
                    ? [...this[key], ...value]
                    : Object.assign(Object.assign({}, this[key]), value);
            }
        });
    }
    static combine(...instances) {
        const result = new CodeGen();
        instances.forEach(instance => result.patch(instance));
        return result;
    }
}
exports.CodeGen = CodeGen;
//# sourceMappingURL=index.js.map