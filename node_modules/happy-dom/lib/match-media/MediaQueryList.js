"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const EventTarget_1 = __importDefault(require("../event/EventTarget"));
const MediaQueryListEvent_1 = __importDefault(require("../event/events/MediaQueryListEvent"));
const MediaQueryParser_1 = __importDefault(require("./MediaQueryParser"));
/**
 * Media Query List.
 *
 * Reference:
 * https://developer.mozilla.org/en-US/docs/Web/API/MediaQueryList.
 */
class MediaQueryList extends EventTarget_1.default {
    /**
     * Constructor.
     *
     * @param options Options.
     * @param options.ownerWindow Owner window.
     * @param options.media Media.
     * @param [options.rootFontSize] Root font size.
     */
    constructor(options) {
        super();
        this.onchange = null;
        this._items = null;
        this._rootFontSize = null;
        this._ownerWindow = options.ownerWindow;
        this._media = options.media;
        this._rootFontSize = options.rootFontSize || null;
    }
    /**
     * Returns media.
     *
     * @returns Media.
     */
    get media() {
        this._items =
            this._items ||
                MediaQueryParser_1.default.parse({
                    ownerWindow: this._ownerWindow,
                    mediaQuery: this._media,
                    rootFontSize: this._rootFontSize
                });
        return this._items.map((item) => item.toString()).join(', ');
    }
    /**
     * Returns "true" if the document matches.
     *
     * @returns Matches.
     */
    get matches() {
        this._items =
            this._items ||
                MediaQueryParser_1.default.parse({
                    ownerWindow: this._ownerWindow,
                    mediaQuery: this._media,
                    rootFontSize: this._rootFontSize
                });
        for (const item of this._items) {
            if (!item.matches()) {
                return false;
            }
        }
        return true;
    }
    /**
     * Adds a listener.
     *
     * @deprecated
     * @param callback Callback.
     */
    addListener(callback) {
        this.addEventListener('change', callback);
    }
    /**
     * Removes listener.
     *
     * @deprecated
     * @param callback Callback.
     */
    removeListener(callback) {
        this.removeEventListener('change', callback);
    }
    /**
     * @override
     */
    addEventListener(type, listener) {
        super.addEventListener(type, listener);
        if (type === 'change') {
            let matchesState = false;
            const resizeListener = () => {
                const matches = this.matches;
                if (matches !== matchesState) {
                    matchesState = matches;
                    this.dispatchEvent(new MediaQueryListEvent_1.default('change', { matches, media: this.media }));
                }
            };
            listener['_windowResizeListener'] = resizeListener;
            this._ownerWindow.addEventListener('resize', resizeListener);
        }
    }
    /**
     * @override
     */
    removeEventListener(type, listener) {
        super.removeEventListener(type, listener);
        if (type === 'change' && listener['_windowResizeListener']) {
            this._ownerWindow.removeEventListener('resize', listener['_windowResizeListener']);
        }
    }
}
exports.default = MediaQueryList;
//# sourceMappingURL=MediaQueryList.js.map