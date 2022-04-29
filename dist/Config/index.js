"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Config = void 0;
class Config {
    constructor(config = {}) {
        this.config = {};
        this.extend(config);
    }
    set(key, value) {
        Object.assign(this.config, {
            [key]: value
        });
    }
    extend(_config = {}) {
        this.config = Object.assign(Object.assign({}, this.config), _config);
    }
    get(key) {
        return this.config[key];
    }
    ;
    has(key) {
        return this.config.hasOwnProperty(key);
    }
    hasCallback(key) {
        return this.has(key) && typeof this.get(key) === 'function';
    }
    getConfig() {
        return this.config;
    }
    validate() {
        return true;
    }
}
exports.Config = Config;
//# sourceMappingURL=index.js.map