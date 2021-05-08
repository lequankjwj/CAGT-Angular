/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Injectable, Directive, TemplateRef, Optional, isDevMode, Component, SkipSelf, Host, ElementRef, Input, ViewChild, HostBinding, ViewChildren, ContentChildren, EventEmitter, Output, ContentChild, HostListener, Renderer2, ChangeDetectorRef, NgZone, Inject, QueryList, ViewEncapsulation, NgModule, forwardRef } from '@angular/core';
import { LocalizationService, L10N_PREFIX, ComponentMessages } from '@progress/kendo-angular-l10n';
import { Keys, hasObservers, DraggableDirective, DraggableModule } from '@progress/kendo-angular-common';
import { trigger, state, style, transition, animate, AUTO_STYLE, AnimationBuilder } from '@angular/animations';
import { Subject, BehaviorSubject, Subscription, of } from 'rxjs';
import { take, tap, filter, switchMap, delay, takeUntil, map } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { ProgressBarModule } from '@progress/kendo-angular-progressbar';

/**
 * Represents the expand modes of the PanelBar.
 * By default, the expand mode is set to `multiple`.
 */
var PanelBarExpandMode;
(function (PanelBarExpandMode) {
    /**
     * Allows you to expand only one item at a time.
     * When you expand an item, the item that was previously expanded is coll.
     */
    PanelBarExpandMode[PanelBarExpandMode["Single"] = 0] = "Single";
    /**
     * Allows you to expand only one item at a time and requires you to set the `height` property.
     * The expanded area occupies the entire height of the PanelBar.
     */
    PanelBarExpandMode[PanelBarExpandMode["Full"] = 1] = "Full";
    /**
     * The default mode of the PanelBar.
     * Allows you to expand more than one item at a time. Items can also be toggled.
     */
    PanelBarExpandMode[PanelBarExpandMode["Multiple"] = 2] = "Multiple";
    /**
     * By default, the expand mode is set to `multiple`.
     */
    PanelBarExpandMode[PanelBarExpandMode["Default"] = 2] = "Default";
})(PanelBarExpandMode || (PanelBarExpandMode = {}));

/**
 * @hidden
 */
let nextPanelbarId = 0;
/**
 * @hidden
 */
class PanelBarService {
    constructor() {
        this.parentSource = new Subject();
        this.keepContentSource = new BehaviorSubject(false);
        this.childSource = new Subject();
        this.parent$ = this.parentSource.asObservable();
        this.children$ = this.childSource.asObservable();
        this.keepContent$ = this.keepContentSource.asObservable();
        this.pbId = nextPanelbarId++;
    }
    onKeepContent(keepContent) {
        this.keepContentSource.next(keepContent);
    }
    onSelect(event) {
        this.childSource.next(event);
    }
    onFocus() {
        this.parentSource.next(true);
    }
    onBlur() {
        this.parentSource.next(false);
    }
}
PanelBarService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
PanelBarService.ctorParameters = () => [];

/**
 * Represents the content template of the declaratively initialized PanelBar items.
 * The content can be expanded or collapsed through the item.
 */
class PanelBarContentDirective {
    constructor(templateRef) {
        this.templateRef = templateRef;
    }
}
PanelBarContentDirective.decorators = [
    { type: Directive, args: [{
                selector: "[kendoPanelBarContent]"
            },] },
];
/** @nocollapse */
PanelBarContentDirective.ctorParameters = () => [
    { type: TemplateRef }
];

/**
 * Represents the template directive of the PanelBar which helps to customize the item title
 * ([more information and example]({% slug templates_panelbar %}#toc-customizing-the-appearance-of-the-title)).
 *
 * @example
 * ```ts-preview
 *
 * _@Component({
 *     selector: 'my-app',
 *     template: `
 *        <kendo-panelbar>
 *            <kendo-panelbar-item [title]="'Paris'" [expanded]="true">
 *                <ng-template kendoPanelBarItemTitle>
 *                    Additional Content
 *                </ng-template>
 *            </kendo-panelbar-item>
 *        </kendo-panelbar>
 *     `
 * })
 *
 * class AppComponent {}
 *
 * ```
 */
class PanelBarItemTitleDirective {
    constructor(templateRef) {
        this.templateRef = templateRef;
    }
}
PanelBarItemTitleDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kendoPanelBarItemTitle]'
            },] },
];
/** @nocollapse */
PanelBarItemTitleDirective.ctorParameters = () => [
    { type: TemplateRef, decorators: [{ type: Optional }] }
];

let nextId = 0;
const parsePanelBarItems = (data) => {
    return data.map((item) => {
        if (!item.id) {
            item.id = `default-${nextId++}`;
        }
        if (item.children) {
            item.children = parsePanelBarItems(item.children);
        }
        return item;
    });
};
var util = {
    parsePanelBarItems
};
/**
 * @hidden
 */
const isPresent = (value) => value !== null && value !== undefined;

const focusableRegex = /^(?:a|input|select|option|textarea|button|object)$/i;
const toClassList = (classNames) => String(classNames).trim().split(' ');
/**
 * @hidden
 */
const isFocusable = (element) => {
    if (element.tagName) {
        const tagName = element.tagName.toLowerCase();
        const tabIndex = element.getAttribute('tabIndex');
        const skipTab = tabIndex === '-1';
        let focusable = tabIndex !== null && !skipTab;
        if (focusableRegex.test(tagName)) {
            focusable = !element.disabled && !skipTab;
        }
        return focusable;
    }
    return false;
};
/**
 * @hidden
 */
const hasClass = (element, className) => Boolean(toClassList(element.className).find((name) => name === className));
const closestInScope = (target, targetAttr, predicate, scope) => {
    while (target && target !== scope && !predicate(target, targetAttr)) {
        target = target.parentNode;
    }
    if (target !== scope) {
        return target;
    }
};
/**
 * @hidden
 */
const itemIndex = (item, indexAttr) => +item.getAttribute(indexAttr);
const hasItemIndex = (item, indexAttr) => isPresent(item.getAttribute(indexAttr));
/**
 * @hidden
 */
const closestItem = (target, targetAttr, scope) => closestInScope(target, targetAttr, hasItemIndex, scope);

/**
 * @hidden
 */
let nextId$1 = 0;
/**
 * Represents the items of the PanelBar.
 */
class PanelBarItemComponent {
    constructor(parent, eventService, element) {
        this.parent = parent;
        this.eventService = eventService;
        this.element = element;
        /**
         * Sets the title of the PanelBar item ([see example]({% slug items_panelbar %}#toc-titles)).
         */
        this.title = 'Untitled';
        /**
         * Allows the component to set the `"id"` property to each item.
         * Used to set the `id` attributes of the nested elements and to enable the WAI-ARIA support.
         */
        this.id = `default-${nextId$1++}`;
        /**
         * Defines the icon that will be rendered next to the title ([see example]({% slug items_panelbar %}#toc-title-icons)).
         */
        this.icon = '';
        /**
         * Defines  the icon that will be rendered next to the title by using a custom CSS class
         * ([see example]({% slug items_panelbar %}#toc-title-icons)).
         */
        this.iconClass = '';
        /**
         * Defines the location of the image that will be displayed next to the title
         * ([see example]({% slug items_panelbar %}#toc-title-images)).
         */
        this.imageUrl = '';
        /**
         * When set to `true`, disables a PanelBar item ([see example]({% slug items_panelbar %}#toc-disabled-state)).
         */
        this.disabled = false;
        /**
         * Sets the selected state of a PanelBar item ([see example]({% slug items_panelbar %}#toc-selected-state)).
         */
        this.selected = false;
        this.keepContent = false;
        this.hasChildItems = false;
        this.hasItems = false;
        this.hasContent = false;
        this.state = "inactive";
        this.role = "treeitem";
        this.titleAttribute = null; // tslint:disable-line
        this.focused = false;
        this.wrapperFocused = false;
        this.subscriptions = new Subscription(() => { });
        this._expanded = false;
        this.subscriptions.add(eventService.parent$.subscribe(focused => this.onWrapperFocusChange(focused)));
        this.subscriptions.add(eventService.keepContent$.subscribe(keepContent => this.keepContent = keepContent));
        this.wrapperFocused = parent ? parent.focused : false;
    }
    /**
     * When set to `true`, expands the PanelBar item ([see example]({% slug items_panelbar %}#toc-expanded-state)).
     */
    set expanded(value) {
        const activeState = this.animate ? "active" : "activeWithoutAnimation";
        this.state = value ? activeState : "inactive";
        if (!this.keepContent) {
            this.toggleExpandedChildAnimations(value);
        }
        this._expanded = value;
    }
    get expanded() {
        return this._expanded;
    }
    get animate() {
        return this.eventService.animate;
    }
    get kItemClass() {
        return true;
    }
    get kStateDefaultClass() {
        return !this.disabled;
    }
    get kStateDisabledClass() {
        return this.disabled;
    }
    get kStateExpandedClass() {
        return !this.disabled && this.expanded && (this.hasChildItems || this.hasContent);
    }
    get itemId() {
        return 'k-panelbar-' + this.eventService.pbId + '-item-' + this.id;
    }
    get ariaExpanded() {
        return (this.hasChildItems || this.hasContent) ? !this.disabled && this.expanded : null;
    }
    get ariaSelected() {
        return !this.disabled && this.selected;
    }
    get ariaDisabled() {
        return this.disabled ? true : null;
    }
    /**
     * @hidden
     */
    get titleTemplate() {
        return this.titleTemplates.length > 0 ? this.titleTemplates.toArray()[0].templateRef : undefined;
    }
    /**
     * @hidden
     */
    headerHeight() {
        return this.element.nativeElement.offsetHeight - (this.contentWrapper ? this.contentWrapper.nativeElement.offsetHeight : 0);
    }
    /**
     * @hidden
     */
    ngAfterContentChecked() {
        this.hasItems = this.items && this.items.filter(item => !item.hidden).length > 0;
        this.hasChildItems = this.contentItems.filter(item => item !== this).length > 0 || this.hasItems;
        this.hasContent = (this.contentTemplate !== undefined && this.contentTemplate.length > 0) ||
            this.content !== undefined;
        this.validateConfiguration();
    }
    /**
     * @hidden
     */
    ngAfterViewChecked() {
        if (this.items) {
            this.childrenItems = this.viewChildItems.toArray();
        }
        else {
            this.childrenItems = this.contentItems.filter(item => item !== this);
        }
    }
    /**
     * @hidden
     */
    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }
    /**
     * @hidden
     */
    onItemAction() {
        if (!this.disabled) {
            this.eventService.onSelect(this);
        }
    }
    /**
     * @hidden
     */
    onItemClick(e) {
        if (!isFocusable(e.target)) {
            this.onItemAction();
        }
    }
    /**
     * @hidden
     */
    get iconClasses() {
        let icon = this.icon ? 'k-i-' + this.icon : null;
        return {
            [icon || this.iconClass]: true
        };
    }
    /**
     * @hidden
     */
    serialize() {
        return {
            content: this.content,
            disabled: this.disabled,
            expanded: this.expanded,
            focused: this.focused,
            icon: this.icon,
            iconClass: this.iconClass,
            id: this.id,
            imageUrl: this.imageUrl,
            selected: this.selected,
            title: this.title
        };
    }
    /**
     * @hidden
     */
    subTreeViewItems() {
        let subTree = [];
        this.viewChildItems.forEach(item => {
            subTree = subTree.concat(item.subTreeViewItems());
            subTree.push(item);
        });
        return subTree;
    }
    /**
     * @hidden
     */
    validateConfiguration() {
        if (isDevMode()) {
            if (this.content && (this.contentTemplate !== undefined && this.contentTemplate.length > 0)) {
                throw new Error("Invalid configuration: mixed template components and component property.");
            }
        }
    }
    /**
     * @hidden
     */
    toggleAnimationState(value) {
        if (!this.animate) {
            return;
        }
        this.state = value && this.eventService.expandMode !== PanelBarExpandMode.Single ? 'active' : 'activeWithoutAnimation';
    }
    /**
     * @hidden
     */
    toggleExpandedChildAnimations(value) {
        if (this.childrenItems) {
            this.childrenItems.forEach(child => {
                if (child.expanded) {
                    child.toggleAnimationState(value);
                    child.toggleExpandedChildAnimations(value);
                }
            });
        }
    }
    onWrapperFocusChange(focused) {
        this.wrapperFocused = focused;
    }
}
PanelBarItemComponent.decorators = [
    { type: Component, args: [{
                animations: [
                    trigger('toggle', [
                        state('inactive', style({ display: 'none' })),
                        transition('* => active', [
                            style({ overflow: 'hidden', display: 'block', height: 0 }),
                            animate(200, style({ height: AUTO_STYLE }))
                        ]),
                        transition('active => *', [
                            style({ overflow: 'hidden', height: AUTO_STYLE }),
                            animate(200, style({ height: 0, display: 'none' }))
                        ])
                    ])
                ],
                exportAs: 'kendoPanelbarItem',
                selector: "kendo-panelbar-item",
                template: `<span
                #header
                [class.k-link]="true"
                [class.k-header]="!parent"
                [class.k-state-selected]="!disabled && selected"
                [class.k-state-focused]="!disabled && focused && wrapperFocused"
                (click)="onItemClick($event)">
            <span
                *ngIf="icon || iconClass"
                class="k-icon"
                [ngClass]="iconClasses">
            </span>
            <img
                *ngIf="imageUrl"
                class="k-image"
                [src]="imageUrl"
                alt="">
            {{title}}
            <ng-template [ngTemplateOutlet]="titleTemplate"></ng-template>
            <span *ngIf="hasChildItems || hasContent"
                [class.k-icon]="true"
                [class.k-i-arrow-n]="expanded"
                [class.k-panelbar-collapse]="expanded"
                [class.k-i-arrow-s]="!expanded"
                [class.k-panelbar-expand]="!expanded">
            </span>
        </span>
        <div #contentWrapper
            *ngIf="keepContent || (!disabled && expanded && (hasChildItems || hasContent))"
            [@toggle]="state"
            [attr.role]="'group'"
            [attr.aria-hidden]="!disabled && !expanded">
            <div
                *ngIf="hasChildItems && !items?.length"
                [style.overflow]="contentOverflow"
                [style.height]="contentHeight"
                class="k-panel k-group">
                    <ng-content select="kendo-panelbar-item"></ng-content>
            </div>
            <div
                *ngIf="hasContent && !content"
                [style.overflow]="contentOverflow"
                [style.height]="contentHeight"
                class="k-content">
                <ng-template
                    [ngTemplateOutlet]="contentTemplate.first.templateRef"
                    [ngTemplateOutletContext]="{
                        $implicit: {
                            title: title,
                            id: id,
                            icon: icon,
                            imageUrl: imageUrl,
                            disabled: disabled,
                            content: content
                        }
                    }">
                </ng-template>
            </div>
            <div *ngIf="hasItems"
                [style.overflow]="contentOverflow"
                [style.height]="contentHeight"
                class="k-panel k-group">
                <ng-container *ngFor="let item of items">
                    <kendo-panelbar-item *ngIf="!item.hidden"
                        [title]="item.title"
                        [id]="item.id"
                        [icon]="item.icon"
                        [iconClass]="item.iconClass"
                        [imageUrl]="item.imageUrl"
                        [selected]="!!item.selected"
                        [expanded]="!!item.expanded"
                        [disabled]="!!item.disabled"
                        [template]="template"
                        [items]="item.children"
                        [content]="item.content">
                    </kendo-panelbar-item>
                </ng-container>
            </div>
            <div
                *ngIf="content"
                [style.overflow]="contentOverflow"
                [style.height]="contentHeight"
                class="k-content">
                <ng-template
                    [ngTemplateOutlet]="template"
                    [ngTemplateOutletContext]="{
                        $implicit: {
                            title: title,
                            id: id,
                            icon: icon,
                            imageUrl: imageUrl,
                            disabled: disabled,
                            content: content
                        }
                    }">
                </ng-template>
                <ng-template [ngIf]="!template">{{content}}</ng-template>
            </div>
        </div>`
            },] },
];
/** @nocollapse */
PanelBarItemComponent.ctorParameters = () => [
    { type: PanelBarItemComponent, decorators: [{ type: SkipSelf }, { type: Host }, { type: Optional }] },
    { type: PanelBarService },
    { type: ElementRef }
];
PanelBarItemComponent.propDecorators = {
    title: [{ type: Input }],
    id: [{ type: Input }],
    icon: [{ type: Input }],
    iconClass: [{ type: Input }],
    imageUrl: [{ type: Input }],
    disabled: [{ type: Input }],
    expanded: [{ type: Input }],
    selected: [{ type: Input }],
    content: [{ type: Input }],
    items: [{ type: Input }],
    template: [{ type: Input }],
    header: [{ type: ViewChild, args: ['header', {},] }],
    contentWrapper: [{ type: ViewChild, args: ['contentWrapper', {},] }],
    role: [{ type: HostBinding, args: ['attr.role',] }],
    titleAttribute: [{ type: HostBinding, args: ['attr.title',] }],
    kItemClass: [{ type: HostBinding, args: ['class.k-item',] }],
    kStateDefaultClass: [{ type: HostBinding, args: ['class.k-state-default',] }],
    kStateDisabledClass: [{ type: HostBinding, args: ['class.k-state-disabled',] }],
    kStateExpandedClass: [{ type: HostBinding, args: ['class.k-state-expanded',] }],
    itemId: [{ type: HostBinding, args: ['id',] }],
    ariaExpanded: [{ type: HostBinding, args: ['attr.aria-expanded',] }],
    ariaSelected: [{ type: HostBinding, args: ['attr.aria-selected',] }],
    ariaDisabled: [{ type: HostBinding, args: ['attr.aria-disabled',] }],
    viewChildItems: [{ type: ViewChildren, args: [PanelBarItemComponent,] }],
    contentItems: [{ type: ContentChildren, args: [PanelBarItemComponent,] }],
    contentTemplate: [{ type: ContentChildren, args: [PanelBarContentDirective, { descendants: false },] }],
    titleTemplates: [{ type: ContentChildren, args: [PanelBarItemTitleDirective, { descendants: false },] }]
};

