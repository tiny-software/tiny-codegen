import { resolve } from 'path';
import { Answers } from 'inquirer';

export class Template {
	private path: string;
	private answersParser = null;
	private condition = (_: Answers) => true;

	/**
	 * @param {String} path - The path of the template relative to the project root
	 * */
	constructor(...path: string[]) {
		this.path = resolve(...path);

		const answersParser = (answers: Answers = {}, prefix = "") => {
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
		}

		this.answersParser = answersParser;
	}

	public getPath() {
		return this.path;
	}

	/**
	 * Esse método define uma callback que irá ser chamada antes da template receber as respostas.
	 * Ela irá receber todas as respostas parseadas e o retorno dela definirá se o arquivo da template será gerado ou não.
	 * Caso retorne true, irá gerar o arquivo.
	 * */
	public setConditionToCreate(condition: (answers: Answers) => boolean) {
		this.condition = condition;
		return this;
	}

	public shouldCreateFile(answers: Answers) {
		return this.condition(answers);
	}

	/**
	 * Define um parser customizado a ser aplicado antes das respostas serem passadas para o runner do Hygen.
	 * Esse parser deve retornar um array de strings sendo que a chave deve vir sempre uma posição antes do valor.
	 * Exemplo: obj = {key: value, key2: value2} => parser(obj) = [key, value, key2, value2]
	 * */
	public setCustomAnswersParser(customAnswersParser: (answers: Answers, prefix?: string) => string[]) {
		if (!(typeof customAnswersParser === 'function')) {
			throw new Error("customAnswersParser deve ser uma função");
		}

		this.answersParser = customAnswersParser;
		return this;
	}

	public parseAnswers(answers: Answers) {
		return this.answersParser(answers);
	}
}
