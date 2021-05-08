/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { ElementRef, EventEmitter, OnDestroy } from '@angular/core';
import { DrawerMode, DrawerPosition, DrawerAnimation } from './types';
import { DrawerTemplateDirective, DrawerItemTemplateDirective, DrawerHeaderTemplateDirective, DrawerFooterTemplateDirective } from './template-directives';
import { DrawerSelectEvent } from './events/select-event';
import { AnimationBuilder } from '@angular/animations';
import { DrawerService } from './drawer.service';
import { LocalizationService } from '@progress/kendo-angular-l10n';
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
export declare class DrawerComponent implements OnDestroy {
    private element;
    private builder;
    private localizationService;
    private drawerService;
    hostClasses: boolean;
    readonly startPositionClass: boolean;
    readonly endPositionClass: boolean;
    readonly overlayTransofrmStyles: string;
    readonly flexStyles: number;
    /**
     * Specifies the mode in which the Drawer will be displayed.
     *
     * The possible values are:
     * * (Default) `overlay`
     * * `push`
     */
    mode: DrawerMode;
    /**
     * Specifies the position of the Drawer
     * ([see example]({% slug positioning_drawer %})).
     *
     * The possible values are:
     * * (Default) `start`
     * * `end`
     */
    position: DrawerPosition;
    /**
     * Enables the mini (compact) view of the Drawer which is displayed when the component is collapsed
     * ([see example]({% slug expandmodespositions_drawer %}#toc-mini-view)).
     */
    mini: boolean;
    /**
     * Specifies the state of the Drawer.
     */
    expanded: boolean;
    /**
     * Defines the width of the Drawer when it is expanded.
     * Defaults to `240`.
     */
    width: number;
    /**
     * Defines the width of the Drawer when the mini view is enabled
     * and the component is collapsed. Defaults to `60`.
     */
    miniWidth: number;
    /**
     * Specifies if the Drawer will be automatically collapsed when an item
     * or the overlay is clicked. Defaults to `true`.
     */
    autoCollapse: boolean;
    /**
     * The collection of items that will be rendered in the Drawer.
     */
    items: any[];
    /**
     * @hidden
     */
    direction: string;
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
    animation?: boolean | DrawerAnimation;
    /**
     * Fires when the Drawer is expanded and its animation is complete.
     */
    expand: EventEmitter<any>;
    /**
     * Fires when the Drawer is collapsed and its animation is complete.
     */
    collapse: EventEmitter<any>;
    /**
     * Fires when a Drawer item is selected. This event is preventable.
     */
    select: EventEmitter<DrawerSelectEvent>;
    /**
     * Fires when the `expanded` property of the component was updated.
     * Used to provide a two-way binding for the `expanded` property.
     */
    expandedChange: EventEmitter<boolean>;
    /**
     * @hidden
     */
    drawerTemplate: DrawerTemplateDirective;
    /**
     * @hidden
     */
    footerTemplate: DrawerFooterTemplateDirective;
    /**
     * @hidden
     */
    headerTemplate: DrawerHeaderTemplateDirective;
    /**
     * @hidden
     */
    itemTemplate: DrawerItemTemplateDirective;
    private animationEnd;
    private dynamicRTLSubscription;
    private rtl;
    private _items;
    constructor(element: ElementRef, builder: AnimationBuilder, localizationService: LocalizationService, drawerService: DrawerService);
    ngOnDestroy(): void;
    /**
     * @hidden
     */
    readonly minimized: boolean;
    /**
     * @hidden
     */
    readonly drawerWidth: number;
    /**
     * Toggles the visibility of the Drawer.
     *
     * @param expanded? - Boolean. Specifies if the Drawer will be expanded or collapsed.
     */
    toggle(expanded?: boolean): void;
    private onAnimationEnd;
    private setExpanded;
    private animate;
    private createPlayer;
}