/**
 * Represents the template directive of the PanelBar which helps to customize the item content.
 */
class PanelBarItemTemplateDirective {
    constructor(templateRef) {
        this.templateRef = templateRef;
    }
}
PanelBarItemTemplateDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kendoPanelBarItemTemplate]'
            },] },
];
/** @nocollapse */
PanelBarItemTemplateDirective.ctorParameters = () => [
    { type: TemplateRef, decorators: [{ type: Optional }] }
];

/**
 * Represents the [Kendo UI PanelBar component for Angular]({% slug overview_panelbar %}).
 */
// TODO: add styles as input prop
class PanelBarComponent {
    constructor(elementRef, eventService, localization) {
        this.localization = localization;
        /**
         * Sets the expand mode of the PanelBar through the `PanelBarExpandMode` enum ([see example]({% slug expandmodes_panelbar %})).
         *
         * The available modes are:
         * - `"single"`&mdash;Expands only one item at a time. Expanding an item collapses the item that was previously expanded.
         * - `"multiple"`&mdash;The default mode of the PanelBar.
         * Expands more than one item at a time. Items can also be toggled.
         * - `"full"`&mdash;Expands only one item at a time.
         * The expanded area occupies the entire height of the PanelBar. Requires you to set the `height` property.
         */
        this.expandMode = PanelBarExpandMode.Default;
        /**
         * Allows the PanelBar to modify the selected state of the items.
         */
        this.selectable = true;
        /**
         * Sets the animate state of the PanelBar ([see example]({% slug animations_panelbar %})).
         */
        this.animate = true;
        /**
         * Sets the height of the component when the `"full"` expand mode is used.
         * This option is ignored in the `"multiple"` and `"single"` expand modes.
         */
        this.height = "400px";
        /**
         * Fires each time the user interacts with a PanelBar item
         * ([see example]({% slug routing_panelbar %}#toc-getting-the-selected-item)).
         * The event data contains all items that are modified.
         */
        this.stateChange = new EventEmitter();
        this.tabIndex = 0;
        this.role = "tree";
        this.activeDescendant = "";
        this.isViewInit = true;
        this.focused = false;
        this._keepItemContent = false;
        this.updateChildrenHeight = () => {
            let childrenHeight = 0;
            const panelbarHeight = this.elementRef.nativeElement.offsetHeight;
            const contentOverflow = this.expandMode === PanelBarExpandMode.Full ? 'auto' : 'visible';
            this.childrenItems.forEach(item => {
                childrenHeight += item.headerHeight();
            });
            this.childrenItems.forEach(item => {
                item.contentHeight = PanelBarExpandMode.Full === this.expandMode ? (panelbarHeight - childrenHeight) + "px" : 'auto';
                item.contentOverflow = contentOverflow;
            });
        };
        this.keyBindings = this.computedKeys;
        this.elementRef = elementRef;
        this.eventService = eventService;
        this.eventService.children$.subscribe(event => this.onItemAction(event));
    }
    /**
     * When set to `true`, the PanelBar renders the content of all items and they are persisted in the DOM
     * ([see example]({% slug templates_panelbar %}#toc-collections)).
     * By default, this option is set to `false`.
     */
    get keepItemContent() {
        return this._keepItemContent;
    }
    set keepItemContent(keepItemContent) {
        this._keepItemContent = keepItemContent;
        this.eventService.onKeepContent(keepItemContent);
    }
    /**
     * Sets the items of the PanelBar as an array of `PanelBarItemModel` instances
     * ([see example]({% slug items_panelbar %})).
     */
    set items(data) {
        if (data) {
            this._items = util.parsePanelBarItems(data);
        }
    }
    get items() {
        return this._items;
    }
    get hostHeight() {
        return this.expandMode === PanelBarExpandMode.Full ? this.height : 'auto';
    }
    get overflow() {
        return this.expandMode === PanelBarExpandMode.Full ? "hidden" : "visible";
    }
    get dir() {
        return this.localization.rtl ? 'rtl' : 'ltr';
    }
    /**
     * @hidden
     */
    invertKeys(original, inverted) {
        return this.localization.rtl ? inverted : original;
    }
    get computedKeys() {
        return {
            [Keys.Space]: () => this.selectFocusedItem(),
            [Keys.Enter]: () => this.selectFocusedItem(),
            [Keys.ArrowUp]: () => this.focusPreviousItem(),
            [this.invertKeys(Keys.ArrowLeft, Keys.ArrowRight)]: () => this.collapseItem(),
            [Keys.ArrowDown]: () => this.focusNextItem(),
            [this.invertKeys(Keys.ArrowRight, Keys.ArrowLeft)]: () => this.expandItem(),
            [Keys.End]: () => this.focusLastItem(),
            [Keys.Home]: () => this.focusFirstItem()
        };
    }
    ngOnDestroy() {
        if (this.localizationChangeSubscription) {
            this.localizationChangeSubscription.unsubscribe();
        }
    }
    ngOnInit() {
        this.localizationChangeSubscription = this.localization
            .changes.subscribe(() => this.keyBindings = this.computedKeys);
        this.eventService.animate = this.animate;
        this.eventService.expandMode = this.expandMode;
    }
    ngAfterViewChecked() {
        if (this.items) {
            this.childrenItems = this.viewChildItems.toArray();
            this.allItems = this.viewItems;
        }
        else {
            this.childrenItems = this.contentChildItems.toArray();
            this.allItems = this.contentItems.toArray();
        }
        if (this.isViewInit && this.childrenItems.length) {
            this.isViewInit = false;
            setTimeout(() => this.updateChildrenHeight());
        }
        this.validateConfiguration();
    }
    ngOnChanges(changes) {
        if (changes['height'] || changes['expandMode'] || changes["items"]) { // tslint:disable-line
            if (this.childrenItems) {
                setTimeout(this.updateChildrenHeight);
            }
        }
        if (changes.animate) {
            this.eventService.animate = this.animate;
        }
        if (changes.expandMode) {
            this.eventService.expandMode = this.expandMode;
        }
    }
    get templateRef() {
        return this.template ? this.template.templateRef : undefined;
    }
    /**
     * @hidden
     */
    onComponentClick(event) {
        const itemClicked = this.visibleItems().some((item) => {
            return item.header.nativeElement.contains(event.target);
        });
        if (!this.focused && itemClicked) {
            this.elementRef.nativeElement.focus();
        }
    }
    /**
     * @hidden
     */
    onComponentFocus() {
        this.eventService.onFocus();
        this.focused = true;
        if (this.allItems.length > 0) {
            const visibleItems = this.visibleItems();
            const focusedItems = visibleItems.filter(item => item.focused);
            if (!focusedItems.length && visibleItems.length > 0) {
                visibleItems[0].focused = true;
                this.activeDescendant = visibleItems[0].itemId;
            }
        }
    }
    /**
     * @hidden
     */
    onComponentBlur() {
        this.eventService.onBlur();
        this.focused = false;
        this.activeDescendant = "";
    }
    /**
     * @hidden
     */
    onComponentKeyDown(event) {
        if (event.target === this.elementRef.nativeElement) {
            if (event.keyCode === Keys.Space || event.keyCode === Keys.ArrowUp || event.keyCode === Keys.ArrowDown ||
                event.keyCode === Keys.ArrowLeft || event.keyCode === Keys.ArrowRight || event.keyCode === Keys.Home ||
                event.keyCode === Keys.End || event.keyCode === Keys.PageUp || event.keyCode === Keys.PageDown) {
                event.preventDefault();
            }
            const handler = this.keyBindings[event.keyCode];
            //TODO: check if next item is disabled and skip operation?
            if (handler) {
                handler();
            }
        }
    }
    get viewItems() {
        let treeItems = [];
        this.viewChildItems.toArray().forEach(item => {
            treeItems.push(item);
            treeItems = treeItems.concat(item.subTreeViewItems());
        });
        return treeItems;
    }
    validateConfiguration() {
        if (isDevMode()) {
            if (this.items && (this.contentItems && this.contentItems.length > 0)) {
                throw new Error("Invalid configuration: mixed template components and items property.");
            }
        }
    }
    onItemAction(item) {
        if (!item) {
            return;
        }
        let modifiedItems = new Array();
        this.allItems
            .forEach((currentItem) => {
            let selectedState = currentItem === item;
            let focusedState = selectedState;
            selectedState = this.selectable ? selectedState : currentItem.selected;
            if (currentItem.selected !== selectedState || currentItem.focused !== focusedState) {
                currentItem.selected = selectedState;
                currentItem.focused = focusedState;
                this.activeDescendant = focusedState ? currentItem.itemId : "";
                modifiedItems.push(currentItem);
            }
        });
        if (this.expandMode === PanelBarExpandMode.Multiple) {
            if (item.hasChildItems || item.hasContent) {
                item.expanded = !item.expanded;
            }
            if (modifiedItems.indexOf(item) < 0) {
                modifiedItems.push(item);
            }
        }
        else {
            let siblings = item.parent ? item.parent.childrenItems : this.childrenItems;
            if (item.hasChildItems || item.hasContent) {
                siblings
                    .forEach((currentItem) => {
                    let expandedState = currentItem === item;
                    if (currentItem.expanded !== expandedState) {
                        currentItem.expanded = expandedState;
                        if (modifiedItems.indexOf(currentItem) < 0) {
                            modifiedItems.push(currentItem);
                        }
                    }
                });
            }
        }
        if (modifiedItems.length > 0) {
            this.stateChange.emit(modifiedItems.map(currentItem => currentItem.serialize()));
        }
    }
    get hostClasses() {
        return true;
    }
    isVisible(item) {
        const visibleItems = this.visibleItems();
        return visibleItems.some(i => i === item);
    }
    getVisibleParent(item) {
        const visibleItems = this.visibleItems();
        if (!item.parent) {
            return item;
        }
        return visibleItems.some(i => i === item.parent) ? item.parent : this.getVisibleParent(item.parent);
    }
    focusItem(action) {
        const visibleItems = this.visibleItems();
        let currentIndex = visibleItems.findIndex(item => item.focused);
        let currentItem = visibleItems[currentIndex];
        let nextItem;
        if (currentIndex === -1) {
            let focusedItem = this.allItems.find(item => item.focused);
            focusedItem.focused = false;
            currentItem = this.getVisibleParent(focusedItem);
            currentIndex = visibleItems.findIndex(item => item === currentItem);
        }
        switch (action) {
            case "lastItem":
                nextItem = visibleItems[visibleItems.length - 1];
                break;
            case "firstItem":
                nextItem = visibleItems[0];
                break;
            case "nextItem":
                nextItem = visibleItems[currentIndex < visibleItems.length - 1 ? currentIndex + 1 : 0];
                break;
            case "previousItem":
                nextItem = visibleItems[currentIndex > 0 ? currentIndex - 1 : visibleItems.length - 1];
                break;
            default:
        }
        if (currentItem && nextItem && currentItem !== nextItem) {
            this.moveFocus(currentItem, nextItem);
        }
    }
    moveFocus(from, to) {
        from.focused = false;
        to.focused = true;
        this.activeDescendant = to.itemId;
        const modifiedItems = new Array(from.serialize(), to.serialize());
        this.stateChange.emit(modifiedItems);
    }
    focusLastItem() {
        this.focusItem("lastItem");
    }
    focusFirstItem() {
        this.focusItem("firstItem");
    }
    focusNextItem() {
        this.focusItem("nextItem");
    }
    focusPreviousItem() {
        this.focusItem("previousItem");
    }
    expandItem() {
        let currentItem = this.allItems.filter(item => item.focused)[0];
        if (!this.isVisible(currentItem)) {
            currentItem.focused = false;
            currentItem = this.getVisibleParent(currentItem);
        }
        if (currentItem.hasChildItems || currentItem.hasContent) {
            if (!currentItem.expanded) {
                this.onItemAction(currentItem);
            }
            else if (currentItem.hasChildItems) {
                const firstChildIndex = currentItem.childrenItems.findIndex(item => !item.disabled);
                if (firstChildIndex > -1) {
                    this.moveFocus(currentItem, currentItem.childrenItems[firstChildIndex]);
                }
            }
        }
    }
    collapseItem() {
        const currentItem = this.allItems.filter(item => item.focused)[0];
        if (currentItem.expanded) {
            this.onItemAction(currentItem);
        }
        else if (currentItem.parent) {
            this.moveFocus(currentItem, currentItem.parent);
        }
    }
    selectFocusedItem() {
        let focusedItem = this.allItems.filter(item => item.focused)[0];
        if (!this.isVisible(focusedItem)) {
            focusedItem.focused = false;
            focusedItem = this.getVisibleParent(focusedItem);
        }
        if (focusedItem) {
            focusedItem.onItemAction();
        }
    }
    visibleItems() {
        return this.flatVisibleItems(this.childrenItems);
    }
    flatVisibleItems(listOfItems = new Array(), flattedItems = new Array()) {
        listOfItems.forEach(item => {
            if (!item.disabled) {
                flattedItems.push(item);
                if (item.expanded && item.hasChildItems) {
                    this.flatVisibleItems(item.childrenItems, flattedItems);
                }
            }
        });
        return flattedItems;
    }
}
PanelBarComponent.decorators = [
    { type: Component, args: [{
                exportAs: 'kendoPanelbar',
                providers: [
                    PanelBarService,
                    LocalizationService,
                    {
                        provide: L10N_PREFIX,
                        useValue: 'kendo.panelbar'
                    }
                ],
                selector: 'kendo-panelbar',
                template: `
        <ng-content *ngIf="contentChildItems && !items" select="kendo-panelbar-item"></ng-content>
        <ng-template [ngIf]="items?.length">
            <ng-container *ngFor="let item of items">
                <kendo-panelbar-item *ngIf="!item.hidden"
                     [title]="item.title"
                     [id]="item.id"
                     [icon]="item.icon"
                     [iconClass]="item.iconClass"
                     [imageUrl]="item.imageUrl"
                     [selected]="!!item.selected"
                     [expanded]="!!item.expanded"
                     [disabled]="!!item.disabled"
                     [template]="templateRef"
                     [items]="item.children"
                     [content]="item.content"
                >
                </kendo-panelbar-item>
            </ng-container>
        </ng-template>
    `
            },] },
];
/** @nocollapse */
PanelBarComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: PanelBarService },
    { type: LocalizationService }
];
PanelBarComponent.propDecorators = {
    expandMode: [{ type: Input }],
    selectable: [{ type: Input }],
    animate: [{ type: Input }],
    height: [{ type: Input }],
    keepItemContent: [{ type: Input }],
    items: [{ type: Input }],
    stateChange: [{ type: Output }],
    tabIndex: [{ type: HostBinding, args: ['attr.tabIndex',] }],
    role: [{ type: HostBinding, args: ['attr.role',] }],
    activeDescendant: [{ type: HostBinding, args: ['attr.aria-activedescendant',] }],
    hostHeight: [{ type: HostBinding, args: ['style.height',] }],
    overflow: [{ type: HostBinding, args: ['style.overflow',] }],
    dir: [{ type: HostBinding, args: ['attr.dir',] }],
    template: [{ type: ContentChild, args: [PanelBarItemTemplateDirective,] }],
    contentItems: [{ type: ContentChildren, args: [PanelBarItemComponent, { descendants: true },] }],
    contentChildItems: [{ type: ContentChildren, args: [PanelBarItemComponent,] }],
    viewChildItems: [{ type: ViewChildren, args: [PanelBarItemComponent,] }],
    onComponentClick: [{ type: HostListener, args: ['click', ['$event'],] }],
    onComponentFocus: [{ type: HostListener, args: ['focus',] }],
    onComponentBlur: [{ type: HostListener, args: ['blur',] }],
    onComponentKeyDown: [{ type: HostListener, args: ['keydown', ['$event'],] }],
    hostClasses: [{ type: HostBinding, args: ['class.k-widget',] }, { type: HostBinding, args: ['class.k-panelbar',] }]
};

/**
 * Represents the pane component of the Splitter.
 */
