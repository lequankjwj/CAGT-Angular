/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Injectable, NgZone, ChangeDetectorRef, EventEmitter } from '@angular/core';
import { fromEvent } from 'rxjs';
import { auditTime } from 'rxjs/operators';
import { isDocumentAvailable } from '@progress/kendo-angular-common';
const canCreateElement = () => isDocumentAvailable() && document.createElement;
const ɵ0 = canCreateElement;
let cachedScrollbarWidth = null;
let cachedPixelRatio;
let cachedRtlScrollLeft = null;
function scrollbarWidth() {
    if (cachedScrollbarWidth === null && canCreateElement()) {
        cachedPixelRatio = window.devicePixelRatio || 1;
        const div = document.createElement("div");
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
        const div = document.createElement("div");
        div.style.cssText = "overflow:scroll;zoom:1;clear:both;display:block;width:100px;visibility:hidden;position:absolute;left:-10000px;direction:rtl;";
        div.innerHTML = "<div style='width:200px;height:1px;'</div>";
        document.body.appendChild(div);
        const initial = div.scrollLeft;
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
export class BrowserSupportService {
    constructor(zone, changeDetector) {
        this.zone = zone;
        this.changeDetector = changeDetector;
        this.changes = new EventEmitter();
        if (typeof window !== 'undefined') {
            this.zone.runOutsideAngular(() => {
                fromEvent(window, 'resize').pipe(auditTime(100)).subscribe(() => {
                    if (cachedPixelRatio !== window.devicePixelRatio) {
                        zone.run(() => {
                            cachedScrollbarWidth = null;
                            this.changes.emit();
                            this.changeDetector.markForCheck();
                        });
                    }
                });
            });
        }
    }
    get scrollbarWidth() {
        return scrollbarWidth();
    }
    get rtlScrollLeft() {
        return rtlScrollLeft();
    }
}
BrowserSupportService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
BrowserSupportService.ctorParameters = () => [
    { type: NgZone },
    { type: ChangeDetectorRef }
];
export { ɵ0 };
