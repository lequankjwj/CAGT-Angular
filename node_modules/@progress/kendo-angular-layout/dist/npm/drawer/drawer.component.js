/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var template_directives_1 = require("./template-directives");
var util_1 = require("../common/util");
var animations_1 = require("@angular/animations");
var animations_2 = require("./animations");
var operators_1 = require("rxjs/operators");
var drawer_service_1 = require("./drawer.service");
var kendo_angular_l10n_1 = require("@progress/kendo-angular-l10n");
var DEFAULT_ANIMATION = { type: 'slide', duration: 200 };
/**
 * Represents the [Kendo UI Drawer component for Angular]({% slug overview_drawer %}).
 *
 * @example
 * ```ts-preview
 * _@Component({
 *    selector: 'my-app',
 *    template: `
 *        <kendo-drawer-container>
 *             <kendo-drawer #drawer
 *                  [items]="items"
 *                  [mode]="'overlay'"
 *                  [(expanded)]="expanded">
 *              </kendo-drawer>
 *              <kendo-drawer-content>
 *                  <button class="k-button" (click)="drawer.toggle()">Open the Drawer</button>
 *              </kendo-drawer-content>
 *        </kendo-drawer-container>
 *    `
 * })
 * class AppComponent {
 *    public expanded = false;
 *
 *    public items: any[] = [
 *      { text: 'Inbox', icon: 'k-i-inbox' },
 *      { text: 'Notifications', icon: 'k-i-bell' },
 *      { text: 'Date', icon: 'k-i-calendar' }
 *    ];
 * }
 * ```
 */
