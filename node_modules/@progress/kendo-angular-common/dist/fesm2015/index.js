/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { EventEmitter, Directive, ElementRef, NgZone, Input, Output, NgModule, Renderer2, Injectable, Component } from '@angular/core';
import Draggable from '@telerik/kendo-draggable';
import { CommonModule } from '@angular/common';
import { auditTime } from 'rxjs/operators';
import { merge, fromEvent, from } from 'rxjs';

const isDocumentAvailable = () => typeof document !== 'undefined';

const isChanged = (propertyName, changes, skipFirstChange = true) => (typeof changes[propertyName] !== 'undefined' &&
    (!changes[propertyName].isFirstChange() || !skipFirstChange) &&
    changes[propertyName].previousValue !== changes[propertyName].currentValue);

const anyChanged = (propertyNames, changes, skipFirstChange = true) => propertyNames.some(name => isChanged(name, changes, skipFirstChange));

const hasObservers = (emitter) => emitter && emitter.observers.length > 0;

const guid = () => {
    let id = "";
    for (let i = 0; i < 32; i++) {
        const random = Math.random() * 16 | 0; // tslint:disable-line:no-bitwise
        if (i === 8 || i === 12 || i === 16 || i === 20) {
            id += "-";
        }
        // tslint:disable-next-line:no-bitwise
        id += (i === 12 ? 4 : (i === 16 ? (random & 3 | 8) : random)).toString(16);
    }
    return id;
};

class DraggableDirective {
    constructor(element, ngZone) {
        this.element = element;
        this.ngZone = ngZone;
        this.enableDrag = true;
        this.kendoPress = new EventEmitter();
        this.kendoDrag = new EventEmitter();
        this.kendoRelease = new EventEmitter();
    }
    ngOnInit() {
        this.toggleDraggable();
    }
    ngOnChanges(changes) {
        if (isChanged('enableDrag', changes)) {
            this.toggleDraggable();
        }
    }
    ngOnDestroy() {
        this.destroyDraggable();
    }
    toggleDraggable() {
        if (isDocumentAvailable()) {
            this.destroyDraggable();
            if (this.enableDrag) {
                this.draggable = new Draggable({
                    drag: (e) => this.kendoDrag.next(e),
                    press: (e) => this.kendoPress.next(e),
                    release: (e) => this.kendoRelease.next(e)
                });
                this.ngZone.runOutsideAngular(() => this.draggable.bindTo(this.element.nativeElement));
            }
        }
    }
    destroyDraggable() {
        if (this.draggable) {
            this.draggable.destroy();
            this.draggable = null;
        }
    }
}
DraggableDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kendoDraggable]'
            },] },
];
/** @nocollapse */
DraggableDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: NgZone }
];
DraggableDirective.propDecorators = {
    enableDrag: [{ type: Input }],
    kendoPress: [{ type: Output }],
    kendoDrag: [{ type: Output }],
    kendoRelease: [{ type: Output }]
};

/**
 * @hidden
 */
class DraggableModule {
}
DraggableModule.decorators = [
    { type: NgModule, args: [{
                declarations: [DraggableDirective],
                exports: [DraggableDirective],
                imports: [CommonModule]
            },] },
];

/* tslint:disable:no-input-rename */
/**
 * @hidden
 */
class EventsOutsideAngularDirective {
    constructor(element, ngZone, renderer) {
        this.element = element;
        this.ngZone = ngZone;
        this.renderer = renderer;
        this.events = {};
    }
    ngOnInit() {
        if (!this.element || !this.element.nativeElement) {
            return;
        }
        const events = this.events;
        this.subscriptions = [];
        this.ngZone.runOutsideAngular(() => {
            for (let name in events) {
                if (events.hasOwnProperty(name)) {
                    this.subscriptions.push(this.renderer.listen(this.element.nativeElement, name, this.scope ? events[name].bind(this.scope) : events[name]));
                }
            }
        });
    }
    ngOnDestroy() {
        if (this.subscriptions) {
            for (let idx = 0; idx < this.subscriptions.length; idx++) {
                this.subscriptions[idx]();
            }
            this.subscriptions = null;
        }
    }
}
EventsOutsideAngularDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kendoEventsOutsideAngular]'
            },] },
];
/** @nocollapse */
EventsOutsideAngularDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: NgZone },
    { type: Renderer2 }
];
EventsOutsideAngularDirective.propDecorators = {
    events: [{ type: Input, args: ['kendoEventsOutsideAngular',] }],
    scope: [{ type: Input }]
};

/**
 * @hidden
 */
