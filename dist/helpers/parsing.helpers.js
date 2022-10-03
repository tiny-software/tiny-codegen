"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parse = void 0;
const fs_1 = require("fs");
const php_parser_1 = __importDefault(require("php-parser"));
const file_helpers_1 = require("./file.helpers");
exports.parse = {
    argumentsToObject: (_args = []) => __awaiter(void 0, void 0, void 0, function* () {
        const isPath = str => str.indexOf('/') !== -1;
        let result = {
            answers: {},
            config: {},
        };
        let configPath = "";
        _args.slice(2).forEach((arg) => {
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
            }
            else if (isPath(argParts[0])) {
                result.config["scriptPath"] = arg;
            }
            else if (typeof argParts[0] === 'string' && argParts[0].startsWith("--")) {
                const flag = argParts[0].slice(2);
                if (flag) {
                    result.answers[flag] = true;
                }
            }
        });
        if (configPath) {
            const _a = yield file_helpers_1.file.importJsFile(configPath), { success } = _a, config = __rest(_a, ["success"]);
            if (success) {
                result.config = Object.assign(Object.assign({}, result.config), config);
            }
        }
        return result;
    }),
    phpEnum: (phpFile = "", config = {}) => {
        if (!fs_1.existsSync(phpFile)) {
            return null;
        }
        //@ts-ignore
        const phpParser = new php_parser_1.default({
            parser: {
                php7: true
            },
        });
        const getClassConstants = (parsedClass) => {
            if (!parsedClass || typeof parsedClass !== 'object')
                return null;
            const constants = [];
            const iterable = Array.isArray(parsedClass) ? parsedClass : Object.values(parsedClass);
            iterable.forEach((value) => {
                if (!value)
                    return;
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
            const parsed = phpParser.parseCode(fs_1.readFileSync(phpFile, 'utf8'));
            if (config.returnRawPhpFile) {
                return parsed;
            }
            const constants = getClassConstants(parsed);
            if (!constants || !Array.isArray(constants)) {
                throw new Error("Invalid parsing result");
            }
            const parsedEnum = constants.reduce((acc, constante) => {
                const { name, value } = constante;
                return Object.assign(Object.assign({}, acc), { [name.name]: value.value });
            }, {});
            return parsedEnum;
        }
        catch (error) {
            throw new Error("Não foi possível converter o enum: " + phpFile);
        }
    },
};
//# sourceMappingURL=parsing.helpers.js.map