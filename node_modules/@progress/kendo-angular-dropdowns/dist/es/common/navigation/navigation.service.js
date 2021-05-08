/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Injectable, EventEmitter } from '@angular/core';
import { isPresent } from '../util';
import { Keys } from '@progress/kendo-angular-common';
import { NavigationAction } from './navigation-action';
import { DisabledItemsService } from '../disabled-items/disabled-items.service';
import { SelectionService } from '../selection/selection.service';
var MIN_INDEX = 0;
/**
 * @hidden
 */
var NavigationEvent = /** @class */ (function () {
    /**
     * The index of the item to which the user navigated.
     */
    function NavigationEvent(index, originalEvent) {
        this.index = index;
        this.originalEvent = originalEvent;
    }
    return NavigationEvent;
}());
export { NavigationEvent };
/**
 * @hidden
 */
var NavigationService = /** @class */ (function () {
    function NavigationService(disabledItemsService, selectionService) {
        this.disabledItemsService = disabledItemsService;
        this.selectionService = selectionService;
        this.open = new EventEmitter();
        this.close = new EventEmitter();
        this.enter = new EventEmitter();
        this.tab = new EventEmitter();
        this.esc = new EventEmitter();
        this.up = new EventEmitter();
        this.right = new EventEmitter();
        this.down = new EventEmitter();
        this.left = new EventEmitter();
        this.delete = new EventEmitter();
        this.backspace = new EventEmitter();
        this.home = new EventEmitter();
        this.end = new EventEmitter();
    }
    NavigationService.prototype.process = function (args) {
        var keyCode = args.originalEvent.keyCode;
        var altKey = args.originalEvent.altKey;
        var index;
        var action = NavigationAction.Undefined;
        if (altKey && keyCode === Keys.ArrowDown) {
            action = NavigationAction.Open;
        }
        else if (altKey && keyCode === Keys.ArrowUp) {
            action = NavigationAction.Close;
        }
        else if (keyCode === Keys.Enter) {
            action = NavigationAction.Enter;
        }
        else if (keyCode === Keys.Escape) {
            action = NavigationAction.Esc;
        }
        else if (keyCode === Keys.Tab) {
            action = NavigationAction.Tab;
        }
        else if (keyCode === Keys.ArrowUp) {
            index = this.next({ current: args.current, start: args.min, end: args.max, step: -1 });
            action = NavigationAction.Up;
        }
        else if (keyCode === Keys.ArrowLeft) {
            index = this.next({ current: args.current, start: args.min, end: args.max, step: -1 });
            action = NavigationAction.Left;
        }
        else if (keyCode === Keys.ArrowDown) {
            index = this.next({ current: args.current, start: args.min, end: args.max, step: 1 });
            action = NavigationAction.Down;
        }
        else if (keyCode === Keys.ArrowRight) {
            index = this.next({ current: args.current, start: args.min, end: args.max, step: 1 });
            action = NavigationAction.Right;
        }
        else if (keyCode === Keys.Home) {
            index = this.isDisabled(MIN_INDEX) ? args.current : MIN_INDEX;
            action = NavigationAction.Home;
        }
        else if (keyCode === Keys.End) {
            index = this.isDisabled(args.max) ? args.current : args.max;
            action = NavigationAction.End;
        }
        else if (keyCode === Keys.Delete) {
            action = NavigationAction.Delete;
        }
        else if (keyCode === Keys.Backspace) {
            action = NavigationAction.Backspace;
        }
        var eventData = new NavigationEvent(index, args.originalEvent);
        if (action !== NavigationAction.Undefined) {
            this[NavigationAction[action].toLowerCase()].emit(eventData);
        }
        return action;
    };
    NavigationService.prototype.next = function (args) {
        var current = args.current, start = args.start, end = args.end, step = args.step;
        var nextIndex = !isPresent(current) ? start : this.clampIndex(current + step, start, end);
        var firstFocusableIndex = this.firstFocusableIndex(nextIndex, start, end, step);
        if (isPresent(firstFocusableIndex)) {
            return firstFocusableIndex;
        }
        if (this.selectionService.isSelected(current) && current >= start) {
            return current;
        }
        var inversedStep = -1 * step;
        return this.firstFocusableIndex(nextIndex, start, end, inversedStep);
    };
    NavigationService.prototype.clampIndex = function (index, min, max) {
        if (!isPresent(index) || index < min) {
            return min;
        }
        if (index > max) {
            return max;
        }
        return index;
    };
    NavigationService.prototype.firstFocusableIndex = function (startIndex, min, max, step) {
        while (min <= startIndex && startIndex <= max) {
            if (!this.isDisabled(startIndex)) {
                return startIndex;
            }
            startIndex += step;
        }
        return undefined;
    };
    NavigationService.prototype.isDisabled = function (index) {
        if (this.disabledItemsService) {
            return this.disabledItemsService.isIndexDisabled(index);
        }
    };
    NavigationService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    NavigationService.ctorParameters = function () { return [
        { type: DisabledItemsService },
        { type: SelectionService }
    ]; };
    return NavigationService;
}());
export { NavigationService };