class SplitterPaneComponent {
    constructor(element, renderer, cdr) {
        this.element = element;
        this.renderer = renderer;
        this.cdr = cdr;
        /**
         * Specifies if the user is allowed to resize the pane and provide space for other panes.
         */
        this.resizable = true;
        /**
         * Specifies if the user is allowed to hide the pane and provide space for other panes.
         */
        this.collapsible = false;
        /**
         * Specifies if overflowing content is scrollable or hidden.
         */
        this.scrollable = true;
        /**
         * Specifies if the pane is initially collapsed.
         */
        this.collapsed = false;
        /**
         * @hidden
         */
        this.orientation = 'horizontal';
        /**
         * @hidden
         */
        this.containsSplitter = false;
        /**
         * @hidden
         */
        this.overlayContent = false;
        /**
         * Fires each time the user resizes the Splitter pane.
         * The event data contains the new pane size.
         * Allows a two-way binding of the pane `size` property.
         */
        this.sizeChange = new EventEmitter();
        /**
         * Fires each time the `collapsed` property changes.
         * The event data contains the new property state.
         * Allows a two-way binding of the `collapsed` pane property.
         */
        this.collapsedChange = new EventEmitter();
        this.hostClass = true;
        /**
         * @hidden
         */
        this.forceExpand = false;
    }
    /**
     * @hidden
     */
    set order(paneOrder) {
        this._order = paneOrder;
        this.setOrderStyles();
    }
    get order() {
        return this._order;
    }
    /**
     * Sets the initial size of the pane.
     * Has to be between the `min` and `max` properties.
     */
    set size(newSize) {
        this._size = newSize;
        const element = this.element.nativeElement;
        this.renderer.setStyle(element, '-ms-flex-preferred-size', newSize);
        this.renderer.setStyle(element, 'flex-basis', newSize);
        if (this.staticPaneClass) {
            this.renderer.addClass(element, 'k-pane-static');
        }
        else {
            this.renderer.removeClass(element, 'k-pane-static');
        }
    }
    get size() {
        return this._size;
    }
    get isHidden() {
        return this.collapsed;
    }
    get styleDisplayFlex() {
        return this.containsSplitter;
    }
    get staticPaneClass() {
        if (this.forceExpand) {
            return false;
        }
        return !this.resizable && !this.collapsible || this.fixedSize;
    }
    get scrollablePaneClass() {
        return this.scrollable;
    }
    get fixedSize() {
        return this.size && this.size.length > 0;
    }
    ngAfterViewChecked() {
        const element = this.element.nativeElement;
        if (this.isHidden) {
            this.renderer.addClass(element, 'k-state-hidden');
            this.renderer.addClass(element, 'hidden');
        }
        else {
            this.renderer.removeClass(element, 'k-state-hidden');
            this.renderer.removeClass(element, 'hidden');
        }
    }
    /**
     * @hidden
     */
    get computedSize() {
        if (this.orientation === 'vertical') {
            return this.element.nativeElement.offsetHeight;
        }
        else {
            return this.element.nativeElement.offsetWidth;
        }
    }
    /**
     * @hidden
     */
    toggleOverlay(show) {
        this.overlayContent = show;
        this.cdr.detectChanges();
    }
    /**
     * @hidden
     */
    detectChanges() {
        this.cdr.detectChanges();
    }
    /**
     * @hidden
     */
    setOrderStyles() {
        const element = this.element.nativeElement;
        this.renderer.setStyle(element, '-ms-flex-order', this.order);
        this.renderer.setStyle(element, 'order', this.order);
    }
}
SplitterPaneComponent.decorators = [
    { type: Component, args: [{
                exportAs: 'kendoSplitterPane',
                selector: 'kendo-splitter-pane',
                template: `
        <ng-container *ngIf="!collapsed"><ng-content></ng-content></ng-container>
        <div *ngIf="overlayContent" class="k-splitter-overlay k-overlay"></div>
    `
            },] },
];
/** @nocollapse */
SplitterPaneComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 },
    { type: ChangeDetectorRef }
];
SplitterPaneComponent.propDecorators = {
    order: [{ type: Input }],
    size: [{ type: Input }],
    min: [{ type: Input }],
    max: [{ type: Input }],
    resizable: [{ type: Input }],
    collapsible: [{ type: Input }],
    scrollable: [{ type: Input }],
    collapsed: [{ type: Input }],
    orientation: [{ type: Input }],
    containsSplitter: [{ type: Input }],
    overlayContent: [{ type: Input }],
    sizeChange: [{ type: Output }],
    collapsedChange: [{ type: Output }],
    styleDisplayFlex: [{ type: HostBinding, args: ['class.k-pane-flex',] }],
    hostClass: [{ type: HostBinding, args: ['class.k-pane',] }],
    staticPaneClass: [{ type: HostBinding, args: ['class.k-pane-static',] }],
    scrollablePaneClass: [{ type: HostBinding, args: ['class.k-scrollable',] }]
};

const SIZING_DOC_LINK = 'https://www.telerik.com/kendo-angular-ui/components/layout/splitter/panes/#toc-size';
/**
 * @hidden
 */
class SplitterService {
    constructor(zone) {
        this.zone = zone;
        this.layoutChange = new EventEmitter();
        this.containerSize = () => { };
    }
    tryToggle(paneIndex) {
        const pane = this.pane(paneIndex);
        if (pane.collapsible) {
            pane.collapsed = !pane.collapsed;
            pane.collapsedChange.emit(pane.collapsed);
            this.emit(this.layoutChange, {});
            if (pane.collapsed) {
                pane.detectChanges();
            }
        }
        const notCollapsed = this.panes.filter(p => !p.collapsed);
        const allHaveFixedSize = notCollapsed.every(p => p.fixedSize);
        notCollapsed[notCollapsed.length - 1].forceExpand = allHaveFixedSize ? true : false;
        return pane.collapsible;
    }
    toggleContentOverlay(index, show) {
        this.pane(index).toggleOverlay(show);
        this.pane(index + 1).toggleOverlay(show);
    }
    dragState(splitbarIndex) {
        let prev = this.pane(splitbarIndex);
        let next = this.pane(splitbarIndex + 1);
        const total = prev.computedSize + next.computedSize;
        const px = s => this.toPixels(s);
        return {
            prev: {
                index: splitbarIndex,
                initialSize: prev.computedSize,
                min: px(prev.min) || total - px(next.max) || 0,
                max: px(prev.max) || total - px(next.min) || total
            },
            next: {
                index: splitbarIndex + 1,
                initialSize: next.computedSize,
                min: px(next.min) || total - px(prev.max) || 0,
                max: px(next.max) || total - px(prev.min) || total
            }
        };
    }
    setSize(state$$1, delta) {
        const clamp = (min, max, v) => Math.min(max, Math.max(min, v));
        const resize = (paneState, change) => {
            const pane = this.pane(paneState.index);
            const splitterSize = this.containerSize();
            const newSize = clamp(paneState.min, paneState.max, paneState.initialSize + change);
            let size = "";
            if (this.isPercent(pane.size)) {
                size = (100 * newSize / splitterSize) + "%";
            }
            else {
                size = newSize + "px";
            }
            pane.size = size;
            this.emit(pane.sizeChange, size);
        };
        const prev = this.pane(state$$1.prev.index);
        const next = this.pane(state$$1.next.index);
        // determine which pane to resize
        if (prev.fixedSize && next.fixedSize) {
            // resizing both panes
            resize(state$$1.prev, delta);
            resize(state$$1.next, -delta);
        }
        else if (next.collapsible || next.fixedSize) {
            // resizing next
            resize(state$$1.next, -delta);
        }
        else {
            // resizing prev
            resize(state$$1.prev, delta);
        }
        this.emit(this.layoutChange, {});
    }
    isDraggable(splitBarIndex) {
        const prev = this.pane(splitBarIndex);
        const next = this.pane(splitBarIndex + 1);
        const betweenResizablePanes = prev.resizable && next.resizable;
        const nearCollapsedPane = prev.collapsed || next.collapsed;
        return betweenResizablePanes && !nearCollapsedPane;
    }
    isStatic(splitBarIndex) {
        const prev = this.pane(splitBarIndex);
        const next = this.pane(splitBarIndex + 1);
        const betweenResizablePanes = prev.resizable && next.resizable;
        const nearCollapsiblePane = prev.collapsible || next.collapsible;
        return !betweenResizablePanes && !nearCollapsiblePane;
    }
    pane(index) {
        if (!this.panes) {
            throw new Error("Panes not initialized");
        }
        if (index < 0 || index >= this.panes.length) {
            throw new Error("Index out of range");
        }
        return this.panes[index];
    }
    configure({ panes, orientation, containerSize }) {
        this.panes = panes;
        this.panes.forEach((pane, index) => {
            pane.order = index * 2;
            pane.orientation = orientation;
        });
        if (isDevMode()) {
            const allFixed = panes.length && !panes.some(pane => !pane.fixedSize);
            if (allFixed) {
                throw new Error(`
                    The Splitter should have at least one pane without a set size.
                    See ${SIZING_DOC_LINK} for more information.
                `);
            }
        }
        this.containerSize = containerSize;
    }
    isPercent(size) {
        return /%$/.test(size);
    }
    toPixels(size) {
        let result = parseFloat(size);
        if (this.isPercent(size)) {
            result = (this.containerSize() * result / 100);
        }
        return result;
    }
    emit(emitter, args) {
        if (emitter.observers.length) {
            this.zone.run(() => emitter.emit(args));
        }
    }
}
SplitterService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
SplitterService.ctorParameters = () => [
    { type: NgZone }
];

/**
 * Represents the [Kendo UI Splitter component for Angular]({% slug overview_splitter %}).
 *
 * ```ts-preview
 *
 *  @Component({
 *    selector: 'my-app',
 *    template: `
 *        <kendo-splitter style="height: 280px;">
 *
 *          <kendo-splitter-pane [collapsible]="true" size="30%">
 *            <h3>Inner splitter / left pane</h3>
 *            <p>Resizable and collapsible.</p>
 *          </kendo-splitter-pane>
 *
 *          <kendo-splitter-pane>
 *            <h3>Inner splitter / center pane</h3>
 *            <p>Resizable only.</p>
 *          </kendo-splitter-pane>
 *
 *          <kendo-splitter-pane [collapsible]="true" size="30%">
 *            <h3>Inner splitter / right pane</h3>
 *            <p>Resizable and collapsible.</p>
 *          </kendo-splitter-pane>
 *
 *        </kendo-splitter>
 *      `,
 *    styles: [ `
 *        h3 { font-size: 1.2em; }
 *        h3, p { margin: 10px; padding: 0; }
 *    ` ]
 *  })
 *  class AppComponent {}
 * ```
 */
class SplitterComponent {
    constructor(element, splitterService, localization, enclosingPane) {
        this.element = element;
        this.splitterService = splitterService;
        this.localization = localization;
        /**
         * Specifies the orientation of the panes within the Splitter.
         * Panes in a horizontal Splitter are placed horizontally.
         * Panes in a vertical Splitter are placed vertically.
         */
        this.orientation = 'horizontal';
        this.ariaRole = 'splitter';
        if (enclosingPane) {
            enclosingPane.containsSplitter = true;
        }
        // the handler only runs in NgZone if there are bound handlers
        // this line merges both streams
        this.layoutChange = this.splitterService.layoutChange;
        this.configure = this.configure.bind(this);
    }
    get hostClasses() {
        return true;
    }
    get horizontalHostClasses() {
        return this.orientation === 'horizontal';
    }
    get verticalHostClasses() {
        return this.orientation === 'vertical';
    }
    get dir() {
        return this.direction;
    }
    ngAfterContentInit() {
        this.reconfigure();
    }
    ngOnChanges(changes) {
        if (changes.orientation && !changes.orientation.isFirstChange()) {
            this.reconfigure();
        }
    }
    ngOnDestroy() {
        this.unsubscribeChanges();
    }
    reconfigure() {
        this.unsubscribeChanges();
        this.configure();
        this.paneChangesSubscription = this.panes.changes.subscribe(this.configure);
    }
    unsubscribeChanges() {
        if (this.paneChangesSubscription) {
            this.paneChangesSubscription.unsubscribe();
            this.paneChangesSubscription = null;
        }
    }
    configure() {
        this.splitterService.configure({
            panes: this.panes.toArray(),
            orientation: this.orientation,
            containerSize: () => {
                if (this.orientation === 'vertical') {
                    return this.element.nativeElement.clientHeight;
                }
                else {
                    return this.element.nativeElement.clientWidth;
                }
            }
        });
    }
    get direction() {
        return this.localization.rtl ? 'rtl' : 'ltr';
    }
}
SplitterComponent.decorators = [
    { type: Component, args: [{
                exportAs: 'kendoSplitter',
                selector: 'kendo-splitter',
                providers: [
                    SplitterService,
                    LocalizationService,
                    {
                        provide: L10N_PREFIX,
                        useValue: 'kendo.spliter'
                    }
                ],
                template: `
      <ng-content select="kendo-splitter-pane"></ng-content>
      <ng-container *ngFor="
        let pane of panes;
        let index = index;
        let last = last;
      ">
        <kendo-splitter-bar
          kendoDraggable
          *ngIf="!last"
          [index]="index"
          [orientation]="orientation">
        </kendo-splitter-bar>
      </ng-container>
    `
            },] },
];
/** @nocollapse */
SplitterComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: SplitterService },
    { type: LocalizationService },
    { type: SplitterPaneComponent, decorators: [{ type: Optional }, { type: Host }, { type: Inject, args: [SplitterPaneComponent,] }] }
];
SplitterComponent.propDecorators = {
    orientation: [{ type: Input }],
    layoutChange: [{ type: Output }],
    hostClasses: [{ type: HostBinding, args: ['class.k-widget',] }, { type: HostBinding, args: ['class.k-splitter',] }, { type: HostBinding, args: ['class.k-splitter-flex',] }],
    horizontalHostClasses: [{ type: HostBinding, args: ['class.k-splitter-horizontal',] }],
    verticalHostClasses: [{ type: HostBinding, args: ['class.k-splitter-vertical',] }],
    dir: [{ type: HostBinding, args: ['attr.dir',] }],
    ariaRole: [{ type: HostBinding, args: ['attr.role',] }],
    panes: [{ type: ContentChildren, args: [SplitterPaneComponent,] }]
};

/**
 * Represents the content template of the Kendo UI TabStrip.
 * To define the template, nest a `<ng-template>` tag with the `kendoTabContent` inside the component tag.
 *
 * @example
 * ```ts-preview
 *
 * _@Component({
 *     selector: 'my-app',
 *     template: `
 *         <kendo-tabstrip [ngStyle]="{'width': '400px'}" [animate]="true">
 *           <kendo-tabstrip-tab [title]="'Paris'" [selected]="true">
 *             <ng-template kendoTabContent>
 *               <h3>Content 1</h3>
 *             </ng-template>
 *           </kendo-tabstrip-tab>
 *
 *           <kendo-tabstrip-tab [title]="'Sofia'">
 *             <ng-template kendoTabContent>
 *               <h3>Content 2</h3>
 *             </ng-template>
 *           </kendo-tabstrip-tab>
 *         </kendo-tabstrip>
 *     `
 * })
 *
 * class AppComponent {}
 *
 * ```
 */
class TabContentDirective {
    constructor(templateRef) {
        this.templateRef = templateRef;
    }
}
TabContentDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kendoTabContent]'
            },] },
];
/** @nocollapse */
TabContentDirective.ctorParameters = () => [
    { type: TemplateRef }
];

/**
 * Represents the title template of the Kendo UI TabStrip.
 * To define the template, nest a `<ng-template>` tag with the `kendoTabTitle` directive inside the component tag.
 *
 * @example
 * ```ts-preview
 *
 * _@Component({
 *     selector: 'my-app',
 *     template: `
 *         <kendo-tabstrip [ngStyle]="{'width': '400px'}" [animate]="true">
 *           <kendo-tabstrip-tab [title]="'Paris'" [selected]="true">
 *             <ng-template kendoTabTitle>
 *               Title
 *             </ng-template>
 *             <ng-template kendoTabContent>
 *               <h3>Content 1</h3>
 *             </ng-template>
 *           </kendo-tabstrip-tab>
 *
 *           <kendo-tabstrip-tab [title]="'Sofia'">
 *             <ng-template kendoTabContent>
 *               <h3>Content 2</h3>
 *             </ng-template>
 *           </kendo-tabstrip-tab>
 *         </kendo-tabstrip>
 *     `
 * })
 *
 * class AppComponent {}
 *
 * ```
 */
class TabTitleDirective {
    constructor(templateRef) {
        this.templateRef = templateRef;
    }
}
TabTitleDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kendoTabTitle]'
            },] },
];
/** @nocollapse */
TabTitleDirective.ctorParameters = () => [
    { type: TemplateRef }
];

/**
 * Represents the tab component of the TabStrip.
 */
class TabStripTabComponent {
    constructor() {
        this.active = false;
        this._tabContent = new QueryList();
    }
    get tabContent() {
        return this._tabContent.first;
    }
    ngAfterContentInit() {
        this.active = this.selected;
    }
    ngOnChanges(changes) {
        if (changes['selected'] && !changes['selected'].isFirstChange()) { // tslint:disable-line
            this.active = this.selected;
        }
    }
}
TabStripTabComponent.decorators = [
    { type: Component, args: [{
                exportAs: 'kendoTabStripTab',
                selector: 'kendo-tabstrip-tab',
                template: ``
            },] },
];
TabStripTabComponent.propDecorators = {
    title: [{ type: Input }],
    disabled: [{ type: Input }],
    cssClass: [{ type: Input }],
    selected: [{ type: Input }],
    _tabContent: [{ type: ContentChildren, args: [TabContentDirective,] }],
    tabTitle: [{ type: ContentChild, args: [TabTitleDirective,] }]
};

