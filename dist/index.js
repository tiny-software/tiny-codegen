#!/usr/bin/env node
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
exports.Step = exports.Template = exports.CodeGen = exports.InputPrompt = exports.ListPrompt = exports.CheckboxPrompt = void 0;
const InitialConfig_1 = require("./Config/InitialConfig");
const parsing_helpers_1 = require("./helpers/parsing.helpers");
const ConfigResolver_1 = require("./ConfigResolver");
const Runner_1 = require("./Runner");
const CheckboxPrompt_1 = require("./Prompt/CheckboxPrompt");
Object.defineProperty(exports, "CheckboxPrompt", { enumerable: true, get: function () { return CheckboxPrompt_1.CheckboxPrompt; } });
const ListPrompt_1 = require("./Prompt/ListPrompt");
Object.defineProperty(exports, "ListPrompt", { enumerable: true, get: function () { return ListPrompt_1.ListPrompt; } });
const InputPrompt_1 = require("./Prompt/InputPrompt");
Object.defineProperty(exports, "InputPrompt", { enumerable: true, get: function () { return InputPrompt_1.InputPrompt; } });
const CodeGen_1 = require("./CodeGen");
Object.defineProperty(exports, "CodeGen", { enumerable: true, get: function () { return CodeGen_1.CodeGen; } });
const Template_1 = require("./Template");
Object.defineProperty(exports, "Template", { enumerable: true, get: function () { return Template_1.Template; } });
const Step_1 = require("./Step");
Object.defineProperty(exports, "Step", { enumerable: true, get: function () { return Step_1.Step; } });
const InquirerPromptProvider_1 = require("./Providers/PromptProvider/implementations/InquirerPromptProvider");
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { config, answers } = yield parsing_helpers_1.parse.argumentsToObject(process.argv);
        const initialConfig = InitialConfig_1.InitialConfig.getInstance(config);
        initialConfig.extend({ answers });
        const resolver = new ConfigResolver_1.ConfigResolver(initialConfig);
        const ChosenScript = yield resolver.resolve();
        const runner = new Runner_1.Runner(ChosenScript, new InquirerPromptProvider_1.InquirerPromptProvider());
        yield runner.run();
    }
    catch (error) {
        console.error((error === null || error === void 0 ? void 0 : error.message) || error);
    }
}))();
//# sourceMappingURL=index.js.map