import { Dirent, existsSync, readdirSync } from 'fs';
import path from 'path';

const findFileNameRecursive = (baseDir: string, fileName: string): string[] => {

	const isInsideNodeModules = (file: Dirent) => {
		return file.name.includes('node_modules');
	}

	const files = [];

	readdirSync(baseDir, { withFileTypes: true }).forEach((file) => {
		if (file.isDirectory() && !isInsideNodeModules(file)) {
			files.push(...findFileNameRecursive(path.join(baseDir, file.name), fileName));
		}

		if (file.name === fileName && !isInsideNodeModules(file)) {
			files.push(path.join(baseDir, file.name));
		}

	});

	return files;
}

const resolvePath = (filePath: string, cwd: string = process.cwd()): string => {
	const _filePath = filePath.replace(cwd, "");
	return path.join(cwd, _filePath);
}

/**
 * Import json or js file that returns an object
 * */
const importJsFile = async (filePath: string): Promise<Record<string, unknown>> => {
	if (!existsSync(resolvePath(filePath))) {
		return {};
	}

	if (!filePath.endsWith('.json') && !filePath.endsWith(".js")) {
		return {}
	}

	let file = await import(resolvePath(filePath));
	if (typeof file === 'function') {
		file = await file();
	}

	if (typeof file === 'object') {
		return {
			...file,
			success: true,
		};
	}

	return {};
}

export const file = {
	findFileNameRecursive,
	importJsFile,
	resolvePath,
}