var DrawerComponent = /** @class */ (function () {
    function DrawerComponent(element, builder, localizationService, drawerService) {
        var _this = this;
        this.element = element;
        this.builder = builder;
        this.localizationService = localizationService;
        this.drawerService = drawerService;
        this.hostClasses = true;
        /**
         * Specifies the mode in which the Drawer will be displayed.
         *
         * The possible values are:
         * * (Default) `overlay`
         * * `push`
         */
        this.mode = 'overlay';
        /**
         * Specifies the position of the Drawer
         * ([see example]({% slug positioning_drawer %})).
         *
         * The possible values are:
         * * (Default) `start`
         * * `end`
         */
        this.position = 'start';
        /**
         * Enables the mini (compact) view of the Drawer which is displayed when the component is collapsed
         * ([see example]({% slug expandmodespositions_drawer %}#toc-mini-view)).
         */
        this.mini = false;
        /**
         * Specifies the state of the Drawer.
         */
        this.expanded = false;
        /**
         * Defines the width of the Drawer when it is expanded.
         * Defaults to `240`.
         */
        this.width = 240;
        /**
         * Defines the width of the Drawer when the mini view is enabled
         * and the component is collapsed. Defaults to `60`.
         */
        this.miniWidth = 50;
        /**
         * Specifies if the Drawer will be automatically collapsed when an item
         * or the overlay is clicked. Defaults to `true`.
         */
        this.autoCollapse = true;
        /**
         * Specifies the animation settings of the Drawer.
         * ([see example]({% slug interaction_drawer %}#toc-toggling-between-states)).
         *
         * The possible values are:
         * * Boolean
         *    * (Default) `true`
         *    * `false`
         * * `DrawerAnimation`
         *    * (Default) `type?: 'slide'`
         *    * `duration`&mdash;Accepts a number in milliseconds. Defaults to `300ms`.
         */
        this.animation = DEFAULT_ANIMATION;
        /**
         * Fires when the Drawer is expanded and its animation is complete.
         */
        this.expand = new core_1.EventEmitter();
        /**
         * Fires when the Drawer is collapsed and its animation is complete.
         */
        this.collapse = new core_1.EventEmitter();
        /**
         * Fires when a Drawer item is selected. This event is preventable.
         */
        this.select = new core_1.EventEmitter();
        /**
         * Fires when the `expanded` property of the component was updated.
         * Used to provide a two-way binding for the `expanded` property.
         */
        this.expandedChange = new core_1.EventEmitter();
        this.animationEnd = new core_1.EventEmitter();
        this.rtl = false;
        this._items = [];
        this.dynamicRTLSubscription = this.localizationService.changes.subscribe(function (_a) {
            var rtl = _a.rtl;
            _this.rtl = rtl;
            _this.direction = _this.rtl ? 'rtl' : 'ltr';
        });
        this.drawerService.owner = this;
    }
    Object.defineProperty(DrawerComponent.prototype, "startPositionClass", {
        get: function () {
            return this.position === 'start';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DrawerComponent.prototype, "endPositionClass", {
        get: function () {
            return this.position === 'end';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DrawerComponent.prototype, "overlayTransofrmStyles", {
        get: function () {
            if (this.mode === 'push') {
                return;
            }
            if (this.expanded || this.minimized) {
                return "translateX(0px)";
            }
            return "translateX(-100%)";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DrawerComponent.prototype, "flexStyles", {
        get: function () {
            if (this.mode === 'overlay') {
                return;
            }
            if (!this.expanded && !this.minimized) {
                return 0;
            }
            return this.drawerWidth;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DrawerComponent.prototype, "items", {
        get: function () {
            return this._items;
        },
        /**
         * The collection of items that will be rendered in the Drawer.
         */
        set: function (items) {
            if (util_1.isPresent(items)) {
                this._items = items;
                this.drawerService.initSelection();
            }
        },
        enumerable: true,
        configurable: true
    });
    DrawerComponent.prototype.ngOnDestroy = function () {
        if (this.dynamicRTLSubscription) {
            this.dynamicRTLSubscription.unsubscribe();
        }
    };
    Object.defineProperty(DrawerComponent.prototype, "minimized", {
        /**
         * @hidden
         */
        get: function () {
            return this.mini && !this.expanded;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DrawerComponent.prototype, "drawerWidth", {
        /**
         * @hidden
         */
        get: function () {
            return this.minimized ? this.miniWidth : this.width;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Toggles the visibility of the Drawer.
     *
     * @param expanded? - Boolean. Specifies if the Drawer will be expanded or collapsed.
     */
    DrawerComponent.prototype.toggle = function (expanded) {
        var _this = this;
        var previous = this.expanded;
        var current = util_1.isPresent(expanded) ? expanded : !previous;
        if (current === previous) {
            return;
        }
        if (current === true) {
            this.setExpanded(true);
        }
        else if (current === false && !this.animation) {
            this.setExpanded(false);
        }
        if (this.animation) {
            this.animationEnd.pipe(operators_1.take(1))
                .subscribe(function () { _this.onAnimationEnd(current); });
            this.animate(current);
        }
        else {
            this[current ? 'expand' : 'collapse'].emit();
        }
    };
    DrawerComponent.prototype.onAnimationEnd = function (currentExpanded) {
        if (currentExpanded) {
            this.expand.emit();
        }
        else {
            this.setExpanded(false);
            this.collapse.emit();
        }
    };
    DrawerComponent.prototype.setExpanded = function (value) {
        this.expanded = value;
        this.expandedChange.emit(value);
    };
    DrawerComponent.prototype.animate = function (expanded) {
        var settings = {
            mode: this.mode,
            mini: this.mini,
            miniWidth: this.miniWidth,
            width: this.width,
            rtl: this.rtl,
            position: this.position,
            animation: (typeof this.animation !== 'boolean') ? this.animation : DEFAULT_ANIMATION
        };
        var animation = expanded ? animations_2.expandAnimation(settings) : animations_2.collapseAnimation(settings);
        var player = this.createPlayer(animation, this.element.nativeElement);
        player.play();
    };
    DrawerComponent.prototype.createPlayer = function (animation, animatedElement) {
        var _this = this;
        var factory = this.builder.build(animation);
        var player = factory.create(animatedElement);
        player.onDone(function () {
            if (player) {
                _this.animationEnd.emit();
                player.destroy();
                player = null;
            }
        });
        return player;
    };
    DrawerComponent.decorators = [
        { type: core_1.Component, args: [{
                    exportAs: 'kendoDrawer',
                    providers: [
                        kendo_angular_l10n_1.LocalizationService,
                        drawer_service_1.DrawerService,
                        {
                            provide: kendo_angular_l10n_1.L10N_PREFIX,
                            useValue: 'kendo.drawer'
                        }
                    ],
                    selector: 'kendo-drawer',
                    template: "\n        <div class=\"k-drawer-wrapper\" *ngIf=\"expanded || mini\" [style.width.px]=\"drawerWidth\">\n            <ng-container *ngIf=\"!drawerTemplate\">\n                <ng-template *ngIf=\"headerTemplate\"\n                    [ngTemplateOutlet]=\"headerTemplate?.templateRef\">\n                </ng-template>\n\n                <ul kendoDrawerList\n                    [items]=\"items\" [mini]=\"mini\" [expanded]=\"expanded\"\n                    [itemTemplate]=\"itemTemplate?.templateRef\"\n                    class=\"k-drawer-items\">\n                </ul>\n\n                <ng-template *ngIf=\"footerTemplate\"\n                    [ngTemplateOutlet]=\"footerTemplate?.templateRef\">\n                </ng-template>\n            </ng-container>\n\n            <ng-template *ngIf=\"drawerTemplate\"\n                [ngTemplateOutlet]=\"drawerTemplate?.templateRef\">\n            </ng-template>\n        </div>\n    "
                },] },
    ];
    /** @nocollapse */
    DrawerComponent.ctorParameters = function () { return [
        { type: core_1.ElementRef },
        { type: animations_1.AnimationBuilder },
        { type: kendo_angular_l10n_1.LocalizationService },
        { type: drawer_service_1.DrawerService }
    ]; };
    DrawerComponent.propDecorators = {
        hostClasses: [{ type: core_1.HostBinding, args: ['class.k-widget',] }, { type: core_1.HostBinding, args: ['class.k-drawer',] }],
        startPositionClass: [{ type: core_1.HostBinding, args: ['class.k-drawer-start',] }],
        endPositionClass: [{ type: core_1.HostBinding, args: ['class.k-drawer-end',] }],
        overlayTransofrmStyles: [{ type: core_1.HostBinding, args: ['style.transform',] }],
        flexStyles: [{ type: core_1.HostBinding, args: ['style.flexBasis.px',] }],
        mode: [{ type: core_1.Input }],
        position: [{ type: core_1.Input }],
        mini: [{ type: core_1.Input }],
        expanded: [{ type: core_1.Input }],
        width: [{ type: core_1.Input }],
        miniWidth: [{ type: core_1.Input }],
        autoCollapse: [{ type: core_1.Input }],
        items: [{ type: core_1.Input }],
        direction: [{ type: core_1.HostBinding, args: ['attr.dir',] }],
        animation: [{ type: core_1.Input }],
        expand: [{ type: core_1.Output }],
        collapse: [{ type: core_1.Output }],
        select: [{ type: core_1.Output }],
        expandedChange: [{ type: core_1.Output }],
        drawerTemplate: [{ type: core_1.ContentChild, args: [template_directives_1.DrawerTemplateDirective,] }],
        footerTemplate: [{ type: core_1.ContentChild, args: [template_directives_1.DrawerFooterTemplateDirective,] }],
        headerTemplate: [{ type: core_1.ContentChild, args: [template_directives_1.DrawerHeaderTemplateDirective,] }],
        itemTemplate: [{ type: core_1.ContentChild, args: [template_directives_1.DrawerItemTemplateDirective,] }]
    };
    return DrawerComponent;
}());
exports.DrawerComponent = DrawerComponent;
