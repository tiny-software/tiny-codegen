"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InitialConfig = void 0;
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const file_helpers_1 = require("../helpers/file.helpers");
const _1 = require(".");
let instance = null;
class InitialConfig extends _1.Config {
    constructor(config) {
        super();
        this.extend(Object.assign({ rootDir: path_1.default.join(process.cwd(), '.codegen'), scriptDefaultName: 'codegen.js', cwd: process.cwd() }, config));
        this.validate();
        this.setInstance();
    }
    static getInstance(config) {
        if (!(instance instanceof InitialConfig)) {
            instance = new InitialConfig(config);
        }
        return instance;
    }
    setInstance() {
        instance = this;
    }
    set(key, value) {
        if (key === 'rootDir' && typeof value !== 'string') {
            throw new Error('rootDir must be a string');
        }
        if (key === 'rootDir' && typeof value === 'string') {
            this.extend({
                [key]: path_1.default.join(process.cwd(), value)
            });
        }
        this.extend({
            [key]: value
        });
    }
    rootDirExists() {
        return fs_1.existsSync(this.get('rootDir'));
    }
    getScripts() {
        if (!this.rootDirExists()) {
            throw new Error(`O 'rootDir' não existe, você precisa:
			- Criar o diretório '.codegen' na raiz do projeto ou definir um rootDir no arquivo de configuração ou informá-lo via argumentos na CLI`);
        }
        ;
        const _scripts = file_helpers_1.file.findFileNameRecursive(this.get('rootDir'), this.get('scriptDefaultName'));
        return _scripts
            .map(script => script.replace(new RegExp(process.cwd(), "g"), ""))
            .map(script => script.replace(new RegExp(`/${this.get('scriptDefaultName')}`, "g"), ""));
    }
    ;
    validate() {
        if (!this.rootDirExists()) {
            throw new Error(`O 'rootDir' não existe, você precisa:
			- Criar o diretório '.codegen' na raiz do projeto ou definir um rootDir no arquivo de configuração ou informá-lo via argumentos na CLI`);
        }
        ;
        if (this.has('scripts') && (this.get('scripts') || []).length === 0) {
            throw new Error(`Nenhum script encontrado dentro de: ${this.get('rootDir')}, crie um diretório para seu primeiro script e dentro dele uma pasta 'templates' para suas templates e um arquivo codegen.js com os seus prompts`);
        }
        ;
        return true;
    }
}
exports.InitialConfig = InitialConfig;
//# sourceMappingURL=InitialConfig.js.map