/**
 * @hidden
 */
class PreventableEvent {
    /**
     * @hidden
     */
    constructor(args) {
        this.prevented = false;
        Object.assign(this, args);
    }
    /**
     * Prevents the default action for a specified event.
     * In this way, the source component suppresses
     * the built-in behavior that follows the event.
     */
    preventDefault() {
        this.prevented = true;
    }
    /**
     * Returns `true` if the event was prevented
     * by any of its subscribers.
     *
     * @returns `true` if the default action was prevented.
     * Otherwise, returns `false`.
     */
    isDefaultPrevented() {
        return this.prevented;
    }
}

/**
 * Arguments for the `select` event of the TabStrip.
 * The `select` event fires when a tab is selected (clicked).
 */
class SelectEvent extends PreventableEvent {
    /**
     * Constructs the event arguments for the `select` event.
     * @param index - The index of the selected tab.
     * @param title - The title of the selected tab.
     */
    constructor(index, title) {
        super();
        this.index = index;
        this.title = title;
    }
}

/**
 * Represents the [Kendo UI TabStrip component for Angular]({% slug overview_tabstrip %}).
 */
class TabStripComponent {
    constructor(localization, renderer, wrapper) {
        this.localization = localization;
        this.renderer = renderer;
        this.wrapper = wrapper;
        /**
         * Enables the tab animation.
         */
        this.animate = true;
        /**
         * Sets the position of the tabs. Defaults to `top`.
         */
        this.tabPosition = 'top';
        /**
         * When set to `true`, the component renders all tabs and they are persisted in the DOM.
         * By default, `keepTabContent` is `false`.
         */
        this.keepTabContent = false;
        /**
         * Fires each time the user selects a tab ([see example]({% slug overview_tabstrip %}#toc-basic-usage)).
         * The event data contains the index of the selected tab and its title.
         */
        this.tabSelect = new EventEmitter();
        this.hostClasses = true;
        /**
         * @hidden
         */
        this._animate = false;
        this.keyBindings = this.computedKeys;
    }
    /**
     * Sets the height of the TabStrip.
     */
    set height(value) {
        this._height = value;
        this.renderer.setStyle(this.wrapper.nativeElement, 'height', value);
    }
    get height() {
        return this._height;
    }
    get tabsAtTop() {
        return this.tabPosition === 'top';
    }
    get tabsAtRight() {
        return this.tabPosition === 'right';
    }
    get tabsAtBottom() {
        return this.tabPosition === 'bottom';
    }
    get tabsAtLeft() {
        return this.tabPosition === 'left';
    }
    get dir() {
        return this.localization.rtl ? 'rtl' : 'ltr';
    }
    /**
     * @hidden
     */
    contentClass(active) {
        const visible = !this.keepTabContent || active;
        return visible ? 'k-content k-state-active' : 'k-content';
    }
    get computedKeys() {
        return {
            [this.invertKeys(Keys.ArrowLeft, Keys.ArrowRight)]: (selectedIndex) => this.prevNavigatableIndex(selectedIndex),
            [this.invertKeys(Keys.ArrowRight, Keys.ArrowLeft)]: (selectedIndex) => this.nextNavigatableIndex(selectedIndex),
            [this.invertKeys(Keys.ArrowDown, Keys.ArrowUp)]: (selectedIndex) => this.nextNavigatableIndex(selectedIndex),
            [this.invertKeys(Keys.ArrowUp, Keys.ArrowDown)]: (selectedIndex) => this.prevNavigatableIndex(selectedIndex),
            [Keys.Home]: () => this.firstNavigatableIndex(),
            [Keys.End]: () => this.lastNavigatableIndex()
        };
    }
    /**
     * @hidden
     */
    get tabsAlignment() {
        return {
            start: 'flex-start',
            end: 'flex-end',
            center: 'center',
            justify: 'space-between'
        }[this.tabAlignment];
    }
    /**
     * @hidden
     */
    invertKeys(original, inverted) {
        return this.localization.rtl ? inverted : original;
    }
    /**
     * @hidden
     */
    onKeyDown(event) {
        if (event.currentTarget !== this.tablist.nativeElement) {
            return;
        }
        const isHorizontal = this.tabPosition === 'top' || this.tabPosition === 'bottom';
        const isArrowUp = event.keyCode === Keys.ArrowUp;
        const isArrowDown = event.keyCode === Keys.ArrowDown;
        const isArrowLeft = event.keyCode === Keys.ArrowLeft;
        const isArrowRight = event.keyCode === Keys.ArrowRight;
        if (isHorizontal && (isArrowUp || isArrowDown)) {
            return;
        }
        if (!isHorizontal && (isArrowLeft || isArrowRight)) {
            return;
        }
        if (event.keyCode === Keys.Space || isArrowUp || isArrowDown || isArrowLeft || isArrowRight || event.keyCode === Keys.Home ||
            event.keyCode === Keys.End || event.keyCode === Keys.PageUp || event.keyCode === Keys.PageDown) {
            event.preventDefault();
        }
        const selectedIndex = this.tabs.toArray().findIndex(tab => tab.active && !tab.disabled);
        if (selectedIndex === -1) {
            this.selectTab(this.firstNavigatableIndex());
        }
        else {
            const getTabIndex = this.keyBindings[event.keyCode];
            if (getTabIndex) {
                const nextIndex = getTabIndex(selectedIndex);
                if (selectedIndex !== nextIndex) {
                    this.selectTab(getTabIndex(selectedIndex));
                }
            }
        }
    }
    /**
     * @hidden
     */
    tabPanelId(id) {
        return 'k-tabstrip-tabpanel-' + id;
    }
    /**
     * @hidden
     */
    tabId(id) {
        return 'k-tabstrip-tab-' + id;
    }
    /**
     * Allows the user to select a tab programmatically.
     * @param {number} index - The index of the tab that will be selected.
     */
    selectTab(index) {
        const tab = this.tabs.toArray()[index];
        if (!tab || Boolean(tab.disabled)) {
            return;
        }
        this.tabHeadingContainers.toArray()[index].nativeElement.focus();
        this.emitEvent(tab, index);
    }
    /**
     * @hidden
     */
    onTabClick(originalEvent, tabIndex) {
        if (isFocusable(originalEvent.target)) {
            return;
        }
        this.selectTab(tabIndex);
    }
    ngOnInit() {
        this.localizationChangeSubscription = this.localization
            .changes.subscribe(() => this.keyBindings = this.computedKeys);
    }
    ngOnDestroy() {
        if (this.localizationChangeSubscription) {
            this.localizationChangeSubscription.unsubscribe();
        }
    }
    firstNavigatableIndex() {
        const tabs = this.tabs.toArray();
        for (let i = 0; i < tabs.length; i++) {
            if (!tabs[i].disabled) {
                return i;
            }
        }
    }
    lastNavigatableIndex() {
        const tabs = this.tabs.toArray();
        for (let i = tabs.length - 1; i > 0; i--) {
            if (!tabs[i].disabled) {
                return i;
            }
        }
    }
    prevNavigatableIndex(selectedIndex) {
        if (selectedIndex - 1 < 0) {
            return this.lastNavigatableIndex();
        }
        const tabs = this.tabs.toArray();
        for (let i = selectedIndex - 1; i > -1; i--) {
            if (!tabs[i].disabled) {
                return i;
            }
            if (i === 0) {
                return this.lastNavigatableIndex();
            }
        }
        return selectedIndex;
    }
    nextNavigatableIndex(selectedIndex) {
        if (selectedIndex + 1 >= this.tabs.length) {
            return this.firstNavigatableIndex();
        }
        const tabs = this.tabs.toArray();
        for (let i = selectedIndex + 1; i < tabs.length; i++) {
            if (!tabs[i].disabled) {
                return i;
            }
            if (i + 1 === tabs.length) {
                return this.firstNavigatableIndex();
            }
        }
    }
    emitEvent(tab, selectedIndex) {
        const selectArgs = new SelectEvent(selectedIndex, tab.title);
        this.tabSelect.emit(selectArgs);
        if (!selectArgs.isDefaultPrevented() && !tab.active) {
            this._animate = this.animate;
            this.deactivateAll();
            tab.active = true;
        }
    }
    deactivateAll() {
        this.tabs.forEach((tab) => {
            tab.active = false;
        });
    }
}
TabStripComponent.decorators = [
    { type: Component, args: [{
                animations: [
                    trigger('state', [
                        state('active', style({ opacity: 1 })),
                        transition('* => active', [
                            style({ opacity: 0 }),
                            animate('400ms ease-in')
                        ])
                    ])
                ],
                providers: [
                    LocalizationService,
                    {
                        provide: L10N_PREFIX,
                        useValue: 'kendo.tabstrip'
                    }
                ],
                exportAs: 'kendoTabStrip',
                selector: 'kendo-tabstrip',
                template: `
        <ng-container *ngIf="!tabsAtBottom">
            <ng-container *ngTemplateOutlet="heading">
            </ng-container>
            <ng-container *ngTemplateOutlet="content">
            </ng-container>
        </ng-container>

        <ng-container *ngIf="tabsAtBottom">
            <ng-container *ngTemplateOutlet="content">
            </ng-container>
            <ng-container *ngTemplateOutlet="heading">
            </ng-container>
        </ng-container>

        <ng-template #heading>
            <ul
                class="k-reset k-tabstrip-items"
                [style.justifyContent]="tabsAlignment"
                role="tablist"
                (keydown)="onKeyDown($event)"
                #tablist
            >
                <li *ngFor="let tab of tabs; let i = index;" (click)="onTabClick($event, i)"
                    #tabHeadingContainer
                    role="tab"
                    [id]="tabId(i)"
                    [tabIndex]="tab.active ? 0 : -1"
                    [ngClass]="tab.cssClass"
                    [class.k-item]="true"
                    [class.k-state-default]="true"
                    [class.k-state-active]="tab.active"
                    [class.k-state-disabled]="tab.disabled"
                    [attr.aria-selected]="tab.active"
                    [attr.aria-controls]="tabPanelId(i)"
                    [attr.aria-disabled]="tab.disabled"
                ><span class="k-link">{{ tab.title }}<ng-template [ngTemplateOutlet]="tab.tabTitle?.templateRef"></ng-template></span></li>
            </ul>
        </ng-template>
        <ng-template #content>
            <ng-template ngFor let-tab [ngForOf]="tabs" let-i="index">
                <div
                    [@state]="tab.active && _animate ? 'active' : 'inactive'"
                    *ngIf="tab.active || keepTabContent"
                    [ngClass]="contentClass(tab.active)"
                    [tabIndex]="0"
                    role="tabpanel"
                    [id]="tabPanelId(i)"
                    [attr.aria-hidden]="!tab.active"
                    [attr.aria-expanded]="tab.active"
                    [attr.aria-labelledby]="tabId(i)"
                    [attr.aria-disabled]="tab.disabled"
                >
                    <ng-template [ngTemplateOutlet]="tab.tabContent?.templateRef"></ng-template>
                </div>
            </ng-template>
        </ng-template>
    `
            },] },
];
/** @nocollapse */
TabStripComponent.ctorParameters = () => [
    { type: LocalizationService },
    { type: Renderer2 },
    { type: ElementRef }
];
TabStripComponent.propDecorators = {
    height: [{ type: Input }],
    animate: [{ type: Input }],
    tabAlignment: [{ type: Input }],
    tabPosition: [{ type: Input }],
    keepTabContent: [{ type: Input }],
    tablist: [{ type: ViewChild, args: ['tablist',] }],
    tabSelect: [{ type: Output }],
    hostClasses: [{ type: HostBinding, args: ['class.k-widget',] }, { type: HostBinding, args: ['class.k-tabstrip',] }, { type: HostBinding, args: ['class.k-floatwrap',] }, { type: HostBinding, args: ['class.k-header',] }],
    tabsAtTop: [{ type: HostBinding, args: ['class.k-tabstrip-top',] }],
    tabsAtRight: [{ type: HostBinding, args: ['class.k-tabstrip-right',] }],
    tabsAtBottom: [{ type: HostBinding, args: ['class.k-tabstrip-bottom',] }],
    tabsAtLeft: [{ type: HostBinding, args: ['class.k-tabstrip-left',] }],
    dir: [{ type: HostBinding, args: ['attr.dir',] }],
    tabs: [{ type: ContentChildren, args: [TabStripTabComponent,] }],
    tabHeadingContainers: [{ type: ViewChildren, args: ['tabHeadingContainer',] }]
};

/**
 * Represents a template that defines the content of the Drawer.
 * To define the template, nest an `<ng-template>` tag
 * with the `kendoDrawerTemplate` directive inside the `<kendo-drawer>` tag.
 * Using this template directive will override all other templates,
 * for example, `kendoDrawerHeaderTemplate` and `kendoDrawerItemTemplate`.
 */
class DrawerTemplateDirective {
    constructor(templateRef) {
        this.templateRef = templateRef;
    }
}
DrawerTemplateDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kendoDrawerTemplate]'
            },] },
];
/** @nocollapse */
DrawerTemplateDirective.ctorParameters = () => [
    { type: TemplateRef, decorators: [{ type: Optional }] }
];

/**
 * Represents a template that defines the item content of the Drawer.
 * To define the template, nest an `<ng-template>` tag
 * with the `kendoDrawerItemTemplate` directive inside the `<kendo-drawer>` tag.
 */
class DrawerItemTemplateDirective {
    constructor(templateRef) {
        this.templateRef = templateRef;
    }
}
DrawerItemTemplateDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kendoDrawerItemTemplate]'
            },] },
];
/** @nocollapse */
DrawerItemTemplateDirective.ctorParameters = () => [
    { type: TemplateRef, decorators: [{ type: Optional }] }
];

/**
 * Represents a template that defines the header content of the Drawer.
 * To define the template, nest an `<ng-template>` tag
 * with the `kendoDrawerHeaderTemplate` directive inside the `<kendo-drawer>` tag.
 */
class DrawerHeaderTemplateDirective {
    constructor(templateRef) {
        this.templateRef = templateRef;
    }
}
DrawerHeaderTemplateDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kendoDrawerHeaderTemplate]'
            },] },
];
/** @nocollapse */
DrawerHeaderTemplateDirective.ctorParameters = () => [
    { type: TemplateRef, decorators: [{ type: Optional }] }
];

/**
 * Represents a template that defines the footer content of the Drawer.
 * To define the template, nest an `<ng-template>` tag
 * with the `kendoDrawerFooterTemplate` directive inside the `<kendo-drawer>` tag.
 */
class DrawerFooterTemplateDirective {
    constructor(templateRef) {
        this.templateRef = templateRef;
    }
}
DrawerFooterTemplateDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kendoDrawerFooterTemplate]'
            },] },
];
/** @nocollapse */
DrawerFooterTemplateDirective.ctorParameters = () => [
    { type: TemplateRef, decorators: [{ type: Optional }] }
];

/**
 * @hidden
 */
function miniExpandPush(duration, width, miniWidth) {
    return [
        style({ overflow: 'hidden', flexBasis: `${miniWidth}px` }),
        animate(`${duration}ms ease-in`, style({ flexBasis: `${width}px` }))
    ];
}
/**
 * @hidden
 */
function miniCollapsePush(duration, width, miniWidth) {
    return [
        style({ overflow: 'hidden', flexBasis: `${width}px` }),
        animate(`${duration}ms ease-in`, style({ flexBasis: `${miniWidth}px` }))
    ];
}
/**
 * @hidden
 *
 */
function miniExpandOverlay(duration, width, miniWidth) {
    return [
        style({ width: `${miniWidth}px` }),
        animate(`${duration}ms ease-in`, style({ overflow: 'hidden', width: `${width}px` }))
    ];
}
/**
 * @hidden
 */
function expandPush(duration, width) {
    return [
        style({ overflow: 'hidden', flexBasis: '0px' }),
        animate(`${duration}ms ease-in`, style({ flexBasis: `${width}px` }))
    ];
}
/**
 * @hidden
 */
function collapsePush(duration, width) {
    return [
        style({ flexBasis: `${width}px` }),
        animate(`${duration}ms ease-in`, style({ overflow: 'hidden', flexBasis: `0px` }))
    ];
}
/**
 * @hidden
 */
function expandRTLOverlay(duration) {
    return [
        style({ transform: `translateX(100%)` }),
        animate(`${duration}ms ease-in`, style({ overflow: 'hidden', transform: `translateX(0)` }))
    ];
}
/**
 * @hidden
 */
function expandOverlay(duration, position) {
    const translateDir = position !== 'end' ? `-100%` : `100%`;
    return [
        style({ transform: `translateX(${translateDir})` }),
        animate(`${duration}ms ease-in`, style({ overflow: 'hidden', transform: `translateX(0)` }))
    ];
}
/**
 * @hidden
 */
