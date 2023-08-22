"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const NodeTypeEnum_1 = __importDefault(require("./NodeTypeEnum"));
const DOMException_1 = __importDefault(require("../../exception/DOMException"));
const DOMExceptionNameEnum_1 = __importDefault(require("../../exception/DOMExceptionNameEnum"));
const Node_1 = __importDefault(require("./Node"));
const MutationRecord_1 = __importDefault(require("../../mutation-observer/MutationRecord"));
const MutationTypeEnum_1 = __importDefault(require("../../mutation-observer/MutationTypeEnum"));
/**
 * Node utility.
 */
class NodeUtility {
    /**
     * Append a child node to childNodes.
     *
     * @param ancestorNode Ancestor node.
     * @param node Node to append.
     * @param [options] Options.
     * @param [options.disableAncestorValidation] Disables validation for checking if the node is an ancestor of the ancestorNode.
     * @returns Appended node.
     */
    static appendChild(ancestorNode, node, options) {
        if (node === ancestorNode) {
            throw new DOMException_1.default("Failed to execute 'appendChild' on 'Node': Not possible to append a node as a child of itself.");
        }
        if (!options?.disableAncestorValidation && this.isInclusiveAncestor(node, ancestorNode, true)) {
            throw new DOMException_1.default("Failed to execute 'appendChild' on 'Node': The new node is a parent of the node to insert to.", DOMExceptionNameEnum_1.default.domException);
        }
        // If the type is DocumentFragment, then the child nodes of if it should be moved instead of the actual node.
        // See: https://developer.mozilla.org/en-US/docs/Web/API/DocumentFragment
        if (node.nodeType === NodeTypeEnum_1.default.documentFragmentNode) {
            for (const child of node.childNodes.slice()) {
                ancestorNode.appendChild(child);
            }
            return node;
        }
        // Remove the node from its previous parent if it has any.
        if (node.parentNode) {
            const index = node.parentNode.childNodes.indexOf(node);
            if (index !== -1) {
                node.parentNode.childNodes.splice(index, 1);
            }
        }
        if (ancestorNode.isConnected) {
            (ancestorNode.ownerDocument || this)['_cacheID']++;
        }
        ancestorNode.childNodes.push(node);
        node._connectToNode(ancestorNode);
        // MutationObserver
        if (ancestorNode._observers.length > 0) {
            const record = new MutationRecord_1.default();
            record.target = ancestorNode;
            record.type = MutationTypeEnum_1.default.childList;
            record.addedNodes = [node];
            for (const observer of ancestorNode._observers) {
                if (observer.options.subtree) {
                    node._observe(observer);
                }
                if (observer.options.childList) {
                    observer.callback([record]);
                }
            }
        }
        return node;
    }
    /**
     * Remove Child element from childNodes array.
     *
     * @param ancestorNode Ancestor node.
     * @param node Node to remove.
     * @returns Removed node.
     */
    static removeChild(ancestorNode, node) {
        const index = ancestorNode.childNodes.indexOf(node);
        if (index === -1) {
            throw new DOMException_1.default('Failed to remove node. Node is not child of parent.');
        }
        if (ancestorNode.isConnected) {
            (ancestorNode.ownerDocument || this)['_cacheID']++;
        }
        ancestorNode.childNodes.splice(index, 1);
        node._connectToNode(null);
        // MutationObserver
        if (ancestorNode._observers.length > 0) {
            const record = new MutationRecord_1.default();
            record.target = ancestorNode;
            record.type = MutationTypeEnum_1.default.childList;
            record.removedNodes = [node];
            for (const observer of ancestorNode._observers) {
                node._unobserve(observer);
                if (observer.options.childList) {
                    observer.callback([record]);
                }
            }
        }
        return node;
    }
    /**
     * Inserts a node before another.
     *
     * @param ancestorNode Ancestor node.
     * @param newNode Node to insert.
     * @param referenceNode Node to insert before.
     * @param [options] Options.
     * @param [options.disableAncestorValidation] Disables validation for checking if the node is an ancestor of the ancestorNode.
     * @returns Inserted node.
     */
    static insertBefore(ancestorNode, newNode, referenceNode, options) {
        if (!options?.disableAncestorValidation &&
            this.isInclusiveAncestor(newNode, ancestorNode, true)) {
            throw new DOMException_1.default("Failed to execute 'insertBefore' on 'Node': The new node is a parent of the node to insert to.", DOMExceptionNameEnum_1.default.domException);
        }
        // If the type is DocumentFragment, then the child nodes of if it should be moved instead of the actual node.
        // See: https://developer.mozilla.org/en-US/docs/Web/API/DocumentFragment
        if (newNode.nodeType === Node_1.default.DOCUMENT_FRAGMENT_NODE) {
            for (const child of newNode.childNodes.slice()) {
                ancestorNode.insertBefore(child, referenceNode);
            }
            return newNode;
        }
        // If the referenceNode is null or undefined, then the newNode should be appended to the ancestorNode.
        // According to spec only null is valid, but browsers support undefined as well.
        if (!referenceNode) {
            ancestorNode.appendChild(newNode);
            return newNode;
        }
        if (ancestorNode.childNodes.indexOf(referenceNode) === -1) {
            throw new DOMException_1.default("Failed to execute 'insertBefore' on 'Node': The node before which the new node is to be inserted is not a child of this node.");
        }
        if (ancestorNode.isConnected) {
            (ancestorNode.ownerDocument || this)['_cacheID']++;
        }
        if (newNode.parentNode) {
            const index = newNode.parentNode.childNodes.indexOf(newNode);
            if (index !== -1) {
                newNode.parentNode.childNodes.splice(index, 1);
            }
        }
        ancestorNode.childNodes.splice(ancestorNode.childNodes.indexOf(referenceNode), 0, newNode);
        newNode._connectToNode(ancestorNode);
        // MutationObserver
        if (ancestorNode._observers.length > 0) {
            const record = new MutationRecord_1.default();
            record.target = ancestorNode;
            record.type = MutationTypeEnum_1.default.childList;
            record.addedNodes = [newNode];
            for (const observer of ancestorNode._observers) {
                if (observer.options.subtree) {
                    newNode._observe(observer);
                }
                if (observer.options.childList) {
                    observer.callback([record]);
                }
            }
        }
        return newNode;
    }
    /**
     * Returns whether the passed node is a text node, and narrows its type.
     *
     * @param node The node to be tested.
     * @returns "true" if the node is a text node.
     */
    static isTextNode(node) {
        return node?.nodeType === NodeTypeEnum_1.default.textNode;
    }
    /**
     * Returns boolean indicating if "ancestorNode" is an inclusive ancestor of "referenceNode".
     *
     * Based on:
     * https://github.com/jsdom/jsdom/blob/master/lib/jsdom/living/helpers/node.js
     *
     * @see https://dom.spec.whatwg.org/#concept-tree-inclusive-ancestor
     * @param ancestorNode Ancestor node.
     * @param referenceNode Reference node.
     * @param [includeShadowRoots = false] Include shadow roots.
     * @returns "true" if inclusive ancestor.
     */
    static isInclusiveAncestor(ancestorNode, referenceNode, includeShadowRoots = false) {
        if (ancestorNode === null || referenceNode === null) {
            return false;
        }
        if (ancestorNode === referenceNode) {
            return true;
        }
        if (!ancestorNode.childNodes.length) {
            return false;
        }
        if (includeShadowRoots && referenceNode.isConnected !== ancestorNode.isConnected) {
            return false;
        }
        if (includeShadowRoots &&
            ancestorNode === referenceNode.ownerDocument &&
            referenceNode.isConnected) {
            return true;
        }
        let parent = referenceNode.parentNode;
        while (parent) {
            if (ancestorNode === parent) {
                return true;
            }
            parent = parent.parentNode
                ? parent.parentNode
                : includeShadowRoots && parent.host
                    ? parent.host
                    : null;
        }
        return false;
    }
    /**
     * Returns boolean indicating if nodeB is following nodeA in the document tree.
     *
     * Based on:
     * https://github.com/jsdom/jsdom/blob/master/lib/jsdom/living/helpers/node.js
     *
     * @see https://dom.spec.whatwg.org/#concept-tree-following
     * @param nodeA Node A.
     * @param nodeB Node B.
     * @returns "true" if following.
     */
    static isFollowing(nodeA, nodeB) {
        if (nodeA === nodeB) {
            return false;
        }
        let current = nodeB;
        while (current) {
            current = this.following(current);
            if (current === nodeA) {
                return true;
            }
        }
        return false;
    }
    /**
     * Node length.
     *
     * Based on:
     * https://github.com/jsdom/jsdom/blob/master/lib/jsdom/living/helpers/node.js
     *
     * @see https://dom.spec.whatwg.org/#concept-node-length
     * @param node Node.
     * @returns Node length.
     */
    static getNodeLength(node) {
        switch (node.nodeType) {
            case NodeTypeEnum_1.default.documentTypeNode:
                return 0;
            case NodeTypeEnum_1.default.textNode:
            case NodeTypeEnum_1.default.processingInstructionNode:
            case NodeTypeEnum_1.default.commentNode:
                return node.data.length;
            default:
                return node.childNodes.length;
        }
    }
    /**
     * Returns boolean indicating if nodeB is following nodeA in the document tree.
     *
     * Based on:
     * https://github.com/jsdom/js-symbol-tree/blob/master/lib/SymbolTree.js#L220
     *
     * @param node Node.
     * @param [root] Root.
     * @returns Following node.
     */
    static following(node, root) {
        const firstChild = node.firstChild;
        if (firstChild) {
            return firstChild;
        }
        let current = node;
        while (current) {
            if (current === root) {
                return null;
            }
            const nextSibling = current.nextSibling;
            if (nextSibling) {
                return nextSibling;
            }
            current = current.parentNode;
        }
        return null;
    }
    /**
     * Returns the next sibling or parents sibling.
     *
     * @param node Node.
     * @returns Next descendant node.
     */
    static nextDescendantNode(node) {
        while (node && !node.nextSibling) {
            node = node.parentNode;
        }
        if (!node) {
            return null;
        }
        return node.nextSibling;
    }
    /**
     * Needed by https://dom.spec.whatwg.org/#concept-node-equals
     *
     * @param elementA
     * @param elementB
     */
    static attributeListsEqual(elementA, elementB) {
        const listA = Object.values(elementA['_attributes']);
        const listB = Object.values(elementB['_attributes']);
        const lengthA = listA.length;
        const lengthB = listB.length;
        if (lengthA !== lengthB) {
            return false;
        }
        for (let i = 0; i < lengthA; ++i) {
            const attrA = listA[i];
            if (!listB.some((attrB) => {
                return ((typeof attrA === 'number' && typeof attrB === 'number' && attrA === attrB) ||
                    (typeof attrA === 'object' &&
                        typeof attrB === 'object' &&
                        NodeUtility.isEqualNode(attrA, attrB)));
            })) {
                return false;
            }
        }
        return true;
    }
    /**
     * Check if node nodeA equals node nodeB.
     * Reference: https://dom.spec.whatwg.org/#concept-node-equals
     *
     * @param nodeA Node A.
     * @param nodeB Node B.
     */
    static isEqualNode(nodeA, nodeB) {
        if (nodeA.nodeType !== nodeB.nodeType) {
            return false;
        }
        switch (nodeA.nodeType) {
            case NodeTypeEnum_1.default.documentTypeNode:
                const documentTypeA = nodeA;
                const documentTypeB = nodeB;
                if (documentTypeA.name !== documentTypeB.name ||
                    documentTypeA.publicId !== documentTypeB.publicId ||
                    documentTypeA.systemId !== documentTypeB.systemId) {
                    return false;
                }
                break;
            case NodeTypeEnum_1.default.elementNode:
                const elementA = nodeA;
                const elementB = nodeB;
                if (elementA.namespaceURI !== elementB.namespaceURI ||
                    elementA.prefix !== elementB.prefix ||
                    elementA.localName !== elementB.localName ||
                    elementA.attributes.length !== elementB.attributes.length) {
                    return false;
                }
                break;
            case NodeTypeEnum_1.default.attributeNode:
                const attributeA = nodeA;
                const attributeB = nodeB;
                if (attributeA.namespaceURI !== attributeB.namespaceURI ||
                    attributeA.localName !== attributeB.localName ||
                    attributeA.value !== attributeB.value) {
                    return false;
                }
                break;
            case NodeTypeEnum_1.default.processingInstructionNode:
                const processingInstructionA = nodeA;
                const processingInstructionB = nodeB;
                if (processingInstructionA.target !== processingInstructionB.target ||
                    processingInstructionA.data !== processingInstructionB.data) {
                    return false;
                }
                break;
            case NodeTypeEnum_1.default.textNode:
            case NodeTypeEnum_1.default.commentNode:
                const textOrCommentA = nodeA;
                const textOrCommentB = nodeB;
                if (textOrCommentA.data !== textOrCommentB.data) {
                    return false;
                }
                break;
        }
        if (nodeA.nodeType === NodeTypeEnum_1.default.elementNode &&
            !NodeUtility.attributeListsEqual(nodeA, nodeB)) {
            return false;
        }
        if (nodeA.childNodes.length !== nodeB.childNodes.length) {
            return false;
        }
        for (let i = 0; i < nodeA.childNodes.length; i++) {
            const childNodeA = nodeA.childNodes[i];
            const childNodeB = nodeB.childNodes[i];
            if (!NodeUtility.isEqualNode(childNodeA, childNodeB)) {
                return false;
            }
        }
        return true;
    }
}
exports.default = NodeUtility;
//# sourceMappingURL=NodeUtility.js.map