const { CodeGen, InputPrompt, Step, ListPrompt } = require('../../dist');

const codeGen = new CodeGen({
	onParseAllAnswers: (answers, _config) => {
		const campos = answers.campos;
		if (!campos || !Array.isArray(campos)) return answers;
		const buildCampo = campo => {
			return `\t${campo.name}: ${campo.type};`
		}

		return {
			campos: campos.map(campo => buildCampo(answers[campo])).join("\n")
		}
	}
});

codeGen
	.addStep(new Step([
		new InputPrompt('entityName', 'Qual é o nome da entity?'),
		new InputPrompt('campos', 'Defina o nome dos campos da entity (separados por vírgula)').setParser(campos => campos.split(',').map(c => c.trim().toLowerCase())),
	]))
	.addStep(new Step((answers, config) => {
		const campos = answers.campos;

		const prompts = [];
		prompts.push(
			new ListPrompt('campo_primary', 'Qual campo é a chave primária?')
				.setChoices(campos.map(campo => ({ name: campo, value: campo })))
		)

		prompts.push(...campos.map(campo => new ListPrompt(campo, `[${campo}] - Qual o tipo do campo?`)
			.setChoices([
				{
					name: 'string',
					value: 'string',
				},
				{
					name: 'number',
					value: 'number',
				},
				{
					name: 'boolean',
					value: 'boolean',
				},
				{
					name: 'Date',
					value: 'Date',
				},
			])
			.setParser((type) => {
				return {
					name: campo,
					type,
				}
			}))
		);

		return prompts;
	}))

module.exports = codeGen;
