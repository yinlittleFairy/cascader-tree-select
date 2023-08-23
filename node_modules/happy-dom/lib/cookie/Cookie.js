"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DOMException_1 = __importDefault(require("../exception/DOMException"));
const DOMExceptionNameEnum_1 = __importDefault(require("../exception/DOMExceptionNameEnum"));
const CookieSameSiteEnum_1 = __importDefault(require("./CookieSameSiteEnum"));
/**
 * Cookie.
 */
class Cookie {
    /**
     * Constructor.
     *
     * @param originURL Origin URL.
     * @param cookie Cookie.
     */
    constructor(originURL, cookie) {
        // Required
        this.key = '';
        this.value = null;
        // Optional
        this.domain = '';
        this.path = '';
        this.expires = null;
        this.httpOnly = false;
        this.secure = false;
        this.sameSite = CookieSameSiteEnum_1.default.lax;
        const parts = cookie.split(';');
        const [key, value] = parts.shift().split('=');
        this.originURL = originURL;
        this.key = key.trim();
        this.value = value !== undefined ? value : null;
        if (!this.key) {
            throw new DOMException_1.default(`Invalid cookie: ${cookie}.`, DOMExceptionNameEnum_1.default.syntaxError);
        }
        for (const part of parts) {
            const keyAndValue = part.split('=');
            const key = keyAndValue[0].trim().toLowerCase();
            const value = keyAndValue[1];
            switch (key) {
                case 'expires':
                    this.expires = new Date(value);
                    break;
                case 'max-age':
                    this.expires = new Date(parseInt(value, 10) * 1000 + Date.now());
                    break;
                case 'domain':
                    this.domain = value;
                    break;
                case 'path':
                    this.path = value.startsWith('/') ? value : `/${value}`;
                    break;
                case 'httponly':
                    this.httpOnly = true;
                    break;
                case 'secure':
                    this.secure = true;
                    break;
                case 'samesite':
                    switch (value.toLowerCase()) {
                        case 'strict':
                            this.sameSite = CookieSameSiteEnum_1.default.strict;
                            break;
                        case 'lax':
                            this.sameSite = CookieSameSiteEnum_1.default.lax;
                            break;
                        case 'none':
                            this.sameSite = CookieSameSiteEnum_1.default.none;
                    }
                    break;
            }
        }
    }
    /**
     * Returns cookie string.
     *
     * @returns Cookie string.
     */
    toString() {
        if (this.value !== null) {
            return `${this.key}=${this.value}`;
        }
        return this.key;
    }
    /**
     * Returns "true" if expired.
     *
     * @returns "true" if expired.
     */
    isExpired() {
        // If the expries/maxage is set, then determine whether it is expired.
        if (this.expires && this.expires.getTime() < Date.now()) {
            return true;
        }
        // If the expries/maxage is not set, it's a session-level cookie that will expire when the browser is closed.
        // (it's never expired in happy-dom)
        return false;
    }
    /**
     * Validate cookie.
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie#cookie_prefixes
     * @returns "true" if valid.
     */
    validate() {
        const lowerKey = this.key.toLowerCase();
        if (lowerKey.startsWith('__secure-') && !this.secure) {
            return false;
        }
        if (lowerKey.startsWith('__host-') && (!this.secure || this.path !== '/' || this.domain)) {
            return false;
        }
        return true;
    }
}
exports.default = Cookie;
//# sourceMappingURL=Cookie.js.map