const { CodeGen } = require('../../dist');

const codeGen = new CodeGen().setConfig({
	enums: {
		Teste: "examples/NoPromptsAsked/testeEnum.php"
	},
	onParseAllAnswers: (_, config) => ({
		objeto: JSON.stringify(config.enums.Teste, null, 2)
	})
})

module.exports = codeGen;
