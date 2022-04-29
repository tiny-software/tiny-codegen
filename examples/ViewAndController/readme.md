# Exemplo Sem nenhum Prompt

Esse exemplo demonstra combinar vários scripts para gerar o código de várias entidades com 1 prompt


```js
const { Template, CodeGen } = require('../../dist');
const codeGenController = require('../Controller/codegen');
const codeGenView = require('../View/codegen');

// O método estático 'combine' irá combinar todos os prompts e configs de codeGenController e codeGenView
// Caso ambos possuam um prompt com o mesmo 'name', somente o primeiro será solicitado, o 'name' de todos prompts deve ser único
const codeGen = CodeGen.combine(codeGenController, codeGenView);

// As templates devem ser adicionadas ao objeto que será exportado
// o método 'setConditionToCreate' aceita uma callback para testar o objeto de answers com alguma condição, caso retorne false, o arquivo da template não será criado
codeGen.addTemplate(new Template(__dirname, '..', 'Controller', 'templates').setConditionToCreate(answers => answers["controllerName"] !== "Teste"));
codeGen.addTemplate(new Template(__dirname, '..', 'View', 'templates'));

module.exports = codeGen;

```