function miniCollapseOverlay(duration, width, miniWidth) {
    return [
        style({ width: `${width}px` }),
        animate(`${duration}ms ease-in`, style({ overflow: 'hidden', width: `${miniWidth}px` }))
    ];
}
/**
 * @hidden
 */
function collapseOverlay(duration, position) {
    const translateDir = position !== 'end' ? '-100%' : '100%';
    return [
        style({ transform: `translateX(0)` }),
        animate(`${duration}ms ease-in`, style({ overflow: 'hidden', transform: `translateX(${translateDir})` }))
    ];
}
/**
 * @hidden
 */
function collapseRTLOverlay(duration) {
    return [
        style({ transform: `translateX(0)` }),
        animate(`${duration}ms ease-in`, style({ overflow: 'hidden', transform: `translateX(100%)` }))
    ];
}
/**
 * @hidden
 */
function expandAnimation(settings) {
    const duration = settings.animation.duration;
    const width = settings.width;
    const miniWidth = settings.miniWidth;
    const mode = settings.mode;
    const mini = settings.mini;
    const rtl = settings.rtl;
    const position = settings.position;
    if (mini && mode === 'push') {
        return miniExpandPush(duration, width, miniWidth);
    }
    if (!mini && mode === 'push') {
        return expandPush(duration, width);
    }
    if (!mini && mode === 'overlay') {
        return rtl ? expandRTLOverlay(duration) : expandOverlay(duration, position);
    }
    if (mini && mode === 'overlay') {
        return miniExpandOverlay(duration, width, miniWidth);
    }
}
/**
 * @hidden
 */
function collapseAnimation(settings) {
    const duration = settings.animation.duration;
    const width = settings.width;
    const miniWidth = settings.miniWidth;
    const mode = settings.mode;
    const mini = settings.mini;
    const rtl = settings.rtl;
    const position = settings.position;
    if (mini && mode === 'push') {
        return miniCollapsePush(duration, width, miniWidth);
    }
    if (!mini && mode === 'push') {
        return collapsePush(duration, width);
    }
    if (!mini && mode === 'overlay') {
        return rtl ? collapseRTLOverlay(duration) : collapseOverlay(duration, position);
    }
    if (mini && mode === 'overlay') {
        return miniCollapseOverlay(duration, width, miniWidth);
    }
}

/**
 * Arguments for the `select` event of the Drawer.
 */
class DrawerSelectEvent extends PreventableEvent {
}

/**
 * @hidden
 */
class DrawerService {
    constructor() {
        this.selectedIndices = [];
    }
    emit(event, args) {
        const drawer = this.owner;
        const eventArgs = new DrawerSelectEvent(Object.assign({}, args, { sender: drawer }));
        if (hasObservers(drawer[event])) {
            drawer[event].emit(eventArgs);
        }
        return eventArgs.isDefaultPrevented();
    }
    onSelect(selectedIdx) {
        this.selectedIndices = [selectedIdx];
        const drawer = this.owner;
        if (drawer.autoCollapse && !drawer.minimized) {
            drawer.toggle(false);
        }
    }
    initSelection() {
        const items = this.owner.items;
        this.selectedIndices = [];
        for (let i = 0; i < items.length; i++) {
            if (items[i].selected) {
                this.selectedIndices.push(i);
            }
        }
    }
}
DrawerService.decorators = [
    { type: Injectable },
];

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
class DrawerComponent {
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

/**
 * Serves as a container for the [Kendo UI Drawer component for Angular]({% slug overview_drawer %}) and its content.
 */
class DrawerContainerComponent {
    constructor(localizationService) {
        this.localizationService = localizationService;
        this.rtl = false;
        this.dynamicRTLSubscription = this.localizationService.changes.subscribe(({ rtl }) => {
            this.rtl = rtl;
            this.direction = this.rtl ? 'rtl' : 'ltr';
        });
    }
    get hostClass() {
        return true;
    }
    get overlayClass() {
        return this.drawer.mode === 'overlay';
    }
    get miniClass() {
        return this.drawer.mini;
    }
    get pushClass() {
        return this.drawer.mode === 'push';
    }
    get isExpandedClass() {
        return this.drawer.expanded;
    }
    ngOnDestroy() {
        if (this.dynamicRTLSubscription) {
            this.dynamicRTLSubscription.unsubscribe();
        }
    }
    /**
     * @hidden
     */
    get overlay() {
        return isPresent(this.drawer) &&
            this.drawer.expanded &&
            this.drawer.mode === 'overlay';
    }
    /**
     * @hidden
     */
    closeDrawer() {
        if (this.overlay && this.drawer.autoCollapse) {
            this.drawer.toggle(false);
        }
    }
}
DrawerContainerComponent.decorators = [
    { type: Component, args: [{
                selector: 'kendo-drawer-container',
                providers: [
                    LocalizationService,
                    {
                        provide: L10N_PREFIX,
                        useValue: 'kendo.drawer.container'
                    }
                ],
                template: `
        <div class="k-overlay" *ngIf="overlay" (click)="closeDrawer()"></div>
        <ng-content></ng-content>
    `
            },] },
];
/** @nocollapse */
DrawerContainerComponent.ctorParameters = () => [
    { type: LocalizationService }
];
DrawerContainerComponent.propDecorators = {
    hostClass: [{ type: HostBinding, args: ['class.k-drawer-container',] }],
    overlayClass: [{ type: HostBinding, args: ['class.k-drawer-overlay',] }],
    miniClass: [{ type: HostBinding, args: ['class.k-drawer-mini',] }],
    pushClass: [{ type: HostBinding, args: ['class.k-drawer-push',] }],
    isExpandedClass: [{ type: HostBinding, args: ['class.k-drawer-expanded',] }],
    direction: [{ type: HostBinding, args: ['attr.dir',] }],
    drawer: [{ type: ContentChild, args: [DrawerComponent,] }]
};

/**
 * Represents the content of the [Kendo UI Drawer component for Angular]({% slug overview_drawer %}).
 */
class DrawerContentComponent {
    constructor() {
        this.hostClasses = true;
    }
}
DrawerContentComponent.decorators = [
    { type: Component, args: [{
                selector: 'kendo-drawer-content',
                template: `
        <ng-content></ng-content>
    `,
                encapsulation: ViewEncapsulation.None
            },] },
];
/** @nocollapse */
DrawerContentComponent.ctorParameters = () => [];
DrawerContentComponent.propDecorators = {
    hostClasses: [{ type: HostBinding, args: ['class.k-drawer-content',] }]
};

/**
 * Represents a template that defines the content of the whole Step.
 * To define the template, nest an `<ng-template>` tag
 * with the `kendoStepperStepTemplate` directive inside the `<kendo-stepper>` tag.
 */
class StepperStepTemplateDirective {
    constructor(templateRef) {
        this.templateRef = templateRef;
    }
}
StepperStepTemplateDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kendoStepperStepTemplate]'
            },] },
];
/** @nocollapse */
StepperStepTemplateDirective.ctorParameters = () => [
    { type: TemplateRef, decorators: [{ type: Optional }] }
];

/**
 * Represents a template that defines the content of the Step label.
 * To define the template, nest an `<ng-template>` tag
 * with the `kendoStepperLabelTemplate` directive inside the `<kendo-stepper>` tag.
 */
class StepperLabelTemplateDirective {
    constructor(templateRef) {
        this.templateRef = templateRef;
    }
}
StepperLabelTemplateDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kendoStepperLabelTemplate]'
            },] },
];
/** @nocollapse */
StepperLabelTemplateDirective.ctorParameters = () => [
    { type: TemplateRef, decorators: [{ type: Optional }] }
];

/**
 * Represents a template that defines the content of the Step indicator.
 * To define the template, nest an `<ng-template>` tag
 * with the `kendoStepperIndicatorTemplate` directive inside the `<kendo-stepper>` tag.
 */
class StepperIndicatorTemplateDirective {
    constructor(templateRef) {
        this.templateRef = templateRef;
    }
}
StepperIndicatorTemplateDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kendoStepperIndicatorTemplate]'
            },] },
];
/** @nocollapse */
StepperIndicatorTemplateDirective.ctorParameters = () => [
    { type: TemplateRef, decorators: [{ type: Optional }] }
];

/**
 * Arguments for the `activate` event of the Stepper.
 */
class StepperActivateEvent extends PreventableEvent {
}

const DEFAULT_CURRENT_STEP = 0;
const handlers = {};
handlers[Keys.ArrowLeft] = 'left';
handlers[Keys.ArrowRight] = 'right';
handlers[Keys.ArrowUp] = 'up';
handlers[Keys.ArrowDown] = 'down';
handlers[Keys.Home] = 'home';
handlers[Keys.End] = 'end';
handlers[Keys.Enter] = 'enter';
handlers[Keys.Space] = 'enter';
const handlersRTL = Object.assign({}, handlers);
handlersRTL[Keys.ArrowLeft] = 'right';
handlersRTL[Keys.ArrowRight] = 'left';
/**
 * @hidden
 */
class StepperService {
    constructor(localization, ngZone, changeDetector) {
        this.localization = localization;
        this.ngZone = ngZone;
        this.changeDetector = changeDetector;
        this.currentStep = DEFAULT_CURRENT_STEP;
        this.triggerValidation = new EventEmitter();
        this.focusedStepChange = new EventEmitter();
    }
    get handlers() {
        return this.localization.rtl ? handlersRTL : handlers;
    }
    emit(event, eventArgs) {
        const stepper = this.owner;
        if (hasObservers(stepper[event])) {
            stepper[event].emit(eventArgs);
        }
        return eventArgs.isDefaultPrevented();
    }
    onActivate(currentIdx, originalEvent) {
        const eventArgs = new StepperActivateEvent({
            index: currentIdx,
            step: this.owner.steps[currentIdx],
            originalEvent: originalEvent,
            sender: this.owner
        });
        this.ngZone.run(() => {
            if (!this.emit('activate', eventArgs)) {
                this.currentStep = currentIdx;
                this.owner['currentStepChange'].emit(currentIdx);
                this.changeDetector.detectChanges();
            }
        });
    }
    validateSteps() {
        this.triggerValidation.emit();
    }
    keydown(e) {
        const current = this.focusedStep || this.currentStep;
        const handler = this.handlers[e.keyCode];
        if (!isPresent(current)) {
            return;
        }
        if (handler) {
            e.preventDefault();
            this[handler](e);
        }
    }
    left() {
        if (!this.isHorizontal) {
            return;
        }
        this.focusPrevStep();
    }
    right() {
        if (!this.isHorizontal) {
            return;
        }
        this.focusNextStep();
    }
    up() {
        if (this.isHorizontal) {
            return;
        }
        this.focusPrevStep();
    }
    down() {
        if (this.isHorizontal) {
            return;
        }
        this.focusNextStep();
    }
    home() {
        this.focusedStep = 0;
        this.focusedStepChange.emit();
    }
    end() {
        this.focusedStep = this.owner.steps.length - 1;
        this.focusedStepChange.emit();
    }
    enter(event) {
        if (this.focusedStep === this.currentStep) {
            return;
        }
        if (this.isStepDisabled(this.focusedStep)) {
            return;
        }
        if (this.owner.linear && this.isPrevOrNextStep(this.focusedStep) === false) {
            return;
        }
        this.onActivate(this.focusedStep, event);
    }
    focus(focusedIdx) {
        this.focusedStep = focusedIdx;
    }
    focusNextStep() {
        if (this.focusedStep < this.owner.steps.length) {
            this.focusedStep += 1;
            this.focusedStepChange.emit();
        }
    }
    focusPrevStep() {
        if (this.focusedStep > 0) {
            this.focusedStep -= 1;
            this.focusedStepChange.emit();
        }
    }
    isStepDisabled(index) {
        return this.owner.steps[index].disabled;
    }
    isPrevOrNextStep(index) {
        return index === this.currentStep + 1 || index === this.currentStep - 1;
    }
    get isHorizontal() {
        return this.owner.orientation === 'horizontal';
    }
}
StepperService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
StepperService.ctorParameters = () => [
    { type: LocalizationService },
    { type: NgZone },
    { type: ChangeDetectorRef }
];

const DEFAULT_ANIMATION_DURATION = 400;
/**
 * Represents the [Kendo UI Stepper component for Angular]({% slug overview_stepper %}).
 *
 * @example
 * ```ts-preview
 * _@Component({
 *    selector: 'my-app',
 *    template: `
 *        <kendo-stepper [steps]="steps">
 *        </kendo-stepper>
 *    `
 * })
 * class AppComponent {
 *    public steps: Array<StepperStep> = [
 *      { label: 'Step One' }, { label: 'Step Two' }, { label: 'Step Three' }
 *    ];
 * }
 * ```
 */
class StepperComponent {
    constructor(renderer, elem, localization, stepperService) {
        this.renderer = renderer;
        this.elem = elem;
        this.localization = localization;
        this.stepperService = stepperService;
        this.hostClasses = true;
        this.ariaRole = 'navigation';
        this.displayStyle = 'grid';
        /**
         * Specifies the type of the steps in the Stepper.
         *
         * The possible values are:
         * * (Default) `indicator`
         * * `label`
         * * `full`
         */
        this.stepType = 'indicator';
        /**
         * Specifies the linear flow of the Stepper.
         *
         * @default true
         */
        this.linear = true;
        /**
         * Specifies the orientation of the Stepper
         * ([see example]({% slug orientation_stepper %})).
         *
         * The possible values are:
         * * (Default) `horizontal`
         * * `vertical`
         */
        this.orientation = 'horizontal';
        /**
         * Specifies the duration of the progress indicator animation in milliseconds. Defaults to `400ms`.
         *
         * The possible values are:
         *  * Boolean
         *    * (Default) `true`
         *    * false
         *  * Number
         */
        this.animation = true;
        /**
         * Fires when a step is about to be activated. This event is preventable.
         */
        this.activate = new EventEmitter();
        /**
         * Fires when the `currentStep` property of the component was updated.
         * Used to provide a two-way binding for the `currentStep` property.
         */
        this.currentStepChange = new EventEmitter();
        this._steps = [];
        this.dynamicRTLSubscription = this.localization.changes.subscribe(({ rtl }) => {
            this.direction = rtl ? 'rtl' : 'ltr';
        });
        this.stepperService.owner = this;
    }
    get linearClass() {
        return this.linear;
    }
    /**
     * The index of the current step.
     */
    set currentStep(value) {
        this.stepperService.currentStep = value;
    }
    get currentStep() {
        return this.stepperService.currentStep;
    }
    /**
     * The collection of steps that will be rendered in the Stepper.
     * ([see example]({% slug step_appearance_stepper %}))
     */
    set steps(steps) {
        if (isPresent(steps) && steps.length > 0) {
            this._steps = steps;
        }
    }
    get steps() {
        return this._steps;
    }
    ngOnInit() {
        this.applyHostStyling();
    }
    ngOnChanges(changes) {
        if (changes.steps && !changes.steps.firstChange) {
            this.applyHostStyling();
        }
    }
    ngOnDestroy() {
        if (this.dynamicRTLSubscription) {
            this.dynamicRTLSubscription.unsubscribe();
        }
    }
    /**
     * Manually triggers the validity check configured by the [isValid]({% slug api_layout_stepperstep %}#toc-isvalid) property of the steps.
     *
     * Steps that have their [validate]({% slug api_layout_stepperstep %}#toc-validate) property set to `false`, will not be validated.
     */
    validateSteps() {
        this.stepperService.validateSteps();
    }
    applyHostStyling() {
        const stepFramesStyle = this.orientation === 'horizontal' ? 'grid-template-columns' : 'grid-template-rows';
        const stepFramesValue = `repeat(${this.steps.length * 2}, 1fr)`;
        this.renderer.setStyle(this.elem.nativeElement, stepFramesStyle, stepFramesValue);
    }
    /**
     * @hidden
     */
    get progressAnimation() {
        return { duration: this.animationDuration };
    }
    /**
     * @hidden
     */
    get animationDuration() {
        if (typeof this.animation === 'number') {
            return this.animation;
        }
        if (typeof this.animation === 'boolean' && this.animation) {
            return DEFAULT_ANIMATION_DURATION;
        }
        return 0;
    }
    /**
     * @hidden
     */
    get stepsListStyling() {
        if (this.orientation === 'horizontal') {
            return { 'grid-column-start': 1, 'grid-column-end': -1 };
        }
        return { 'grid-row-start': 1, 'grid-row-end': -1 };
    }
    /**
     * @hidden
     */
    get progressBarStyling() {
        if (this.orientation === 'horizontal') {
            return {
                'grid-column-start': 2,
                'grid-column-end': this.steps.length * 2
            };
        }
        return {
            'grid-row-start': 2,
            'grid-row-end': this.steps.length * 2
        };
    }
    /***
     * @hidden
     */
    get isHorizontal() {
        return this.stepperService.isHorizontal;
    }
}
StepperComponent.decorators = [
    { type: Component, args: [{
                exportAs: 'kendoStepper',
                providers: [
                    LocalizationService,
                    StepperService,
                    {
                        provide: L10N_PREFIX,
                        useValue: 'kendo.stepper'
                    }
                ],
                selector: 'kendo-stepper',
                template: `
        <ng-container kendoStepperLocalizedMessages
            i18n-optional="kendo.stepper.optional|The text for the optional segment of the step label"
            optional="Optional"
         >
        </ng-container>
        <ol kendoStepperList
            [stepType]='stepType'
            [linear]='linear'
            [orientation]='orientation'
            [steps]='steps'
            [currentStep]='currentStep'
            [successIcon]='successIcon'
            [errorIcon]='errorIcon'
            [indicatorTemplate]='indicatorTemplate?.templateRef'
            [labelTemplate]='labelTemplate?.templateRef'
            [stepTemplate]='stepTemplate?.templateRef'
            class='k-step-list'
            [class.k-step-list-horizontal]='isHorizontal'
            [class.k-step-list-vertical]='!isHorizontal'
            [ngStyle]='stepsListStyling'>
        </ol>

        <kendo-progressbar *ngIf='steps.length > 0'
            [attr.aria-hidden]='true'
            [animation]='progressAnimation'
            [max]='steps.length - 1'
            [label]='false'
            [orientation]='orientation'
            [reverse]='!isHorizontal'
            [value]='currentStep'
            [ngStyle]='progressBarStyling'>
        </kendo-progressbar>
    `
            },] },
];
/** @nocollapse */
StepperComponent.ctorParameters = () => [
    { type: Renderer2 },
    { type: ElementRef },
    { type: LocalizationService },
    { type: StepperService }
];
StepperComponent.propDecorators = {
    hostClasses: [{ type: HostBinding, args: ['class.k-widget',] }, { type: HostBinding, args: ['class.k-stepper',] }],
    linearClass: [{ type: HostBinding, args: ['class.k-stepper-linear',] }],
    ariaRole: [{ type: HostBinding, args: ['attr.role',] }],
    direction: [{ type: HostBinding, args: ['attr.dir',] }],
    displayStyle: [{ type: HostBinding, args: ['style.display',] }],
    stepType: [{ type: Input }],
    linear: [{ type: Input }],
    orientation: [{ type: Input }],
    currentStep: [{ type: Input }],
    steps: [{ type: Input }],
    successIcon: [{ type: Input }],
    errorIcon: [{ type: Input }],
    animation: [{ type: Input }],
    activate: [{ type: Output }],
    currentStepChange: [{ type: Output }],
    stepTemplate: [{ type: ContentChild, args: [StepperStepTemplateDirective, { static: true },] }],
    labelTemplate: [{ type: ContentChild, args: [StepperLabelTemplateDirective, { static: true },] }],
    indicatorTemplate: [{ type: ContentChild, args: [StepperIndicatorTemplateDirective, { static: true },] }]
};

