# Exemplo Sem nenhum Prompt

Esse exemplo demonstra como criar um script para gerar o código de uma classe em PHP


```js
const { CodeGen, InputPrompt, CheckboxPrompt } = require('../../dist');

const interfacesMethodsEnum = {
	ShowProdutoInterface: [
		'show($id)',
		'index()'
	],
	CreateProdutoInterface: [
		'create(ProdutoDTO $produto)'
	],
	UpdateProdutoInterface: [
		'update(int $id, ProdutoDTO $produto)'
	],
	DeleteProdutoInterface: [
		'delete(int $id)'
	]
};

const codeGen = new CodeGen();

codeGen.setPrompts([
	new InputPrompt('controllerName', 'Qual é o nome do controller?'),
	new CheckboxPrompt('interfaces', 'Defina as interfaces que o controller irá implementar').setChoices(Object.entries(interfacesMethodsEnum).map(([interface, methods]) => {
		return {
			name: interface,
			value: {
				methods,
				interface,
			},
		}
	}))
])

codeGen
	.setConfig({
		onParseAllAnswers: (answers, config) => {
			if (answers.interfaces && Array.isArray(answers.interfaces)) {
				const convertMethod = (method) => {
					return `\tpublic function ${method} {\n\t\treturn "";\n\t}`;
				}

				return {
					interface_methods: [...answers.interfaces.map(({ methods }) => methods)].map(convertMethod).join('\n'),
					interfaces: answers.interfaces.map(({ interface }) => interface).join(", ")
				}
			}

			// Retorna um objeto que será feito 'merge' no objeto answers antes de aplicá-lo na template
			return {
				interfaces: "",
				interface_methods: ""
			};
		},
		enums: { ...interfacesMethodsEnum } // Todos objetos passados aqui serão passados aos parsers dos prompts e ao parse de todo objeto de answers dentro do param 'config'
	})

module.exports = codeGen;

```
