"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const FocusEvent_1 = __importDefault(require("../../event/events/FocusEvent"));
/**
 * HTMLElement utility.
 */
class HTMLElementUtility {
    /**
     * Triggers a blur event.
     *
     * @param element Element.
     */
    static blur(element) {
        if (element.ownerDocument['_activeElement'] !== element || !element.isConnected) {
            return;
        }
        element.ownerDocument['_activeElement'] = null;
        element.dispatchEvent(new FocusEvent_1.default('blur', {
            bubbles: false,
            composed: true
        }));
        element.dispatchEvent(new FocusEvent_1.default('focusout', {
            bubbles: true,
            composed: true
        }));
    }
    /**
     * Triggers a focus event.
     *
     * @param element Element.
     */
    static focus(element) {
        if (element.ownerDocument['_activeElement'] === element || !element.isConnected) {
            return;
        }
        if (element.ownerDocument['_activeElement'] !== null) {
            element.ownerDocument['_activeElement'].blur();
        }
        element.ownerDocument['_activeElement'] = element;
        element.dispatchEvent(new FocusEvent_1.default('focus', {
            bubbles: false,
            composed: true
        }));
        element.dispatchEvent(new FocusEvent_1.default('focusin', {
            bubbles: true,
            composed: true
        }));
    }
}
exports.default = HTMLElementUtility;
//# sourceMappingURL=HTMLElementUtility.js.map