const SIZE_CLASSES = {
    'small': 'k-avatar-sm',
    'medium': 'k-avatar-md',
    'large': 'k-avatar-lg'
};
const SHAPE_CLASSES = {
    'circle': 'k-avatar-circle',
    'square': 'k-avatar-square',
    'rectangle': 'k-avatar-rectangle',
    'rounded': 'k-avatar-rounded'
};
/**
 * Displays images, icons or initials representing people or other entities.
 */
class AvatarComponent {
    constructor(renderer, element) {
        this.renderer = renderer;
        this.element = element;
        this.hostClass = true;
        /**
         * Specifies the appearance fill style of the avatar.
         *
         * The possible values are:
         * * `solid` (Default)
         * * `outline`
         *
         */
        this.fill = 'solid';
        /**
         * Sets a border to the avatar.
         */
        this.border = false;
        this._themeColor = 'primary';
        this._size = 'medium';
        this._shape = 'square';
        this.avatar = this.element.nativeElement;
    }
    /**
     * @hidden
     */
    get solidClass() {
        return this.fill === 'solid';
    }
    /**
     * @hidden
     */
    get outlineClass() {
        return this.fill === 'outline';
    }
    /**
     * @hidden
     */
    get borderClass() {
        return this.border;
    }
    /**
     * @hidden
     */
    get flexBasis() {
        return this.width;
    }
    /**
     * Sets the shape for the avatar.
     *
     * Possible values are:
     * * (Default) `square`
     * * `circle`
     * * `rectangle`
     * * `rounded`
     *
     */
    set shape(shape) {
        this.renderer.removeClass(this.avatar, SHAPE_CLASSES[this.shape]);
        this.renderer.addClass(this.avatar, SHAPE_CLASSES[shape]);
        this._shape = shape;
    }
    get shape() {
        return this._shape;
    }
    /**
     * Specifies the size of the avatar
     * ([see example]({% slug appearance_avatar %}#toc-size)).
     *
     * The possible values are:
     * * `small`
     * * `medium` (Default)
     * * `large`
     *
     */
    set size(size) {
        this.renderer.removeClass(this.avatar, SIZE_CLASSES[this.size]);
        this.renderer.addClass(this.avatar, SIZE_CLASSES[size]);
        this._size = size;
    }
    get size() {
        return this._size;
    }
    /**
     * Specifies the theme color of the avatar.
     * The theme color will be applied as background and border color, while also amending the text color accordingly.
     *
     * The possible values are:
     * * `primary` (Default)&mdash;Applies coloring based on primary theme color.
     * * `secondary`&mdash;Applies coloring based on secondary theme color.
     * * `tertiary`&mdash; Applies coloring based on tertiary theme color.
     * * `inherit`&mdash; Applies inherited coloring value.
     * * `info`&mdash;Applies coloring based on info theme color.
     * * `success`&mdash; Applies coloring based on success theme color.
     * * `warning`&mdash; Applies coloring based on warning theme color.
     * * `error`&mdash; Applies coloring based on error theme color.
     * * `dark`&mdash; Applies coloring based on dark theme color.
     * * `light`&mdash; Applies coloring based on light theme color.
     * * `inverse`&mdash; Applies coloring based on inverted theme color.
     *
     */
    set themeColor(themeColor) {
        this.renderer.removeClass(this.avatar, `k-avatar-${this.themeColor}`);
        this.renderer.addClass(this.avatar, `k-avatar-${themeColor}`);
        this._themeColor = themeColor;
    }
    get themeColor() {
        return this._themeColor;
    }
    /**
     * @hidden
     */
    get avatarWidth() {
        return this.width;
    }
    /**
     * @hidden
     */
    get avatarHeight() {
        return this.height;
    }
    ngAfterViewInit() {
        this.setAvatarClasses();
    }
    /**
     * @hidden
     */
    get imageUrl() {
        return `url(${this.imageSrc})`;
    }
    ngOnInit() {
        this.verifyProperties();
    }
    /**
     * @hidden
     */
    iconClasses() {
        if (this.icon) {
            return `k-icon k-i-${this.icon}`;
        }
        if (this.iconClass) {
            return `${this.iconClass}`;
        }
    }
    /**
     * @hidden
     */
    get customAvatar() {
        return !(this.imageSrc || this.initials || this.icon || this.iconClass);
    }
    verifyProperties() {
        if (!isDevMode()) {
            return;
        }
        const inputs = [this.icon || this.iconClass, this.imageSrc, this.initials];
        const inputsLength = inputs.filter((value) => value).length;
        if (inputsLength > 1) {
            throw new Error(`
                Invalid property configuration given.
                The kendo-avatar component can accept only one of:
                icon, imageSrc or initials properties.
            `);
        }
    }
    setAvatarClasses() {
        this.renderer.addClass(this.avatar, SHAPE_CLASSES[this.shape]);
        this.renderer.addClass(this.avatar, `k-avatar-${this.themeColor}`);
        this.renderer.addClass(this.avatar, SIZE_CLASSES[this.size]);
    }
}
AvatarComponent.decorators = [
    { type: Component, args: [{
                selector: 'kendo-avatar',
                template: `
        <ng-content *ngIf="customAvatar"></ng-content>

        <ng-container *ngIf="imageSrc">
            <div class="k-avatar-image" [ngStyle]="cssStyle" [style.backgroundImage]="imageUrl"></div>
        </ng-container>

        <ng-container *ngIf="initials">
            <span class="k-avatar-text" [ngStyle]="cssStyle">{{ initials.substring(0, 2) }}</span>
        </ng-container>

        <ng-container *ngIf="icon || iconClass">
            <span class="k-avatar-icon" [ngStyle]="cssStyle" [ngClass]="iconClasses()"></span>
        </ng-container>
    `
            },] },
];
/** @nocollapse */
AvatarComponent.ctorParameters = () => [
    { type: Renderer2 },
    { type: ElementRef }
];
AvatarComponent.propDecorators = {
    hostClass: [{ type: HostBinding, args: ['class.k-avatar',] }],
    solidClass: [{ type: HostBinding, args: ['class.k-avatar-solid',] }],
    outlineClass: [{ type: HostBinding, args: ['class.k-avatar-outline',] }],
    borderClass: [{ type: HostBinding, args: ['class.k-avatar-bordered',] }],
    flexBasis: [{ type: HostBinding, args: ['style.flexBasis',] }],
    shape: [{ type: Input }],
    size: [{ type: Input }],
    themeColor: [{ type: Input }],
    fill: [{ type: Input }],
    border: [{ type: Input }],
    iconClass: [{ type: Input }],
    width: [{ type: Input }],
    avatarWidth: [{ type: HostBinding, args: ['style.width',] }],
    height: [{ type: Input }],
    avatarHeight: [{ type: HostBinding, args: ['style.height',] }],
    cssStyle: [{ type: Input }],
    initials: [{ type: Input }],
    icon: [{ type: Input }],
    imageSrc: [{ type: Input }]
};

/**
 * Represents the [Kendo UI Card component for Angular]({% slug overview_card %})
 */
class CardComponent {
    constructor(localizationService) {
        this.localizationService = localizationService;
        this.hostClass = true;
        /**
         * Specifies the layout of the Card content.
         *
         * The possible values are:
         * * (Default) `vertical`
         * * `horizontal`
         *
         */
        this.orientation = 'vertical';
        /**
         * Defines the width of the Card.
         * Defaults to `285px`.
         */
        this.width = '285px';
        this.rtl = false;
        this.dynamicRTLSubscription = this.localizationService.changes.subscribe(({ rtl }) => {
            this.rtl = rtl;
            this.direction = this.rtl ? 'rtl' : 'ltr';
        });
    }
    get widthStyle() {
        return this.width;
    }
    get vertical() {
        return this.orientation === 'vertical';
    }
    get horizontal() {
        return this.orientation === 'horizontal';
    }
    ngOnDestroy() {
        if (this.dynamicRTLSubscription) {
            this.dynamicRTLSubscription.unsubscribe();
        }
    }
}
CardComponent.decorators = [
    { type: Component, args: [{
                selector: 'kendo-card',
                providers: [
                    LocalizationService,
                    {
                        provide: L10N_PREFIX,
                        useValue: 'kendo.card.component'
                    }
                ],
                template: `
        <ng-content></ng-content>
    `
            },] },
];
/** @nocollapse */
CardComponent.ctorParameters = () => [
    { type: LocalizationService }
];
CardComponent.propDecorators = {
    hostClass: [{ type: HostBinding, args: ['class.k-widget',] }, { type: HostBinding, args: ['class.k-card',] }],
    widthStyle: [{ type: HostBinding, args: ['style.width',] }],
    vertical: [{ type: HostBinding, args: ['class.k-card-vertical',] }],
    horizontal: [{ type: HostBinding, args: ['class.k-card-horizontal',] }],
    direction: [{ type: HostBinding, args: ['attr.dir',] }],
    orientation: [{ type: Input }],
    width: [{ type: Input }]
};

/**
 * Specifies the content in the Card header.
 */
class CardHeaderComponent {
    constructor() {
        this.hostClass = true;
    }
}
CardHeaderComponent.decorators = [
    { type: Component, args: [{
                selector: 'kendo-card-header',
                template: `
        <ng-content></ng-content>
    `
            },] },
];
CardHeaderComponent.propDecorators = {
    hostClass: [{ type: HostBinding, args: ['class.k-card-header',] }]
};

/**
 * Specifies the content in the Card body.
 */
class CardBodyComponent {
    constructor() {
        this.hostClass = true;
    }
}
CardBodyComponent.decorators = [
    { type: Component, args: [{
                selector: 'kendo-card-body',
                template: `
        <ng-content></ng-content>
    `
            },] },
];
CardBodyComponent.propDecorators = {
    hostClass: [{ type: HostBinding, args: ['class.k-card-body',] }]
};

/**
 * Specifies the content in the Card footer.
 */
class CardFooterComponent {
    constructor() {
        this.hostClass = true;
    }
}
CardFooterComponent.decorators = [
    { type: Component, args: [{
                selector: 'kendo-card-footer',
                template: `
        <ng-content></ng-content>
    `
            },] },
];
CardFooterComponent.propDecorators = {
    hostClass: [{ type: HostBinding, args: ['class.k-card-footer',] }]
};

/**
 * Specifies the action buttons of the Card.
 * * ([see example]({% slug actions_card %})).
 */
class CardActionsComponent {
    constructor() {
        this.hostClass = true;
        /**
         * Specifies the layout of the Card action buttons.
         *
         * * The possible values are:
         * * (Default) `horizontal`
         * * `vertical`
         *
         */
        this.orientation = 'horizontal';
        /**
         * Specifies the layout of the Card action buttons.
         *
         * The possible values are:
         * * (Default) `start`
         * * `center`
         * * `end`
         * * `stretched`
         *
         */
        this.layout = 'start';
        /**
         * Fires when the user clicks an action button.
         */
        this.action = new EventEmitter();
    }
    get stretchedClass() {
        return this.layout === 'stretched';
    }
    get startClass() {
        return this.layout === 'start';
    }
    get endClass() {
        return this.layout === 'end';
    }
    get centerClass() {
        return this.layout === 'center';
    }
    get verticalClass() {
        return this.orientation === 'vertical';
    }
    get horizontalClass() {
        return this.orientation === 'horizontal';
    }
    /**
     * @hidden
     */
    onClick(action) {
        this.action.emit(action);
    }
    /**
     * @hidden
     */
    actionTemplate() {
        return this.actions instanceof TemplateRef;
    }
}
CardActionsComponent.decorators = [
    { type: Component, args: [{
                selector: 'kendo-card-actions',
                template: `
        <ng-content *ngIf="!actions"></ng-content>

        <ng-container *ngIf="!actionTemplate()">
            <button type="button"
                class="k-button"
                [class.k-primary]="action.primary"
                [class.k-flat]="action.flat"
                (click)="onClick(action)"
                *ngFor="let action of actions"
            >
                {{ action.text }}
            </button>
        </ng-container>

        <ng-template [ngTemplateOutlet]="actions" *ngIf="actionTemplate()"></ng-template>
    `
            },] },
];
CardActionsComponent.propDecorators = {
    hostClass: [{ type: HostBinding, args: ['class.k-card-actions',] }],
    stretchedClass: [{ type: HostBinding, args: ['class.k-card-actions-stretched',] }],
    startClass: [{ type: HostBinding, args: ['class.k-card-actions-start',] }],
    endClass: [{ type: HostBinding, args: ['class.k-card-actions-end',] }],
    centerClass: [{ type: HostBinding, args: ['class.k-card-actions-center',] }],
    verticalClass: [{ type: HostBinding, args: ['class.k-card-actions-vertical',] }],
    horizontalClass: [{ type: HostBinding, args: ['class.k-card-actions-horizontal',] }],
    orientation: [{ type: Input }],
    layout: [{ type: Input }],
    actions: [{ type: Input }],
    action: [{ type: Output }]
};

/**
 * Specifies a separator in the content of the Card.
 */
class CardSeparatorDirective {
    constructor() {
        this.hostClass = true;
        /**
         * Specifies the orientation of the Card separator.
         *
         * The possible values are:
         * (Default) `horizontal`
         * `vertical`
         */
        this.orientation = 'horizontal';
    }
    get verticalClass() {
        return this.orientation === 'vertical';
    }
    get horizontalClass() {
        return this.orientation === 'horizontal';
    }
}
CardSeparatorDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kendoCardSeparator]'
            },] },
];
CardSeparatorDirective.propDecorators = {
    hostClass: [{ type: HostBinding, args: ['class.k-card-separator',] }],
    verticalClass: [{ type: HostBinding, args: ['class.k-separator-vertical',] }],
    horizontalClass: [{ type: HostBinding, args: ['class.k-separator-horizontal',] }],
    color: [{ type: HostBinding, args: ['style.color',] }, { type: Input }],
    orientation: [{ type: Input }]
};

/**
 * Specifies the text and styles for the title of the Card.
 */
class CardTitleDirective {
    constructor() {
        this.hostClass = true;
    }
}
CardTitleDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kendoCardTitle]'
            },] },
];
CardTitleDirective.propDecorators = {
    hostClass: [{ type: HostBinding, args: ['class.k-card-title',] }]
};

/**
 * Specifies the text and styles for the subtitle of the Card.
 */
class CardSubtitleDirective {
    constructor() {
        this.hostClass = true;
    }
}
CardSubtitleDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kendoCardSubtitle]'
            },] },
];
CardSubtitleDirective.propDecorators = {
    hostClass: [{ type: HostBinding, args: ['class.k-card-subtitle',] }]
};

