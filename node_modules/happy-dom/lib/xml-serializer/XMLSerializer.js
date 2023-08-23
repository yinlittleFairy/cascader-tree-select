"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Node_1 = __importDefault(require("../nodes/node/Node"));
const VoidElements_1 = __importDefault(require("../config/VoidElements"));
const NodeTypeEnum_1 = __importDefault(require("../nodes/node/NodeTypeEnum"));
const Entities = __importStar(require("entities"));
/**
 * Utility for converting an element to string.
 */
class XMLSerializer {
    /**
     * Constructor.
     *
     * @param [options] Options.
     * @param [options.includeShadowRoots] Include shadow roots.
     * @param [options.escapeEntities] Escape text.
     */
    constructor(options) {
        this._options = {
            includeShadowRoots: false,
            escapeEntities: true
        };
        if (options) {
            if (options.includeShadowRoots !== undefined) {
                this._options.includeShadowRoots = options.includeShadowRoots;
            }
            if (options.escapeEntities !== undefined) {
                this._options.escapeEntities = options.escapeEntities;
            }
        }
    }
    /**
     * Renders an element as HTML.
     *
     * @param root Root element.
     * @returns Result.
     */
    serializeToString(root) {
        switch (root.nodeType) {
            case NodeTypeEnum_1.default.elementNode:
                const element = root;
                const tagName = element.tagName.toLowerCase();
                if (VoidElements_1.default[element.tagName]) {
                    return `<${tagName}${this._getAttributes(element)}>`;
                }
                const childNodes = tagName === 'template'
                    ? root.content.childNodes
                    : root.childNodes;
                let innerHTML = '';
                for (const node of childNodes) {
                    innerHTML += this.serializeToString(node);
                }
                if (this._options.includeShadowRoots && element.shadowRoot) {
                    innerHTML += `<template shadowrootmode="${element.shadowRoot.mode}">`;
                    for (const node of element.shadowRoot.childNodes) {
                        innerHTML += this.serializeToString(node);
                    }
                    innerHTML += '</template>';
                }
                return `<${tagName}${this._getAttributes(element)}>${innerHTML}</${tagName}>`;
            case Node_1.default.DOCUMENT_FRAGMENT_NODE:
            case Node_1.default.DOCUMENT_NODE:
                let html = '';
                for (const node of root.childNodes) {
                    html += this.serializeToString(node);
                }
                return html;
            case NodeTypeEnum_1.default.commentNode:
                return `<!--${root.textContent}-->`;
            case NodeTypeEnum_1.default.processingInstructionNode:
                // TODO: Add support for processing instructions.
                return `<!--?${root.target} ${root.textContent}?-->`;
            case NodeTypeEnum_1.default.textNode:
                return this._options.escapeEntities
                    ? Entities.escapeText(root.textContent)
                    : root.textContent;
            case NodeTypeEnum_1.default.documentTypeNode:
                const doctype = root;
                const identifier = doctype.publicId ? ' PUBLIC' : doctype.systemId ? ' SYSTEM' : '';
                const publicId = doctype.publicId ? ` "${doctype.publicId}"` : '';
                const systemId = doctype.systemId ? ` "${doctype.systemId}"` : '';
                return `<!DOCTYPE ${doctype.name}${identifier}${publicId}${systemId}>`;
        }
        return '';
    }
    /**
     * Returns attributes as a string.
     *
     * @param element Element.
     * @returns Attributes.
     */
    _getAttributes(element) {
        let attributeString = '';
        if (!element._attributes.is && element._isValue) {
            attributeString += ' is="' + element._isValue + '"';
        }
        for (const attribute of Object.values(element._attributes)) {
            if (attribute.value !== null) {
                const escapedValue = this._options.escapeEntities
                    ? Entities.escapeText(attribute.value)
                    : attribute.value;
                attributeString += ' ' + attribute.name + '="' + escapedValue + '"';
            }
        }
        return attributeString;
    }
}
exports.default = XMLSerializer;
//# sourceMappingURL=XMLSerializer.js.map