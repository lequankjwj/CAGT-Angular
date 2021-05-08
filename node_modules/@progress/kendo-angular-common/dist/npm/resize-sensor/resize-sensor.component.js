/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var operators_1 = require("rxjs/operators");
var compat_service_1 = require("./compat.service");
var observer_service_1 = require("./observer.service");
var resize_batch_service_1 = require("./resize-batch.service");
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
        this.resize = new core_1.EventEmitter();
        var serviceType = observer_service_1.ResizeObserverService.supported() ? observer_service_1.ResizeObserverService : compat_service_1.ResizeCompatService;
        this.resizeService = new serviceType(resizeBatchService, element, ngZone);
        var throttleTime = 1000 / (this.rateLimit || DEFAULT_RATE_LIMIT);
        this.subscription = this.resizeService.resize
            .pipe(operators_1.auditTime(throttleTime))
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
        { type: core_1.Component, args: [{
                    selector: 'kendo-resize-sensor',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    ResizeSensorComponent.ctorParameters = function () { return [
        { type: resize_batch_service_1.ResizeBatchService },
        { type: core_1.ElementRef },
        { type: core_1.NgZone }
    ]; };
    ResizeSensorComponent.propDecorators = {
        rateLimit: [{ type: core_1.Input }],
        resize: [{ type: core_1.Output }]
    };
    return ResizeSensorComponent;
}());
exports.ResizeSensorComponent = ResizeSensorComponent;
