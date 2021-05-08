/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var kendo_angular_l10n_1 = require("@progress/kendo-angular-l10n");
var single_popup_service_1 = require("../common/single-popup.service");
var column_menu_service_1 = require("./column-menu.service");
var base_filter_cell_component_1 = require("../filtering/base-filter-cell.component");
var utils_1 = require("./utils");
var POPUP_CLASS = 'k-grid-columnmenu-popup';
/**
 * Represents the [column menu]({% slug columnmenu_treelist %}) component.
 */
var ColumnMenuComponent = /** @class */ (function () {
    function ColumnMenuComponent(popupService, localization, service) {
        this.popupService = popupService;
        this.localization = localization;
        this.service = service;
        /**
         * @hidden
         */
        this.standalone = true;
        /**
         * The settings for the Column Menu.
         */
        this.settings = {};
        /**
         * @hidden
         */
        this.sortable = true;
        /**
         * @hidden
         */
        this.expandedFilter = false;
        /**
         * @hidden
         */
        this.expandedColumns = false;
        this.closeSubscription = service.closeMenu.subscribe(this.close.bind(this));
    }
    Object.defineProperty(ColumnMenuComponent.prototype, "isActive", {
        /**
         * @hidden
         */
        get: function () {
            var _this = this;
            return (this.hasFilter && base_filter_cell_component_1.filtersByField(this.filter, this.column.field).length > 0) ||
                (!this.sortable && this.hasSort && this.sort.find(function (descriptor) { return descriptor.field === _this.column.field; }));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ColumnMenuComponent.prototype, "hasFilter", {
        /**
         * @hidden
         */
        get: function () {
            return utils_1.hasFilter(this.settings, this.column);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ColumnMenuComponent.prototype, "hasSort", {
        /**
         * @hidden
         */
        get: function () {
            return utils_1.hasSort(this.settings, this.column);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ColumnMenuComponent.prototype, "hasColumnChooser", {
        /**
         * @hidden
         */
        get: function () {
            return utils_1.hasColumnChooser(this.settings);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ColumnMenuComponent.prototype, "hasLock", {
        /**
         * @hidden
         */
        get: function () {
            return utils_1.hasLock(this.settings, this.column);
        },
        enumerable: true,
        configurable: true
    });
    ColumnMenuComponent.prototype.ngOnChanges = function () {
        this.service.column = this.column;
        this.service.sort = this.sort;
        this.service.filter = this.filter;
        this.service.sortable = this.sortable;
    };
    ColumnMenuComponent.prototype.ngOnDestroy = function () {
        this.close();
        this.closeSubscription.unsubscribe();
    };
    /**
     * @hidden
     */
    ColumnMenuComponent.prototype.toggle = function (e, anchor, template) {
        e.preventDefault();
        this.expandedFilter = !this.hasColumnChooser;
        this.expandedColumns = !this.hasFilter;
        this.popupRef = this.popupService.open(anchor, template, this.popupRef, POPUP_CLASS);
    };
    /**
     * @hidden
     */
    ColumnMenuComponent.prototype.close = function () {
        this.popupService.destroy();
        this.popupRef = null;
    };
    /**
     * @hidden
     */
    ColumnMenuComponent.prototype.onColumnsExpand = function () {
        this.expandedColumns = true;
        this.expandedFilter = false;
    };
    /**
     * @hidden
     */
    ColumnMenuComponent.prototype.onFilterExpand = function () {
        this.expandedFilter = true;
        this.expandedColumns = false;
    };
    ColumnMenuComponent.decorators = [
        { type: core_1.Component, args: [{
                    providers: [column_menu_service_1.ColumnMenuService],
                    selector: 'kendo-treelist-column-menu',
                    template: "\n        <a #anchor\n            class=\"k-grid-column-menu k-grid-filter\"\n            [ngClass]=\"{ 'k-state-active': isActive }\"\n            (click)=\"toggle($event, anchor, template)\"\n            href=\"#\"\n            tabindex=\"-1\"\n            [attr.title]=\"localization.get('columnMenu')\">\n            <span class=\"k-icon k-i-more-vertical\"></span>\n        </a>\n        <ng-template #template>\n            <ng-container [ngTemplateOutlet]=\"column.columnMenuTemplateRef || columnMenuTemplate || defaultTemplate\"\n                          [ngTemplateOutletContext]=\"{ service: service, column: column }\">\n            </ng-container>\n        </ng-template>\n        <ng-template #defaultTemplate>\n            <kendo-treelist-columnmenu-sort *ngIf=\"hasSort\" [service]=\"service\">\n            </kendo-treelist-columnmenu-sort>\n            <kendo-treelist-columnmenu-lock *ngIf=\"hasLock\" [service]=\"service\">\n            </kendo-treelist-columnmenu-lock>\n            <kendo-treelist-columnmenu-chooser *ngIf=\"hasColumnChooser\" [service]=\"service\"\n                [expanded]=\"expandedColumns\" (expand)=\"onColumnsExpand()\">\n            </kendo-treelist-columnmenu-chooser>\n            <kendo-treelist-columnmenu-filter *ngIf=\"hasFilter\" [service]=\"service\"\n                [expanded]=\"expandedFilter\" (expand)=\"onFilterExpand()\">\n            </kendo-treelist-columnmenu-filter>\n        </ng-template>\n    "
                },] },
    ];
    /** @nocollapse */
    ColumnMenuComponent.ctorParameters = function () { return [
        { type: single_popup_service_1.SinglePopupService },
        { type: kendo_angular_l10n_1.LocalizationService },
        { type: column_menu_service_1.ColumnMenuService }
    ]; };
    ColumnMenuComponent.propDecorators = {
        standalone: [{ type: core_1.HostBinding, args: ['class.k-grid-column-menu-standalone',] }, { type: core_1.Input }],
        column: [{ type: core_1.Input }],
        settings: [{ type: core_1.Input }],
        sort: [{ type: core_1.Input }],
        filter: [{ type: core_1.Input }],
        sortable: [{ type: core_1.Input }],
        columnMenuTemplate: [{ type: core_1.Input }]
    };
    return ColumnMenuComponent;
}());
exports.ColumnMenuComponent = ColumnMenuComponent;
