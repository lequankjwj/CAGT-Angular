/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { DomEventsService } from './../common/dom-events.service';
import { Directive, HostBinding } from '@angular/core';
import { DraggableDirective } from '@progress/kendo-angular-common';
import { SelectionService } from './selection.service';
import { CellSelectionService } from './cell-selection.service';
import { take, delay } from 'rxjs/operators';
import { merge } from 'rxjs';
var createElement = function () {
    var marquee = document.createElement("div");
    marquee.className = "k-marquee";
    var marqueeColor = document.createElement("div");
    marqueeColor.className = "k-marquee-color";
    marquee.appendChild(marqueeColor);
    return marquee;
};
var ɵ0 = createElement;
var POINTER_OFFSET = 2;
var MINIMAL_DRAG_DISTANCE = 5;
var offsets = {
    topLeft: { x: POINTER_OFFSET, y: POINTER_OFFSET },
    topRight: { x: -POINTER_OFFSET, y: POINTER_OFFSET },
    bottomLeft: { x: POINTER_OFFSET, y: -POINTER_OFFSET },
    bottomRight: { x: -POINTER_OFFSET, y: -POINTER_OFFSET }
};
/**
 * @hidden
 */
var GridMarqueeDirective = /** @class */ (function () {
    function GridMarqueeDirective(draggable, selection, cellSelection, domEvents) {
        this.draggable = draggable;
        this.selection = selection;
        this.cellSelection = cellSelection;
        this.domEvents = domEvents;
        this.selectionStarted = false;
    }
    Object.defineProperty(GridMarqueeDirective.prototype, "userSelection", {
        get: function () {
            return (this.cellSelection.enableMarquee || this.selection.enableMarquee) ? 'none' : null;
        },
        enumerable: true,
        configurable: true
    });
    GridMarqueeDirective.prototype.ngOnInit = function () {
        this.subscriptions = (this.draggable.kendoPress.subscribe(this.start.bind(this)));
        this.subscriptions.add(this.draggable.kendoDrag.subscribe(this.moveMarquee.bind(this)));
    };
    GridMarqueeDirective.prototype.ngOnDestroy = function () {
        this.subscriptions.unsubscribe();
        this.clean();
    };
    GridMarqueeDirective.prototype.start = function (args) {
        if (args.originalEvent.target.classList.contains('k-checkbox')) {
            this.pressArgs = null;
            return;
        }
        this.pressArgs = args;
        this.pressTarget = null;
    };
    GridMarqueeDirective.prototype.moveMarquee = function (args) {
        if (!this.pressTarget) {
            this.pressTarget = this.cellSelection.active ? this.cellSelection.mouseDownEventArgs : this.selection.mouseDownEventArgs;
        }
        var press = this.pressArgs;
        if (!press) {
            return;
        }
        if (!this.selectionStarted) {
            var distance = Math.sqrt(Math.pow((args.pageX - press.pageX), 2) + Math.pow((args.pageY - press.pageY), 2));
            if (distance > MINIMAL_DRAG_DISTANCE) {
                this.selectionStarted = true;
                this.dragEndSubscription = merge(this.domEvents.cellMouseup.pipe(take(1)), this.draggable.kendoRelease.pipe(delay(1), take(1)))
                    .subscribe(this.endSelection.bind(this));
            }
            else {
                return;
            }
        }
        this.initMarquee();
        var element = this.marqueeElement;
        var marqueeQuadrant = this.getMarqueeQuadrant(args.pageX, args.pageY, press.pageX, press.pageY);
        var left = Math.min(args.pageX, press.pageX);
        var top = Math.min(args.pageY, press.pageY);
        var width = Math.abs(args.pageX - press.pageX);
        var height = Math.abs(args.pageY - press.pageY);
        if (marqueeQuadrant) {
            left += offsets[marqueeQuadrant].x;
            top += offsets[marqueeQuadrant].y;
        }
        element.style.left = left + "px";
        element.style.top = top + "px";
        element.style.width = width + "px";
        element.style.height = height + "px";
    };
    GridMarqueeDirective.prototype.endSelection = function (args) {
        if (args.type === 'mouseup' || args.type === 'touchend') {
            if (this.cellSelection.active) {
                this.cellSelection.dragging = true;
                this.cellSelection.changes.emit(this.cellSelection.selectRange(this.pressTarget.rowIndex, this.pressTarget.column.leafIndex, args.rowIndex, args.column.leafIndex));
            }
            else if (this.selection.active) {
                this.selection.dragging = true;
                this.selection.changes.emit(this.selection.selectRange(this.pressTarget.rowIndex, args.rowIndex));
            }
        }
        this.clean();
    };
    GridMarqueeDirective.prototype.clean = function () {
        if (this.marqueeElement) {
            document.body.removeChild(this.marqueeElement);
            this.marqueeElement = null;
        }
        if (this.dragEndSubscription) {
            this.dragEndSubscription.unsubscribe();
        }
        this.dragEndSubscription = null;
        this.pressTarget = null;
        this.pressArgs = null;
        this.selectionStarted = false;
        this.cellSelection.active ? this.cellSelection.dragging = false : this.selection.dragging = false;
    };
    GridMarqueeDirective.prototype.initMarquee = function () {
        if (!this.marqueeElement) {
            this.marqueeElement = createElement();
            document.body.appendChild(this.marqueeElement);
        }
    };
    GridMarqueeDirective.prototype.getMarqueeQuadrant = function (pointerX, pointerY, startX, startY) {
        var leftHalf = pointerX < startX;
        var rightHalf = pointerX > startX;
        var topHalf = pointerY < startY;
        var bottomHalf = pointerY > startY;
        if (leftHalf && topHalf) {
            return 'topLeft';
        }
        if (leftHalf && bottomHalf) {
            return 'bottomLeft';
        }
        if (rightHalf && topHalf) {
            return 'topRight';
        }
        if (rightHalf && bottomHalf) {
            return 'bottomRight';
        }
        return null;
    };
    GridMarqueeDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[kendoGridSelectionMarquee]'
                },] },
    ];
    /** @nocollapse */
    GridMarqueeDirective.ctorParameters = function () { return [
        { type: DraggableDirective },
        { type: SelectionService },
        { type: CellSelectionService },
        { type: DomEventsService }
    ]; };
    GridMarqueeDirective.propDecorators = {
        userSelection: [{ type: HostBinding, args: ['style.user-select',] }, { type: HostBinding, args: ['style.-webkit-user-select',] }]
    };
    return GridMarqueeDirective;
}());
export { GridMarqueeDirective };
export { ɵ0 };
