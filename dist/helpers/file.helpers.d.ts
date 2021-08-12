export declare const file: {
    findFileNameRecursive: (baseDir: string, fileName: string) => string[];
    importJsFile: (filePath: string) => Promise<Record<string, unknown>>;
    resolvePath: (filePath: string, cwd?: string) => string;
};
