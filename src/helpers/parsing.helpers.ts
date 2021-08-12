import { existsSync, readFileSync } from 'fs';
import Engine from 'php-parser';
import { file } from './file.helpers';

export const parse = {
	argumentsToObject: async (_args: string[] = []) => {
		const isPath = str => str.indexOf('/') !== -1;
		let result = {
			answers: {},
			config: {},
		};

		let configPath = "";

		_args.slice(2).forEach((arg: string) => {
			const argParts = arg.split('=');
			if (argParts.length === 2) {
				const [key, value] = argParts;
				if (key.startsWith("--")) {
					result.answers[key.substring(2)] = value;
					return;
				}

				if (key == "config") {
					configPath = value;
					return;
				}

				result.config[key] = value;
			} else if (isPath(argParts[0])) {
				result.config["scriptPath"] = arg;
			}
		});

		if (configPath) {
			const { success, ...config } = await file.importJsFile(configPath);
			if (success) {
				result.config = { ...result.config, ...config };
			}
		}

		return result;
	},

	phpEnum: (phpFile = "", config: Record<string, unknown> = {}) => {
		if (!existsSync(phpFile)) {
			return null;
		}

		//@ts-ignore
		const phpParser = new Engine({
			parser: {
				php7: true
			},
		});

		const getClassConstants = (parsedClass) => {
			if (!parsedClass || typeof parsedClass !== 'object') return null;
			const constants = [];

			const iterable = Array.isArray(parsedClass) ? parsedClass : Object.values(parsedClass);

			iterable.forEach((value) => {
				if (!value) return;
				if ((typeof value === 'object') && "kind" in value && value.kind === "constant") {
					constants.push(value);
				}

				if (typeof value === 'object') {
					constants.push(...getClassConstants(value));
				}
			});

			return constants;
		};

		try {
			const parsed = phpParser.parseCode(readFileSync(phpFile, 'utf8'));
			if (config.returnRawPhpFile) {
				return parsed;
			}

			const constants = getClassConstants(parsed);
			if (!constants || !Array.isArray(constants)) {
				throw new Error("Invalid parsing result");
			}

			const parsedEnum = constants.reduce((acc, constante) => {
				const { name, value } = constante;
				return {
					...acc,
					[name.name]: value.value
				}
			}, {});

			return parsedEnum;
		} catch (error) {
			throw new Error("Não foi possível converter o enum: " + phpFile);
		}
	},
};

