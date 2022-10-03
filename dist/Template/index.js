"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Template = void 0;
const path_1 = require("path");
class Template {
    /**
     * @param {String} path - The path of the template relative to the project root
     * */
    constructor(...path) {
        this.basePath = Template.defaultBasePath;
        this.answersParser = null;
        this.condition = (_) => true;
        this.path = path_1.resolve(...path);
        const answersParser = (answers = {}, prefix = "") => {
            return Object.entries(answers).reduce((acc, currentAnswer) => {
                const [answerName, value] = currentAnswer;
                const _prefix = prefix ? `${prefix}_` : "";
                const key = `${_prefix}${answerName}`;
                if (typeof value === 'object') {
                    if (Array.isArray(value)) {
                        acc.push(...[`${key}_count`, value.length]);
                    }
                    return [...acc, ...answersParser(value, key)];
                }
                return [...acc, key, value];
            }, []);
        };
        this.answersParser = answersParser;
    }
    setBasePath(basePath) {
        this.basePath = basePath;
        return this;
    }
    getBasePath() {
        return this.basePath;
    }
    getPath() {
        return this.path;
    }
    /**
     * Esse método define uma callback que irá ser chamada antes da template receber as respostas.
     * Ela irá receber todas as respostas parseadas e o retorno dela definirá se o arquivo da template será gerado ou não.
     * Caso retorne true, irá gerar o arquivo.
     * */
    setConditionToCreate(condition) {
        this.condition = condition;
        return this;
    }
    shouldCreateFile(answers) {
        return this.condition(answers);
    }
    /**
     * Define um parser customizado a ser aplicado antes das respostas serem passadas para o runner do Hygen.
     * Esse parser deve retornar um array de strings sendo que a chave deve vir sempre uma posição antes do valor.
     * Exemplo: obj = {key: value, key2: value2} => parser(obj) = [key, value, key2, value2]
     * */
    setCustomAnswersParser(customAnswersParser) {
        if (!(typeof customAnswersParser === 'function')) {
            throw new Error("customAnswersParser deve ser uma função");
        }
        this.answersParser = customAnswersParser;
        return this;
    }
    parseAnswers(answers) {
        return this.answersParser(answers);
    }
}
exports.Template = Template;
Template.defaultBasePath = "templates";
//# sourceMappingURL=index.js.map