class EventsModule {
}
EventsModule.decorators = [
    { type: NgModule, args: [{
                declarations: [EventsOutsideAngularDirective],
                exports: [EventsOutsideAngularDirective]
            },] },
];

class ResizeService {
    constructor(resizeBatchService) {
        this.resizeBatchService = resizeBatchService;
        this.resize = new EventEmitter();
        this.acceptedSize = false;
        this.state = 0 /* Initial */;
    }
    acceptSize(size = this.measure()) {
        this.lastWidth = size.width;
        this.lastHeight = size.height;
        this.acceptedSize = true;
    }
    checkChanges() {
        if (!isDocumentAvailable()) {
            return;
        }
        if (this.state === 0 /* Initial */) {
            this.state = 1 /* Initializing */;
            // batch initial measure
            this.resizeBatchService.schedule(this, this.init);
        }
    }
    destroy() {
        this.resizeBatchService.cancel(this);
    }
    checkSize() {
        if (!this.parentElement) {
            return;
        }
        const { width, height } = this.measure();
        const sameSize = width === this.lastWidth && height === this.lastHeight;
        if (sameSize) {
            return;
        }
        this.lastWidth = width;
        this.lastHeight = height;
        this.acceptedSize = false;
        this.resize.emit();
        return true;
    }
    initSize() {
        const size = this.measure();
        this.lastWidth = size.width;
        this.lastHeight = size.height;
    }
    measure() {
        let width = 0;
        let height = 0;
        if (this.parentElement) {
            height = this.parentElement.offsetHeight;
            width = this.parentElement.offsetWidth;
        }
        return { height, width };
    }
}

// tslint:disable:deprecation
const div = style => {
    const el = document.createElement('div');
    el.style.cssText = style;
    return el;
};
const computedProp = (elem, prop) => getComputedStyle(elem, null).getPropertyValue(prop);
const WRAP_STYLE = 'position: absolute; display: block; left: 0; top: 0; right: 0; bottom: 0; z-index: -1;' +
    'overflow: hidden; visibility: hidden;';
const EXPAND_CHILD_STYLE = 'position: absolute; left: 0; top: 0; transition: 0s;';
const SHRINK_CHILD_STYLE = EXPAND_CHILD_STYLE + 'width: 200%; height: 200%;';
class ResizeCompatService extends ResizeService {
    constructor(resizeBatchService, element, ngZone) {
        super(resizeBatchService);
        this.element = element;
        this.ngZone = ngZone;
    }
    checkChanges() {
        if (this.state === 2 /* Initialized */) {
            if (!this.resizeBatchService.isScheduled(this)) {
                this.resizeBatchService.schedule(this, this.checkSize);
            }
            return;
        }
        super.checkChanges();
    }
    destroy() {
        super.destroy();
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
        if (this.expand) {
            const element = this.element.nativeElement;
            element.removeChild(this.expand);
            element.removeChild(this.shrink);
            this.expand.removeChild(this.expandChild);
            this.expand = this.expandChild = this.shrink = this.element = null;
        }
    }
    checkSize() {
        if (super.checkSize()) {
            this.reset();
            return true;
        }
    }
    init() {
        const parentElement = this.parentElement = this.element.nativeElement.parentElement;
        if (computedProp(parentElement, 'position') === 'static') {
            parentElement.style.position = 'relative';
        }
        this.state = 2 /* Initialized */;
        this.render();
        this.reset();
        this.initSize();
        this.subscribe();
    }
    render() {
        const element = this.element.nativeElement;
        element.style.cssText = WRAP_STYLE;
        element.setAttribute('dir', 'ltr');
        this.expand = div(WRAP_STYLE);
        this.expandChild = div(EXPAND_CHILD_STYLE);
        this.expand.appendChild(this.expandChild);
        element.appendChild(this.expand);
        this.shrink = div(WRAP_STYLE);
        const shrinkChild = div(SHRINK_CHILD_STYLE);
        this.shrink.appendChild(shrinkChild);
        element.appendChild(this.shrink);
    }
    reset() {
        const expandChild = this.expandChild;
        expandChild.style.width = 100000 + 'px';
        expandChild.style.height = 100000 + 'px';
        const expand = this.expand;
        expand.scrollLeft = 100000;
        expand.scrollTop = 100000;
        const shrink = this.shrink;
        shrink.scrollLeft = 100000;
        shrink.scrollTop = 100000;
    }
    subscribe() {
        this.ngZone.runOutsideAngular(() => {
            this.subscription = merge(fromEvent(this.shrink, 'scroll'), fromEvent(this.expand, 'scroll'))
                .subscribe(() => {
                this.checkSize();
            });
        });
    }
}

