import EventTarget from '../event/EventTarget';
import Event from '../event/Event';
import IWindow from '../window/IWindow';
import IEventListener from '../event/IEventListener';
/**
 * Media Query List.
 *
 * Reference:
 * https://developer.mozilla.org/en-US/docs/Web/API/MediaQueryList.
 */
export default class MediaQueryList extends EventTarget {
    onchange: (event: Event) => void;
    private _ownerWindow;
    private _items;
    private _media;
    private _rootFontSize;
    /**
     * Constructor.
     *
     * @param options Options.
     * @param options.ownerWindow Owner window.
     * @param options.media Media.
     * @param [options.rootFontSize] Root font size.
     */
    constructor(options: {
        ownerWindow: IWindow;
        media: string;
        rootFontSize?: string | number;
    });
    /**
     * Returns media.
     *
     * @returns Media.
     */
    get media(): string;
    /**
     * Returns "true" if the document matches.
     *
     * @returns Matches.
     */
    get matches(): boolean;
    /**
     * Adds a listener.
     *
     * @deprecated
     * @param callback Callback.
     */
    addListener(callback: (event: Event) => void): void;
    /**
     * Removes listener.
     *
     * @deprecated
     * @param callback Callback.
     */
    removeListener(callback: (event: Event) => void): void;
    /**
     * @override
     */
    addEventListener(type: string, listener: IEventListener | ((event: Event) => void)): void;
    /**
     * @override
     */
    removeEventListener(type: string, listener: IEventListener | ((event: Event) => void)): void;
}
//# sourceMappingURL=MediaQueryList.d.ts.map