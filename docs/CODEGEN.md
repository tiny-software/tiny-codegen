# Objeto CodeGen

Todo script que for criado para geração de templates deve exportar uma instância da classe `CodeGen`, através dessa classe a lib importa os prompts, steps, configurações do script e templates.

Exemplo:

```js
const { CodeGen, InputPrompt, CheckboxPrompt } = require('tiny-codegen');

const codeGen = new CodeGen();

codeGen.addPrompt(
	new InputPrompt('controllerName', 'Qual é o nome do controller?'),
);

module.exports = codeGen;

```

## addPrompt

Método responsável por adicionar um prompt (pergunta) ao script, deve ser utilizado uma das abstrações de prompts existentes (InputPrompt, CheckboxPrompt, ListPrompt)

## setPrompts

Igual ao addPrompt mas aceita um array de prompts

## addStep

Adiciona um step ao script, steps são úteis quando se deseja gerar prompts dinamicamente dependendo das respostas de outro prompt, o construtor de `Step` aceita um array de prompts ou uma callback que recebe o objeto de `answers` atual e as configs e deve retornar sempre um array de prompts,  exemplo:

```js
const { CodeGen, InputPrompt, Step, ListPrompt } = require('tiny-codegen');

const codeGen = new CodeGen();

codeGen
	.addStep(new Step([
		new InputPrompt('entityName', 'Qual é o nome da entity?'),
		new InputPrompt('campos', 'Defina o nome dos campos da entity (separados por vírgula)').setParser(campos => campos.split(',').map(c => c.trim())),
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

```

## combine

Esse método combina 1 ou mais instâncias de outros codegens

> Importante, caso 2 scripts possuam prompts com mesmo 'name', somente o primeiro irá ser exibido

exemplo:

```js
const { CodeGen } = require('tiny-codegen');
const codeGenController = require('../Controller/codegen');
const codeGenView = require('../View/codegen');

const codeGen = CodeGen.combine(codeGenController, codeGenView);


module.exports = codeGen;

```

## addTemplate

Esse método pode ser utilizado para adicionar manualmente uma pasta de templates que irá receber as respostas dos prompts

Isso é util quando for necessário combinar 2 ou mais scripts em 1 só

exemplo:

```js
const { Template, CodeGen } = require('tiny-codegen');
const codeGenController = require('../Controller/codegen');
const codeGenView = require('../View/codegen');

const codeGen = CodeGen.combine(codeGenController, codeGenView);

codeGen.addTemplate(new Template(__dirname, '..', 'Controller', 'templates').setConditionToCreate(answers => answers["controllerName"] !== "Teste"));
codeGen.addTemplate(new Template(__dirname, '..', 'View', 'templates'));


module.exports = codeGen;

```


*OBS*: Caso alguma template seja adicionada por esse método, a pasta 'templates' do diretório atual será ignorada

> É possível definir uma condição para aplicar ou não as respostas na template passando uma callback no método Template.setConditionToCreate(), essa callback irá receber as respostas parseadas do script e deve retornar um booleano (true=criar arquivos com base na template)
