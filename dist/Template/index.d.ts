import { Answers } from 'inquirer';
export declare class Template {
    private path;
    private answersParser;
    private condition;
    /**
     * @param {String} path - The path of the template relative to the project root
     * */
    constructor(...path: string[]);
    getPath(): string;
    /**
     * Esse método define uma callback que irá ser chamada antes da template receber as respostas.
     * Ela irá receber todas as respostas parseadas e o retorno dela definirá se o arquivo da template será gerado ou não.
     * Caso retorne true, irá gerar o arquivo.
     * */
    setConditionToCreate(condition: (answers: Answers) => boolean): this;
    shouldCreateFile(answers: Answers): boolean;
    /**
     * Define um parser customizado a ser aplicado antes das respostas serem passadas para o runner do Hygen.
     * Esse parser deve retornar um array de strings sendo que a chave deve vir sempre uma posição antes do valor.
     * Exemplo: obj = {key: value, key2: value2} => parser(obj) = [key, value, key2, value2]
     * */
    setCustomAnswersParser(customAnswersParser: (answers: Answers, prefix?: string) => string[]): this;
    parseAnswers(answers: Answers): any;
}
