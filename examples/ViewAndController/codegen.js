const { Template, CodeGen } = require('../../dist');
const codeGenController = require('../Controller/codegen');
const codeGenView = require('../View/codegen');

const codeGen = CodeGen.combine(codeGenController, codeGenView);

codeGen.addTemplate(new Template(__dirname, '..', 'Controller', 'templates').setConditionToCreate(answers => answers["controllerName"] !== "Teste"));
codeGen.addTemplate(new Template(__dirname, '..', 'View', 'templates'));


module.exports = codeGen;
