"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasePrompt = void 0;
class BasePrompt {
    constructor(name, type, message, defaultValue = "", prefix = "", suffix = "") {
        this.name = name;
        this.type = type;
        this.message = message;
        this.default = defaultValue;
        this.prefix = prefix;
        this.suffix = suffix;
    }
    getName() {
        var _a, _b;
        const suffix = (_a = this.suffix) !== null && _a !== void 0 ? _a : "";
        const prefix = (_b = this.prefix) !== null && _b !== void 0 ? _b : "";
        return `${prefix}${this.name}${suffix}`;
    }
    getType() {
        return this.type;
    }
    getMessage() {
        return this.message;
    }
    getDefault() {
        return this.default;
    }
    getPrefix() {
        return this.prefix;
    }
    getSuffix() {
        return this.suffix;
    }
    getFilter() {
        return this.filter;
    }
    getWhen() {
        return this.when;
    }
    getParser() {
        return this.parser;
    }
    getValidate() {
        return this.validate;
    }
    hasParser() {
        return this.parser && typeof this.parser === 'function';
    }
    hasValidate() {
        return this.validate && typeof this.validate === 'function';
    }
    hasWhen() {
        return this.when && typeof this.when === 'function';
    }
    hasDefault() {
        return this.default !== undefined;
    }
    hasFilter() {
        return this.filter && typeof this.filter === 'function';
    }
    hasPrefix() {
        return this.prefix && typeof this.prefix === 'string';
    }
    hasSuffix() {
        return this.suffix && typeof this.suffix === 'string';
    }
    setParser(parser) {
        this.parser = parser;
        return this;
    }
    setValidate(validate) {
        this.validate = validate;
        return this;
    }
    parseMethods(config) {
        this.parseValidate(config);
        this.parseWhen(config);
        this.parseFilter(config);
        this.parseDefault(config);
    }
    parseValidate(config) {
        if (this.hasValidate()) {
            const clone = this.validate;
            return this.setValidate((input, answers) => {
                return clone(input, answers, config.getConfig());
            });
        }
        this.setValidate(null);
    }
    parseWhen(config) {
        if (this.hasWhen()) {
            const clone = this.when;
            return this.setWhen((answers) => {
                return clone(answers, config.getConfig());
            });
        }
        this.setWhen(null);
    }
    parseFilter(config) {
        if (this.hasFilter()) {
            const clone = this.filter;
            return this.setFilter((input, answers) => {
                return clone(input, answers, config.getConfig());
            });
        }
        this.setFilter(null);
    }
    parseDefault(config) {
        if (this.hasDefault() && typeof this.default === 'function') {
            const clone = this.default;
            return this.setDefault((answers) => {
                return clone(answers, config.getConfig());
            });
        }
    }
    setWhen(when) {
        this.when = when;
        return this;
    }
    setDefault(defaultValue) {
        this.default = defaultValue;
        return this;
    }
    setPrefix(prefix) {
        this.prefix = prefix;
        return this;
    }
    setSuffix(suffix) {
        this.suffix = suffix;
        return this;
    }
    setFilter(filter) {
        this.filter = filter;
        return this;
    }
    getPrompt() {
        let prompt = {
            name: this.getName(),
            type: this.getType(),
            message: this.getMessage(),
        };
        if (this.hasDefault())
            Object.assign(prompt, { default: this.getDefault() });
        if (this.hasParser())
            Object.assign(prompt, { parser: this.getParser() });
        if (this.hasValidate())
            Object.assign(prompt, { validate: this.getValidate() });
        if (this.hasFilter())
            Object.assign(prompt, { filter: this.getFilter() });
        if (this.hasWhen())
            Object.assign(prompt, { when: this.getWhen() });
        return prompt;
    }
}
exports.BasePrompt = BasePrompt;
//# sourceMappingURL=BasePrompt.js.map