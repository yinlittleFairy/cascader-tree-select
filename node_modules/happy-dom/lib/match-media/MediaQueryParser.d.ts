import MediaQueryItem from './MediaQueryItem';
import IWindow from '../window/IWindow';
/**
 * Utility for parsing a query string.
 */
export default class MediaQueryParser {
    /**
     * Parses a media query string.
     *
     * @param options Options.
     * @param options.ownerWindow Owner window.
     * @param options.mediaQuery Media query string.
     * @param [options.rootFontSize] Root font size.
     * @returns Media query items.
     */
    static parse(options: {
        ownerWindow: IWindow;
        mediaQuery: string;
        rootFontSize?: string | number | null;
    }): MediaQueryItem[];
}
//# sourceMappingURL=MediaQueryParser.d.ts.map