import IElement from '../nodes/element/IElement';
import SelectorCombinatorEnum from './SelectorCombinatorEnum';
import ISelectorAttribute from './ISelectorAttribute';
import ISelectorMatch from './ISelectorMatch';
import ISelectorPseudo from './ISelectorPseudo';
/**
 * Selector item.
 */
export default class SelectorItem {
    tagName: string | null;
    id: string | null;
    classNames: string[] | null;
    attributes: ISelectorAttribute[] | null;
    pseudos: ISelectorPseudo[] | null;
    combinator: SelectorCombinatorEnum;
    /**
     * Constructor.
     *
     * @param [options] Options.
     * @param [options.combinator] Combinator.
     * @param [options.tagName] Tag name.
     * @param [options.id] ID.
     * @param [options.classNames] Class names.
     * @param [options.attributes] Attributes.
     * @param [options.pseudos] Pseudos.
     */
    constructor(options?: {
        tagName?: string;
        id?: string;
        classNames?: string[];
        attributes?: ISelectorAttribute[];
        pseudos?: ISelectorPseudo[];
        combinator?: SelectorCombinatorEnum;
    });
    /**
     * Matches a selector against an element.
     *
     * @param element HTML element.
     * @returns Result.
     */
    match(element: IElement): ISelectorMatch | null;
    /**
     * Matches a psuedo selector.
     *
     * @param element Element.
     * @returns Result.
     */
    private matchPsuedo;
    /**
     * Matches attribute.
     *
     * @param element Element.
     * @returns Result.
     */
    private matchAttributes;
    /**
     * Matches class.
     *
     * @param element Element.
     * @returns Result.
     */
    private matchClass;
    /**
     * Returns the selector string.
     *
     * @returns Selector string.
     */
    private getSelectorString;
}
//# sourceMappingURL=SelectorItem.d.ts.map