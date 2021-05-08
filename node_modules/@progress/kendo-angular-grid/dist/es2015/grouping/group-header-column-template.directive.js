/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Directive, TemplateRef, Optional } from '@angular/core';
/**
 * Represents the group-header column template of the Grid which helps to customize the content of the group headers.
 * To define the group header template, nest an `<ng-template>` tag with the `kendoGridGroupHeaderColumnTemplate`
 * directive inside `<kendo-grid-column>`. ([See example]({% slug groupable_grid_with_aggregates %})).
 *
 * The template context is set to the current data item and the following additional fields are passed:
 * - `group`&mdash;The current group item.
 * - `field`&mdash;The name of the field by which data is grouped.
 * - `value`&mdash;The current group value.
 * - `aggregates`&mdash;All aggregate values for the current group.
 *
 * @example
 * ```ts
 * <kendo-grid-column field="ProductName" title="Product Name">
 *     <ng-template kendoGridGroupHeaderColumnTemplate let-group="group" let-aggregates="aggregates">
 *         <span title="Group Header Column Template for ProductName">
 *             Count: {{ aggregates.Discontinued.count }}
 *         </span>
 *     </ng-template>
 * </kendo-grid-column>
 * ```
 */
export class GroupHeaderColumnTemplateDirective {
    constructor(templateRef) {
        this.templateRef = templateRef;
    }
}
GroupHeaderColumnTemplateDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kendoGridGroupHeaderColumnTemplate]'
            },] },
];
/** @nocollapse */
GroupHeaderColumnTemplateDirective.ctorParameters = () => [
    { type: TemplateRef, decorators: [{ type: Optional }] }
];
