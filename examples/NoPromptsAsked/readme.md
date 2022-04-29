# Exemplo Sem nenhum Prompt

Esse exemplo demonstra como criar um script sem nenhum prompt. Nesse cenário, as constantes de uma classe em PHP são convertidas para um objeto JS que será aplicado na template dentro desse diretório.

Isso pode ser útil quando for preciso criar arquivos durante a execução de uma action no GitHub, por exemplo.

```js
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


```
