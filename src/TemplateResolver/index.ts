import { resolve } from 'path';
import { Answers } from 'inquirer';
import { sep } from 'path';
import { RunnerResult } from 'hygen/dist/types';
import { Template } from '../Template';

export type TemplatesRunnerType = (argv: string[], templatesPath: string) => Promise<RunnerResult>;
export class TemplateResolver {

	public static templatesFolder = "templates";

	constructor(private templates: Template[]) {}

	private parseArgvToHygen(argv: string[], hygenAction: string) {
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

	public async applyAnswers(answers: Answers, runner: TemplatesRunnerType) {
		const paths = [];

		for await (const template of this.templates) {
			if (!template.shouldCreateFile(answers)) continue;
			const templatesPath = template.getPath();
			const [hygenAction] = resolve(templatesPath, '..').split(sep).reverse();
			const argv = this.parseArgvToHygen(template.parseAnswers(answers), hygenAction);
			const result = await runner(argv, resolve(templatesPath, '..', '..'));

			if (!result.success) {
				throw new Error(`Ocorreu um erro ao gerar as templates da pasta ${templatesPath}, verifique se o seu script está gerando todas as variáveis que a template precisa`);
			}

			paths.push(...result.actions.map(({ subject }) => subject))

		}

		return {
			paths
		};
	}

}
