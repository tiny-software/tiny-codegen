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
	new InputPrompt('viewName', 'Qual é o nome da View?'),
	new CheckboxPrompt('interfaces', 'Defina as interfaces que a View irá implementar').setChoices(Object.entries(interfacesMethodsEnum).map(([interface, methods]) => {
		return {
			name: interface,
			value: {
				methods,
				interface,
			},
		}
	}))
])

codeGen.setConfig({
	onParseAllAnswers: (answers, config) => {
		if (answers.interfaces && Array.isArray(answers.interfaces)) {
			const convertMethod = (methods) => {
				return methods.map(method => `\tpublic function ${method} {\n\t\treturn "";\n\t}`).join("\n");
			}

			return {
				interface_methods: [...answers.interfaces.map(({ methods }) => methods)].map(convertMethod).join('\n'),
				interfaces: answers.interfaces.map(({ interface }) => interface).join(", ")
			}
		}

		return {
			interfaces: "",
			interface_methods: ""
		};
	},
})

module.exports = codeGen;
