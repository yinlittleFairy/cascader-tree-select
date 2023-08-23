"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CSSStyleDeclarationPropertyManager_1 = __importDefault(require("../property-manager/CSSStyleDeclarationPropertyManager"));
const NodeTypeEnum_1 = __importDefault(require("../../../nodes/node/NodeTypeEnum"));
const CSSRuleTypeEnum_1 = __importDefault(require("../../CSSRuleTypeEnum"));
const CSSStyleDeclarationElementDefaultCSS_1 = __importDefault(require("./config/CSSStyleDeclarationElementDefaultCSS"));
const CSSStyleDeclarationElementInheritedProperties_1 = __importDefault(require("./config/CSSStyleDeclarationElementInheritedProperties"));
const CSSStyleDeclarationElementMeasurementProperties_1 = __importDefault(require("./config/CSSStyleDeclarationElementMeasurementProperties"));
const CSSStyleDeclarationCSSParser_1 = __importDefault(require("../css-parser/CSSStyleDeclarationCSSParser"));
const QuerySelector_1 = __importDefault(require("../../../query-selector/QuerySelector"));
const CSSMeasurementConverter_1 = __importDefault(require("../measurement-converter/CSSMeasurementConverter"));
const MediaQueryList_1 = __importDefault(require("../../../match-media/MediaQueryList"));
const CSS_VARIABLE_REGEXP = /var\( *(--[^) ]+)\)/g;
const CSS_MEASUREMENT_REGEXP = /[0-9.]+(px|rem|em|vw|vh|%|vmin|vmax|cm|mm|in|pt|pc|Q)/g;
/**
 * CSS Style Declaration utility
 */
