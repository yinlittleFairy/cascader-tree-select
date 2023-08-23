"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const NodeTypeEnum_1 = __importDefault(require("../nodes/node/NodeTypeEnum"));
const perf_hooks_1 = require("perf_hooks");
const EventPhaseEnum_1 = __importDefault(require("./EventPhaseEnum"));
/**
 * Event.
 */
class Event {
    /**
     * Constructor.
     *
     * @param type Event type.
     * @param [eventInit] Event init.
     */
    constructor(type, eventInit = null) {
        this.composed = false;
        this.bubbles = false;
        this.cancelable = false;
        this.defaultPrevented = false;
        this.eventPhase = EventPhaseEnum_1.default.none;
        this._immediatePropagationStopped = false;
        this._propagationStopped = false;
        this._target = null;
        this._currentTarget = null;
        this.timeStamp = perf_hooks_1.performance.now();
        this.type = null;
        this._isInPassiveEventListener = false;
        this.NONE = EventPhaseEnum_1.default.none;
        this.CAPTURING_PHASE = EventPhaseEnum_1.default.capturing;
        this.AT_TARGET = EventPhaseEnum_1.default.atTarget;
        this.BUBBLING_PHASE = EventPhaseEnum_1.default.bubbling;
        this.type = type;
        if (eventInit) {
            this.bubbles = eventInit.bubbles || false;
            this.cancelable = eventInit.cancelable || false;
            this.composed = eventInit.composed || false;
        }
    }
    /**
     * Returns target.
     *
     * @returns Target.
     */
    get target() {
        return this._target;
    }
    /**
     * Returns target.
     *
     * @returns Target.
     */
    get currentTarget() {
        return this._currentTarget;
    }
    /**
     * Returns "true" if propagation has been stopped.
     *
     * @returns "true" if propagation has been stopped.
     */
    get cancelBubble() {
        return this._propagationStopped;
    }
    /**
     * Returns composed path.
     *
     * @returns Composed path.
     */
    composedPath() {
        if (!this._target) {
            return [];
        }
        const composedPath = [];
        let eventTarget = this._target;
        while (eventTarget) {
            composedPath.push(eventTarget);
            if (eventTarget.parentNode) {
                eventTarget = eventTarget.parentNode;
            }
            else if (this.composed &&
                eventTarget.nodeType === NodeTypeEnum_1.default.documentFragmentNode &&
                eventTarget.host) {
                eventTarget = eventTarget.host;
            }
            else if (eventTarget.nodeType === NodeTypeEnum_1.default.documentNode) {
                eventTarget = eventTarget.defaultView;
            }
            else {
                break;
            }
        }
        return composedPath;
    }
    /**
     * Init event.
     *
     * @deprecated
     * @param type Type.
     * @param [bubbles=false] "true" if it bubbles.
     * @param [cancelable=false] "true" if it cancelable.
     */
    initEvent(type, bubbles = false, cancelable = false) {
        this.type = type;
        this.bubbles = bubbles;
        this.cancelable = cancelable;
    }
    /**
     * Prevents default.
     */
    preventDefault() {
        if (!this._isInPassiveEventListener) {
            this.defaultPrevented = true;
        }
    }
    /**
     * Stops immediate propagation.
     */
    stopImmediatePropagation() {
        this._immediatePropagationStopped = true;
    }
    /**
     * Stops propagation.
     */
    stopPropagation() {
        this._propagationStopped = true;
    }
}
exports.default = Event;
//# sourceMappingURL=Event.js.map