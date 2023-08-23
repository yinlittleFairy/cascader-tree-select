"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
// MIME type.
const LOCAL_MIME_TYPES = {
    json: 'application/json',
    xml: 'application/xml',
    html: 'text/html',
    text: 'text/plain',
    txt: 'text/plain',
    xhtml: 'application/xhtml+xml',
    xht: 'application/xhtml+xml',
    xsl: 'application/xml',
    xslt: 'application/xml',
    rss: 'application/rss+xml',
    atom: 'application/atom+xml',
    yaml: 'application/x-yaml',
    pdf: 'application/pdf',
    zip: 'application/zip',
    gzip: 'application/gzip',
    rar: 'application/x-rar-compressed',
    '7z': 'application/x-7z-compressed',
    exe: 'application/x-msdownload',
    csv: 'text/csv',
    ics: 'text/calendar',
    rtf: 'text/rtf',
    js: 'application/javascript',
    css: 'text/css',
    apng: 'image/apng',
    png: 'image/png',
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    gif: 'image/gif',
    bmp: 'image/bmp',
    ico: 'image/x-icon',
    tiff: 'image/tiff',
    tif: 'image/tiff',
    svg: 'image/svg+xml',
    svgz: 'image/svg+xml',
    webp: 'image/webp',
    wav: 'audio/wav',
    webm: 'video/webm',
    mp4: 'video/mp4',
    mpeg: 'video/mpeg',
    mpg: 'video/mpeg',
    mov: 'video/quicktime',
    avi: 'video/x-msvideo',
    flv: 'video/x-flv',
    mkv: 'video/x-matroska',
    mka: 'audio/x-matroska',
    m3u: 'audio/x-mpegurl',
    m3u8: 'application/x-mpegURL',
    pls: 'audio/x-scpls',
    flac: 'audio/x-flac',
    ogg: 'audio/ogg',
    oga: 'audio/ogg',
    ogv: 'video/ogg',
    ogx: 'application/ogg',
    opus: 'audio/opus',
    spx: 'audio/ogg',
    swf: 'application/x-shockwave-flash',
    woff: 'font/woff',
    woff2: 'font/woff2',
    ttf: 'font/ttf',
    eot: 'application/vnd.ms-fontobject',
    otf: 'font/otf',
    sfnt: 'application/font-sfnt',
    bin: 'application/octet-stream',
    doc: 'application/msword',
    docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    xls: 'application/vnd.ms-excel',
    xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    ppt: 'application/vnd.ms-powerpoint',
    pptx: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    odt: 'application/vnd.oasis.opendocument.text',
    ods: 'application/vnd.oasis.opendocument.spreadsheet'
};
/**
 * URL utility.
 */
class XMLHttpRequestURLUtility {
    /**
     * Returns "true" if SSL.
     *
     * @param url URL.
     * @returns "true" if SSL.
     */
    static isSSL(url) {
        return url.protocol === 'https:';
    }
    /**
     * Returns "true" if SSL.
     *
     * @param url URL.
     * @returns "true" if SSL.
     */
    static isLocal(url) {
        return url.protocol === 'file:';
    }
    /**
     * Returns "true" if protocol is valid.
     *
     * @param url URL.
     * @returns "true" if valid.
     */
    static isSupportedProtocol(url) {
        switch (url.protocol) {
            case 'https:':
            case 'http:':
            case 'file:':
            case undefined:
            case '':
                return true;
        }
        return false;
    }
    /**
     * Returns host.
     *
     * @param url URL.
     * @returns Host.
     */
    static getHost(url) {
        switch (url.protocol) {
            case 'http:':
            case 'https:':
                return url.hostname;
            case undefined:
            case '':
                return 'localhost';
            default:
                return null;
        }
    }
    /**
     *
     * @param url
     */
    static getMimeTypeFromExt(url) {
        const extension = path_1.default.extname(url.pathname).replace('.', '').toLowerCase();
        return LOCAL_MIME_TYPES[extension] || 'application/octet-stream';
    }
}
exports.default = XMLHttpRequestURLUtility;
//# sourceMappingURL=XMLHttpRequestURLUtility.js.map