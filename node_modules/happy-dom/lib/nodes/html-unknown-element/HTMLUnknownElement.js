"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const HTMLElement_1 = __importDefault(require("../html-element/HTMLElement"));
const NodeList_1 = __importDefault(require("../node/NodeList"));
const HTMLCollection_1 = __importDefault(require("../element/HTMLCollection"));
/**
 * HTML Unknown Element.
 *
 * Reference:
 * https://developer.mozilla.org/en-US/docs/Web/API/HTMLUnknownElement.
 */
class HTMLUnknownElement extends HTMLElement_1.default {
    constructor() {
        super(...arguments);
        this._customElementDefineCallback = null;
    }
    /**
     * Connects this element to another element.
     *
     * @param parentNode Parent node.
     */
    _connectToNode(parentNode = null) {
        const tagName = this.tagName;
        // This element can potentially be a custom element that has not been defined yet
        // Therefore we need to register a callback for when it is defined in CustomElementRegistry and replace it with the registered element (see #404)
        if (tagName.includes('-')) {
            const callbacks = this.ownerDocument.defaultView.customElements._callbacks;
            if (parentNode && !this._customElementDefineCallback) {
                const callback = () => {
                    if (this.parentNode) {
                        const newElement = this.ownerDocument.createElement(tagName);
                        newElement.childNodes = this.childNodes;
                        newElement.children = this.children;
                        newElement.isConnected = this.isConnected;
                        newElement._rootNode = this._rootNode;
                        newElement._formNode = this._formNode;
                        newElement._selectNode = this._selectNode;
                        newElement._textAreaNode = this._textAreaNode;
                        newElement._observers = this._observers;
                        newElement._isValue = this._isValue;
                        newElement._attributes = this._attributes;
                        this.childNodes = new NodeList_1.default();
                        this.children = new HTMLCollection_1.default();
                        this._rootNode = null;
                        this._formNode = null;
                        this._selectNode = null;
                        this._textAreaNode = null;
                        this._observers = [];
                        this._isValue = null;
                        this._attributes = {};
                        for (let i = 0, max = this.parentNode.childNodes.length; i < max; i++) {
                            if (this.parentNode.childNodes[i] === this) {
                                this.parentNode.childNodes[i] = newElement;
                                break;
                            }
                        }
                        if (this.parentNode.children) {
                            for (let i = 0, max = this.parentNode.children.length; i < max; i++) {
                                if (this.parentNode.children[i] === this) {
                                    this.parentNode.children[i] = newElement;
                                    break;
                                }
                            }
                        }
                        if (newElement.isConnected && newElement.connectedCallback) {
                            newElement.connectedCallback();
                        }
                    }
                };
                callbacks[tagName] = callbacks[tagName] || [];
                callbacks[tagName].push(callback);
                this._customElementDefineCallback = callback;
            }
            else if (!parentNode && callbacks[tagName] && this._customElementDefineCallback) {
                const index = callbacks[tagName].indexOf(this._customElementDefineCallback);
                if (index !== -1) {
                    callbacks[tagName].splice(index, 1);
                }
                if (!callbacks[tagName].length) {
                    delete callbacks[tagName];
                }
                this._customElementDefineCallback = null;
            }
        }
        super._connectToNode(parentNode);
    }
}
exports.default = HTMLUnknownElement;
//# sourceMappingURL=HTMLUnknownElement.js.map