const HAS_OBSERVER = typeof ResizeObserver !== 'undefined';
/**
 * @hidden
 */
class ResizeObserverService extends ResizeService {
    constructor(resizeBatchService, element, ngZone) {
        super(resizeBatchService);
        this.element = element;
        this.ngZone = ngZone;
    }
    static supported() {
        return HAS_OBSERVER;
    }
    destroy() {
        super.destroy();
        if (this.resizeObserver) {
            this.resizeObserver.disconnect();
            this.resizeObserver = null;
        }
        this.parentElement = null;
    }
    init() {
        this.parentElement = this.element.nativeElement.parentElement;
        this.initSize();
        this.state = 2 /* Initialized */;
        this.ngZone.runOutsideAngular(() => {
            this.resizeObserver = new ResizeObserver(() => {
                this.checkSize();
            });
            this.resizeObserver.observe(this.parentElement);
        });
    }
}

/* tslint:disable:align */
/**
 * @hidden
 */
class ResizeBatchService {
    constructor(ngZone) {
        this.ngZone = ngZone;
        this.scheduled = [];
        this.resolvedPromise = Promise.resolve(null);
        this.flush = this.flush.bind(this);
    }
    schedule(instance, method) {
        this.scheduled.push({ instance, method });
        if (!this.subscription) {
            this.ngZone.runOutsideAngular(() => {
                this.subscription = from(this.resolvedPromise)
                    .subscribe(this.flush);
            });
        }
    }
    isScheduled(instance) {
        return Boolean(this.scheduled.find(item => item.instance === instance));
    }
    cancel(instance) {
        const scheduled = this.scheduled;
        const count = scheduled.length;
        for (let idx = 0; idx < count; idx++) {
            if (scheduled[idx].instance === instance) {
                scheduled.splice(idx, 1);
                if (!scheduled.length) {
                    this.unsubscribe();
                }
                return;
            }
        }
    }
    ngOnDestroy() {
        this.unsubscribe();
    }
    unsubscribe() {
        if (this.subscription) {
            this.subscription.unsubscribe();
            this.subscription = null;
        }
    }
    flush() {
        this.scheduled.forEach(item => {
            item.method.call(item.instance);
        });
        this.scheduled = [];
        this.unsubscribe();
    }
}
ResizeBatchService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
ResizeBatchService.ctorParameters = () => [
    { type: NgZone }
];

/**
 * Emit up to 10 resize events per second by default.
 * Chosen as a compromise between responsiveness and performance.
 */
const DEFAULT_RATE_LIMIT = 10;
/**
 * Resize Sensor Component
 *
 * Triggers a "resize" event whenever the parent DOM element size changes.
 */
class ResizeSensorComponent {
    constructor(resizeBatchService, element, ngZone) {
        /**
         * The maximum number of resize events to emit per second.
         *
         * Defaults to 10.
         */
        this.rateLimit = DEFAULT_RATE_LIMIT;
        /**
         * Fires when the parent DOM element has been resized.
         */
        this.resize = new EventEmitter();
        const serviceType = ResizeObserverService.supported() ? ResizeObserverService : ResizeCompatService;
        this.resizeService = new serviceType(resizeBatchService, element, ngZone);
        const throttleTime = 1000 / (this.rateLimit || DEFAULT_RATE_LIMIT);
        this.subscription = this.resizeService.resize
            .pipe(auditTime(throttleTime))
            .subscribe(() => {
            if (!this.resizeService.acceptedSize) {
                this.resize.emit();
            }
        });
    }
    ngAfterViewChecked() {
        this.resizeService.checkChanges();
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.resizeService.destroy();
    }
    acceptSize(size) {
        this.resizeService.acceptSize(size);
    }
}
ResizeSensorComponent.decorators = [
    { type: Component, args: [{
                selector: 'kendo-resize-sensor',
                template: ''
            },] },
];
/** @nocollapse */
ResizeSensorComponent.ctorParameters = () => [
    { type: ResizeBatchService },
    { type: ElementRef },
    { type: NgZone }
];
ResizeSensorComponent.propDecorators = {
    rateLimit: [{ type: Input }],
    resize: [{ type: Output }]
};

const COMPONENT_DIRECTIVES = [ResizeSensorComponent];
/**
 * Resize Sensor module
 */
class ResizeSensorModule {
}
ResizeSensorModule.decorators = [
    { type: NgModule, args: [{
                declarations: [COMPONENT_DIRECTIVES],
                exports: [COMPONENT_DIRECTIVES],
                providers: [ResizeBatchService]
            },] },
];

