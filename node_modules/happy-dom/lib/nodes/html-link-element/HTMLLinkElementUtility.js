"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Event_1 = __importDefault(require("../../event/Event"));
const ErrorEvent_1 = __importDefault(require("../../event/events/ErrorEvent"));
const ResourceFetch_1 = __importDefault(require("../../fetch/ResourceFetch"));
const CSSStyleSheet_1 = __importDefault(require("../../css/CSSStyleSheet"));
const DOMException_1 = __importDefault(require("../../exception/DOMException"));
const DOMExceptionNameEnum_1 = __importDefault(require("../../exception/DOMExceptionNameEnum"));
/**
 * Helper class for getting the URL relative to a Location object.
 */
class HTMLLinkElementUtility {
    /**
     * Returns a URL relative to the given Location object.
     *
     * @param options Options.
     * @param options.element Element.
     * @param element
     */
    static async loadExternalStylesheet(element) {
        const href = element.getAttribute('href');
        const rel = element.getAttribute('rel');
        if (href !== null && rel && rel.toLowerCase() === 'stylesheet' && element.isConnected) {
            if (element.ownerDocument.defaultView.happyDOM.settings.disableCSSFileLoading) {
                this.onError(element, new DOMException_1.default(`Failed to load external stylesheet "${href}". CSS file loading is disabled.`, DOMExceptionNameEnum_1.default.notSupportedError));
                return;
            }
            element.ownerDocument._readyStateManager.startTask();
            let code;
            try {
                code = await ResourceFetch_1.default.fetch(element.ownerDocument, href);
            }
            catch (error) {
                this.onError(element, error);
                return;
            }
            const styleSheet = new CSSStyleSheet_1.default();
            styleSheet.replaceSync(code);
            element.sheet = styleSheet;
            element.dispatchEvent(new Event_1.default('load'));
            element.ownerDocument._readyStateManager.endTask();
        }
    }
    /**
     * Triggered when an error occurs.
     *
     * @param element Element.
     * @param error Error.
     */
    static onError(element, error) {
        element.dispatchEvent(new ErrorEvent_1.default('error', {
            message: error.message,
            error
        }));
        element.ownerDocument.defaultView.dispatchEvent(new ErrorEvent_1.default('error', {
            message: error.message,
            error
        }));
        element.ownerDocument._readyStateManager.endTask();
        if (!element['_listeners']['error'] &&
            !element.ownerDocument.defaultView['_listeners']['error']) {
            element.ownerDocument.defaultView.console.error(error);
        }
    }
}
exports.default = HTMLLinkElementUtility;
//# sourceMappingURL=HTMLLinkElementUtility.js.map