/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Directive, ElementRef, Input, Optional, Renderer2 } from '@angular/core';
import { TreeListComponent } from '../treelist.component';
import { ResizeService } from "./resize.service";
/**
 * @hidden
 */
var ResizableContainerDirective = /** @class */ (function () {
    function ResizableContainerDirective(el, renderer, resizeService, treelist) {
        this.el = el;
        this.renderer = renderer;
        this.resizeService = resizeService;
        this.treelist = treelist;
        this.enabled = false;
    }
    Object.defineProperty(ResizableContainerDirective.prototype, "lockedWidth", {
        set: function (value) {
            this._lockedWidth = value;
            if (this.enabled) {
                this.attachResize();
                this.resize();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ResizableContainerDirective.prototype, "kendoTreeListResizableContainer", {
        set: function (enabled) {
            var refresh = enabled !== this.enabled;
            this.enabled = enabled;
            if (refresh) {
                this.attachResize();
                this.resize();
            }
        },
        enumerable: true,
        configurable: true
    });
    ResizableContainerDirective.prototype.ngOnDestroy = function () {
        if (this.resizeSubscription) {
            this.resizeSubscription.unsubscribe();
        }
    };
    ResizableContainerDirective.prototype.attachResize = function () {
        if (this.resizeSubscription && !this.enabled) {
            this.resizeSubscription.unsubscribe();
            this.resizeSubscription = null;
        }
        if (!this.resizeSubscription && this.enabled) {
            this.resizeSubscription = this.resizeService.changes.subscribe(this.resize.bind(this));
        }
    };
    ResizableContainerDirective.prototype.resize = function () {
        if (this.treelist && this.treelist.wrapper) {
            var containerElement = this.treelist.wrapper.nativeElement;
            var width = Math.max(containerElement.clientWidth - this._lockedWidth, 0);
            if (this.enabled && width > 0) {
                this.renderer.setStyle(this.el.nativeElement, "width", width + "px");
            }
            else {
                this.renderer.setStyle(this.el.nativeElement, "width", "");
            }
        }
    };
    ResizableContainerDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[kendoTreeListResizableContainer]'
                },] },
    ];
    /** @nocollapse */
    ResizableContainerDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Renderer2 },
        { type: ResizeService },
        { type: TreeListComponent, decorators: [{ type: Optional }] }
    ]; };
    ResizableContainerDirective.propDecorators = {
        lockedWidth: [{ type: Input, args: ['lockedWidth',] }],
        kendoTreeListResizableContainer: [{ type: Input }]
    };
    return ResizableContainerDirective;
}());
export { ResizableContainerDirective };
