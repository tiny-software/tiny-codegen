
# Configuracoes

As configurações abaixo podem ser sobrescritas passando a flag junto do comandoou criando um json|js de configuração e informando seu caminho com a flag `config=path-to-file`.

Exemplo: `yarn codegen rootDir=examples` -> Irá utlizar a pasta examples como diretório raiz ao invés do padrão `.codegen`

Exemplo2:

- Arquivo `codegen.config.json`:

```json
{
	"rootDir": "examples"
}
```

- Comando: `yarn codegen config=src/codegen.config.json`

Todos os comandos passados com a sintaxe `comando=valor` ou que estejam no arquivo de config informado serão parseados nas configurações e serão passados nas funções acessíveis da lib, ou seja, todas funções que recebem um parametro 'config' terão a config inicial que foi parseada.

## Configurações possíveis

### 'path-to-file' Passando diretamente um path

É possível passar diretamente um path a ser executado, dessa forma, a lib não irá exibir um menu para escolher qual script será executado, exemplo:

`yarn codegen examples/Controller` -> Irá executar o script codegen.js dentro da pasta `examples/Controller`

### (rootDir=) Utilizando outro rootDir

**Default**: `.codegen`

Para utilizar um rootDir diferente, passe a flag rootDir=<caminho relativo do diretorio>, exemplo:

`yarn codegen rootDir=examples`


### (scriptPath=) Definindo diretamente o arquivo a ser rodado

**Default**: null

Essa flag é equivalente a passar diretamente o 'path-to-file'

Para não precisar escolher via prompt qual arquivo deve ser rodado, é possível passar para a CLI qual o script que será executado utilizando a flag `scriptPath`, exemplo:

`yarn codegen scriptPath=examples/Controller/codegen.js`

Irá executar diretamente os prompts que estão dentro do arquivo codegen.js especificado


### (scriptDefaultName=) Mudando o nome do script

**Default**: `codegen.js`

É possível sobrescrever o nome do arquivo que a lib irá importar para executar os prompts de suas templates, exemplo:

`yarn codegen scriptDefaultName=index.js`

