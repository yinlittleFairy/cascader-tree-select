/// <reference types="node" />
import { URL } from 'url';
/**
 * CookieJar.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cookie.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie.
 */
export default class CookieJar {
    private cookies;
    /**
     * Adds cookie string.
     *
     * @param originURL Origin URL.
     * @param cookieString Cookie string.
     */
    addCookieString(originURL: URL, cookieString: string): void;
    /**
     * Get cookie string.
     *
     * @param targetURL Target URL.
     * @param fromDocument If true, the caller is a document.
     * @returns Cookie string.
     */
    getCookieString(targetURL: URL, fromDocument: boolean): string;
}
//# sourceMappingURL=CookieJar.d.ts.map