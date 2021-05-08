/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Component, ContentChild, ElementRef, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { DrawerTemplateDirective, DrawerItemTemplateDirective, DrawerHeaderTemplateDirective, DrawerFooterTemplateDirective } from './template-directives';
import { isPresent } from '../common/util';
import { AnimationBuilder } from '@angular/animations';
import { collapseAnimation, expandAnimation } from './animations';
import { take } from 'rxjs/operators';
import { DrawerService } from './drawer.service';
import { L10N_PREFIX, LocalizationService } from '@progress/kendo-angular-l10n';
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
        this.expand = new EventEmitter();
        /**
         * Fires when the Drawer is collapsed and its animation is complete.
         */
        this.collapse = new EventEmitter();
        /**
         * Fires when a Drawer item is selected. This event is preventable.
         */
        this.select = new EventEmitter();
        /**
         * Fires when the `expanded` property of the component was updated.
         * Used to provide a two-way binding for the `expanded` property.
         */
        this.expandedChange = new EventEmitter();
        this.animationEnd = new EventEmitter();
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
            if (isPresent(items)) {
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
        var current = isPresent(expanded) ? expanded : !previous;
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
            this.animationEnd.pipe(take(1))
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
        var animation = expanded ? expandAnimation(settings) : collapseAnimation(settings);
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
        { type: Component, args: [{
                    exportAs: 'kendoDrawer',
                    providers: [
                        LocalizationService,
                        DrawerService,
                        {
                            provide: L10N_PREFIX,
                            useValue: 'kendo.drawer'
                        }
                    ],
                    selector: 'kendo-drawer',
                    template: "\n        <div class=\"k-drawer-wrapper\" *ngIf=\"expanded || mini\" [style.width.px]=\"drawerWidth\">\n            <ng-container *ngIf=\"!drawerTemplate\">\n                <ng-template *ngIf=\"headerTemplate\"\n                    [ngTemplateOutlet]=\"headerTemplate?.templateRef\">\n                </ng-template>\n\n                <ul kendoDrawerList\n                    [items]=\"items\" [mini]=\"mini\" [expanded]=\"expanded\"\n                    [itemTemplate]=\"itemTemplate?.templateRef\"\n                    class=\"k-drawer-items\">\n                </ul>\n\n                <ng-template *ngIf=\"footerTemplate\"\n                    [ngTemplateOutlet]=\"footerTemplate?.templateRef\">\n                </ng-template>\n            </ng-container>\n\n            <ng-template *ngIf=\"drawerTemplate\"\n                [ngTemplateOutlet]=\"drawerTemplate?.templateRef\">\n            </ng-template>\n        </div>\n    "
                },] },
    ];
    /** @nocollapse */
    DrawerComponent.ctorParameters = function () { return [
        { type: ElementRef },
        { type: AnimationBuilder },
        { type: LocalizationService },
        { type: DrawerService }
    ]; };
    DrawerComponent.propDecorators = {
        hostClasses: [{ type: HostBinding, args: ['class.k-widget',] }, { type: HostBinding, args: ['class.k-drawer',] }],
        startPositionClass: [{ type: HostBinding, args: ['class.k-drawer-start',] }],
        endPositionClass: [{ type: HostBinding, args: ['class.k-drawer-end',] }],
        overlayTransofrmStyles: [{ type: HostBinding, args: ['style.transform',] }],
        flexStyles: [{ type: HostBinding, args: ['style.flexBasis.px',] }],
        mode: [{ type: Input }],
        position: [{ type: Input }],
        mini: [{ type: Input }],
        expanded: [{ type: Input }],
        width: [{ type: Input }],
        miniWidth: [{ type: Input }],
        autoCollapse: [{ type: Input }],
        items: [{ type: Input }],
        direction: [{ type: HostBinding, args: ['attr.dir',] }],
        animation: [{ type: Input }],
        expand: [{ type: Output }],
        collapse: [{ type: Output }],
        select: [{ type: Output }],
        expandedChange: [{ type: Output }],
        drawerTemplate: [{ type: ContentChild, args: [DrawerTemplateDirective,] }],
        footerTemplate: [{ type: ContentChild, args: [DrawerFooterTemplateDirective,] }],
        headerTemplate: [{ type: ContentChild, args: [DrawerHeaderTemplateDirective,] }],
        itemTemplate: [{ type: ContentChild, args: [DrawerItemTemplateDirective,] }]
    };
    return DrawerComponent;
}());
export { DrawerComponent };
