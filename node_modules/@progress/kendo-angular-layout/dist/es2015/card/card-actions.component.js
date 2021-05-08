/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Component, EventEmitter, HostBinding, Input, Output, TemplateRef } from '@angular/core';
/**
 * Specifies the action buttons of the Card.
 * * ([see example]({% slug actions_card %})).
 */
export class CardActionsComponent {
    constructor() {
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
    get stretchedClass() {
        return this.layout === 'stretched';
    }
    get startClass() {
        return this.layout === 'start';
    }
    get endClass() {
        return this.layout === 'end';
    }
    get centerClass() {
        return this.layout === 'center';
    }
    get verticalClass() {
        return this.orientation === 'vertical';
    }
    get horizontalClass() {
        return this.orientation === 'horizontal';
    }
    /**
     * @hidden
     */
    onClick(action) {
        this.action.emit(action);
    }
    /**
     * @hidden
     */
    actionTemplate() {
        return this.actions instanceof TemplateRef;
    }
}
CardActionsComponent.decorators = [
    { type: Component, args: [{
                selector: 'kendo-card-actions',
                template: `
        <ng-content *ngIf="!actions"></ng-content>

        <ng-container *ngIf="!actionTemplate()">
            <button type="button"
                class="k-button"
                [class.k-primary]="action.primary"
                [class.k-flat]="action.flat"
                (click)="onClick(action)"
                *ngFor="let action of actions"
            >
                {{ action.text }}
            </button>
        </ng-container>

        <ng-template [ngTemplateOutlet]="actions" *ngIf="actionTemplate()"></ng-template>
    `
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
