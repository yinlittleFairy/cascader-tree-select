import Event from '../Event';
import ISubmitEventInit from './ISubmitEventInit';
import IHTMLElement from '../../nodes/html-element/IHTMLElement';
/**
 * An event triggered by form submit buttons.
 */
export default class SubmitEvent extends Event {
    readonly submitter: IHTMLElement;
    /**
     * Constructor.
     *
     * @param type Event type.
     * @param [eventInit] Event init.
     */
    constructor(type: string, eventInit?: ISubmitEventInit);
}
//# sourceMappingURL=SubmitEvent.d.ts.map