"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CSSStyleDeclaration_1 = __importDefault(require("../../css/declaration/CSSStyleDeclaration"));
const Element_1 = __importDefault(require("../element/Element"));
const Dataset_1 = __importDefault(require("../element/Dataset"));
const HTMLElementUtility_1 = __importDefault(require("../html-element/HTMLElementUtility"));
/**
 * SVG Element.
 *
 * Reference:
 * https://developer.mozilla.org/en-US/docs/Web/API/SVGElement.
 */
class SVGElement extends Element_1.default {
    constructor() {
        super(...arguments);
        // Events
        this.onabort = null;
        this.onerror = null;
        this.onload = null;
        this.onresize = null;
        this.onscroll = null;
        this.onunload = null;
        // Private properties
        this._style = null;
        this._dataset = null;
    }
    /**
     * Returns viewport.
     *
     * @returns SVG rect.
     */
    get viewportElement() {
        return null;
    }
    /**
     * Returns current translate.
     *
     * @returns Element.
     */
    get ownerSVGElement() {
        let parent = this.parentNode;
        while (parent) {
            if (parent['tagName'] === 'SVG') {
                return parent;
            }
            parent = parent.parentNode;
        }
        return null;
    }
    /**
     * Returns data set.
     *
     * @returns Data set.
     */
    get dataset() {
        return (this._dataset ?? (this._dataset = new Dataset_1.default(this))).proxy;
    }
    /**
     * Returns style.
     *
     * @returns Style.
     */
    get style() {
        if (!this._style) {
            this._style = new CSSStyleDeclaration_1.default(this);
        }
        return this._style;
    }
    /**
     * Returns tab index.
     *
     * @returns Tab index.
     */
    get tabIndex() {
        const tabIndex = this.getAttribute('tabindex');
        return tabIndex !== null ? Number(tabIndex) : -1;
    }
    /**
     * Returns tab index.
     *
     * @param tabIndex Tab index.
     */
    set tabIndex(tabIndex) {
        if (tabIndex === -1) {
            this.removeAttribute('tabindex');
        }
        else {
            this.setAttribute('tabindex', String(tabIndex));
        }
    }
    /**
     * Triggers a blur event.
     */
    blur() {
        HTMLElementUtility_1.default.blur(this);
    }
    /**
     * Triggers a focus event.
     */
    focus() {
        HTMLElementUtility_1.default.focus(this);
    }
    /**
     * @override
     */
    setAttributeNode(attribute) {
        const replacedAttribute = super.setAttributeNode(attribute);
        if (attribute.name === 'style' && this._style) {
            this._style.cssText = attribute.value;
        }
        return replacedAttribute;
    }
    /**
     * @override
     */
    removeAttributeNode(attribute) {
        super.removeAttributeNode(attribute);
        if (attribute.name === 'style' && this._style) {
            this._style.cssText = '';
        }
        return attribute;
    }
}
exports.default = SVGElement;
//# sourceMappingURL=SVGElement.js.map