class KendoInput {
}

/**
 * Enum with key codes.
 */
var Keys;
(function (Keys) {
    Keys[Keys["Alt"] = 18] = "Alt";
    Keys[Keys["ArrowDown"] = 40] = "ArrowDown";
    Keys[Keys["ArrowLeft"] = 37] = "ArrowLeft";
    Keys[Keys["ArrowRight"] = 39] = "ArrowRight";
    Keys[Keys["ArrowUp"] = 38] = "ArrowUp";
    Keys[Keys["Backspace"] = 8] = "Backspace";
    Keys[Keys["Control"] = 17] = "Control";
    Keys[Keys["Delete"] = 46] = "Delete";
    Keys[Keys["Digit0"] = 48] = "Digit0";
    Keys[Keys["Digit1"] = 49] = "Digit1";
    Keys[Keys["Digit2"] = 50] = "Digit2";
    Keys[Keys["Digit3"] = 51] = "Digit3";
    Keys[Keys["Digit4"] = 52] = "Digit4";
    Keys[Keys["Digit5"] = 53] = "Digit5";
    Keys[Keys["Digit6"] = 54] = "Digit6";
    Keys[Keys["Digit7"] = 55] = "Digit7";
    Keys[Keys["Digit8"] = 56] = "Digit8";
    Keys[Keys["Digit9"] = 57] = "Digit9";
    Keys[Keys["End"] = 35] = "End";
    Keys[Keys["Enter"] = 13] = "Enter";
    Keys[Keys["Escape"] = 27] = "Escape";
    Keys[Keys["F1"] = 112] = "F1";
    Keys[Keys["F2"] = 113] = "F2";
    Keys[Keys["F10"] = 121] = "F10";
    Keys[Keys["Home"] = 36] = "Home";
    Keys[Keys["Insert"] = 45] = "Insert";
    Keys[Keys["KeyA"] = 65] = "KeyA";
    Keys[Keys["KeyB"] = 66] = "KeyB";
    Keys[Keys["KeyC"] = 67] = "KeyC";
    Keys[Keys["KeyD"] = 68] = "KeyD";
    Keys[Keys["KeyE"] = 69] = "KeyE";
    Keys[Keys["KeyF"] = 70] = "KeyF";
    Keys[Keys["KeyG"] = 71] = "KeyG";
    Keys[Keys["KeyH"] = 72] = "KeyH";
    Keys[Keys["KeyI"] = 73] = "KeyI";
    Keys[Keys["KeyJ"] = 74] = "KeyJ";
    Keys[Keys["KeyK"] = 75] = "KeyK";
    Keys[Keys["KeyL"] = 76] = "KeyL";
    Keys[Keys["KeyM"] = 77] = "KeyM";
    Keys[Keys["KeyN"] = 78] = "KeyN";
    Keys[Keys["KeyO"] = 79] = "KeyO";
    Keys[Keys["KeyP"] = 80] = "KeyP";
    Keys[Keys["KeyQ"] = 81] = "KeyQ";
    Keys[Keys["KeyR"] = 82] = "KeyR";
    Keys[Keys["KeyS"] = 83] = "KeyS";
    Keys[Keys["KeyT"] = 84] = "KeyT";
    Keys[Keys["KeyU"] = 85] = "KeyU";
    Keys[Keys["KeyV"] = 86] = "KeyV";
    Keys[Keys["KeyW"] = 87] = "KeyW";
    Keys[Keys["KeyX"] = 88] = "KeyX";
    Keys[Keys["KeyY"] = 89] = "KeyY";
    Keys[Keys["KeyZ"] = 90] = "KeyZ";
    Keys[Keys["NumpadDecimal"] = 110] = "NumpadDecimal";
    Keys[Keys["PageDown"] = 34] = "PageDown";
    Keys[Keys["PageUp"] = 33] = "PageUp";
    Keys[Keys["Shift"] = 16] = "Shift";
    Keys[Keys["Space"] = 32] = "Space";
    Keys[Keys["Tab"] = 9] = "Tab";
})(Keys || (Keys = {}));

/**
 * Generated bundle index. Do not edit.
 */

export { ResizeService, DraggableDirective, DraggableModule, EventsOutsideAngularDirective, EventsModule, ResizeSensorComponent, ResizeBatchService, ResizeCompatService, ResizeObserverService, ResizeSensorModule, KendoInput, isDocumentAvailable, isChanged, anyChanged, hasObservers, guid, Keys };
