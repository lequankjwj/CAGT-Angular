/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Component, EventEmitter, Input, Output, ElementRef, NgZone } from '@angular/core';
import { auditTime } from 'rxjs/operators';
import { ResizeCompatService } from './compat.service';
import { ResizeObserverService } from './observer.service';
import { ResizeBatchService } from './resize-batch.service';
/**
 * Emit up to 10 resize events per second by default.
 * Chosen as a compromise between responsiveness and performance.
 */
var DEFAULT_RATE_LIMIT = 10;
/**
 * Resize Sensor Component
 *
 * Triggers a "resize" event whenever the parent DOM element size changes.
 */
var ResizeSensorComponent = /** @class */ (function () {
    function ResizeSensorComponent(resizeBatchService, element, ngZone) {
        var _this = this;
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
        var serviceType = ResizeObserverService.supported() ? ResizeObserverService : ResizeCompatService;
        this.resizeService = new serviceType(resizeBatchService, element, ngZone);
        var throttleTime = 1000 / (this.rateLimit || DEFAULT_RATE_LIMIT);
        this.subscription = this.resizeService.resize
            .pipe(auditTime(throttleTime))
            .subscribe(function () {
            if (!_this.resizeService.acceptedSize) {
                _this.resize.emit();
            }
        });
    }
    ResizeSensorComponent.prototype.ngAfterViewChecked = function () {
        this.resizeService.checkChanges();
    };
    ResizeSensorComponent.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
        this.resizeService.destroy();
    };
    ResizeSensorComponent.prototype.acceptSize = function (size) {
        this.resizeService.acceptSize(size);
    };
    ResizeSensorComponent.decorators = [
        { type: Component, args: [{
                    selector: 'kendo-resize-sensor',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    ResizeSensorComponent.ctorParameters = function () { return [
        { type: ResizeBatchService },
        { type: ElementRef },
        { type: NgZone }
    ]; };
    ResizeSensorComponent.propDecorators = {
        rateLimit: [{ type: Input }],
        resize: [{ type: Output }]
    };
    return ResizeSensorComponent;
}());
export { ResizeSensorComponent };
