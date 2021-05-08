/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Directive, TemplateRef, Optional, Input } from '@angular/core';
import { OptionChangesService } from '../../common/option-changes.service';
/**
 * Represents the toolbar template of the TreeList.
 *
 * The template context has the following field:
 * - `position`&mdash;The position at which the toolbar template is rendered. The possible values are "top" and "bottom".
 *
 * @example
 * {% meta height:470 %}
 * {% embed_file configuration/toolbar-template/app.component.ts preview %}
 * {% embed_file shared/app.module.ts %}
 * {% embed_file shared/main.ts %}
 * {% embed_file shared/employees.ts %}
 * {% endmeta %}
 */
var ToolbarTemplateDirective = /** @class */ (function () {
    function ToolbarTemplateDirective(templateRef, optionChanges) {
        this.templateRef = templateRef;
        this.optionChanges = optionChanges;
        this._position = "top";
    }
    Object.defineProperty(ToolbarTemplateDirective.prototype, "position", {
        get: function () {
            return this._position;
        },
        /**
         * The position of the toolbar ([see example]({% slug toolbartemplate_treelist %})).
         *
         * The possible values are:
         * - `top`&mdash;Positions the toolbar above the group panel or header.
         * - `bottom`&mdash;Positions the toolbar below the pager.
         * - `both`&mdash;Displays two toolbar instances. Positions the first one above
         * the group panel or header and the second one below the pager.
         */
        set: function (position) {
            this._position = position;
            this.optionChanges.optionChanged();
        },
        enumerable: true,
        configurable: true
    });
    ToolbarTemplateDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[kendoTreeListToolbarTemplate]'
                },] },
    ];
    /** @nocollapse */
    ToolbarTemplateDirective.ctorParameters = function () { return [
        { type: TemplateRef, decorators: [{ type: Optional }] },
        { type: OptionChangesService }
    ]; };
    ToolbarTemplateDirective.propDecorators = {
        position: [{ type: Input, args: ["position",] }]
    };
    return ToolbarTemplateDirective;
}());
export { ToolbarTemplateDirective };
