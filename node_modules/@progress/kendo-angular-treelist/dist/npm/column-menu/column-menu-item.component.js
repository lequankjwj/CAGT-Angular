/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var animations_1 = require("@angular/animations");
var column_menu_item_content_template_directive_1 = require("./column-menu-item-content-template.directive");
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
var ColumnMenuItemComponent = /** @class */ (function () {
    function ColumnMenuItemComponent() {
        /**
         * Fires when the item is clicked.
         */
        this.itemClick = new core_1.EventEmitter();
        /**
         * Fires when the content is expanded.
         */
        this.expand = new core_1.EventEmitter();
        /**
         * Fires when the content is collapsed.
         */
        this.collapse = new core_1.EventEmitter();
        this.contentState = 'collapsed';
    }
    Object.defineProperty(ColumnMenuItemComponent.prototype, "iconClass", {
        get: function () {
            return "k-i-" + this.icon;
        },
        enumerable: true,
        configurable: true
    });
    ColumnMenuItemComponent.prototype.ngOnChanges = function (changes) {
        if (changes.expanded) {
            this.updateContentState();
        }
    };
    /**
     * @hidden
     */
    ColumnMenuItemComponent.prototype.onClick = function (e) {
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
    };
    ColumnMenuItemComponent.prototype.updateContentState = function () {
        this.contentState = this.expanded ? 'expanded' : 'collapsed';
    };
    ColumnMenuItemComponent.decorators = [
        { type: core_1.Component, args: [{
                    animations: [
                        animations_1.trigger('state', [
                            animations_1.state('collapsed', animations_1.style({ display: 'none' })),
                            animations_1.state('expanded', animations_1.style({ display: 'block' })),
                            animations_1.transition('collapsed => expanded', [
                                animations_1.style({
                                    height: '0px',
                                    display: 'block'
                                }),
                                animations_1.animate('100ms ease-in', animations_1.style({
                                    height: '*'
                                }))
                            ]),
                            animations_1.transition('expanded => collapsed', [
                                animations_1.style({
                                    height: '*'
                                }),
                                animations_1.animate('100ms ease-in', animations_1.style({
                                    height: '0px'
                                }))
                            ])
                        ])
                    ],
                    selector: 'kendo-treelist-columnmenu-item',
                    template: "\n        <div class=\"k-columnmenu-item\" (click)=\"onClick($event)\" [class.k-state-selected]=\"selected\" [class.k-state-disabled]=\"disabled\">\n           <span *ngIf=\"icon\" class=\"k-icon\" [ngClass]=\"iconClass\">\n           </span>\n           {{ text }}\n        </div>\n        <div *ngIf=\"contentTemplate\" [@state]=\"contentState\" style=\"overflow:hidden;\" class=\"k-columnmenu-item-content\">\n            <ng-container [ngTemplateOutlet]=\"contentTemplate.templateRef\">\n            </ng-container>\n        <div>\n    "
                },] },
    ];
    ColumnMenuItemComponent.propDecorators = {
        itemClick: [{ type: core_1.Output }],
        expand: [{ type: core_1.Output }],
        collapse: [{ type: core_1.Output }],
        icon: [{ type: core_1.Input }],
        text: [{ type: core_1.Input }],
        selected: [{ type: core_1.Input }],
        disabled: [{ type: core_1.Input }],
        expanded: [{ type: core_1.Input }],
        contentTemplate: [{ type: core_1.ContentChild, args: [column_menu_item_content_template_directive_1.ColumnMenuItemContentTemplateDirective,] }]
    };
    return ColumnMenuItemComponent;
}());
exports.ColumnMenuItemComponent = ColumnMenuItemComponent;
