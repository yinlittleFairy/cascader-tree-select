"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const NodeTypeEnum_1 = __importDefault(require("../node/NodeTypeEnum"));
const NodeUtility_1 = __importDefault(require("../node/NodeUtility"));
const DOMException_1 = __importDefault(require("../../exception/DOMException"));
const DOMExceptionNameEnum_1 = __importDefault(require("../../exception/DOMExceptionNameEnum"));
const NAMED_ITEM_ATTRIBUTES = ['id', 'name'];
/**
 * Element utility.
 */
class ElementUtility {
    /**
     * Handles appending a child element to the "children" property.
     *
     * @param ancestorNode Ancestor node.
     * @param node Node to append.
     * @param [options] Options.
     * @param [options.disableAncestorValidation] Disables validation for checking if the node is an ancestor of the ancestorNode.
     * @returns Appended node.
     */
    static appendChild(ancestorNode, node, options) {
        if (node.nodeType === NodeTypeEnum_1.default.elementNode && node !== ancestorNode) {
            if (!options?.disableAncestorValidation &&
                NodeUtility_1.default.isInclusiveAncestor(node, ancestorNode)) {
                throw new DOMException_1.default("Failed to execute 'appendChild' on 'Node': The new node is a parent of the node to insert to.", DOMExceptionNameEnum_1.default.domException);
            }
            if (node.parentNode && node.parentNode.children) {
                const index = node.parentNode.children.indexOf(node);
                if (index !== -1) {
                    for (const attribute of NAMED_ITEM_ATTRIBUTES) {
                        if (node._attributes[attribute]) {
                            node.parentNode.children._removeNamedItem(node, node._attributes[attribute].value);
                        }
                    }
                    node.parentNode.children.splice(index, 1);
                }
            }
            for (const attribute of NAMED_ITEM_ATTRIBUTES) {
                if (node._attributes[attribute]) {
                    ancestorNode.children._appendNamedItem(node, node._attributes[attribute].value);
                }
            }
            ancestorNode.children.push(node);
            NodeUtility_1.default.appendChild(ancestorNode, node, { disableAncestorValidation: true });
        }
        else {
            NodeUtility_1.default.appendChild(ancestorNode, node, options);
        }
        return node;
    }
    /**
     * Handles removing a child element from the "children" property.
     *
     * @param ancestorNode Ancestor node.
     * @param node Node.
     * @returns Removed node.
     */
    static removeChild(ancestorNode, node) {
        if (node.nodeType === NodeTypeEnum_1.default.elementNode) {
            const index = ancestorNode.children.indexOf(node);
            if (index !== -1) {
                for (const attribute of NAMED_ITEM_ATTRIBUTES) {
                    if (node._attributes[attribute]) {
                        ancestorNode.children._removeNamedItem(node, node._attributes[attribute].value);
                    }
                }
                ancestorNode.children.splice(index, 1);
            }
        }
        NodeUtility_1.default.removeChild(ancestorNode, node);
        return node;
    }
    /**
     *
     * Handles inserting a child element to the "children" property.
     *
     * @param ancestorNode Ancestor node.
     * @param newNode Node to insert.
     * @param referenceNode Node to insert before.
     * @param [options] Options.
     * @param [options.disableAncestorValidation] Disables validation for checking if the node is an ancestor of the ancestorNode.
     * @returns Inserted node.
     */
    static insertBefore(ancestorNode, newNode, referenceNode, options) {
        // NodeUtility.insertBefore() will call appendChild() for the scenario where "referenceNode" is "null" or "undefined"
        if (newNode.nodeType === NodeTypeEnum_1.default.elementNode && referenceNode) {
            if (!options?.disableAncestorValidation &&
                NodeUtility_1.default.isInclusiveAncestor(newNode, ancestorNode)) {
                throw new DOMException_1.default("Failed to execute 'insertBefore' on 'Node': The new node is a parent of the node to insert to.", DOMExceptionNameEnum_1.default.domException);
            }
            if (newNode.parentNode && newNode.parentNode.children) {
                const index = newNode.parentNode.children.indexOf(newNode);
                if (index !== -1) {
                    for (const attribute of NAMED_ITEM_ATTRIBUTES) {
                        if (newNode._attributes[attribute]) {
                            (newNode.parentNode.children)._removeNamedItem(newNode, newNode._attributes[attribute].value);
                        }
                    }
                    newNode.parentNode.children.splice(index, 1);
                }
            }
            if (referenceNode.nodeType === NodeTypeEnum_1.default.elementNode) {
                const index = ancestorNode.children.indexOf(referenceNode);
                if (index !== -1) {
                    ancestorNode.children.splice(index, 0, newNode);
                }
            }
            else {
                ancestorNode.children.length = 0;
                for (const node of ancestorNode.childNodes) {
                    if (node === referenceNode) {
                        ancestorNode.children.push(newNode);
                    }
                    if (node.nodeType === NodeTypeEnum_1.default.elementNode) {
                        ancestorNode.children.push(node);
                    }
                }
            }
            for (const attribute of NAMED_ITEM_ATTRIBUTES) {
                if (newNode._attributes[attribute]) {
                    ancestorNode.children._appendNamedItem(newNode, newNode._attributes[attribute].value);
                }
            }
            NodeUtility_1.default.insertBefore(ancestorNode, newNode, referenceNode, {
                disableAncestorValidation: true
            });
        }
        else {
            NodeUtility_1.default.insertBefore(ancestorNode, newNode, referenceNode, options);
        }
        return newNode;
    }
}
exports.default = ElementUtility;
//# sourceMappingURL=ElementUtility.js.map