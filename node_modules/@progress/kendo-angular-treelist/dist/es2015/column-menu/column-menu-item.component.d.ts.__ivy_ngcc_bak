/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { EventEmitter, OnChanges } from '@angular/core';
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
export declare class ColumnMenuItemComponent implements OnChanges {
    /**
     * Fires when the item is clicked.
     */
    itemClick: EventEmitter<any>;
    /**
     * Fires when the content is expanded.
     */
    expand: EventEmitter<any>;
    /**
     * Fires when the content is collapsed.
     */
    collapse: EventEmitter<any>;
    /**
     * Specifies the name of the [font icon]({% slug icons %}#toc-list-of-font-icons)
     * that will be rendered for the item.
     */
    icon: string;
    /**
     * Specifies the item text.
     */
    text: string;
    /**
     * Specifies if the item is selected.
     */
    selected: boolean;
    /**
     * Specifies if the item is disabled.
     */
    disabled: boolean;
    /**
     * Specifies if the item is expanded.
     */
    expanded: boolean;
    contentTemplate: ColumnMenuItemContentTemplateDirective;
    readonly iconClass: string;
    contentState: string;
    ngOnChanges(changes: any): void;
    /**
     * @hidden
     */
    onClick(e: any): void;
    private updateContentState;
}