class CSSStyleDeclarationElementStyle {
    /**
     * Constructor.
     *
     * @param element Element.
     * @param [computed] Computed.
     */
    constructor(element, computed = false) {
        this.cache = {
            propertyManager: null,
            cssText: null,
            documentCacheID: null
        };
        this.element = element;
        this.computed = computed;
    }
    /**
     * Returns element style properties.
     *
     * @returns Element style properties.
     */
    getElementStyle() {
        if (this.computed) {
            return this.getComputedElementStyle();
        }
        const cssText = this.element['_attributes']['style']?.value;
        if (cssText) {
            if (this.cache.propertyManager && this.cache.cssText === cssText) {
                return this.cache.propertyManager;
            }
            this.cache.cssText = cssText;
            this.cache.propertyManager = new CSSStyleDeclarationPropertyManager_1.default({ cssText });
            return this.cache.propertyManager;
        }
        return new CSSStyleDeclarationPropertyManager_1.default();
    }
    /**
     * Returns style sheets.
     *
     * @param element Element.
     * @returns Style sheets.
     */
    getComputedElementStyle() {
        const documentElements = [];
        const parentElements = [];
        let styleAndElement = {
            element: this.element,
            cssTexts: []
        };
        let shadowRootElements = [];
        if (!this.element.isConnected) {
            return new CSSStyleDeclarationPropertyManager_1.default();
        }
        if (this.cache.propertyManager &&
            this.cache.documentCacheID === this.element.ownerDocument['_cacheID']) {
            return this.cache.propertyManager;
        }
        this.cache.documentCacheID = this.element.ownerDocument['_cacheID'];
        // Walks through all parent elements and stores them in an array with element and matching CSS text.
        while (styleAndElement.element) {
            if (styleAndElement.element.nodeType === NodeTypeEnum_1.default.elementNode) {
                const rootNode = styleAndElement.element.getRootNode();
                if (rootNode.nodeType === NodeTypeEnum_1.default.documentNode) {
                    documentElements.unshift(styleAndElement);
                }
                else {
                    shadowRootElements.unshift(styleAndElement);
                }
                parentElements.unshift(styleAndElement);
            }
            if (styleAndElement.element === this.element.ownerDocument) {
                const styleSheets = (this.element.ownerDocument.querySelectorAll('style,link[rel="stylesheet"]'));
                for (const styleSheet of styleSheets) {
                    const sheet = styleSheet.sheet;
                    if (sheet) {
                        this.parseCSSRules({
                            elements: documentElements,
                            cssRules: sheet.cssRules
                        });
                    }
                }
                styleAndElement = { element: null, cssTexts: [] };
            }
            else if (styleAndElement.element.nodeType === NodeTypeEnum_1.default.documentFragmentNode &&
                styleAndElement.element.host) {
                const styleSheets = (styleAndElement.element.querySelectorAll('style,link[rel="stylesheet"]'));
                styleAndElement = {
                    element: styleAndElement.element.host,
                    cssTexts: []
                };
                for (const styleSheet of styleSheets) {
                    const sheet = styleSheet.sheet;
                    if (sheet) {
                        this.parseCSSRules({
                            elements: shadowRootElements,
                            cssRules: sheet.cssRules,
                            hostElement: styleAndElement
                        });
                    }
                }
                shadowRootElements = [];
            }
            else {
                styleAndElement = { element: styleAndElement.element.parentNode, cssTexts: [] };
            }
        }
        // Concatenates all parent element CSS to one string.
        const targetElement = parentElements[parentElements.length - 1];
        const propertyManager = new CSSStyleDeclarationPropertyManager_1.default();
        const cssVariables = {};
        let rootFontSize = 16;
        let parentFontSize = 16;
        for (const parentElement of parentElements) {
            parentElement.cssTexts.sort((a, b) => a.priorityWeight - b.priorityWeight);
            let elementCSSText = '';
            if (CSSStyleDeclarationElementDefaultCSS_1.default[parentElement.element.tagName]) {
                elementCSSText +=
                    CSSStyleDeclarationElementDefaultCSS_1.default[parentElement.element.tagName];
            }
            for (const cssText of parentElement.cssTexts) {
                elementCSSText += cssText.cssText;
            }
            if (parentElement.element['_attributes']['style']?.value) {
                elementCSSText += parentElement.element['_attributes']['style'].value;
            }
            CSSStyleDeclarationCSSParser_1.default.parse(elementCSSText, (name, value, important) => {
                const isCSSVariable = name.startsWith('--');
                if (isCSSVariable ||
                    CSSStyleDeclarationElementInheritedProperties_1.default[name] ||
                    parentElement === targetElement) {
                    const cssValue = this.parseCSSVariablesInValue(value, cssVariables);
                    if (cssValue && (!propertyManager.get(name)?.important || important)) {
                        propertyManager.set(name, cssValue, important);
                        if (isCSSVariable) {
                            cssVariables[name] = cssValue;
                        }
                        else if (name === 'font' || name === 'font-size') {
                            const fontSize = propertyManager.properties['font-size'];
                            if (fontSize !== null) {
                                const parsedValue = this.parseMeasurementsInValue({
                                    value: fontSize.value,
                                    rootFontSize,
                                    parentFontSize,
                                    parentSize: parentFontSize
                                });
                                if (parentElement.element.tagName === 'HTML') {
                                    rootFontSize = parsedValue;
                                }
                                else if (parentElement !== targetElement) {
                                    parentFontSize = parsedValue;
                                }
                            }
                        }
                    }
                }
            });
        }
        for (const name of CSSStyleDeclarationElementMeasurementProperties_1.default) {
            const property = propertyManager.properties[name];
            if (property) {
                property.value = this.parseMeasurementsInValue({
                    value: property.value,
                    rootFontSize,
                    parentFontSize,
                    // TODO: Only "font-size" is supported when using percentage values. Add support for other properties.
                    parentSize: name === 'font-size' ? parentFontSize : null
                });
            }
        }
        this.cache.propertyManager = propertyManager;
        return propertyManager;
    }
    /**
     * Applies CSS text to elements.
     *
     * @param options Options.
     * @param options.elements Elements.
     * @param options.cssRules CSS rules.
     * @param [options.hostElement] Host element.
     */
    parseCSSRules(options) {
        if (!options.elements.length) {
            return;
        }
        const ownerWindow = this.element.ownerDocument.defaultView;
        for (const rule of options.cssRules) {
            if (rule.type === CSSRuleTypeEnum_1.default.styleRule) {
                const selectorText = rule.selectorText;
                if (selectorText) {
                    if (selectorText.startsWith(':host')) {
                        if (options.hostElement) {
                            options.hostElement.cssTexts.push({
                                cssText: rule._cssText,
                                priorityWeight: 0
                            });
                        }
                    }
                    else {
                        for (const element of options.elements) {
                            const matchResult = QuerySelector_1.default.match(element.element, selectorText);
                            if (matchResult) {
                                element.cssTexts.push({
                                    cssText: rule._cssText,
                                    priorityWeight: matchResult.priorityWeight
                                });
                            }
                        }
                    }
                }
            }
            else if (rule.type === CSSRuleTypeEnum_1.default.mediaRule &&
                // TODO: We need to send in a predfined root font size as it will otherwise be calculated using Window.getComputedStyle(), which will cause a never ending loop. Is there another solution?
                new MediaQueryList_1.default({
                    ownerWindow,
                    media: rule.conditionText,
                    rootFontSize: this.element.tagName === 'HTML' ? 16 : null
                }).matches) {
                this.parseCSSRules({
                    elements: options.elements,
                    cssRules: rule.cssRules,
                    hostElement: options.hostElement
                });
            }
        }
    }
    /**
     * Parses CSS variables in a value.
     *
     * @param value Value.
     * @param cssVariables CSS variables.
     * @returns CSS value.
     */
    parseCSSVariablesInValue(value, cssVariables) {
        const regexp = new RegExp(CSS_VARIABLE_REGEXP);
        let newValue = value;
        let match;
        while ((match = regexp.exec(value)) !== null) {
            newValue = newValue.replace(match[0], cssVariables[match[1]] || '');
        }
        return newValue;
    }
    /**
     * Parses measurements in a value.
     *
     * @param options Options.
     * @param options.value Value.
     * @param options.rootFontSize Root font size.
     * @param options.parentFontSize Parent font size.
     * @param [options.parentSize] Parent width.
     * @returns CSS value.
     */
    parseMeasurementsInValue(options) {
        if (this.element.ownerDocument.defaultView.happyDOM.settings.disableComputedStyleRendering) {
            return options.value;
        }
        const regexp = new RegExp(CSS_MEASUREMENT_REGEXP);
        let newValue = options.value;
        let match;
        while ((match = regexp.exec(options.value)) !== null) {
            if (match[1] !== 'px') {
                const valueInPixels = CSSMeasurementConverter_1.default.toPixels({
                    ownerWindow: this.element.ownerDocument.defaultView,
                    value: match[0],
                    rootFontSize: options.rootFontSize,
                    parentFontSize: options.parentFontSize,
                    parentSize: options.parentSize
                });
                if (valueInPixels !== null) {
                    newValue = newValue.replace(match[0], valueInPixels + 'px');
                }
            }
        }
        return newValue;
    }
}
exports.default = CSSStyleDeclarationElementStyle;
//# sourceMappingURL=CSSStyleDeclarationElementStyle.js.map