/**
 * Specifies any media that will be displayed and aligned in the Card.
 */
class CardMediaDirective {
    constructor() {
        this.hostClass = true;
    }
}
CardMediaDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kendoCardMedia]'
            },] },
];
CardMediaDirective.propDecorators = {
    hostClass: [{ type: HostBinding, args: ['class.k-card-media',] }]
};

/**
 * The settings of the Card action buttons.
 */
class CardAction {
}

const exportedModules = [
    AvatarComponent
];
const declarations = [
    ...exportedModules
];
/**
 * Represents the [NgModule]({{ site.data.urls.angular['ngmoduleapi'] }})
 * definition for the Avatar component.
 */
class AvatarModule {
}
AvatarModule.decorators = [
    { type: NgModule, args: [{
                declarations: [declarations],
                exports: [exportedModules],
                imports: [CommonModule]
            },] },
];

const cardDirectives = [
    CardTitleDirective,
    CardSubtitleDirective,
    CardSeparatorDirective,
    CardMediaDirective
];
const exportedModules$1 = [
    CardComponent,
    CardHeaderComponent,
    CardBodyComponent,
    CardFooterComponent,
    CardActionsComponent,
    ...cardDirectives
];
const declarations$1 = [...exportedModules$1];
/**
 * Represents the [NgModule]({{ site.data.urls.angular['ngmoduleapi'] }})
 * definition for the Card component.
 */
class CardModule {
}
CardModule.decorators = [
    { type: NgModule, args: [{
                declarations: [declarations$1],
                exports: [exportedModules$1],
                imports: [CommonModule]
            },] },
];

/**
 * @hidden
 */
const DRAWER_LINK_SELECTOR = '.k-drawer-link';
/**
 * @hidden
 */
const ACTIVE_NESTED_LINK_SELECTOR = ':focus:not(.k-state-disabled) .k-drawer-link';
/**
 * @hidden
 */
const nestedLink = (element, selector) => element.querySelector(selector);

/**
 * @hidden
 */
class DrawerItemComponent {
    constructor(drawer, element, renderer) {
        this.drawer = drawer;
        this.element = element;
        this.renderer = renderer;
    }
    get disabledClass() {
        return this.item.disabled;
    }
    get selectedClass() {
        return this.drawer.selectedIndices.indexOf(this.index) >= 0;
    }
    get label() {
        return this.item.text ? this.item.text : null;
    }
    /**
     * @hidden
     */
    ngAfterViewInit() {
        const link = nestedLink(this.element.nativeElement, DRAWER_LINK_SELECTOR);
        if (link) {
            this.renderer.removeAttribute(link, 'tabindex');
        }
    }
    /**
     * @hidden
     */
    iconClasses(icon) {
        return `k-icon ${icon}`;
    }
}
DrawerItemComponent.decorators = [
    { type: Component, args: [{
                selector: '[kendoDrawerItem]',
                template: `
        <ng-template *ngIf="itemTemplate; else defaultTemplate"
            [ngTemplateOutlet]="itemTemplate"
            [ngTemplateOutletContext]="{ $implicit: item }">
        </ng-template>

        <ng-template #defaultTemplate>
            <ng-container *ngIf="expanded">
                <span [ngClass]="iconClasses(item.icon)"></span>
                <span class="k-item-text">{{ item.text }}</span>
            </ng-container>
            <ng-container *ngIf="mini && !expanded">
                <span [ngClass]="iconClasses(item.icon)"></span>
            </ng-container>
        </ng-template>
    `
            },] },
];
/** @nocollapse */
DrawerItemComponent.ctorParameters = () => [
    { type: DrawerService },
    { type: ElementRef },
    { type: Renderer2 }
];
DrawerItemComponent.propDecorators = {
    item: [{ type: Input }],
    index: [{ type: Input }],
    itemTemplate: [{ type: Input }],
    mini: [{ type: Input }],
    expanded: [{ type: Input }],
    disabled: [{ type: Input }],
    cssClass: [{ type: Input }],
    cssStyle: [{ type: Input }],
    disabledClass: [{ type: HostBinding, args: ['attr.aria-disabled',] }, { type: HostBinding, args: ['class.k-state-disabled',] }],
    selectedClass: [{ type: HostBinding, args: ['attr.aria-selected',] }, { type: HostBinding, args: ['class.k-state-selected',] }],
    label: [{ type: HostBinding, args: ['attr.aria-label',] }]
};

/**
 * @hidden
 */
const DRAWER_ITEM_INDEX = 'data-kendo-drawer-index';

/**
 * @hidden
 */
class DrawerListComponent {
    constructor(drawerService, renderer, ngZone, changeDetector, element) {
        this.drawerService = drawerService;
        this.renderer = renderer;
        this.ngZone = ngZone;
        this.changeDetector = changeDetector;
        this.element = element;
        this.subscriptions = new Subscription();
    }
    ngOnInit() {
        this.initialSelection();
        this.initDomEvents();
    }
    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }
    initialSelection() {
        /* Differentiates a user selected item */
        if (this.drawerService.selectedIndices.length === 0) {
            this.drawerService.initSelection();
        }
    }
    initDomEvents() {
        if (!this.element) {
            return;
        }
        this.ngZone.runOutsideAngular(() => {
            const nativeElement = this.element.nativeElement;
            this.subscriptions.add(this.renderer.listen(nativeElement, 'click', this.clickHandler.bind(this)));
            this.subscriptions.add(this.renderer.listen(nativeElement, 'keydown', this.keyDownHandler.bind(this)));
        });
    }
    clickHandler(e) {
        const itemIdx = this.getDrawerItemIndex(e.target);
        const item = this.items[itemIdx];
        if (!item) {
            return;
        }
        if (item.disabled) {
            e.preventDefault();
            return;
        }
        const args = {
            index: itemIdx,
            item: item,
            originalEvent: e
        };
        this.ngZone.run(() => {
            if (!this.drawerService.emit('select', args)) {
                this.drawerService.onSelect(itemIdx);
                this.changeDetector.detectChanges();
            }
        });
    }
    keyDownHandler(e) {
        const isEnterOrSpace = e.keyCode === Keys.Enter || e.keyCode === Keys.Space;
        if (!isEnterOrSpace) {
            return;
        }
        this.clickHandler(e);
        const link = nestedLink(this.element.nativeElement, ACTIVE_NESTED_LINK_SELECTOR);
        if (link) {
            link.click();
        }
        return false;
    }
    getDrawerItemIndex(target) {
        const item = closestItem(target, DRAWER_ITEM_INDEX, this.element.nativeElement);
        if (item) {
            return itemIndex(item, DRAWER_ITEM_INDEX);
        }
    }
}
DrawerListComponent.decorators = [
    { type: Component, args: [{
                selector: '[kendoDrawerList]',
                template: `
        <ng-container *ngFor="let item of items; let idx = index">
            <li *ngIf="!item.separator" kendoDrawerItem
                class="k-drawer-item"
                [item]="item"
                [index]="idx"
                [mini]="mini"
                [expanded]="expanded"
                [itemTemplate]="itemTemplate"
                [attr.${DRAWER_ITEM_INDEX}]="idx"
                [ngClass]="item.cssClass"
                [ngStyle]="item.cssStyle"
                tabindex="0">
            </li>

            <li *ngIf="item.separator"
                class="k-drawer-item k-drawer-separator"
                [ngClass]="item.cssClass"
                [ngStyle]="item.cssStyle">
                &nbsp;
            </li>
        </ng-container>
    `
            },] },
];
/** @nocollapse */
DrawerListComponent.ctorParameters = () => [
    { type: DrawerService },
    { type: Renderer2 },
    { type: NgZone },
    { type: ChangeDetectorRef },
    { type: ElementRef }
];
DrawerListComponent.propDecorators = {
    items: [{ type: Input }],
    itemTemplate: [{ type: Input }],
    mini: [{ type: Input }],
    expanded: [{ type: Input }]
};

const templateDirectives = [
    DrawerTemplateDirective,
    DrawerHeaderTemplateDirective,
    DrawerFooterTemplateDirective,
    DrawerItemTemplateDirective
];
const exportedModules$2 = [
    DrawerComponent,
    DrawerContainerComponent,
    DrawerContentComponent,
    ...templateDirectives
];
const declarations$2 = [
    DrawerItemComponent,
    DrawerListComponent,
    ...exportedModules$2
];
/**
 * Represents the [NgModule]({{ site.data.urls.angular['ngmoduleapi'] }})
 * definition for the Drawer component.
 */
class DrawerModule {
}
DrawerModule.decorators = [
    { type: NgModule, args: [{
                declarations: [declarations$2],
                exports: [exportedModules$2],
                imports: [CommonModule]
            },] },
];

const exportedModules$3 = [
    PanelBarComponent,
    PanelBarItemComponent,
    PanelBarContentDirective,
    PanelBarItemTemplateDirective,
    PanelBarItemTitleDirective
];
const declarations$3 = [
    ...exportedModules$3
];
/**
 * Represents the [NgModule]({{ site.data.urls.angular['ngmoduleapi'] }})
 * definition for the PanelBar component.
 *
 * The module registers:
 * - `PanelBarComponent`&mdash;The `PanelBar` component class.
 * - `PanelBarItemComponent`&mdash;The `PanelBarItem` component class.
 * - `PanelBarContentComponent`&mdash;The `PanelBarContent` component class.
 * - `PanelBarItemTemplateDirective&mdash;The `PanelBarItemTemplate` directive.
 * - `PanelBarItemTitleDirective&mdash;The `PanelBarItemTitle` directive.
 */
class PanelBarModule {
}
PanelBarModule.decorators = [
    { type: NgModule, args: [{
                declarations: [declarations$3],
                exports: [exportedModules$3],
                imports: [CommonModule]
            },] },
];

const stopPropagation = ({ originalEvent: event }) => {
    event.stopPropagation();
    event.preventDefault();
};
const preventOnDblClick = release => mouseDown => of(mouseDown).pipe(delay(150), takeUntil(release));
const classFromObject = classes => Object.keys(classes).filter(c => classes[c]).join(' ');
const createMoveStream = (draggable) => mouseDown => draggable.kendoDrag
    .pipe(takeUntil(draggable.kendoRelease), map(({ pageX, pageY }) => ({
    originalX: mouseDown.pageX,
    originalY: mouseDown.pageY,
    pageX,
    pageY
})));
/**
 * @hidden
 */
class SplitterBarComponent {
    constructor(draggable, splitter, localization) {
        this.draggable = draggable;
        this.splitter = splitter;
        this.localization = localization;
        this.orientation = 'horizontal';
        this.index = 0;
        this.ariaRole = 'separator';
        this.focused = false;
        this.subscriptions = new Subscription();
    }
    get direction() {
        return this.localization.rtl ? 'rtl' : 'ltr';
    }
    get tabIndex() {
        return this.splitter.isStatic(this.index) ? -1 : 0;
    }
    get hostClasses() {
        const isHorizontal = this.orientation === 'horizontal';
        const isDraggable = this.splitter.isDraggable(this.index);
        const isStatic = this.splitter.isStatic(this.index);
        return classFromObject({
            'k-state-focused': this.focused,
            'k-splitbar': true,
            'k-splitbar-horizontal': isHorizontal,
            'k-splitbar-vertical': !isHorizontal,
            'k-splitbar-draggable-horizontal': isHorizontal && isDraggable,
            'k-splitbar-draggable-vertical': !isHorizontal && isDraggable,
            'k-splitbar-static-horizontal': isHorizontal && isStatic,
            'k-splitbar-static-vertical': !isHorizontal && isStatic
        });
    }
    get touchAction() {
        if (this.splitter.isDraggable(this.index)) {
            return 'none';
        }
    }
    get order() {
        return 2 * this.index + 1;
    }
    collapseAny() {
        if (this.expandLast) {
            this.toggleNext();
        }
        else {
            this.tryToggleNearest();
        }
    }
    onFocusIn() {
        this.focused = true;
    }
    onFocusOut() {
        this.focused = false;
    }
    onKeyDown(event) {
        const keyCode = event && event.keyCode;
        const isHorizontal = this.orientation === 'horizontal';
        const resize = delta => {
            event.preventDefault();
            const state$$1 = this.splitter.dragState(this.index);
            this.splitter.setSize(state$$1, delta);
        };
        if (keyCode === Keys.Enter) {
            event.preventDefault();
            this.collapseAny();
        }
        else if (isHorizontal && keyCode === Keys.ArrowLeft) {
            resize(-10);
        }
        else if (isHorizontal && keyCode === Keys.ArrowRight) {
            resize(10);
        }
        else if (!isHorizontal && keyCode === Keys.ArrowUp) {
            resize(-10);
        }
        else if (!isHorizontal && keyCode === Keys.ArrowDown) {
            resize(10);
        }
    }
    get expandLast() {
        const panes = this.splitter.panes;
        return panes.length === 2 && panes[1].collapsed;
    }
    ngOnInit() {
        let state$$1;
        const listener = this.draggable.kendoPress.pipe(tap(stopPropagation), filter(() => this.splitter.isDraggable(this.index)), tap(() => state$$1 = this.splitter.dragState(this.index)), tap(() => this.splitter.toggleContentOverlay(this.index, true)), switchMap(preventOnDblClick(this.draggable.kendoRelease)), switchMap(createMoveStream(this.draggable))).subscribe(({ pageX, pageY, originalX, originalY }) => {
            let delta;
            if (this.orientation === 'vertical') {
                delta = pageY - originalY;
            }
            else if (this.direction === 'rtl') {
                delta = originalX - pageX;
            }
            else {
                delta = pageX - originalX;
            }
            this.splitter.setSize(state$$1, delta);
        });
        this.subscriptions.add(listener);
        this.subscriptions.add(this.draggable.kendoRelease.subscribe(() => this.splitter.toggleContentOverlay(this.index, false)));
    }
    ngOnDestroy() {
        if (this.subscriptions) {
            this.subscriptions.unsubscribe();
        }
    }
    togglePrevious() {
        this.splitter.tryToggle(this.index);
    }
    toggleNext() {
        this.splitter.tryToggle(this.index + 1);
    }
    previousArrowClass() {
        const pane = this.splitter.pane(this.index);
        const nextPane = this.splitter.pane(this.index + 1);
        const isCollapsible = pane.collapsible;
        const isCollapsed = pane.collapsed;
        const isHorizontal = this.orientation === 'horizontal';
        return classFromObject({
            'k-icon': true,
            'k-hidden': !isCollapsible || nextPane.isHidden,
            'k-collapse-prev': isCollapsible,
            'k-i-arrow-60-left': isCollapsible && isHorizontal && !isCollapsed,
            'k-i-arrow-60-right': isCollapsible && isHorizontal && isCollapsed,
            'k-i-arrow-60-up': isCollapsible && !isHorizontal && !isCollapsed,
            'k-i-arrow-60-down': isCollapsible && !isHorizontal && isCollapsed
        });
    }
    nextArrowClass() {
        const pane = this.splitter.pane(this.index + 1);
        const prevPane = this.splitter.pane(this.index);
        const isCollapsible = pane.collapsible;
        const isCollapsed = pane.collapsed;
        const isHorizontal = this.orientation === 'horizontal';
        return classFromObject({
            'k-icon': true,
            'k-hidden': !isCollapsible || prevPane.isHidden,
            'k-collapse-next': isCollapsible,
            'k-i-arrow-60-right': isCollapsible && isHorizontal && !isCollapsed,
            'k-i-arrow-60-left': isCollapsible && isHorizontal && isCollapsed,
            'k-i-arrow-60-down': isCollapsible && !isHorizontal && !isCollapsed,
            'k-i-arrow-60-up': isCollapsible && !isHorizontal && isCollapsed
        });
    }
    tryToggleNearest() {
        const prev = this.index;
        const next = this.index + 1;
        if (!this.splitter.tryToggle(prev)) {
            this.splitter.tryToggle(next);
        }
    }
}
SplitterBarComponent.decorators = [
    { type: Component, args: [{
                selector: 'kendo-splitter-bar',
                template: `
      <div [class]="previousArrowClass()" (click)="togglePrevious()"></div>
      <div class="k-resize-handle"></div>
      <div [class]="nextArrowClass()" (click)="toggleNext()"></div>
    `
            },] },
];
/** @nocollapse */
SplitterBarComponent.ctorParameters = () => [
    { type: DraggableDirective, decorators: [{ type: Host }] },
    { type: SplitterService },
    { type: LocalizationService }
];
SplitterBarComponent.propDecorators = {
    orientation: [{ type: Input }, { type: HostBinding, args: ['attr.aria-orientation',] }],
    index: [{ type: Input }],
    ariaRole: [{ type: HostBinding, args: ['attr.role',] }],
    focused: [{ type: HostBinding, args: ['class.k-state-focused',] }],
    tabIndex: [{ type: HostBinding, args: ['attr.tabindex',] }],
    hostClasses: [{ type: HostBinding, args: ['class',] }],
    touchAction: [{ type: HostBinding, args: ['style.touch-action',] }],
    order: [{ type: HostBinding, args: ['style.-ms-flex-order',] }, { type: HostBinding, args: ['style.order',] }],
    collapseAny: [{ type: HostListener, args: ['dblclick',] }],
    onFocusIn: [{ type: HostListener, args: ['focusin',] }],
    onFocusOut: [{ type: HostListener, args: ['focusout',] }],
    onKeyDown: [{ type: HostListener, args: ['keydown', ['$event'],] }]
};

