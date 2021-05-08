/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Component, EventEmitter, HostBinding, Input, Output, TemplateRef } from '@angular/core';
/**
 * Specifies the action buttons of the Card.
 * * ([see example]({% slug actions_card %})).
 */
var CardActionsComponent = /** @class */ (function () {
    function CardActionsComponent() {
        this.hostClass = true;
        /**
         * Specifies the layout of the Card action buttons.
         *
         * * The possible values are:
         * * (Default) `horizontal`
         * * `vertical`
         *
         */
        this.orientation = 'horizontal';
        /**
         * Specifies the layout of the Card action buttons.
         *
         * The possible values are:
         * * (Default) `start`
         * * `center`
         * * `end`
         * * `stretched`
         *
         */
        this.layout = 'start';
        /**
         * Fires when the user clicks an action button.
         */
        this.action = new EventEmitter();
    }
    Object.defineProperty(CardActionsComponent.prototype, "stretchedClass", {
        get: function () {
            return this.layout === 'stretched';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CardActionsComponent.prototype, "startClass", {
        get: function () {
            return this.layout === 'start';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CardActionsComponent.prototype, "endClass", {
        get: function () {
            return this.layout === 'end';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CardActionsComponent.prototype, "centerClass", {
        get: function () {
            return this.layout === 'center';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CardActionsComponent.prototype, "verticalClass", {
        get: function () {
            return this.orientation === 'vertical';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CardActionsComponent.prototype, "horizontalClass", {
        get: function () {
            return this.orientation === 'horizontal';
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @hidden
     */
    CardActionsComponent.prototype.onClick = function (action) {
        this.action.emit(action);
    };
    /**
     * @hidden
     */
    CardActionsComponent.prototype.actionTemplate = function () {
        return this.actions instanceof TemplateRef;
    };
    CardActionsComponent.decorators = [
        { type: Component, args: [{
                    selector: 'kendo-card-actions',
                    template: "\n        <ng-content *ngIf=\"!actions\"></ng-content>\n\n        <ng-container *ngIf=\"!actionTemplate()\">\n            <button type=\"button\"\n                class=\"k-button\"\n                [class.k-primary]=\"action.primary\"\n                [class.k-flat]=\"action.flat\"\n                (click)=\"onClick(action)\"\n                *ngFor=\"let action of actions\"\n            >\n                {{ action.text }}\n            </button>\n        </ng-container>\n\n        <ng-template [ngTemplateOutlet]=\"actions\" *ngIf=\"actionTemplate()\"></ng-template>\n    "
                },] },
    ];
    CardActionsComponent.propDecorators = {
        hostClass: [{ type: HostBinding, args: ['class.k-card-actions',] }],
        stretchedClass: [{ type: HostBinding, args: ['class.k-card-actions-stretched',] }],
        startClass: [{ type: HostBinding, args: ['class.k-card-actions-start',] }],
        endClass: [{ type: HostBinding, args: ['class.k-card-actions-end',] }],
        centerClass: [{ type: HostBinding, args: ['class.k-card-actions-center',] }],
        verticalClass: [{ type: HostBinding, args: ['class.k-card-actions-vertical',] }],
        horizontalClass: [{ type: HostBinding, args: ['class.k-card-actions-horizontal',] }],
        orientation: [{ type: Input }],
        layout: [{ type: Input }],
        actions: [{ type: Input }],
        action: [{ type: Output }]
    };
    return CardActionsComponent;
}());
export { CardActionsComponent };
