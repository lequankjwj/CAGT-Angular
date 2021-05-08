/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
/* tslint:disable:no-input-rename */
import { Directive, HostBinding, ElementRef, Input, Renderer2, NgZone } from '@angular/core';
import { SelectionService } from './selection.service';
import { Keys } from '@progress/kendo-angular-common';
/**
 * Represents the row-selection checkbox of the Grid. The directive expects the
 * index of the current row as an input parameter. Inside the
 * [`CheckboxColumnComponent`]({% slug api_grid_checkboxcolumncomponent %}), apply the
 * directive to an `input` element. When the user clicks the checkbox that is associated
 * with the directive, a [`selectionChange`]({% slug api_grid_gridcomponent %}#toc-selectionChange)
 * event is triggered.
 *
 * @example
 * ```ts-preview
 *
 * _@Component({
 *    selector: 'my-app',
 *    template: `
 *        <kendo-grid [data]="gridData" [selectable]="{enabled: true, checkboxOnly: true}">
 *          <kendo-grid-checkbox-column title="Custom checkbox">
 *            <ng-template kendoGridCellTemplate let-idx="rowIndex">
 *              Select row <input [kendoGridSelectionCheckbox]="idx" />
 *            </ng-template>
 *          </kendo-grid-checkbox-column>
 *          <kendo-grid-column field="ProductID" title="Product ID" width="120">
 *          </kendo-grid-column>
 *          <kendo-grid-column field="ProductName" title="Product Name">
 *          </kendo-grid-column>
 *        </kendo-grid>
 *    `
 * })
 *
 * class AppComponent {
 *    public gridData: any[];
 *
 *    constructor() {
 *        this.gridData = products;
 *    }
 * }
 *
 * const products = [{
 *    "ProductID": 1,
 *    "ProductName": "Chai",
 *    "UnitPrice": 18.0000,
 *    "Discontinued": true
 *  }, {
 *    "ProductID": 2,
 *    "ProductName": "Chang",
 *    "UnitPrice": 19.0000,
 *    "Discontinued": false
 *  }
 * ];
 *
 * ```
 */
var SelectionCheckboxDirective = /** @class */ (function () {
    function SelectionCheckboxDirective(selectionService, el, renderer, ngZone) {
        var _this = this;
        this.selectionService = selectionService;
        this.el = el;
        this.renderer = renderer;
        this.ngZone = ngZone;
        this.type = "checkbox";
        this.ngZone.runOutsideAngular(function () {
            _this.destroyClick = _this.renderer.listen(_this.el.nativeElement, "click", _this.onClick.bind(_this));
            _this.destroyKeyDown = _this.renderer.listen(_this.el.nativeElement, "keydown", _this.onKeyDown.bind(_this));
        });
    }
    SelectionCheckboxDirective.prototype.ngAfterContentChecked = function () {
        this.setCheckedState();
    };
    SelectionCheckboxDirective.prototype.ngOnDestroy = function () {
        if (this.destroyClick) {
            this.destroyClick();
        }
        if (this.destroyKeyDown) {
            this.destroyKeyDown();
        }
    };
    SelectionCheckboxDirective.prototype.onClick = function () {
        var _this = this;
        if (this.selectionService.options.enabled) {
            this.ngZone.run(function () {
                var ev = _this.selectionService.toggleByIndex(_this.itemIndex);
                ev.ctrlKey = true;
                ev.shiftKey = false;
                _this.selectionService.changes.emit(ev);
            });
        }
    };
    SelectionCheckboxDirective.prototype.onKeyDown = function (e) {
        if (e.keyCode === Keys.Enter) {
            this.onClick();
        }
    };
    /*
     * @hidden
     */
    SelectionCheckboxDirective.prototype.setCheckedState = function () {
        this.renderer.setProperty(this.el.nativeElement, "checked", this.selectionService.isSelected(this.itemIndex));
    };
    SelectionCheckboxDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[kendoGridSelectionCheckbox]'
                },] },
    ];
    /** @nocollapse */
    SelectionCheckboxDirective.ctorParameters = function () { return [
        { type: SelectionService },
        { type: ElementRef },
        { type: Renderer2 },
        { type: NgZone }
    ]; };
    SelectionCheckboxDirective.propDecorators = {
        itemIndex: [{ type: Input, args: ["kendoGridSelectionCheckbox",] }],
        type: [{ type: HostBinding, args: ['attr.type',] }]
    };
    return SelectionCheckboxDirective;
}());
export { SelectionCheckboxDirective };
