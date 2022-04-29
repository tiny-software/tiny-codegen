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
exports.Runner = void 0;
const TemplateResolver_1 = require("../TemplateResolver");
const hygen_1 = require("hygen");
class Runner {
    constructor(script, PromptProvider) {
        this.script = script;
        this.PromptProvider = PromptProvider;
    }
    run() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`running file ${this.script.getScriptPath()}`);
            const scriptConfig = this.script.getConfig();
            const answersFromCLIArgs = scriptConfig.has('answers') ? scriptConfig.get('answers') : {};
            let answers = {};
            let step;
            while (step = this.script.getNextStep()) {
                step.setAnswers(answers);
                step.setConfig(scriptConfig.getConfig());
                const prompts = step.getPrompts().filter(prompt => !(prompt.getName() in answersFromCLIArgs));
                const stepAnswers = yield this.PromptProvider.askPrompts(prompts);
                answers = this.script.parseAnswers(step.getPrompts(), Object.assign(Object.assign(Object.assign({}, answersFromCLIArgs), answers), stepAnswers));
            }
            answers = yield this.script.parseAllAnswers(answers);
            const template = new TemplateResolver_1.TemplateResolver(this.script.getTemplates());
            const { paths } = yield template.applyAnswers(answers, this.getRunner());
            yield this.script.onFilesCreated(paths);
        });
    }
    getRunner() {
        return (argv, templatesPath) => __awaiter(this, void 0, void 0, function* () {
            return yield hygen_1.runner(argv, {
                templates: templatesPath,
                cwd: process.cwd(),
                logger: new hygen_1.Logger(console.log.bind(console)),
                createPrompter: () => require('inquirer'),
                exec: (action, body) => {
                    const opts = body && body.length > 0 ? { input: body } : {};
                    return require('execa').shell(action, opts);
                },
                debug: !!process.env.DEBUG
            });
        });
    }
}
exports.Runner = Runner;
//# sourceMappingURL=index.js.map