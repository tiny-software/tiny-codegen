# Como iniciar

Instale:
`yarn add tiny-codegen`

# Crie o rootDir (.codegen)

- Crie uma pasta na raiz do seu projeto chamada (.codegen)
- Dentro dessa pasta, crie sub-pastas para armazenar a lógica de cada geração de código diferente, exemplo:

```
.codegen
├── Controller
│   ├── codegen.js
│   └── templates
│       └── Controller.ejs.t
└── View
    ├── codegen.js
    └── templates
        └── View.ejs.t
```

- Cada sub-pasta **deve** possuir obrigatoriamente um arquivo `codegen.js` e uma pasta `templates` contendo os arquivos de templates a serem utilizados ou utilizar o método `addTemplate` no script para utilizar templates de outras pastas.


# Gerando o código

Agora, rode `yarn codegen` ou `npm run codegen`, e o rootDir será escaneado buscando arquivos `codegen.js` e irá solicitar qual arquivo deve ser rodado, exemplo:

Essa estrutura:

```
.codegen
├── Controller
│   ├── codegen.js
│   └── templates
│       └── Controller.ejs.t
└── View
    ├── codegen.js
    └── templates
        └── View.ejs.t
```


Irá resultar na seguinte pergunta:


```shell
? Escolha qual template deseja gerar (Use arrow keys)
❯ /.codegen/Controller 
  /.codegen/View 
```

Ao selecionar uma das opções, o arquivo codegen.js será importado e os prompts que você definiu dentro dele serão solicitados para a criação da template, exemplo:

Arquivo ./codegen/Controller/codegen.js:

```js
const { InputPrompt, CodeGen } = require('simple-codegen');

const codeGen = new CodeGen();

// Utilizar sempre as classes exportadas da lib com sufixo 'Prompt'
codeGen.addPrompt(new InputPrompt('name', 'Qual é o nome do controller?'));

// O objeto exportado deve ser sempre uma instância de CodeGen
module.exports = codeGen;

```

Prompt:

```shell
? Escolha qual template deseja gerar /.codegen/Controller
running file /usr/github/misc/codegen/examples/.codegen/Controller/codegen.js
? Qual é o nome do controller? Produto
```

Arquivo ./codegen/Controller/templates/Controller.ejs.t:

```ejs
---
to: examples/Controllers/<%=name%>Controller.php
---

class <%=name%>Controller {

	public index() {
		return "Hello World";
	}

	public foo() {
		return "Hello World";
	}
}

```

Ao responder ao último prompt exportado do arquivo codegen.js, as respostas serão parseadas e serão aplicadas a todas as templates dentro da pasta `templates`.

Resultado final do exemplo:

examples/examples/Controllers/ProdutoController.php:

```js
class ProdutoController {

	public index() {
		return "Hello World";
	}

	public foo() {
		return "Hello World";
	}
}

```
