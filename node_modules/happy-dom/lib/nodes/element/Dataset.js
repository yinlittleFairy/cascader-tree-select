"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Dataset helper proxy.
 *
 * Reference:
 * https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset
 */
class Dataset {
    /**
     * @param element The parent element.
     */
    constructor(element) {
        // Build the initial dataset record from all data attributes.
        const dataset = {};
        const attributes = element._attributes;
        for (const name of Object.keys(attributes)) {
            if (name.startsWith('data-')) {
                const key = Dataset.kebabToCamelCase(name.replace('data-', ''));
                dataset[key] = attributes[name].value;
            }
        }
        // Documentation for Proxy:
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy
        this.proxy = new Proxy(dataset, {
            get(dataset, key) {
                const name = 'data-' + Dataset.camelCaseToKebab(key);
                if (name in attributes) {
                    return (dataset[key] = attributes[name].value);
                }
                delete dataset[key];
                return undefined;
            },
            set(dataset, key, value) {
                element.setAttribute('data-' + Dataset.camelCaseToKebab(key), value);
                dataset[key] = value;
                return true;
            },
            deleteProperty(dataset, key) {
                const name = 'data-' + Dataset.camelCaseToKebab(key);
                const result1 = delete attributes[name];
                const result2 = delete dataset[key];
                return result1 && result2;
            },
            ownKeys(dataset) {
                // According to Mozilla we have to update the dataset object (target) to contain the same keys as what we return:
                // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy/ownKeys
                // "The result List must contain the keys of all non-configurable own properties of the target object."
                const keys = [];
                const deleteKeys = [];
                for (const name of Object.keys(attributes)) {
                    if (name.startsWith('data-')) {
                        const key = Dataset.kebabToCamelCase(name.replace('data-', ''));
                        keys.push(key);
                        dataset[key] = attributes[name].value;
                        if (!dataset[key]) {
                            deleteKeys.push(key);
                        }
                    }
                }
                for (const key of deleteKeys) {
                    delete dataset[key];
                }
                return keys;
            },
            has(_dataset, key) {
                return !!attributes['data-' + Dataset.camelCaseToKebab(key)];
            }
        });
    }
    /**
     * Transforms a kebab cased string to camel case.
     *
     * @param text Text string.
     * @returns Camel cased string.
     */
    static kebabToCamelCase(text) {
        const parts = text.split('-');
        for (let i = 0, max = parts.length; i < max; i++) {
            parts[i] = i > 0 ? parts[i].charAt(0).toUpperCase() + parts[i].slice(1) : parts[i];
        }
        return parts.join('');
    }
    /**
     * Transforms a camel cased string to kebab case.
     *
     * @param text Text string.
     * @returns Kebab cased string.
     */
    static camelCaseToKebab(text) {
        return text
            .toString()
            .replace(/[A-Z]+(?![a-z])|[A-Z]/g, ($, ofs) => (ofs ? '-' : '') + $.toLowerCase());
    }
}
exports.default = Dataset;
//# sourceMappingURL=Dataset.js.map