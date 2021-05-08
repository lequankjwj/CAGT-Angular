/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Component, Input, Output, EventEmitter, ContentChild } from '@angular/core';
import { trigger, transition, style, animate, state } from '@angular/animations';
import { ColumnMenuItemContentTemplateDirective } from './column-menu-item-content-template.directive';
/**
 * Represents an item that can be placed inside a
 * [`ColumnMenuTemplate`]({% slug api_treelist_columnmenutemplatedirective %}) directive.
 *
 * {% meta height:500 %}
 * {% embed_file column-menu/template-item/app.component.ts preview %}
 * {% embed_file column-menu/app.module.ts %}
 * {% embed_file column-menu/main.ts %}
 * {% embed_file shared/employees.ts %}
 * {% endmeta %}
 */
export class ColumnMenuItemComponent {
    constructor() {
        /**
         * Fires when the item is clicked.
         */
        this.itemClick = new EventEmitter();
        /**
         * Fires when the content is expanded.
         */
        this.expand = new EventEmitter();
        /**
         * Fires when the content is collapsed.
         */
        this.collapse = new EventEmitter();
        this.contentState = 'collapsed';
    }
    get iconClass() {
        return `k-i-${this.icon}`;
    }
    ngOnChanges(changes) {
        if (changes.expanded) {
            this.updateContentState();
        }
    }
    /**
     * @hidden
     */
    onClick(e) {
        this.itemClick.emit(e);
        if (this.contentTemplate) {
            this.expanded = !this.expanded;
            this.updateContentState();
            if (this.expanded) {
                this.expand.emit();
            }
            else {
                this.collapse.emit();
            }
        }
    }
    updateContentState() {
        this.contentState = this.expanded ? 'expanded' : 'collapsed';
    }
}
ColumnMenuItemComponent.decorators = [
    { type: Component, args: [{
                animations: [
                    trigger('state', [
                        state('collapsed', style({ display: 'none' })),
                        state('expanded', style({ display: 'block' })),
                        transition('collapsed => expanded', [
                            style({
                                height: '0px',
                                display: 'block'
                            }),
                            animate('100ms ease-in', style({
                                height: '*'
                            }))
                        ]),
                        transition('expanded => collapsed', [
                            style({
                                height: '*'
                            }),
                            animate('100ms ease-in', style({
                                height: '0px'
                            }))
                        ])
                    ])
                ],
                selector: 'kendo-treelist-columnmenu-item',
                template: `
        <div class="k-columnmenu-item" (click)="onClick($event)" [class.k-state-selected]="selected" [class.k-state-disabled]="disabled">
           <span *ngIf="icon" class="k-icon" [ngClass]="iconClass">
           </span>
           {{ text }}
        </div>
        <div *ngIf="contentTemplate" [@state]="contentState" style="overflow:hidden;" class="k-columnmenu-item-content">
            <ng-container [ngTemplateOutlet]="contentTemplate.templateRef">
            </ng-container>
        <div>
    `
            },] },
];
ColumnMenuItemComponent.propDecorators = {
    itemClick: [{ type: Output }],
    expand: [{ type: Output }],
    collapse: [{ type: Output }],
    icon: [{ type: Input }],
    text: [{ type: Input }],
    selected: [{ type: Input }],
    disabled: [{ type: Input }],
    expanded: [{ type: Input }],
    contentTemplate: [{ type: ContentChild, args: [ColumnMenuItemContentTemplateDirective,] }]
};