const exportedModules$4 = [
    SplitterComponent,
    SplitterPaneComponent
];
const declarations$4 = [
    SplitterBarComponent,
    ...exportedModules$4
];
/**
 * Represents the [NgModule]({{ site.data.urls.angular['ngmoduleapi'] }})
 * definition for the Splitter component.
 *
 * The module registers:
 * - `SplitterComponent`&mdash;The `Splitter` component class.
 * - `SplitterPaneComponent`&mdash;The `SplitterPane` component class.
 */
class SplitterModule {
}
SplitterModule.decorators = [
    { type: NgModule, args: [{
                declarations: [declarations$4],
                exports: [exportedModules$4],
                imports: [
                    CommonModule,
                    DraggableModule
                ]
            },] },
];

/**
 * @hidden
 */
class StepperStepComponent {
    constructor(service, localization, ngZone) {
        this.service = service;
        this.localization = localization;
        this.ngZone = ngZone;
        this.isStepValid = undefined;
        this.shouldCheckValidity = undefined;
        this.subs = this.service.focusedStepChange.subscribe(() => {
            this.onFocusedStepChange();
        });
        this.subs.add(this.service.triggerValidation.subscribe(() => {
            this.handleValidityChecks();
        }));
    }
    get errorStepClass() {
        if (isPresent(this.isStepValid)) {
            return !this.isStepValid;
        }
        return false;
    }
    get successStepClass() {
        if (isPresent(this.isStepValid)) {
            return this.isStepValid;
        }
        return false;
    }
    ngOnInit() {
        this.handleValidityChecks();
    }
    ngOnChanges(changes) {
        if (changes.current && !changes.current.firstChange) {
            this.handleValidityChecks();
        }
    }
    ngOnDestroy() {
        if (this.subs) {
            this.subs.unsubscribe();
        }
    }
    onFocusedStepChange() {
        this.ngZone.runOutsideAngular(() => {
            if (this.index === this.service.focusedStep) {
                this.stepLink.nativeElement.focus();
            }
        });
    }
    onFocus() {
        this.service.focus(this.index);
    }
    get tabIndexAttr() {
        const active = this.service.focusedStep || this.service.currentStep;
        return this.index === active ? 0 : -1;
    }
    get indicatorIconClasses() {
        if (this.step.icon) {
            return `k-icon k-i-${this.step.icon}`;
        }
        if (this.step.iconClass) {
            return `${this.step.iconClass}`;
        }
        if (this.shouldCheckValidity) {
            return this.validationIconClasses;
        }
    }
    get showIndicatorIcon() {
        if (this.shouldCheckValidity) {
            return true;
        }
        if (this.step.icon || this.step.iconClass) {
            return true;
        }
        return false;
    }
    get showLabelIcon() {
        if (this.shouldCheckValidity) {
            if (this.type === 'label') {
                return true;
            }
            if (this.step.icon || this.step.iconClass) {
                return true;
            }
        }
        return false;
    }
    get showLabelText() {
        return this.type === 'label' || this.type === 'full';
    }
    get validationIconClasses() {
        if (this.isStepValid) {
            return this.successIcon ? `${this.successIcon}` : 'k-icon k-i-check';
        }
        else {
            return this.errorIcon ? `${this.errorIcon}` : 'k-icon k-i-warning';
        }
    }
    get indicatorText() {
        const text = this.step.text;
        return text ? text : this.index + 1;
    }
    updateStepValidity() {
        if (typeof this.step.isValid === 'boolean') {
            return this.step.isValid;
        }
        if (typeof this.step.isValid === 'function') {
            return this.step.isValid(this.index);
        }
        return undefined;
    }
    get showIndicator() {
        return this.type === 'indicator' || this.type === 'full';
    }
    get showLabel() {
        if (this.type === 'label' || this.type === 'full') {
            return true;
        }
        return this.step.optional;
    }
    get optionalText() {
        return this.localization.get('optional');
    }
    get transitionDuration() {
        return this.service.owner.animationDuration;
    }
    _shouldCheckValidity() {
        if (isPresent(this.step.validate)) {
            if (typeof this.step.validate === 'boolean') {
                return this.step.validate;
            }
            if (typeof this.step.validate === 'function') {
                return this.step.validate(this.index);
            }
        }
        return isPresent(this.step.isValid) && this.index < this.current;
    }
    handleValidityChecks() {
        this.isStepValid = undefined;
        this.shouldCheckValidity = this._shouldCheckValidity();
        if (this.shouldCheckValidity) {
            this.isStepValid = this.updateStepValidity();
        }
    }
}
StepperStepComponent.decorators = [
    { type: Component, args: [{
                selector: '[kendoStepperStep]',
                template: `
        <a href='#' class='k-step-link' #stepLink
            [attr.tabindex]='tabIndexAttr'
            [attr.title]='step.label'
            [attr.aria-disabled]='step.disabled'
            [attr.aria-current]='index === current ? "step" : null'
            (focus)='onFocus()'
        >
            <ng-template *ngIf='stepTemplate'
                [ngTemplateOutlet]='stepTemplate'
                [ngTemplateOutletContext]='{ $implicit: step, index: index }'>
            </ng-template>

            <ng-container *ngIf='!stepTemplate'>
                <span *ngIf='showIndicator'
                    class='k-step-indicator'
                    aria-hidden='true'
                    [style.transition-duration.ms]='transitionDuration'
                >
                    <ng-template *ngIf='indicatorTemplate'
                        [ngTemplateOutlet]='indicatorTemplate'
                        [ngTemplateOutletContext]='{ $implicit: step, index: index }'>
                    </ng-template>

                    <ng-container *ngIf='!indicatorTemplate'>
                        <span *ngIf='showIndicatorIcon' class='k-step-indicator-icon' [ngClass]='indicatorIconClasses'></span>
                        <span class='k-step-indicator-text' *ngIf='!showIndicatorIcon'>{{ indicatorText }}</span>
                    </ng-container>
                </span>

                <span class='k-step-label' *ngIf='showLabel'>
                    <ng-template *ngIf='labelTemplate'
                        [ngTemplateOutlet]='labelTemplate'
                        [ngTemplateOutletContext]='{ $implicit: step, index: index }'>
                    </ng-template>

                    <ng-container *ngIf='!labelTemplate'>
                        <span class='k-step-text' *ngIf='showLabelText'>{{ step.label }}</span>
                        <span [ngClass]='validationIconClasses' *ngIf='showLabelIcon' aria-hidden='true'></span>
                        <span class='k-step-label-optional' *ngIf='step.optional'>({{optionalText}})</span>
                    </ng-container>
                </span>
            </ng-container>
        </a>
    `
            },] },
];
/** @nocollapse */
StepperStepComponent.ctorParameters = () => [
    { type: StepperService },
    { type: LocalizationService },
    { type: NgZone }
];
StepperStepComponent.propDecorators = {
    step: [{ type: Input }],
    index: [{ type: Input }],
    current: [{ type: Input }],
    type: [{ type: Input }],
    successIcon: [{ type: Input }],
    errorIcon: [{ type: Input }],
    indicatorTemplate: [{ type: Input }],
    labelTemplate: [{ type: Input }],
    stepTemplate: [{ type: Input }],
    stepLink: [{ type: ViewChild, args: ['stepLink', { static: true },] }],
    errorStepClass: [{ type: HostBinding, args: ['class.k-step-error',] }],
    successStepClass: [{ type: HostBinding, args: ['class.k-step-success',] }]
};

/**
 * @hidden
 */
const STEPPER_STEP_INDEX = 'data-kendo-stepper-index';

/**
 * @hidden
 */
class StepperListComponent {
    constructor(renderer, ngZone, service, element) {
        this.renderer = renderer;
        this.ngZone = ngZone;
        this.service = service;
        this.element = element;
    }
    ngOnInit() {
        this.initDomEvents();
    }
    ngOnDestroy() {
        if (this.domSubs) {
            this.domSubs();
        }
    }
    get maxStepWidth() {
        return this.maxStepDimension('width');
    }
    get maxStepHeight() {
        return this.maxStepDimension('height');
    }
    maxStepDimension(dimension) {
        if (dimension === 'width' && this.orientation === 'vertical') {
            return null;
        }
        if (dimension === 'height' && this.orientation === 'horizontal') {
            return null;
        }
        return 100 / this.steps.length;
    }
    initDomEvents() {
        if (!this.element) {
            return;
        }
        this.ngZone.runOutsideAngular(() => {
            const nativeElement = this.element.nativeElement;
            const clickSubscription = this.renderer.listen(nativeElement, 'click', this.clickHandler.bind(this));
            const keydownSubscription = this.renderer.listen(nativeElement, 'keydown', (e) => {
                if (hasClass(e.target, 'k-step-link')) {
                    this.service.keydown(e);
                }
            });
            this.domSubs = () => {
                clickSubscription();
                keydownSubscription();
            };
        });
    }
    clickHandler(e) {
        e.preventDefault();
        const stepIdx = this.getStepIndex(e.target);
        const step = this.steps[stepIdx];
        if (!step || step.disabled) {
            return;
        }
        if (stepIdx === this.currentStep) {
            this.service.focus(stepIdx);
            return;
        }
        if (this.linear && this.service.isPrevOrNextStep(stepIdx) === false) {
            return;
        }
        this.service.onActivate(stepIdx, e);
    }
    getStepIndex(target) {
        const step = closestItem(target, STEPPER_STEP_INDEX, this.element.nativeElement);
        if (step) {
            return itemIndex(step, STEPPER_STEP_INDEX);
        }
    }
}
StepperListComponent.decorators = [
    { type: Component, args: [{
                selector: '[kendoStepperList]',
                template: `
        <ng-container *ngFor='let step of steps; let idx = index'>
            <li kendoStepperStep
                [attr.${STEPPER_STEP_INDEX}]='idx'
                [type]='stepType'
                [step]='step'
                [index]='idx'
                [current]='currentStep'
                [successIcon]='successIcon'
                [errorIcon]='errorIcon'
                [indicatorTemplate]='indicatorTemplate'
                [labelTemplate]='labelTemplate'
                [stepTemplate]='stepTemplate'
                class='k-step'
                [class.k-step-first]='idx === 0'
                [class.k-step-last]='idx === steps.length - 1'
                [class.k-step-done]='idx < currentStep'
                [class.k-step-current]='idx === currentStep'
                [class.k-step-optional]='step.optional'
                [class.k-step-disabled]='step.disabled'
                [ngClass]='step.cssClass'
                [ngStyle]='step.cssStyle'
                [style.max-width.%] = 'maxStepWidth'
                [style.max-height.%] = 'maxStepHeight'
            >
            </li>
        </ng-container>
    `
            },] },
];
/** @nocollapse */
StepperListComponent.ctorParameters = () => [
    { type: Renderer2 },
    { type: NgZone },
    { type: StepperService },
    { type: ElementRef }
];
StepperListComponent.propDecorators = {
    linear: [{ type: Input }],
    stepType: [{ type: Input }],
    orientation: [{ type: Input }],
    currentStep: [{ type: Input }],
    steps: [{ type: Input }],
    successIcon: [{ type: Input }],
    errorIcon: [{ type: Input }],
    indicatorTemplate: [{ type: Input }],
    labelTemplate: [{ type: Input }],
    stepTemplate: [{ type: Input }]
};

/**
 * @hidden
 */
class Messages extends ComponentMessages {
}
Messages.propDecorators = {
    optional: [{ type: Input }]
};

/**
 * @hidden
 */
class LocalizedMessagesDirective extends Messages {
    constructor(service) {
        super();
        this.service = service;
    }
}
LocalizedMessagesDirective.decorators = [
    { type: Directive, args: [{
                providers: [
                    {
                        provide: Messages,
                        useExisting: forwardRef(() => LocalizedMessagesDirective)
                    }
                ],
                selector: `
      [kendoStepperLocalizedMessages]
    `
            },] },
];
/** @nocollapse */
LocalizedMessagesDirective.ctorParameters = () => [
    { type: LocalizationService }
];

/**
 * Custom component messages override default component messages
 * ([see example]({% slug rtl_layout %})).
 */
class CustomMessagesComponent extends Messages {
    constructor(service) {
        super();
        this.service = service;
    }
    get override() {
        return true;
    }
}
CustomMessagesComponent.decorators = [
    { type: Component, args: [{
                providers: [
                    {
                        provide: Messages,
                        useExisting: forwardRef(() => CustomMessagesComponent)
                    }
                ],
                selector: 'kendo-stepper-messages',
                template: ``
            },] },
];
/** @nocollapse */
CustomMessagesComponent.ctorParameters = () => [
    { type: LocalizationService }
];

const templateDirectives$1 = [
    StepperStepTemplateDirective,
    StepperLabelTemplateDirective,
    StepperIndicatorTemplateDirective
];
const exportedModules$5 = [
    StepperComponent,
    CustomMessagesComponent,
    ...templateDirectives$1
];
const declarations$5 = [
    StepperStepComponent,
    StepperListComponent,
    LocalizedMessagesDirective,
    ...exportedModules$5
];
/**
 * Represents the [NgModule]({{ site.data.urls.angular['ngmoduleapi'] }})
 * definition for the Stepper component.
 */
class StepperModule {
}
StepperModule.decorators = [
    { type: NgModule, args: [{
                declarations: [declarations$5],
                exports: [exportedModules$5],
                imports: [CommonModule, ProgressBarModule]
            },] },
];

const exportedModules$6 = [
    TabStripComponent,
    TabStripTabComponent,
    TabContentDirective,
    TabTitleDirective
];
const declarations$6 = [
    ...exportedModules$6
];
/**
 * Represents the [NgModule]({{ site.data.urls.angular['ngmoduleapi'] }})
 * definition for the TabStrip component.
 *
 * The module registers:
 * - `TabStripComponent`&mdash;The `TabStrip` component class.
 * - `TabStripTabComponent`&mdash;The `TabStripTab` component class.
 * - `TabContentDirective`&mdash;The tab content directive used on the `<ng-template>` tag.
 * - `TabTitleDirective`&mdash;The tab title directive used on the `<ng-template>` tag.
 */
class TabStripModule {
}
TabStripModule.decorators = [
    { type: NgModule, args: [{
                declarations: [declarations$6],
                exports: [exportedModules$6],
                imports: [CommonModule]
            },] },
];

/**
 * Represents the [NgModule]({{ site.data.urls.angular['ngmoduleapi'] }})
 * definition for the Layout components.
 *
 * @example
 *
 * ```ts-no-run
 * // Import the Layout module
 * import { LayoutModule } from '@progress/kendo-angular-layout';
 *
 * // The browser platform with a compiler
 * import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
 *
 * import { NgModule } from '@angular/core';
 *
 * // Import the app component
 * import { AppComponent } from './app.component';
 *
 * // Define the app module
 * _@NgModule({
 *     declarations: [AppComponent], // declare app component
 *     imports:      [BrowserModule, LayoutModule], // import Layout module
 *     bootstrap:    [AppComponent]
 * })
 * export class AppModule {}
 *
 * // Compile and launch the module
 * platformBrowserDynamic().bootstrapModule(AppModule);
 *
 * ```
 */
class LayoutModule {
}
LayoutModule.decorators = [
    { type: NgModule, args: [{
                exports: [
                    AvatarModule,
                    CardModule,
                    DrawerModule,
                    PanelBarModule,
                    SplitterModule,
                    StepperModule,
                    TabStripModule
                ]
            },] },
];

/**
 * Generated bundle index. Do not edit.
 */

export { PreventableEvent, DrawerService, DrawerItemComponent, DrawerListComponent, DRAWER_ITEM_INDEX, CustomMessagesComponent, LocalizedMessagesDirective, Messages, PanelBarService, SplitterBarComponent, SplitterService, StepperListComponent, STEPPER_STEP_INDEX, StepperStepComponent, StepperService, PanelBarComponent, PanelBarItemComponent, PanelBarContentDirective, PanelBarItemTemplateDirective, PanelBarItemTitleDirective, PanelBarExpandMode, SplitterComponent, SplitterPaneComponent, TabStripComponent, TabStripTabComponent, TabContentDirective, TabTitleDirective, SelectEvent, DrawerComponent, DrawerContainerComponent, DrawerContentComponent, DrawerSelectEvent, StepperComponent, StepperActivateEvent, AvatarComponent, CardComponent, CardHeaderComponent, CardBodyComponent, CardFooterComponent, CardActionsComponent, CardSeparatorDirective, CardTitleDirective, CardSubtitleDirective, CardMediaDirective, CardAction, AvatarModule, CardModule, DrawerModule, LayoutModule, PanelBarModule, SplitterModule, StepperModule, TabStripModule, DrawerTemplateDirective, DrawerItemTemplateDirective, DrawerHeaderTemplateDirective, DrawerFooterTemplateDirective, StepperIndicatorTemplateDirective, StepperLabelTemplateDirective, StepperStepTemplateDirective };
