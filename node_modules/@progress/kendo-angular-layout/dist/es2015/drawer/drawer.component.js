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
const DEFAULT_ANIMATION = { type: 'slide', duration: 200 };
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
export class DrawerComponent {
    constructor(element, builder, localizationService, drawerService) {
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
        this.dynamicRTLSubscription = this.localizationService.changes.subscribe(({ rtl }) => {
            this.rtl = rtl;
            this.direction = this.rtl ? 'rtl' : 'ltr';
        });
        this.drawerService.owner = this;
    }
    get startPositionClass() {
        return this.position === 'start';
    }
    get endPositionClass() {
        return this.position === 'end';
    }
    get overlayTransofrmStyles() {
        if (this.mode === 'push') {
            return;
        }
        if (this.expanded || this.minimized) {
            return `translateX(0px)`;
        }
        return `translateX(-100%)`;
    }
    get flexStyles() {
        if (this.mode === 'overlay') {
            return;
        }
        if (!this.expanded && !this.minimized) {
            return 0;
        }
        return this.drawerWidth;
    }
    /**
     * The collection of items that will be rendered in the Drawer.
     */
    set items(items) {
        if (isPresent(items)) {
            this._items = items;
            this.drawerService.initSelection();
        }
    }
    get items() {
        return this._items;
    }
    ngOnDestroy() {
        if (this.dynamicRTLSubscription) {
            this.dynamicRTLSubscription.unsubscribe();
        }
    }
    /**
     * @hidden
     */
    get minimized() {
        return this.mini && !this.expanded;
    }
    /**
     * @hidden
     */
    get drawerWidth() {
        return this.minimized ? this.miniWidth : this.width;
    }
    /**
     * Toggles the visibility of the Drawer.
     *
     * @param expanded? - Boolean. Specifies if the Drawer will be expanded or collapsed.
     */
    toggle(expanded) {
        const previous = this.expanded;
        const current = isPresent(expanded) ? expanded : !previous;
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
                .subscribe(() => { this.onAnimationEnd(current); });
            this.animate(current);
        }
        else {
            this[current ? 'expand' : 'collapse'].emit();
        }
    }
    onAnimationEnd(currentExpanded) {
        if (currentExpanded) {
            this.expand.emit();
        }
        else {
            this.setExpanded(false);
            this.collapse.emit();
        }
    }
    setExpanded(value) {
        this.expanded = value;
        this.expandedChange.emit(value);
    }
    animate(expanded) {
        const settings = {
            mode: this.mode,
            mini: this.mini,
            miniWidth: this.miniWidth,
            width: this.width,
            rtl: this.rtl,
            position: this.position,
            animation: (typeof this.animation !== 'boolean') ? this.animation : DEFAULT_ANIMATION
        };
        const animation = expanded ? expandAnimation(settings) : collapseAnimation(settings);
        const player = this.createPlayer(animation, this.element.nativeElement);
        player.play();
    }
    createPlayer(animation, animatedElement) {
        const factory = this.builder.build(animation);
        let player = factory.create(animatedElement);
        player.onDone(() => {
            if (player) {
                this.animationEnd.emit();
                player.destroy();
                player = null;
            }
        });
        return player;
    }
}
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
                template: `
        <div class="k-drawer-wrapper" *ngIf="expanded || mini" [style.width.px]="drawerWidth">
            <ng-container *ngIf="!drawerTemplate">
                <ng-template *ngIf="headerTemplate"
                    [ngTemplateOutlet]="headerTemplate?.templateRef">
                </ng-template>

                <ul kendoDrawerList
                    [items]="items" [mini]="mini" [expanded]="expanded"
                    [itemTemplate]="itemTemplate?.templateRef"
                    class="k-drawer-items">
                </ul>

                <ng-template *ngIf="footerTemplate"
                    [ngTemplateOutlet]="footerTemplate?.templateRef">
                </ng-template>
            </ng-container>

            <ng-template *ngIf="drawerTemplate"
                [ngTemplateOutlet]="drawerTemplate?.templateRef">
            </ng-template>
        </div>
    `
            },] },
];
/** @nocollapse */
DrawerComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: AnimationBuilder },
    { type: LocalizationService },
    { type: DrawerService }
];
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
