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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TemplateResolver = void 0;
const path_1 = require("path");
const path_2 = require("path");
class TemplateResolver {
    constructor(templates) {
        this.templates = templates;
    }
    parseArgvToHygen(argv, hygenAction) {
        if (!Array.isArray(argv) || argv.length === 0) {
            throw new Error("Os parâmetros a serem aplicados na template devem ser informados como um array de string, se você está passando um 'customAnswersParser', verifique o retorno dele.");
        }
        const isEven = number => number % 2 === 0;
        // adiciona '--' antes de todas as chaves, pois o hygen espera dessa forma
        const parsed = argv.map((arg, index) => isEven(index) ? `--${arg}` : arg);
        parsed.unshift(TemplateResolver.templatesFolder);
        parsed.unshift(hygenAction);
        return parsed;
    }
    applyAnswers(answers, runner) {
        var e_1, _a;
        return __awaiter(this, void 0, void 0, function* () {
            const paths = [];
            try {
                for (var _b = __asyncValues(this.templates), _c; _c = yield _b.next(), !_c.done;) {
                    const template = _c.value;
                    if (!template.shouldCreateFile(answers))
                        continue;
                    const templatesPath = template.getPath();
                    const [hygenAction] = path_1.resolve(templatesPath, '..').split(path_2.sep).reverse();
                    const argv = this.parseArgvToHygen(template.parseAnswers(answers), hygenAction);
                    const result = yield runner(argv, path_1.resolve(templatesPath, '..', '..'));
                    if (!result.success) {
                        throw new Error(`Ocorreu um erro ao gerar as templates da pasta ${templatesPath}, verifique se o seu script está gerando todas as variáveis que a template precisa`);
                    }
                    paths.push(...result.actions.map(({ subject }) => subject));
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) yield _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return {
                paths
            };
        });
    }
}
exports.TemplateResolver = TemplateResolver;
TemplateResolver.templatesFolder = "templates";
//# sourceMappingURL=index.js.map