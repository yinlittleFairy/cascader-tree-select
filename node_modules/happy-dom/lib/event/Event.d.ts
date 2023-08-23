import IEventInit from './IEventInit';
import IEventTarget from './IEventTarget';
import EventPhaseEnum from './EventPhaseEnum';
/**
 * Event.
 */
export default class Event {
    composed: boolean;
    bubbles: boolean;
    cancelable: boolean;
    defaultPrevented: boolean;
    eventPhase: EventPhaseEnum;
    _immediatePropagationStopped: boolean;
    _propagationStopped: boolean;
    _target: IEventTarget;
    _currentTarget: IEventTarget;
    timeStamp: number;
    type: string;
    _isInPassiveEventListener: boolean;
    NONE: EventPhaseEnum;
    CAPTURING_PHASE: EventPhaseEnum;
    AT_TARGET: EventPhaseEnum;
    BUBBLING_PHASE: EventPhaseEnum;
    /**
     * Constructor.
     *
     * @param type Event type.
     * @param [eventInit] Event init.
     */
    constructor(type: string, eventInit?: IEventInit);
    /**
     * Returns target.
     *
     * @returns Target.
     */
    get target(): IEventTarget;
    /**
     * Returns target.
     *
     * @returns Target.
     */
    get currentTarget(): IEventTarget;
    /**
     * Returns "true" if propagation has been stopped.
     *
     * @returns "true" if propagation has been stopped.
     */
    get cancelBubble(): boolean;
    /**
     * Returns composed path.
     *
     * @returns Composed path.
     */
    composedPath(): IEventTarget[];
    /**
     * Init event.
     *
     * @deprecated
     * @param type Type.
     * @param [bubbles=false] "true" if it bubbles.
     * @param [cancelable=false] "true" if it cancelable.
     */
    initEvent(type: string, bubbles?: boolean, cancelable?: boolean): void;
    /**
     * Prevents default.
     */
    preventDefault(): void;
    /**
     * Stops immediate propagation.
     */
    stopImmediatePropagation(): void;
    /**
     * Stops propagation.
     */
    stopPropagation(): void;
}
//# sourceMappingURL=Event.d.ts.map