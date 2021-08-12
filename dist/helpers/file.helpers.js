"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.file = void 0;
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const findFileNameRecursive = (baseDir, fileName) => {
    const isInsideNodeModules = (file) => {
        return file.name.includes('node_modules');
    };
    const files = [];
    fs_1.readdirSync(baseDir, { withFileTypes: true }).forEach((file) => {
        if (file.isDirectory() && !isInsideNodeModules(file)) {
            files.push(...findFileNameRecursive(path_1.default.join(baseDir, file.name), fileName));
        }
        if (file.name === fileName && !isInsideNodeModules(file)) {
            files.push(path_1.default.join(baseDir, file.name));
        }
    });
    return files;
};
const resolvePath = (filePath, cwd = process.cwd()) => {
    const _filePath = filePath.replace(cwd, "");
    return path_1.default.join(cwd, _filePath);
};
/**
 * Import json or js file that returns an object
 * */
const importJsFile = (filePath) => __awaiter(void 0, void 0, void 0, function* () {
    if (!fs_1.existsSync(resolvePath(filePath))) {
        return {};
    }
    if (!filePath.endsWith('.json') && !filePath.endsWith(".js")) {
        return {};
    }
    let file = yield Promise.resolve().then(() => __importStar(require(resolvePath(filePath))));
    if (typeof file === 'function') {
        file = yield file();
    }
    if (typeof file === 'object') {
        return Object.assign(Object.assign({}, file), { success: true });
    }
    return {};
});
exports.file = {
    findFileNameRecursive,
    importJsFile,
    resolvePath,
};
//# sourceMappingURL=file.helpers.js.map