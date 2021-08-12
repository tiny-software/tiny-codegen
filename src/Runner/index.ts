import { Script } from '../Script';
import { TemplateResolver } from '../TemplateResolver';
import { Logger, runner as hygen } from 'hygen';
import { Step } from '../Step';
import { IPromptProvider } from 'src/Providers/PromptProvider/IPromptProvider';

export class Runner {

	constructor(private script: Script, private PromptProvider: IPromptProvider) { }

	public async run() {
		console.log(`running file ${this.script.getScriptPath()}`);
		const scriptConfig = this.script.getConfig();
		const answersFromCLIArgs = scriptConfig.has('answers') ? scriptConfig.get('answers') : {};

		let answers = {};
		let step: Step;
		while (step = this.script.getNextStep()) {
			step.setAnswers(answers);
			step.setConfig(scriptConfig.getConfig());
			const prompts = step.getPrompts().filter(prompt => !(prompt.getName() in answersFromCLIArgs));
			const stepAnswers = await this.PromptProvider.askPrompts(prompts);

			answers = this.script.parseAnswers(step.getPrompts(), {
				...answersFromCLIArgs,
				...answers,
				...stepAnswers,
			});
		}

		answers = await this.script.parseAllAnswers(answers);

		const template = new TemplateResolver(this.script.getTemplates());
		const { paths } = await template.applyAnswers(answers, this.getRunner());
		await this.script.onFilesCreated(paths);
	}

	private getRunner() {
		return async (argv: string[], templatesPath: string) => {
			return await hygen(argv, {
				templates: templatesPath,
				cwd: process.cwd(),
				logger: new Logger(console.log.bind(console)),
				createPrompter: () => require('inquirer'),
				exec: (action, body) => {
					const opts = body && body.length > 0 ? { input: body } : {}
					return require('execa').shell(action, opts)
				},
				debug: !!process.env.DEBUG
			});
		}
	}


}

