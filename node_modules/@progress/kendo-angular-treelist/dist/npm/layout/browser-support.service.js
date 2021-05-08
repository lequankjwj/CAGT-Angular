/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var kendo_angular_common_1 = require("@progress/kendo-angular-common");
var canCreateElement = function () { return kendo_angular_common_1.isDocumentAvailable() && document.createElement; };
var ɵ0 = canCreateElement;
exports.ɵ0 = ɵ0;
var cachedScrollbarWidth = null;
var cachedPixelRatio;
var cachedRtlScrollLeft = null;
function scrollbarWidth() {
    if (cachedScrollbarWidth === null && canCreateElement()) {
        cachedPixelRatio = window.devicePixelRatio || 1;
        var div = document.createElement("div");
        div.style.cssText = "overflow:scroll;overflow-x:hidden;zoom:1;clear:both;display:block";
        div.innerHTML = "&nbsp;";
        document.body.appendChild(div);
        cachedScrollbarWidth = div.offsetWidth - div.scrollWidth;
        document.body.removeChild(div);
    }
    return cachedScrollbarWidth;
}
function rtlScrollLeft() {
    if (cachedRtlScrollLeft === null && canCreateElement()) {
        var div = document.createElement("div");
        div.style.cssText = "overflow:scroll;zoom:1;clear:both;display:block;width:100px;visibility:hidden;position:absolute;left:-10000px;direction:rtl;";
        div.innerHTML = "<div style='width:200px;height:1px;'</div>";
        document.body.appendChild(div);
        var initial = div.scrollLeft;
        div.scrollLeft = -1;
        cachedRtlScrollLeft = div.scrollLeft < 0 ? div.scrollLeft : initial;
        document.body.removeChild(div);
    }
    return cachedRtlScrollLeft;
}
/**
 * @hidden
 * move to kendo-common
 */
var BrowserSupportService = /** @class */ (function () {
    function BrowserSupportService(zone, changeDetector) {
        var _this = this;
        this.zone = zone;
        this.changeDetector = changeDetector;
        this.changes = new core_1.EventEmitter();
        if (typeof window !== 'undefined') {
            this.zone.runOutsideAngular(function () {
                rxjs_1.fromEvent(window, 'resize').pipe(operators_1.auditTime(100)).subscribe(function () {
                    if (cachedPixelRatio !== window.devicePixelRatio) {
                        zone.run(function () {
                            cachedScrollbarWidth = null;
                            _this.changes.emit();
                            _this.changeDetector.markForCheck();
                        });
                    }
                });
            });
        }
    }
    Object.defineProperty(BrowserSupportService.prototype, "scrollbarWidth", {
        get: function () {
            return scrollbarWidth();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BrowserSupportService.prototype, "rtlScrollLeft", {
        get: function () {
            return rtlScrollLeft();
        },
        enumerable: true,
        configurable: true
    });
    BrowserSupportService.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    BrowserSupportService.ctorParameters = function () { return [
        { type: core_1.NgZone },
        { type: core_1.ChangeDetectorRef }
    ]; };
    return BrowserSupportService;
}());
exports.BrowserSupportService = BrowserSupportService;
