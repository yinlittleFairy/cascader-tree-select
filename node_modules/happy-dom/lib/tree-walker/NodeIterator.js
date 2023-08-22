"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const TreeWalker_1 = __importDefault(require("./TreeWalker"));
/**
 * The NodeIterator object represents the nodes of a document subtree and a position within them.
 *
 * Reference:
 * https://developer.mozilla.org/en-US/docs/Web/API/NodeIterator
 */
class NodeIterator {
    /**
     * Constructor.
     *
     * @param root Root.
     * @param [whatToShow] What to show.
     * @param [filter] Filter.
     */
    constructor(root, whatToShow = -1, filter = null) {
        this.root = null;
        this.whatToShow = -1;
        this.filter = null;
        this.root = root;
        this.whatToShow = whatToShow;
        this.filter = filter;
        this._walker = new TreeWalker_1.default(root, whatToShow, filter);
    }
    /**
     * Moves the current Node to the next visible node in the document order.
     *
     * @returns Current node.
     */
    nextNode() {
        return this._walker.nextNode();
    }
    /**
     * Moves the current Node to the previous visible node in the document order, and returns the found node. It also moves the current node to this one. If no such node exists, or if it is before that the root node defined at the object construction, returns null and the current node is not changed.
     *
     * @returns Current node.
     */
    previousNode() {
        return this._walker.previousNode();
    }
}
exports.default = NodeIterator;
//# sourceMappingURL=NodeIterator.js.map