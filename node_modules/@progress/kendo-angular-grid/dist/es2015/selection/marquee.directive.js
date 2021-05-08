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
const createElement = () => {
    const marquee = document.createElement("div");
    marquee.className = "k-marquee";
    const marqueeColor = document.createElement("div");
    marqueeColor.className = "k-marquee-color";
    marquee.appendChild(marqueeColor);
    return marquee;
};
const ɵ0 = createElement;
const POINTER_OFFSET = 2;
const MINIMAL_DRAG_DISTANCE = 5;
const offsets = {
    topLeft: { x: POINTER_OFFSET, y: POINTER_OFFSET },
    topRight: { x: -POINTER_OFFSET, y: POINTER_OFFSET },
    bottomLeft: { x: POINTER_OFFSET, y: -POINTER_OFFSET },
    bottomRight: { x: -POINTER_OFFSET, y: -POINTER_OFFSET }
};
/**
 * @hidden
 */
export class GridMarqueeDirective {
    constructor(draggable, selection, cellSelection, domEvents) {
        this.draggable = draggable;
        this.selection = selection;
        this.cellSelection = cellSelection;
        this.domEvents = domEvents;
        this.selectionStarted = false;
    }
    get userSelection() {
        return (this.cellSelection.enableMarquee || this.selection.enableMarquee) ? 'none' : null;
    }
    ngOnInit() {
        this.subscriptions = (this.draggable.kendoPress.subscribe(this.start.bind(this)));
        this.subscriptions.add(this.draggable.kendoDrag.subscribe(this.moveMarquee.bind(this)));
    }
    ngOnDestroy() {
        this.subscriptions.unsubscribe();
        this.clean();
    }
    start(args) {
        if (args.originalEvent.target.classList.contains('k-checkbox')) {
            this.pressArgs = null;
            return;
        }
        this.pressArgs = args;
        this.pressTarget = null;
    }
    moveMarquee(args) {
        if (!this.pressTarget) {
            this.pressTarget = this.cellSelection.active ? this.cellSelection.mouseDownEventArgs : this.selection.mouseDownEventArgs;
        }
        const press = this.pressArgs;
        if (!press) {
            return;
        }
        if (!this.selectionStarted) {
            const distance = Math.sqrt(Math.pow((args.pageX - press.pageX), 2) + Math.pow((args.pageY - press.pageY), 2));
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
        const element = this.marqueeElement;
        const marqueeQuadrant = this.getMarqueeQuadrant(args.pageX, args.pageY, press.pageX, press.pageY);
        let left = Math.min(args.pageX, press.pageX);
        let top = Math.min(args.pageY, press.pageY);
        const width = Math.abs(args.pageX - press.pageX);
        const height = Math.abs(args.pageY - press.pageY);
        if (marqueeQuadrant) {
            left += offsets[marqueeQuadrant].x;
            top += offsets[marqueeQuadrant].y;
        }
        element.style.left = `${left}px`;
        element.style.top = `${top}px`;
        element.style.width = `${width}px`;
        element.style.height = `${height}px`;
    }
    endSelection(args) {
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
    }
    clean() {
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
    }
    initMarquee() {
        if (!this.marqueeElement) {
            this.marqueeElement = createElement();
            document.body.appendChild(this.marqueeElement);
        }
    }
    getMarqueeQuadrant(pointerX, pointerY, startX, startY) {
        const leftHalf = pointerX < startX;
        const rightHalf = pointerX > startX;
        const topHalf = pointerY < startY;
        const bottomHalf = pointerY > startY;
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
    }
}
GridMarqueeDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kendoGridSelectionMarquee]'
            },] },
];
/** @nocollapse */
GridMarqueeDirective.ctorParameters = () => [
    { type: DraggableDirective },
    { type: SelectionService },
    { type: CellSelectionService },
    { type: DomEventsService }
];
GridMarqueeDirective.propDecorators = {
    userSelection: [{ type: HostBinding, args: ['style.user-select',] }, { type: HostBinding, args: ['style.-webkit-user-select',] }]
};
export { ɵ0 };
