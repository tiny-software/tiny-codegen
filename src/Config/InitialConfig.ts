import { existsSync } from 'fs';
import path from 'path';
import { file } from '../helpers/file.helpers';
import { Config } from '.';

let instance: InitialConfig | null = null;

export class InitialConfig extends Config {

	private constructor(config?: Record<string, unknown>) {
		super();

		this.extend({
			rootDir: path.join(process.cwd(), '.codegen'),
			scriptDefaultName: 'codegen.js',
			cwd: process.cwd(),
			...config,
		});
		this.validate();
		this.setInstance();
	}

	public static getInstance(config?: Record<string, unknown>) {
		if (!(instance instanceof InitialConfig)) {
			instance = new InitialConfig(config);
		}
		return instance;
	}

	public setInstance() {
		instance = this;
	}

	protected set(key: string, value: string | unknown) {
		if (key === 'rootDir' && typeof value !== 'string') {
			throw new Error('rootDir must be a string');
		}

		if (key === 'rootDir' && typeof value === 'string') {
			this.extend({
				[key]: path.join(process.cwd(), value)
			})
		}

		this.extend({
			[key]: value
		});
	}

	private rootDirExists() {
		return existsSync(this.get('rootDir'));
	}

	public getScripts() {
		if (!this.rootDirExists()) {
			throw new Error(`O 'rootDir' não existe, você precisa:
			- Criar o diretório '.codegen' na raiz do projeto ou definir um rootDir no arquivo de configuração ou informá-lo via argumentos na CLI`);
		};

		const _scripts = file.findFileNameRecursive(this.get('rootDir'), this.get('scriptDefaultName'));

		return _scripts
			.map(script => script.replace(new RegExp(process.cwd(), "g"), ""))
			.map(script => script.replace(new RegExp(`/${this.get('scriptDefaultName')}`, "g"), ""))

	};

	protected validate() {
		if (!this.rootDirExists()) {
			throw new Error(`O 'rootDir' não existe, você precisa:
			- Criar o diretório '.codegen' na raiz do projeto ou definir um rootDir no arquivo de configuração ou informá-lo via argumentos na CLI`);
		};

		if (this.has('scripts') && (this.get('scripts') || []).length === 0) {
			throw new Error(`Nenhum script encontrado dentro de: ${this.get('rootDir')}, crie um diretório para seu primeiro script e dentro dele uma pasta 'templates' para suas templates e um arquivo codegen.js com os seus prompts`);
		};

		return true;

	}

}
