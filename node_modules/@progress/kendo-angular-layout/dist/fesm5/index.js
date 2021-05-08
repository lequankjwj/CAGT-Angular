/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Injectable, Directive, TemplateRef, Optional, isDevMode, Component, SkipSelf, Host, ElementRef, Input, ViewChild, HostBinding, ViewChildren, ContentChildren, Output, ContentChild, HostListener, EventEmitter, Renderer2, ChangeDetectorRef, NgZone, Inject, QueryList, ViewEncapsulation, NgModule, forwardRef } from '@angular/core';
import { LocalizationService, L10N_PREFIX, ComponentMessages } from '@progress/kendo-angular-l10n';
import { Keys, hasObservers, DraggableDirective, DraggableModule } from '@progress/kendo-angular-common';
import { trigger, state, style, transition, animate, AUTO_STYLE, AnimationBuilder } from '@angular/animations';
import { Subject, BehaviorSubject, Subscription, of } from 'rxjs';
import { __extends, __assign } from 'tslib';
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
var nextPanelbarId = 0;
/**
 * @hidden
 */
var PanelBarService = /** @class */ (function () {
    function PanelBarService() {
        this.parentSource = new Subject();
        this.keepContentSource = new BehaviorSubject(false);
        this.childSource = new Subject();
        this.parent$ = this.parentSource.asObservable();
        this.children$ = this.childSource.asObservable();
        this.keepContent$ = this.keepContentSource.asObservable();
        this.pbId = nextPanelbarId++;
    }
    PanelBarService.prototype.onKeepContent = function (keepContent) {
        this.keepContentSource.next(keepContent);
    };
    PanelBarService.prototype.onSelect = function (event) {
        this.childSource.next(event);
    };
    PanelBarService.prototype.onFocus = function () {
        this.parentSource.next(true);
    };
    PanelBarService.prototype.onBlur = function () {
        this.parentSource.next(false);
    };
    PanelBarService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    PanelBarService.ctorParameters = function () { return []; };
    return PanelBarService;
}());

/**
 * Represents the content template of the declaratively initialized PanelBar items.
 * The content can be expanded or collapsed through the item.
 */
var PanelBarContentDirective = /** @class */ (function () {
    function PanelBarContentDirective(templateRef) {
        this.templateRef = templateRef;
    }
    PanelBarContentDirective.decorators = [
        { type: Directive, args: [{
                    selector: "[kendoPanelBarContent]"
                },] },
    ];
    /** @nocollapse */
    PanelBarContentDirective.ctorParameters = function () { return [
        { type: TemplateRef }
    ]; };
    return PanelBarContentDirective;
}());

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
var PanelBarItemTitleDirective = /** @class */ (function () {
    function PanelBarItemTitleDirective(templateRef) {
        this.templateRef = templateRef;
    }
    PanelBarItemTitleDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[kendoPanelBarItemTitle]'
                },] },
    ];
    /** @nocollapse */
    PanelBarItemTitleDirective.ctorParameters = function () { return [
        { type: TemplateRef, decorators: [{ type: Optional }] }
    ]; };
    return PanelBarItemTitleDirective;
}());

var nextId = 0;
var parsePanelBarItems = function (data) {
    return data.map(function (item) {
        if (!item.id) {
            item.id = "default-" + nextId++;
        }
        if (item.children) {
            item.children = parsePanelBarItems(item.children);
        }
        return item;
    });
};
var util = {
    parsePanelBarItems: parsePanelBarItems
};
/**
 * @hidden
 */
var isPresent = function (value) { return value !== null && value !== undefined; };

var focusableRegex = /^(?:a|input|select|option|textarea|button|object)$/i;
var toClassList = function (classNames) { return String(classNames).trim().split(' '); };
/**
 * @hidden
 */
var isFocusable = function (element) {
    if (element.tagName) {
        var tagName = element.tagName.toLowerCase();
        var tabIndex = element.getAttribute('tabIndex');
        var skipTab = tabIndex === '-1';
        var focusable = tabIndex !== null && !skipTab;
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
var hasClass = function (element, className) {
    return Boolean(toClassList(element.className).find(function (name) { return name === className; }));
};
var closestInScope = function (target, targetAttr, predicate, scope) {
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
var itemIndex = function (item, indexAttr) { return +item.getAttribute(indexAttr); };
var hasItemIndex = function (item, indexAttr) { return isPresent(item.getAttribute(indexAttr)); };
/**
 * @hidden
 */
var closestItem = function (target, targetAttr, scope) { return closestInScope(target, targetAttr, hasItemIndex, scope); };

/**
 * @hidden
 */
var nextId$1 = 0;
/**
 * Represents the items of the PanelBar.
 */
var PanelBarItemComponent = /** @class */ (function () {
    function PanelBarItemComponent(parent, eventService, element) {
        var _this = this;
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
        this.id = "default-" + nextId$1++;
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
        this.subscriptions = new Subscription(function () { });
        this._expanded = false;
        this.subscriptions.add(eventService.parent$.subscribe(function (focused) { return _this.onWrapperFocusChange(focused); }));
        this.subscriptions.add(eventService.keepContent$.subscribe(function (keepContent) { return _this.keepContent = keepContent; }));
        this.wrapperFocused = parent ? parent.focused : false;
    }
    Object.defineProperty(PanelBarItemComponent.prototype, "expanded", {
        get: function () {
            return this._expanded;
        },
        /**
         * When set to `true`, expands the PanelBar item ([see example]({% slug items_panelbar %}#toc-expanded-state)).
         */
        set: function (value) {
            var activeState = this.animate ? "active" : "activeWithoutAnimation";
            this.state = value ? activeState : "inactive";
            if (!this.keepContent) {
                this.toggleExpandedChildAnimations(value);
            }
            this._expanded = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PanelBarItemComponent.prototype, "animate", {
        get: function () {
            return this.eventService.animate;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PanelBarItemComponent.prototype, "kItemClass", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PanelBarItemComponent.prototype, "kStateDefaultClass", {
        get: function () {
            return !this.disabled;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PanelBarItemComponent.prototype, "kStateDisabledClass", {
        get: function () {
            return this.disabled;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PanelBarItemComponent.prototype, "kStateExpandedClass", {
        get: function () {
            return !this.disabled && this.expanded && (this.hasChildItems || this.hasContent);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PanelBarItemComponent.prototype, "itemId", {
        get: function () {
            return 'k-panelbar-' + this.eventService.pbId + '-item-' + this.id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PanelBarItemComponent.prototype, "ariaExpanded", {
        get: function () {
            return (this.hasChildItems || this.hasContent) ? !this.disabled && this.expanded : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PanelBarItemComponent.prototype, "ariaSelected", {
        get: function () {
            return !this.disabled && this.selected;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PanelBarItemComponent.prototype, "ariaDisabled", {
        get: function () {
            return this.disabled ? true : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PanelBarItemComponent.prototype, "titleTemplate", {
        /**
         * @hidden
         */
        get: function () {
            return this.titleTemplates.length > 0 ? this.titleTemplates.toArray()[0].templateRef : undefined;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @hidden
     */
    PanelBarItemComponent.prototype.headerHeight = function () {
        return this.element.nativeElement.offsetHeight - (this.contentWrapper ? this.contentWrapper.nativeElement.offsetHeight : 0);
    };
    /**
     * @hidden
     */
    PanelBarItemComponent.prototype.ngAfterContentChecked = function () {
        var _this = this;
        this.hasItems = this.items && this.items.filter(function (item) { return !item.hidden; }).length > 0;
        this.hasChildItems = this.contentItems.filter(function (item) { return item !== _this; }).length > 0 || this.hasItems;
        this.hasContent = (this.contentTemplate !== undefined && this.contentTemplate.length > 0) ||
            this.content !== undefined;
        this.validateConfiguration();
    };
    /**
     * @hidden
     */
    PanelBarItemComponent.prototype.ngAfterViewChecked = function () {
        var _this = this;
        if (this.items) {
            this.childrenItems = this.viewChildItems.toArray();
        }
        else {
            this.childrenItems = this.contentItems.filter(function (item) { return item !== _this; });
        }
    };
    /**
     * @hidden
     */
    PanelBarItemComponent.prototype.ngOnDestroy = function () {
        this.subscriptions.unsubscribe();
    };
    /**
     * @hidden
     */
    PanelBarItemComponent.prototype.onItemAction = function () {
        if (!this.disabled) {
            this.eventService.onSelect(this);
        }
    };
    /**
     * @hidden
     */
    PanelBarItemComponent.prototype.onItemClick = function (e) {
        if (!isFocusable(e.target)) {
            this.onItemAction();
        }
    };
    Object.defineProperty(PanelBarItemComponent.prototype, "iconClasses", {
        /**
         * @hidden
         */
        get: function () {
            var _a;
            var icon = this.icon ? 'k-i-' + this.icon : null;
            return _a = {},
                _a[icon || this.iconClass] = true,
                _a;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @hidden
     */
    PanelBarItemComponent.prototype.serialize = function () {
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
    };
    /**
     * @hidden
     */
    PanelBarItemComponent.prototype.subTreeViewItems = function () {
        var subTree = [];
        this.viewChildItems.forEach(function (item) {
            subTree = subTree.concat(item.subTreeViewItems());
            subTree.push(item);
        });
        return subTree;
    };
    /**
     * @hidden
     */
    PanelBarItemComponent.prototype.validateConfiguration = function () {
        if (isDevMode()) {
            if (this.content && (this.contentTemplate !== undefined && this.contentTemplate.length > 0)) {
                throw new Error("Invalid configuration: mixed template components and component property.");
            }
        }
    };
    /**
     * @hidden
     */
    PanelBarItemComponent.prototype.toggleAnimationState = function (value) {
        if (!this.animate) {
            return;
        }
        this.state = value && this.eventService.expandMode !== PanelBarExpandMode.Single ? 'active' : 'activeWithoutAnimation';
    };
    /**
     * @hidden
     */
    PanelBarItemComponent.prototype.toggleExpandedChildAnimations = function (value) {
        if (this.childrenItems) {
            this.childrenItems.forEach(function (child) {
                if (child.expanded) {
                    child.toggleAnimationState(value);
                    child.toggleExpandedChildAnimations(value);
                }
            });
        }
    };
    PanelBarItemComponent.prototype.onWrapperFocusChange = function (focused) {
        this.wrapperFocused = focused;
    };
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
                    template: "<span\n                #header\n                [class.k-link]=\"true\"\n                [class.k-header]=\"!parent\"\n                [class.k-state-selected]=\"!disabled && selected\"\n                [class.k-state-focused]=\"!disabled && focused && wrapperFocused\"\n                (click)=\"onItemClick($event)\">\n            <span\n                *ngIf=\"icon || iconClass\"\n                class=\"k-icon\"\n                [ngClass]=\"iconClasses\">\n            </span>\n            <img\n                *ngIf=\"imageUrl\"\n                class=\"k-image\"\n                [src]=\"imageUrl\"\n                alt=\"\">\n            {{title}}\n            <ng-template [ngTemplateOutlet]=\"titleTemplate\"></ng-template>\n            <span *ngIf=\"hasChildItems || hasContent\"\n                [class.k-icon]=\"true\"\n                [class.k-i-arrow-n]=\"expanded\"\n                [class.k-panelbar-collapse]=\"expanded\"\n                [class.k-i-arrow-s]=\"!expanded\"\n                [class.k-panelbar-expand]=\"!expanded\">\n            </span>\n        </span>\n        <div #contentWrapper\n            *ngIf=\"keepContent || (!disabled && expanded && (hasChildItems || hasContent))\"\n            [@toggle]=\"state\"\n            [attr.role]=\"'group'\"\n            [attr.aria-hidden]=\"!disabled && !expanded\">\n            <div\n                *ngIf=\"hasChildItems && !items?.length\"\n                [style.overflow]=\"contentOverflow\"\n                [style.height]=\"contentHeight\"\n                class=\"k-panel k-group\">\n                    <ng-content select=\"kendo-panelbar-item\"></ng-content>\n            </div>\n            <div\n                *ngIf=\"hasContent && !content\"\n                [style.overflow]=\"contentOverflow\"\n                [style.height]=\"contentHeight\"\n                class=\"k-content\">\n                <ng-template\n                    [ngTemplateOutlet]=\"contentTemplate.first.templateRef\"\n                    [ngTemplateOutletContext]=\"{\n                        $implicit: {\n                            title: title,\n                            id: id,\n                            icon: icon,\n                            imageUrl: imageUrl,\n                            disabled: disabled,\n                            content: content\n                        }\n                    }\">\n                </ng-template>\n            </div>\n            <div *ngIf=\"hasItems\"\n                [style.overflow]=\"contentOverflow\"\n                [style.height]=\"contentHeight\"\n                class=\"k-panel k-group\">\n                <ng-container *ngFor=\"let item of items\">\n                    <kendo-panelbar-item *ngIf=\"!item.hidden\"\n                        [title]=\"item.title\"\n                        [id]=\"item.id\"\n                        [icon]=\"item.icon\"\n                        [iconClass]=\"item.iconClass\"\n                        [imageUrl]=\"item.imageUrl\"\n                        [selected]=\"!!item.selected\"\n                        [expanded]=\"!!item.expanded\"\n                        [disabled]=\"!!item.disabled\"\n                        [template]=\"template\"\n                        [items]=\"item.children\"\n                        [content]=\"item.content\">\n                    </kendo-panelbar-item>\n                </ng-container>\n            </div>\n            <div\n                *ngIf=\"content\"\n                [style.overflow]=\"contentOverflow\"\n                [style.height]=\"contentHeight\"\n                class=\"k-content\">\n                <ng-template\n                    [ngTemplateOutlet]=\"template\"\n                    [ngTemplateOutletContext]=\"{\n                        $implicit: {\n                            title: title,\n                            id: id,\n                            icon: icon,\n                            imageUrl: imageUrl,\n                            disabled: disabled,\n                            content: content\n                        }\n                    }\">\n                </ng-template>\n                <ng-template [ngIf]=\"!template\">{{content}}</ng-template>\n            </div>\n        </div>"
                },] },
    ];
    /** @nocollapse */
    PanelBarItemComponent.ctorParameters = function () { return [
        { type: PanelBarItemComponent, decorators: [{ type: SkipSelf }, { type: Host }, { type: Optional }] },
        { type: PanelBarService },
        { type: ElementRef }
    ]; };
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
    return PanelBarItemComponent;
}());

/**
 * Represents the template directive of the PanelBar which helps to customize the item content.
 */
var PanelBarItemTemplateDirective = /** @class */ (function () {
    function PanelBarItemTemplateDirective(templateRef) {
        this.templateRef = templateRef;
    }
    PanelBarItemTemplateDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[kendoPanelBarItemTemplate]'
                },] },
    ];
    /** @nocollapse */
    PanelBarItemTemplateDirective.ctorParameters = function () { return [
        { type: TemplateRef, decorators: [{ type: Optional }] }
    ]; };
    return PanelBarItemTemplateDirective;
}());

/**
 * Represents the [Kendo UI PanelBar component for Angular]({% slug overview_panelbar %}).
 */
var PanelBarComponent = /** @class */ (function () {
    function PanelBarComponent(elementRef, eventService, localization) {
        var _this = this;
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
        this.updateChildrenHeight = function () {
            var childrenHeight = 0;
            var panelbarHeight = _this.elementRef.nativeElement.offsetHeight;
            var contentOverflow = _this.expandMode === PanelBarExpandMode.Full ? 'auto' : 'visible';
            _this.childrenItems.forEach(function (item) {
                childrenHeight += item.headerHeight();
            });
            _this.childrenItems.forEach(function (item) {
                item.contentHeight = PanelBarExpandMode.Full === _this.expandMode ? (panelbarHeight - childrenHeight) + "px" : 'auto';
                item.contentOverflow = contentOverflow;
            });
        };
        this.keyBindings = this.computedKeys;
        this.elementRef = elementRef;
        this.eventService = eventService;
        this.eventService.children$.subscribe(function (event) { return _this.onItemAction(event); });
    }
    Object.defineProperty(PanelBarComponent.prototype, "keepItemContent", {
        /**
         * When set to `true`, the PanelBar renders the content of all items and they are persisted in the DOM
         * ([see example]({% slug templates_panelbar %}#toc-collections)).
         * By default, this option is set to `false`.
         */
        get: function () {
            return this._keepItemContent;
        },
        set: function (keepItemContent) {
            this._keepItemContent = keepItemContent;
            this.eventService.onKeepContent(keepItemContent);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PanelBarComponent.prototype, "items", {
        get: function () {
            return this._items;
        },
        /**
         * Sets the items of the PanelBar as an array of `PanelBarItemModel` instances
         * ([see example]({% slug items_panelbar %})).
         */
        set: function (data) {
            if (data) {
                this._items = util.parsePanelBarItems(data);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PanelBarComponent.prototype, "hostHeight", {
        get: function () {
            return this.expandMode === PanelBarExpandMode.Full ? this.height : 'auto';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PanelBarComponent.prototype, "overflow", {
        get: function () {
            return this.expandMode === PanelBarExpandMode.Full ? "hidden" : "visible";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PanelBarComponent.prototype, "dir", {
        get: function () {
            return this.localization.rtl ? 'rtl' : 'ltr';
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @hidden
     */
    PanelBarComponent.prototype.invertKeys = function (original, inverted) {
        return this.localization.rtl ? inverted : original;
    };
    Object.defineProperty(PanelBarComponent.prototype, "computedKeys", {
        get: function () {
            var _this = this;
            var _a;
            return _a = {},
                _a[Keys.Space] = function () { return _this.selectFocusedItem(); },
                _a[Keys.Enter] = function () { return _this.selectFocusedItem(); },
                _a[Keys.ArrowUp] = function () { return _this.focusPreviousItem(); },
                _a[this.invertKeys(Keys.ArrowLeft, Keys.ArrowRight)] = function () { return _this.collapseItem(); },
                _a[Keys.ArrowDown] = function () { return _this.focusNextItem(); },
                _a[this.invertKeys(Keys.ArrowRight, Keys.ArrowLeft)] = function () { return _this.expandItem(); },
                _a[Keys.End] = function () { return _this.focusLastItem(); },
                _a[Keys.Home] = function () { return _this.focusFirstItem(); },
                _a;
        },
        enumerable: true,
        configurable: true
    });
    PanelBarComponent.prototype.ngOnDestroy = function () {
        if (this.localizationChangeSubscription) {
            this.localizationChangeSubscription.unsubscribe();
        }
    };
    PanelBarComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.localizationChangeSubscription = this.localization
            .changes.subscribe(function () {
            return _this.keyBindings = _this.computedKeys;
        });
        this.eventService.animate = this.animate;
        this.eventService.expandMode = this.expandMode;
    };
    PanelBarComponent.prototype.ngAfterViewChecked = function () {
        var _this = this;
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
            setTimeout(function () { return _this.updateChildrenHeight(); });
        }
        this.validateConfiguration();
    };
    PanelBarComponent.prototype.ngOnChanges = function (changes) {
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
    };
    Object.defineProperty(PanelBarComponent.prototype, "templateRef", {
        get: function () {
            return this.template ? this.template.templateRef : undefined;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @hidden
     */
    PanelBarComponent.prototype.onComponentClick = function (event) {
        var itemClicked = this.visibleItems().some(function (item) {
            return item.header.nativeElement.contains(event.target);
        });
        if (!this.focused && itemClicked) {
            this.elementRef.nativeElement.focus();
        }
    };
    /**
     * @hidden
     */
    PanelBarComponent.prototype.onComponentFocus = function () {
        this.eventService.onFocus();
        this.focused = true;
        if (this.allItems.length > 0) {
            var visibleItems = this.visibleItems();
            var focusedItems = visibleItems.filter(function (item) { return item.focused; });
            if (!focusedItems.length && visibleItems.length > 0) {
                visibleItems[0].focused = true;
                this.activeDescendant = visibleItems[0].itemId;
            }
        }
    };
    /**
     * @hidden
     */
    PanelBarComponent.prototype.onComponentBlur = function () {
        this.eventService.onBlur();
        this.focused = false;
        this.activeDescendant = "";
    };
    /**
     * @hidden
     */
    PanelBarComponent.prototype.onComponentKeyDown = function (event) {
        if (event.target === this.elementRef.nativeElement) {
            if (event.keyCode === Keys.Space || event.keyCode === Keys.ArrowUp || event.keyCode === Keys.ArrowDown ||
                event.keyCode === Keys.ArrowLeft || event.keyCode === Keys.ArrowRight || event.keyCode === Keys.Home ||
                event.keyCode === Keys.End || event.keyCode === Keys.PageUp || event.keyCode === Keys.PageDown) {
                event.preventDefault();
            }
            var handler = this.keyBindings[event.keyCode];
            //TODO: check if next item is disabled and skip operation?
            if (handler) {
                handler();
            }
        }
    };
    Object.defineProperty(PanelBarComponent.prototype, "viewItems", {
        get: function () {
            var treeItems = [];
            this.viewChildItems.toArray().forEach(function (item) {
                treeItems.push(item);
                treeItems = treeItems.concat(item.subTreeViewItems());
            });
            return treeItems;
        },
        enumerable: true,
        configurable: true
    });
    PanelBarComponent.prototype.validateConfiguration = function () {
        if (isDevMode()) {
            if (this.items && (this.contentItems && this.contentItems.length > 0)) {
                throw new Error("Invalid configuration: mixed template components and items property.");
            }
        }
    };
    PanelBarComponent.prototype.onItemAction = function (item) {
        var _this = this;
        if (!item) {
            return;
        }
        var modifiedItems = new Array();
        this.allItems
            .forEach(function (currentItem) {
            var selectedState = currentItem === item;
            var focusedState = selectedState;
            selectedState = _this.selectable ? selectedState : currentItem.selected;
            if (currentItem.selected !== selectedState || currentItem.focused !== focusedState) {
                currentItem.selected = selectedState;
                currentItem.focused = focusedState;
                _this.activeDescendant = focusedState ? currentItem.itemId : "";
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
            var siblings = item.parent ? item.parent.childrenItems : this.childrenItems;
            if (item.hasChildItems || item.hasContent) {
                siblings
                    .forEach(function (currentItem) {
                    var expandedState = currentItem === item;
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
            this.stateChange.emit(modifiedItems.map(function (currentItem) { return currentItem.serialize(); }));
        }
    };
    Object.defineProperty(PanelBarComponent.prototype, "hostClasses", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    PanelBarComponent.prototype.isVisible = function (item) {
        var visibleItems = this.visibleItems();
        return visibleItems.some(function (i) { return i === item; });
    };
    PanelBarComponent.prototype.getVisibleParent = function (item) {
        var visibleItems = this.visibleItems();
        if (!item.parent) {
            return item;
        }
        return visibleItems.some(function (i) { return i === item.parent; }) ? item.parent : this.getVisibleParent(item.parent);
    };
    PanelBarComponent.prototype.focusItem = function (action) {
        var visibleItems = this.visibleItems();
        var currentIndex = visibleItems.findIndex(function (item) { return item.focused; });
        var currentItem = visibleItems[currentIndex];
        var nextItem;
        if (currentIndex === -1) {
            var focusedItem = this.allItems.find(function (item) { return item.focused; });
            focusedItem.focused = false;
            currentItem = this.getVisibleParent(focusedItem);
            currentIndex = visibleItems.findIndex(function (item) { return item === currentItem; });
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
    };
    PanelBarComponent.prototype.moveFocus = function (from, to) {
        from.focused = false;
        to.focused = true;
        this.activeDescendant = to.itemId;
        var modifiedItems = new Array(from.serialize(), to.serialize());
        this.stateChange.emit(modifiedItems);
    };
    PanelBarComponent.prototype.focusLastItem = function () {
        this.focusItem("lastItem");
    };
    PanelBarComponent.prototype.focusFirstItem = function () {
        this.focusItem("firstItem");
    };
    PanelBarComponent.prototype.focusNextItem = function () {
        this.focusItem("nextItem");
    };
    PanelBarComponent.prototype.focusPreviousItem = function () {
        this.focusItem("previousItem");
    };
    PanelBarComponent.prototype.expandItem = function () {
        var currentItem = this.allItems.filter(function (item) { return item.focused; })[0];
        if (!this.isVisible(currentItem)) {
            currentItem.focused = false;
            currentItem = this.getVisibleParent(currentItem);
        }
        if (currentItem.hasChildItems || currentItem.hasContent) {
            if (!currentItem.expanded) {
                this.onItemAction(currentItem);
            }
            else if (currentItem.hasChildItems) {
                var firstChildIndex = currentItem.childrenItems.findIndex(function (item) { return !item.disabled; });
                if (firstChildIndex > -1) {
                    this.moveFocus(currentItem, currentItem.childrenItems[firstChildIndex]);
                }
            }
        }
    };
    PanelBarComponent.prototype.collapseItem = function () {
        var currentItem = this.allItems.filter(function (item) { return item.focused; })[0];
        if (currentItem.expanded) {
            this.onItemAction(currentItem);
        }
        else if (currentItem.parent) {
            this.moveFocus(currentItem, currentItem.parent);
        }
    };
    PanelBarComponent.prototype.selectFocusedItem = function () {
        var focusedItem = this.allItems.filter(function (item) { return item.focused; })[0];
        if (!this.isVisible(focusedItem)) {
            focusedItem.focused = false;
            focusedItem = this.getVisibleParent(focusedItem);
        }
        if (focusedItem) {
            focusedItem.onItemAction();
        }
    };
    PanelBarComponent.prototype.visibleItems = function () {
        return this.flatVisibleItems(this.childrenItems);
    };
    PanelBarComponent.prototype.flatVisibleItems = function (listOfItems, flattedItems) {
        var _this = this;
        if (listOfItems === void 0) { listOfItems = new Array(); }
        if (flattedItems === void 0) { flattedItems = new Array(); }
        listOfItems.forEach(function (item) {
            if (!item.disabled) {
                flattedItems.push(item);
                if (item.expanded && item.hasChildItems) {
                    _this.flatVisibleItems(item.childrenItems, flattedItems);
                }
            }
        });
        return flattedItems;
    };
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
                    template: "\n        <ng-content *ngIf=\"contentChildItems && !items\" select=\"kendo-panelbar-item\"></ng-content>\n        <ng-template [ngIf]=\"items?.length\">\n            <ng-container *ngFor=\"let item of items\">\n                <kendo-panelbar-item *ngIf=\"!item.hidden\"\n                     [title]=\"item.title\"\n                     [id]=\"item.id\"\n                     [icon]=\"item.icon\"\n                     [iconClass]=\"item.iconClass\"\n                     [imageUrl]=\"item.imageUrl\"\n                     [selected]=\"!!item.selected\"\n                     [expanded]=\"!!item.expanded\"\n                     [disabled]=\"!!item.disabled\"\n                     [template]=\"templateRef\"\n                     [items]=\"item.children\"\n                     [content]=\"item.content\"\n                >\n                </kendo-panelbar-item>\n            </ng-container>\n        </ng-template>\n    "
                },] },
    ];
    /** @nocollapse */
    PanelBarComponent.ctorParameters = function () { return [
        { type: ElementRef },
        { type: PanelBarService },
        { type: LocalizationService }
    ]; };
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
    return PanelBarComponent;
}());

/**
 * Represents the pane component of the Splitter.
 */
var SplitterPaneComponent = /** @class */ (function () {
    function SplitterPaneComponent(element, renderer, cdr) {
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
    Object.defineProperty(SplitterPaneComponent.prototype, "order", {
        get: function () {
            return this._order;
        },
        /**
         * @hidden
         */
        set: function (paneOrder) {
            this._order = paneOrder;
            this.setOrderStyles();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SplitterPaneComponent.prototype, "size", {
        get: function () {
            return this._size;
        },
        /**
         * Sets the initial size of the pane.
         * Has to be between the `min` and `max` properties.
         */
        set: function (newSize) {
            this._size = newSize;
            var element = this.element.nativeElement;
            this.renderer.setStyle(element, '-ms-flex-preferred-size', newSize);
            this.renderer.setStyle(element, 'flex-basis', newSize);
            if (this.staticPaneClass) {
                this.renderer.addClass(element, 'k-pane-static');
            }
            else {
                this.renderer.removeClass(element, 'k-pane-static');
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SplitterPaneComponent.prototype, "isHidden", {
        get: function () {
            return this.collapsed;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SplitterPaneComponent.prototype, "styleDisplayFlex", {
        get: function () {
            return this.containsSplitter;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SplitterPaneComponent.prototype, "staticPaneClass", {
        get: function () {
            if (this.forceExpand) {
                return false;
            }
            return !this.resizable && !this.collapsible || this.fixedSize;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SplitterPaneComponent.prototype, "scrollablePaneClass", {
        get: function () {
            return this.scrollable;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SplitterPaneComponent.prototype, "fixedSize", {
        get: function () {
            return this.size && this.size.length > 0;
        },
        enumerable: true,
        configurable: true
    });
    SplitterPaneComponent.prototype.ngAfterViewChecked = function () {
        var element = this.element.nativeElement;
        if (this.isHidden) {
            this.renderer.addClass(element, 'k-state-hidden');
            this.renderer.addClass(element, 'hidden');
        }
        else {
            this.renderer.removeClass(element, 'k-state-hidden');
            this.renderer.removeClass(element, 'hidden');
        }
    };
    Object.defineProperty(SplitterPaneComponent.prototype, "computedSize", {
        /**
         * @hidden
         */
        get: function () {
            if (this.orientation === 'vertical') {
                return this.element.nativeElement.offsetHeight;
            }
            else {
                return this.element.nativeElement.offsetWidth;
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @hidden
     */
    SplitterPaneComponent.prototype.toggleOverlay = function (show) {
        this.overlayContent = show;
        this.cdr.detectChanges();
    };
    /**
     * @hidden
     */
    SplitterPaneComponent.prototype.detectChanges = function () {
        this.cdr.detectChanges();
    };
    /**
     * @hidden
     */
    SplitterPaneComponent.prototype.setOrderStyles = function () {
        var element = this.element.nativeElement;
        this.renderer.setStyle(element, '-ms-flex-order', this.order);
        this.renderer.setStyle(element, 'order', this.order);
    };
    SplitterPaneComponent.decorators = [
        { type: Component, args: [{
                    exportAs: 'kendoSplitterPane',
                    selector: 'kendo-splitter-pane',
                    template: "\n        <ng-container *ngIf=\"!collapsed\"><ng-content></ng-content></ng-container>\n        <div *ngIf=\"overlayContent\" class=\"k-splitter-overlay k-overlay\"></div>\n    "
                },] },
    ];
    /** @nocollapse */
    SplitterPaneComponent.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Renderer2 },
        { type: ChangeDetectorRef }
    ]; };
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
    return SplitterPaneComponent;
}());

var SIZING_DOC_LINK = 'https://www.telerik.com/kendo-angular-ui/components/layout/splitter/panes/#toc-size';
/**
 * @hidden
 */
var SplitterService = /** @class */ (function () {
    function SplitterService(zone) {
        this.zone = zone;
        this.layoutChange = new EventEmitter();
        this.containerSize = function () { };
    }
    SplitterService.prototype.tryToggle = function (paneIndex) {
        var pane = this.pane(paneIndex);
        if (pane.collapsible) {
            pane.collapsed = !pane.collapsed;
            pane.collapsedChange.emit(pane.collapsed);
            this.emit(this.layoutChange, {});
            if (pane.collapsed) {
                pane.detectChanges();
            }
        }
        var notCollapsed = this.panes.filter(function (p) { return !p.collapsed; });
        var allHaveFixedSize = notCollapsed.every(function (p) { return p.fixedSize; });
        notCollapsed[notCollapsed.length - 1].forceExpand = allHaveFixedSize ? true : false;
        return pane.collapsible;
    };
    SplitterService.prototype.toggleContentOverlay = function (index, show) {
        this.pane(index).toggleOverlay(show);
        this.pane(index + 1).toggleOverlay(show);
    };
    SplitterService.prototype.dragState = function (splitbarIndex) {
        var _this = this;
        var prev = this.pane(splitbarIndex);
        var next = this.pane(splitbarIndex + 1);
        var total = prev.computedSize + next.computedSize;
        var px = function (s) { return _this.toPixels(s); };
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
    };
    SplitterService.prototype.setSize = function (state$$1, delta) {
        var _this = this;
        var clamp = function (min, max, v) { return Math.min(max, Math.max(min, v)); };
        var resize = function (paneState, change) {
            var pane = _this.pane(paneState.index);
            var splitterSize = _this.containerSize();
            var newSize = clamp(paneState.min, paneState.max, paneState.initialSize + change);
            var size = "";
            if (_this.isPercent(pane.size)) {
                size = (100 * newSize / splitterSize) + "%";
            }
            else {
                size = newSize + "px";
            }
            pane.size = size;
            _this.emit(pane.sizeChange, size);
        };
        var prev = this.pane(state$$1.prev.index);
        var next = this.pane(state$$1.next.index);
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
    };
    SplitterService.prototype.isDraggable = function (splitBarIndex) {
        var prev = this.pane(splitBarIndex);
        var next = this.pane(splitBarIndex + 1);
        var betweenResizablePanes = prev.resizable && next.resizable;
        var nearCollapsedPane = prev.collapsed || next.collapsed;
        return betweenResizablePanes && !nearCollapsedPane;
    };
    SplitterService.prototype.isStatic = function (splitBarIndex) {
        var prev = this.pane(splitBarIndex);
        var next = this.pane(splitBarIndex + 1);
        var betweenResizablePanes = prev.resizable && next.resizable;
        var nearCollapsiblePane = prev.collapsible || next.collapsible;
        return !betweenResizablePanes && !nearCollapsiblePane;
    };
    SplitterService.prototype.pane = function (index) {
        if (!this.panes) {
            throw new Error("Panes not initialized");
        }
        if (index < 0 || index >= this.panes.length) {
            throw new Error("Index out of range");
        }
        return this.panes[index];
    };
    SplitterService.prototype.configure = function (_a) {
        var panes = _a.panes, orientation = _a.orientation, containerSize = _a.containerSize;
        this.panes = panes;
        this.panes.forEach(function (pane, index) {
            pane.order = index * 2;
            pane.orientation = orientation;
        });
        if (isDevMode()) {
            var allFixed = panes.length && !panes.some(function (pane) { return !pane.fixedSize; });
            if (allFixed) {
                throw new Error("\n                    The Splitter should have at least one pane without a set size.\n                    See " + SIZING_DOC_LINK + " for more information.\n                ");
            }
        }
        this.containerSize = containerSize;
    };
    SplitterService.prototype.isPercent = function (size) {
        return /%$/.test(size);
    };
    SplitterService.prototype.toPixels = function (size) {
        var result = parseFloat(size);
        if (this.isPercent(size)) {
            result = (this.containerSize() * result / 100);
        }
        return result;
    };
    SplitterService.prototype.emit = function (emitter, args) {
        if (emitter.observers.length) {
            this.zone.run(function () { return emitter.emit(args); });
        }
    };
    SplitterService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    SplitterService.ctorParameters = function () { return [
        { type: NgZone }
    ]; };
    return SplitterService;
}());

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
var SplitterComponent = /** @class */ (function () {
    function SplitterComponent(element, splitterService, localization, enclosingPane) {
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
    Object.defineProperty(SplitterComponent.prototype, "hostClasses", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SplitterComponent.prototype, "horizontalHostClasses", {
        get: function () {
            return this.orientation === 'horizontal';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SplitterComponent.prototype, "verticalHostClasses", {
        get: function () {
            return this.orientation === 'vertical';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SplitterComponent.prototype, "dir", {
        get: function () {
            return this.direction;
        },
        enumerable: true,
        configurable: true
    });
    SplitterComponent.prototype.ngAfterContentInit = function () {
        this.reconfigure();
    };
    SplitterComponent.prototype.ngOnChanges = function (changes) {
        if (changes.orientation && !changes.orientation.isFirstChange()) {
            this.reconfigure();
        }
    };
    SplitterComponent.prototype.ngOnDestroy = function () {
        this.unsubscribeChanges();
    };
    SplitterComponent.prototype.reconfigure = function () {
        this.unsubscribeChanges();
        this.configure();
        this.paneChangesSubscription = this.panes.changes.subscribe(this.configure);
    };
    SplitterComponent.prototype.unsubscribeChanges = function () {
        if (this.paneChangesSubscription) {
            this.paneChangesSubscription.unsubscribe();
            this.paneChangesSubscription = null;
        }
    };
    SplitterComponent.prototype.configure = function () {
        var _this = this;
        this.splitterService.configure({
            panes: this.panes.toArray(),
            orientation: this.orientation,
            containerSize: function () {
                if (_this.orientation === 'vertical') {
                    return _this.element.nativeElement.clientHeight;
                }
                else {
                    return _this.element.nativeElement.clientWidth;
                }
            }
        });
    };
    Object.defineProperty(SplitterComponent.prototype, "direction", {
        get: function () {
            return this.localization.rtl ? 'rtl' : 'ltr';
        },
        enumerable: true,
        configurable: true
    });
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
                    template: "\n      <ng-content select=\"kendo-splitter-pane\"></ng-content>\n      <ng-container *ngFor=\"\n        let pane of panes;\n        let index = index;\n        let last = last;\n      \">\n        <kendo-splitter-bar\n          kendoDraggable\n          *ngIf=\"!last\"\n          [index]=\"index\"\n          [orientation]=\"orientation\">\n        </kendo-splitter-bar>\n      </ng-container>\n    "
                },] },
    ];
    /** @nocollapse */
    SplitterComponent.ctorParameters = function () { return [
        { type: ElementRef },
        { type: SplitterService },
        { type: LocalizationService },
        { type: SplitterPaneComponent, decorators: [{ type: Optional }, { type: Host }, { type: Inject, args: [SplitterPaneComponent,] }] }
    ]; };
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
    return SplitterComponent;
}());

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
var TabContentDirective = /** @class */ (function () {
    function TabContentDirective(templateRef) {
        this.templateRef = templateRef;
    }
    TabContentDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[kendoTabContent]'
                },] },
    ];
    /** @nocollapse */
    TabContentDirective.ctorParameters = function () { return [
        { type: TemplateRef }
    ]; };
    return TabContentDirective;
}());

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
var TabTitleDirective = /** @class */ (function () {
    function TabTitleDirective(templateRef) {
        this.templateRef = templateRef;
    }
    TabTitleDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[kendoTabTitle]'
                },] },
    ];
    /** @nocollapse */
    TabTitleDirective.ctorParameters = function () { return [
        { type: TemplateRef }
    ]; };
    return TabTitleDirective;
}());

/**
 * Represents the tab component of the TabStrip.
 */
var TabStripTabComponent = /** @class */ (function () {
    function TabStripTabComponent() {
        this.active = false;
        this._tabContent = new QueryList();
    }
    Object.defineProperty(TabStripTabComponent.prototype, "tabContent", {
        get: function () {
            return this._tabContent.first;
        },
        enumerable: true,
        configurable: true
    });
    TabStripTabComponent.prototype.ngAfterContentInit = function () {
        this.active = this.selected;
    };
    TabStripTabComponent.prototype.ngOnChanges = function (changes) {
        if (changes['selected'] && !changes['selected'].isFirstChange()) { // tslint:disable-line
            this.active = this.selected;
        }
    };
    TabStripTabComponent.decorators = [
        { type: Component, args: [{
                    exportAs: 'kendoTabStripTab',
                    selector: 'kendo-tabstrip-tab',
                    template: ""
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
    return TabStripTabComponent;
}());

/**
 * @hidden
 */
var PreventableEvent = /** @class */ (function () {
    /**
     * @hidden
     */
    function PreventableEvent(args) {
        this.prevented = false;
        Object.assign(this, args);
    }
    /**
     * Prevents the default action for a specified event.
     * In this way, the source component suppresses
     * the built-in behavior that follows the event.
     */
    PreventableEvent.prototype.preventDefault = function () {
        this.prevented = true;
    };
    /**
     * Returns `true` if the event was prevented
     * by any of its subscribers.
     *
     * @returns `true` if the default action was prevented.
     * Otherwise, returns `false`.
     */
    PreventableEvent.prototype.isDefaultPrevented = function () {
        return this.prevented;
    };
    return PreventableEvent;
}());

/**
 * Arguments for the `select` event of the TabStrip.
 * The `select` event fires when a tab is selected (clicked).
 */
var SelectEvent = /** @class */ (function (_super) {
    __extends(SelectEvent, _super);
    /**
     * Constructs the event arguments for the `select` event.
     * @param index - The index of the selected tab.
     * @param title - The title of the selected tab.
     */
    function SelectEvent(index, title) {
        var _this = _super.call(this) || this;
        _this.index = index;
        _this.title = title;
        return _this;
    }
    return SelectEvent;
}(PreventableEvent));

/**
 * Represents the [Kendo UI TabStrip component for Angular]({% slug overview_tabstrip %}).
 */
var TabStripComponent = /** @class */ (function () {
    function TabStripComponent(localization, renderer, wrapper) {
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
    Object.defineProperty(TabStripComponent.prototype, "height", {
        get: function () {
            return this._height;
        },
        /**
         * Sets the height of the TabStrip.
         */
        set: function (value) {
            this._height = value;
            this.renderer.setStyle(this.wrapper.nativeElement, 'height', value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TabStripComponent.prototype, "tabsAtTop", {
        get: function () {
            return this.tabPosition === 'top';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TabStripComponent.prototype, "tabsAtRight", {
        get: function () {
            return this.tabPosition === 'right';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TabStripComponent.prototype, "tabsAtBottom", {
        get: function () {
            return this.tabPosition === 'bottom';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TabStripComponent.prototype, "tabsAtLeft", {
        get: function () {
            return this.tabPosition === 'left';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TabStripComponent.prototype, "dir", {
        get: function () {
            return this.localization.rtl ? 'rtl' : 'ltr';
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @hidden
     */
    TabStripComponent.prototype.contentClass = function (active) {
        var visible = !this.keepTabContent || active;
        return visible ? 'k-content k-state-active' : 'k-content';
    };
    Object.defineProperty(TabStripComponent.prototype, "computedKeys", {
        get: function () {
            var _this = this;
            var _a;
            return _a = {},
                _a[this.invertKeys(Keys.ArrowLeft, Keys.ArrowRight)] = function (selectedIndex) { return _this.prevNavigatableIndex(selectedIndex); },
                _a[this.invertKeys(Keys.ArrowRight, Keys.ArrowLeft)] = function (selectedIndex) { return _this.nextNavigatableIndex(selectedIndex); },
                _a[this.invertKeys(Keys.ArrowDown, Keys.ArrowUp)] = function (selectedIndex) { return _this.nextNavigatableIndex(selectedIndex); },
                _a[this.invertKeys(Keys.ArrowUp, Keys.ArrowDown)] = function (selectedIndex) { return _this.prevNavigatableIndex(selectedIndex); },
                _a[Keys.Home] = function () { return _this.firstNavigatableIndex(); },
                _a[Keys.End] = function () { return _this.lastNavigatableIndex(); },
                _a;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TabStripComponent.prototype, "tabsAlignment", {
        /**
         * @hidden
         */
        get: function () {
            return {
                start: 'flex-start',
                end: 'flex-end',
                center: 'center',
                justify: 'space-between'
            }[this.tabAlignment];
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @hidden
     */
    TabStripComponent.prototype.invertKeys = function (original, inverted) {
        return this.localization.rtl ? inverted : original;
    };
    /**
     * @hidden
     */
    TabStripComponent.prototype.onKeyDown = function (event) {
        if (event.currentTarget !== this.tablist.nativeElement) {
            return;
        }
        var isHorizontal = this.tabPosition === 'top' || this.tabPosition === 'bottom';
        var isArrowUp = event.keyCode === Keys.ArrowUp;
        var isArrowDown = event.keyCode === Keys.ArrowDown;
        var isArrowLeft = event.keyCode === Keys.ArrowLeft;
        var isArrowRight = event.keyCode === Keys.ArrowRight;
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
        var selectedIndex = this.tabs.toArray().findIndex(function (tab) { return tab.active && !tab.disabled; });
        if (selectedIndex === -1) {
            this.selectTab(this.firstNavigatableIndex());
        }
        else {
            var getTabIndex = this.keyBindings[event.keyCode];
            if (getTabIndex) {
                var nextIndex = getTabIndex(selectedIndex);
                if (selectedIndex !== nextIndex) {
                    this.selectTab(getTabIndex(selectedIndex));
                }
            }
        }
    };
    /**
     * @hidden
     */
    TabStripComponent.prototype.tabPanelId = function (id) {
        return 'k-tabstrip-tabpanel-' + id;
    };
    /**
     * @hidden
     */
    TabStripComponent.prototype.tabId = function (id) {
        return 'k-tabstrip-tab-' + id;
    };
    /**
     * Allows the user to select a tab programmatically.
     * @param {number} index - The index of the tab that will be selected.
     */
    TabStripComponent.prototype.selectTab = function (index) {
        var tab = this.tabs.toArray()[index];
        if (!tab || Boolean(tab.disabled)) {
            return;
        }
        this.tabHeadingContainers.toArray()[index].nativeElement.focus();
        this.emitEvent(tab, index);
    };
    /**
     * @hidden
     */
    TabStripComponent.prototype.onTabClick = function (originalEvent, tabIndex) {
        if (isFocusable(originalEvent.target)) {
            return;
        }
        this.selectTab(tabIndex);
    };
    TabStripComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.localizationChangeSubscription = this.localization
            .changes.subscribe(function () {
            return _this.keyBindings = _this.computedKeys;
        });
    };
    TabStripComponent.prototype.ngOnDestroy = function () {
        if (this.localizationChangeSubscription) {
            this.localizationChangeSubscription.unsubscribe();
        }
    };
    TabStripComponent.prototype.firstNavigatableIndex = function () {
        var tabs = this.tabs.toArray();
        for (var i = 0; i < tabs.length; i++) {
            if (!tabs[i].disabled) {
                return i;
            }
        }
    };
    TabStripComponent.prototype.lastNavigatableIndex = function () {
        var tabs = this.tabs.toArray();
        for (var i = tabs.length - 1; i > 0; i--) {
            if (!tabs[i].disabled) {
                return i;
            }
        }
    };
    TabStripComponent.prototype.prevNavigatableIndex = function (selectedIndex) {
        if (selectedIndex - 1 < 0) {
            return this.lastNavigatableIndex();
        }
        var tabs = this.tabs.toArray();
        for (var i = selectedIndex - 1; i > -1; i--) {
            if (!tabs[i].disabled) {
                return i;
            }
            if (i === 0) {
                return this.lastNavigatableIndex();
            }
        }
        return selectedIndex;
    };
    TabStripComponent.prototype.nextNavigatableIndex = function (selectedIndex) {
        if (selectedIndex + 1 >= this.tabs.length) {
            return this.firstNavigatableIndex();
        }
        var tabs = this.tabs.toArray();
        for (var i = selectedIndex + 1; i < tabs.length; i++) {
            if (!tabs[i].disabled) {
                return i;
            }
            if (i + 1 === tabs.length) {
                return this.firstNavigatableIndex();
            }
        }
    };
    TabStripComponent.prototype.emitEvent = function (tab, selectedIndex) {
        var selectArgs = new SelectEvent(selectedIndex, tab.title);
        this.tabSelect.emit(selectArgs);
        if (!selectArgs.isDefaultPrevented() && !tab.active) {
            this._animate = this.animate;
            this.deactivateAll();
            tab.active = true;
        }
    };
    TabStripComponent.prototype.deactivateAll = function () {
        this.tabs.forEach(function (tab) {
            tab.active = false;
        });
    };
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
                    template: "\n        <ng-container *ngIf=\"!tabsAtBottom\">\n            <ng-container *ngTemplateOutlet=\"heading\">\n            </ng-container>\n            <ng-container *ngTemplateOutlet=\"content\">\n            </ng-container>\n        </ng-container>\n\n        <ng-container *ngIf=\"tabsAtBottom\">\n            <ng-container *ngTemplateOutlet=\"content\">\n            </ng-container>\n            <ng-container *ngTemplateOutlet=\"heading\">\n            </ng-container>\n        </ng-container>\n\n        <ng-template #heading>\n            <ul\n                class=\"k-reset k-tabstrip-items\"\n                [style.justifyContent]=\"tabsAlignment\"\n                role=\"tablist\"\n                (keydown)=\"onKeyDown($event)\"\n                #tablist\n            >\n                <li *ngFor=\"let tab of tabs; let i = index;\" (click)=\"onTabClick($event, i)\"\n                    #tabHeadingContainer\n                    role=\"tab\"\n                    [id]=\"tabId(i)\"\n                    [tabIndex]=\"tab.active ? 0 : -1\"\n                    [ngClass]=\"tab.cssClass\"\n                    [class.k-item]=\"true\"\n                    [class.k-state-default]=\"true\"\n                    [class.k-state-active]=\"tab.active\"\n                    [class.k-state-disabled]=\"tab.disabled\"\n                    [attr.aria-selected]=\"tab.active\"\n                    [attr.aria-controls]=\"tabPanelId(i)\"\n                    [attr.aria-disabled]=\"tab.disabled\"\n                ><span class=\"k-link\">{{ tab.title }}<ng-template [ngTemplateOutlet]=\"tab.tabTitle?.templateRef\"></ng-template></span></li>\n            </ul>\n        </ng-template>\n        <ng-template #content>\n            <ng-template ngFor let-tab [ngForOf]=\"tabs\" let-i=\"index\">\n                <div\n                    [@state]=\"tab.active && _animate ? 'active' : 'inactive'\"\n                    *ngIf=\"tab.active || keepTabContent\"\n                    [ngClass]=\"contentClass(tab.active)\"\n                    [tabIndex]=\"0\"\n                    role=\"tabpanel\"\n                    [id]=\"tabPanelId(i)\"\n                    [attr.aria-hidden]=\"!tab.active\"\n                    [attr.aria-expanded]=\"tab.active\"\n                    [attr.aria-labelledby]=\"tabId(i)\"\n                    [attr.aria-disabled]=\"tab.disabled\"\n                >\n                    <ng-template [ngTemplateOutlet]=\"tab.tabContent?.templateRef\"></ng-template>\n                </div>\n            </ng-template>\n        </ng-template>\n    "
                },] },
    ];
    /** @nocollapse */
    TabStripComponent.ctorParameters = function () { return [
        { type: LocalizationService },
        { type: Renderer2 },
        { type: ElementRef }
    ]; };
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
    return TabStripComponent;
}());

/**
 * Represents a template that defines the content of the Drawer.
 * To define the template, nest an `<ng-template>` tag
 * with the `kendoDrawerTemplate` directive inside the `<kendo-drawer>` tag.
 * Using this template directive will override all other templates,
 * for example, `kendoDrawerHeaderTemplate` and `kendoDrawerItemTemplate`.
 */
var DrawerTemplateDirective = /** @class */ (function () {
    function DrawerTemplateDirective(templateRef) {
        this.templateRef = templateRef;
    }
    DrawerTemplateDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[kendoDrawerTemplate]'
                },] },
    ];
    /** @nocollapse */
    DrawerTemplateDirective.ctorParameters = function () { return [
        { type: TemplateRef, decorators: [{ type: Optional }] }
    ]; };
    return DrawerTemplateDirective;
}());

/**
 * Represents a template that defines the item content of the Drawer.
 * To define the template, nest an `<ng-template>` tag
 * with the `kendoDrawerItemTemplate` directive inside the `<kendo-drawer>` tag.
 */
var DrawerItemTemplateDirective = /** @class */ (function () {
    function DrawerItemTemplateDirective(templateRef) {
        this.templateRef = templateRef;
    }
    DrawerItemTemplateDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[kendoDrawerItemTemplate]'
                },] },
    ];
    /** @nocollapse */
    DrawerItemTemplateDirective.ctorParameters = function () { return [
        { type: TemplateRef, decorators: [{ type: Optional }] }
    ]; };
    return DrawerItemTemplateDirective;
}());

/**
 * Represents a template that defines the header content of the Drawer.
 * To define the template, nest an `<ng-template>` tag
 * with the `kendoDrawerHeaderTemplate` directive inside the `<kendo-drawer>` tag.
 */
var DrawerHeaderTemplateDirective = /** @class */ (function () {
    function DrawerHeaderTemplateDirective(templateRef) {
        this.templateRef = templateRef;
    }
    DrawerHeaderTemplateDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[kendoDrawerHeaderTemplate]'
                },] },
    ];
    /** @nocollapse */
    DrawerHeaderTemplateDirective.ctorParameters = function () { return [
        { type: TemplateRef, decorators: [{ type: Optional }] }
    ]; };
    return DrawerHeaderTemplateDirective;
}());

/**
 * Represents a template that defines the footer content of the Drawer.
 * To define the template, nest an `<ng-template>` tag
 * with the `kendoDrawerFooterTemplate` directive inside the `<kendo-drawer>` tag.
 */
var DrawerFooterTemplateDirective = /** @class */ (function () {
    function DrawerFooterTemplateDirective(templateRef) {
        this.templateRef = templateRef;
    }
    DrawerFooterTemplateDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[kendoDrawerFooterTemplate]'
                },] },
    ];
    /** @nocollapse */
    DrawerFooterTemplateDirective.ctorParameters = function () { return [
        { type: TemplateRef, decorators: [{ type: Optional }] }
    ]; };
    return DrawerFooterTemplateDirective;
}());

/**
 * @hidden
 */
function miniExpandPush(duration, width, miniWidth) {
    return [
        style({ overflow: 'hidden', flexBasis: miniWidth + "px" }),
        animate(duration + "ms ease-in", style({ flexBasis: width + "px" }))
    ];
}
/**
 * @hidden
 */
function miniCollapsePush(duration, width, miniWidth) {
    return [
        style({ overflow: 'hidden', flexBasis: width + "px" }),
        animate(duration + "ms ease-in", style({ flexBasis: miniWidth + "px" }))
    ];
}
/**
 * @hidden
 *
 */
function miniExpandOverlay(duration, width, miniWidth) {
    return [
        style({ width: miniWidth + "px" }),
        animate(duration + "ms ease-in", style({ overflow: 'hidden', width: width + "px" }))
    ];
}
/**
 * @hidden
 */
function expandPush(duration, width) {
    return [
        style({ overflow: 'hidden', flexBasis: '0px' }),
        animate(duration + "ms ease-in", style({ flexBasis: width + "px" }))
    ];
}
/**
 * @hidden
 */
function collapsePush(duration, width) {
    return [
        style({ flexBasis: width + "px" }),
        animate(duration + "ms ease-in", style({ overflow: 'hidden', flexBasis: "0px" }))
    ];
}
/**
 * @hidden
 */
function expandRTLOverlay(duration) {
    return [
        style({ transform: "translateX(100%)" }),
        animate(duration + "ms ease-in", style({ overflow: 'hidden', transform: "translateX(0)" }))
    ];
}
/**
 * @hidden
 */
function expandOverlay(duration, position) {
    var translateDir = position !== 'end' ? "-100%" : "100%";
    return [
        style({ transform: "translateX(" + translateDir + ")" }),
        animate(duration + "ms ease-in", style({ overflow: 'hidden', transform: "translateX(0)" }))
    ];
}
/**
 * @hidden
 */
function miniCollapseOverlay(duration, width, miniWidth) {
    return [
        style({ width: width + "px" }),
        animate(duration + "ms ease-in", style({ overflow: 'hidden', width: miniWidth + "px" }))
    ];
}
/**
 * @hidden
 */
function collapseOverlay(duration, position) {
    var translateDir = position !== 'end' ? '-100%' : '100%';
    return [
        style({ transform: "translateX(0)" }),
        animate(duration + "ms ease-in", style({ overflow: 'hidden', transform: "translateX(" + translateDir + ")" }))
    ];
}
/**
 * @hidden
 */
function collapseRTLOverlay(duration) {
    return [
        style({ transform: "translateX(0)" }),
        animate(duration + "ms ease-in", style({ overflow: 'hidden', transform: "translateX(100%)" }))
    ];
}
/**
 * @hidden
 */
function expandAnimation(settings) {
    var duration = settings.animation.duration;
    var width = settings.width;
    var miniWidth = settings.miniWidth;
    var mode = settings.mode;
    var mini = settings.mini;
    var rtl = settings.rtl;
    var position = settings.position;
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
    var duration = settings.animation.duration;
    var width = settings.width;
    var miniWidth = settings.miniWidth;
    var mode = settings.mode;
    var mini = settings.mini;
    var rtl = settings.rtl;
    var position = settings.position;
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
var DrawerSelectEvent = /** @class */ (function (_super) {
    __extends(DrawerSelectEvent, _super);
    function DrawerSelectEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return DrawerSelectEvent;
}(PreventableEvent));

/**
 * @hidden
 */
var DrawerService = /** @class */ (function () {
    function DrawerService() {
        this.selectedIndices = [];
    }
    DrawerService.prototype.emit = function (event, args) {
        var drawer = this.owner;
        var eventArgs = new DrawerSelectEvent(__assign({}, args, { sender: drawer }));
        if (hasObservers(drawer[event])) {
            drawer[event].emit(eventArgs);
        }
        return eventArgs.isDefaultPrevented();
    };
    DrawerService.prototype.onSelect = function (selectedIdx) {
        this.selectedIndices = [selectedIdx];
        var drawer = this.owner;
        if (drawer.autoCollapse && !drawer.minimized) {
            drawer.toggle(false);
        }
    };
    DrawerService.prototype.initSelection = function () {
        var items = this.owner.items;
        this.selectedIndices = [];
        for (var i = 0; i < items.length; i++) {
            if (items[i].selected) {
                this.selectedIndices.push(i);
            }
        }
    };
    DrawerService.decorators = [
        { type: Injectable },
    ];
    return DrawerService;
}());

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

/**
 * Serves as a container for the [Kendo UI Drawer component for Angular]({% slug overview_drawer %}) and its content.
 */
var DrawerContainerComponent = /** @class */ (function () {
    function DrawerContainerComponent(localizationService) {
        var _this = this;
        this.localizationService = localizationService;
        this.rtl = false;
        this.dynamicRTLSubscription = this.localizationService.changes.subscribe(function (_a) {
            var rtl = _a.rtl;
            _this.rtl = rtl;
            _this.direction = _this.rtl ? 'rtl' : 'ltr';
        });
    }
    Object.defineProperty(DrawerContainerComponent.prototype, "hostClass", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DrawerContainerComponent.prototype, "overlayClass", {
        get: function () {
            return this.drawer.mode === 'overlay';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DrawerContainerComponent.prototype, "miniClass", {
        get: function () {
            return this.drawer.mini;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DrawerContainerComponent.prototype, "pushClass", {
        get: function () {
            return this.drawer.mode === 'push';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DrawerContainerComponent.prototype, "isExpandedClass", {
        get: function () {
            return this.drawer.expanded;
        },
        enumerable: true,
        configurable: true
    });
    DrawerContainerComponent.prototype.ngOnDestroy = function () {
        if (this.dynamicRTLSubscription) {
            this.dynamicRTLSubscription.unsubscribe();
        }
    };
    Object.defineProperty(DrawerContainerComponent.prototype, "overlay", {
        /**
         * @hidden
         */
        get: function () {
            return isPresent(this.drawer) &&
                this.drawer.expanded &&
                this.drawer.mode === 'overlay';
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @hidden
     */
    DrawerContainerComponent.prototype.closeDrawer = function () {
        if (this.overlay && this.drawer.autoCollapse) {
            this.drawer.toggle(false);
        }
    };
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
                    template: "\n        <div class=\"k-overlay\" *ngIf=\"overlay\" (click)=\"closeDrawer()\"></div>\n        <ng-content></ng-content>\n    "
                },] },
    ];
    /** @nocollapse */
    DrawerContainerComponent.ctorParameters = function () { return [
        { type: LocalizationService }
    ]; };
    DrawerContainerComponent.propDecorators = {
        hostClass: [{ type: HostBinding, args: ['class.k-drawer-container',] }],
        overlayClass: [{ type: HostBinding, args: ['class.k-drawer-overlay',] }],
        miniClass: [{ type: HostBinding, args: ['class.k-drawer-mini',] }],
        pushClass: [{ type: HostBinding, args: ['class.k-drawer-push',] }],
        isExpandedClass: [{ type: HostBinding, args: ['class.k-drawer-expanded',] }],
        direction: [{ type: HostBinding, args: ['attr.dir',] }],
        drawer: [{ type: ContentChild, args: [DrawerComponent,] }]
    };
    return DrawerContainerComponent;
}());

/**
 * Represents the content of the [Kendo UI Drawer component for Angular]({% slug overview_drawer %}).
 */
var DrawerContentComponent = /** @class */ (function () {
    function DrawerContentComponent() {
        this.hostClasses = true;
    }
    DrawerContentComponent.decorators = [
        { type: Component, args: [{
                    selector: 'kendo-drawer-content',
                    template: "\n        <ng-content></ng-content>\n    ",
                    encapsulation: ViewEncapsulation.None
                },] },
    ];
    /** @nocollapse */
    DrawerContentComponent.ctorParameters = function () { return []; };
    DrawerContentComponent.propDecorators = {
        hostClasses: [{ type: HostBinding, args: ['class.k-drawer-content',] }]
    };
    return DrawerContentComponent;
}());

/**
 * Represents a template that defines the content of the whole Step.
 * To define the template, nest an `<ng-template>` tag
 * with the `kendoStepperStepTemplate` directive inside the `<kendo-stepper>` tag.
 */
var StepperStepTemplateDirective = /** @class */ (function () {
    function StepperStepTemplateDirective(templateRef) {
        this.templateRef = templateRef;
    }
    StepperStepTemplateDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[kendoStepperStepTemplate]'
                },] },
    ];
    /** @nocollapse */
    StepperStepTemplateDirective.ctorParameters = function () { return [
        { type: TemplateRef, decorators: [{ type: Optional }] }
    ]; };
    return StepperStepTemplateDirective;
}());

/**
 * Represents a template that defines the content of the Step label.
 * To define the template, nest an `<ng-template>` tag
 * with the `kendoStepperLabelTemplate` directive inside the `<kendo-stepper>` tag.
 */
var StepperLabelTemplateDirective = /** @class */ (function () {
    function StepperLabelTemplateDirective(templateRef) {
        this.templateRef = templateRef;
    }
    StepperLabelTemplateDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[kendoStepperLabelTemplate]'
                },] },
    ];
    /** @nocollapse */
    StepperLabelTemplateDirective.ctorParameters = function () { return [
        { type: TemplateRef, decorators: [{ type: Optional }] }
    ]; };
    return StepperLabelTemplateDirective;
}());

/**
 * Represents a template that defines the content of the Step indicator.
 * To define the template, nest an `<ng-template>` tag
 * with the `kendoStepperIndicatorTemplate` directive inside the `<kendo-stepper>` tag.
 */
var StepperIndicatorTemplateDirective = /** @class */ (function () {
    function StepperIndicatorTemplateDirective(templateRef) {
        this.templateRef = templateRef;
    }
    StepperIndicatorTemplateDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[kendoStepperIndicatorTemplate]'
                },] },
    ];
    /** @nocollapse */
    StepperIndicatorTemplateDirective.ctorParameters = function () { return [
        { type: TemplateRef, decorators: [{ type: Optional }] }
    ]; };
    return StepperIndicatorTemplateDirective;
}());

/**
 * Arguments for the `activate` event of the Stepper.
 */
var StepperActivateEvent = /** @class */ (function (_super) {
    __extends(StepperActivateEvent, _super);
    function StepperActivateEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return StepperActivateEvent;
}(PreventableEvent));

var DEFAULT_CURRENT_STEP = 0;
var handlers = {};
handlers[Keys.ArrowLeft] = 'left';
handlers[Keys.ArrowRight] = 'right';
handlers[Keys.ArrowUp] = 'up';
handlers[Keys.ArrowDown] = 'down';
handlers[Keys.Home] = 'home';
handlers[Keys.End] = 'end';
handlers[Keys.Enter] = 'enter';
handlers[Keys.Space] = 'enter';
var handlersRTL = Object.assign({}, handlers);
handlersRTL[Keys.ArrowLeft] = 'right';
handlersRTL[Keys.ArrowRight] = 'left';
/**
 * @hidden
 */
var StepperService = /** @class */ (function () {
    function StepperService(localization, ngZone, changeDetector) {
        this.localization = localization;
        this.ngZone = ngZone;
        this.changeDetector = changeDetector;
        this.currentStep = DEFAULT_CURRENT_STEP;
        this.triggerValidation = new EventEmitter();
        this.focusedStepChange = new EventEmitter();
    }
    Object.defineProperty(StepperService.prototype, "handlers", {
        get: function () {
            return this.localization.rtl ? handlersRTL : handlers;
        },
        enumerable: true,
        configurable: true
    });
    StepperService.prototype.emit = function (event, eventArgs) {
        var stepper = this.owner;
        if (hasObservers(stepper[event])) {
            stepper[event].emit(eventArgs);
        }
        return eventArgs.isDefaultPrevented();
    };
    StepperService.prototype.onActivate = function (currentIdx, originalEvent) {
        var _this = this;
        var eventArgs = new StepperActivateEvent({
            index: currentIdx,
            step: this.owner.steps[currentIdx],
            originalEvent: originalEvent,
            sender: this.owner
        });
        this.ngZone.run(function () {
            if (!_this.emit('activate', eventArgs)) {
                _this.currentStep = currentIdx;
                _this.owner['currentStepChange'].emit(currentIdx);
                _this.changeDetector.detectChanges();
            }
        });
    };
    StepperService.prototype.validateSteps = function () {
        this.triggerValidation.emit();
    };
    StepperService.prototype.keydown = function (e) {
        var current = this.focusedStep || this.currentStep;
        var handler = this.handlers[e.keyCode];
        if (!isPresent(current)) {
            return;
        }
        if (handler) {
            e.preventDefault();
            this[handler](e);
        }
    };
    StepperService.prototype.left = function () {
        if (!this.isHorizontal) {
            return;
        }
        this.focusPrevStep();
    };
    StepperService.prototype.right = function () {
        if (!this.isHorizontal) {
            return;
        }
        this.focusNextStep();
    };
    StepperService.prototype.up = function () {
        if (this.isHorizontal) {
            return;
        }
        this.focusPrevStep();
    };
    StepperService.prototype.down = function () {
        if (this.isHorizontal) {
            return;
        }
        this.focusNextStep();
    };
    StepperService.prototype.home = function () {
        this.focusedStep = 0;
        this.focusedStepChange.emit();
    };
    StepperService.prototype.end = function () {
        this.focusedStep = this.owner.steps.length - 1;
        this.focusedStepChange.emit();
    };
    StepperService.prototype.enter = function (event) {
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
    };
    StepperService.prototype.focus = function (focusedIdx) {
        this.focusedStep = focusedIdx;
    };
    StepperService.prototype.focusNextStep = function () {
        if (this.focusedStep < this.owner.steps.length) {
            this.focusedStep += 1;
            this.focusedStepChange.emit();
        }
    };
    StepperService.prototype.focusPrevStep = function () {
        if (this.focusedStep > 0) {
            this.focusedStep -= 1;
            this.focusedStepChange.emit();
        }
    };
    StepperService.prototype.isStepDisabled = function (index) {
        return this.owner.steps[index].disabled;
    };
    StepperService.prototype.isPrevOrNextStep = function (index) {
        return index === this.currentStep + 1 || index === this.currentStep - 1;
    };
    Object.defineProperty(StepperService.prototype, "isHorizontal", {
        get: function () {
            return this.owner.orientation === 'horizontal';
        },
        enumerable: true,
        configurable: true
    });
    StepperService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    StepperService.ctorParameters = function () { return [
        { type: LocalizationService },
        { type: NgZone },
        { type: ChangeDetectorRef }
    ]; };
    return StepperService;
}());

var DEFAULT_ANIMATION_DURATION = 400;
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
var StepperComponent = /** @class */ (function () {
    function StepperComponent(renderer, elem, localization, stepperService) {
        var _this = this;
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
        this.dynamicRTLSubscription = this.localization.changes.subscribe(function (_a) {
            var rtl = _a.rtl;
            _this.direction = rtl ? 'rtl' : 'ltr';
        });
        this.stepperService.owner = this;
    }
    Object.defineProperty(StepperComponent.prototype, "linearClass", {
        get: function () {
            return this.linear;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StepperComponent.prototype, "currentStep", {
        get: function () {
            return this.stepperService.currentStep;
        },
        /**
         * The index of the current step.
         */
        set: function (value) {
            this.stepperService.currentStep = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StepperComponent.prototype, "steps", {
        get: function () {
            return this._steps;
        },
        /**
         * The collection of steps that will be rendered in the Stepper.
         * ([see example]({% slug step_appearance_stepper %}))
         */
        set: function (steps) {
            if (isPresent(steps) && steps.length > 0) {
                this._steps = steps;
            }
        },
        enumerable: true,
        configurable: true
    });
    StepperComponent.prototype.ngOnInit = function () {
        this.applyHostStyling();
    };
    StepperComponent.prototype.ngOnChanges = function (changes) {
        if (changes.steps && !changes.steps.firstChange) {
            this.applyHostStyling();
        }
    };
    StepperComponent.prototype.ngOnDestroy = function () {
        if (this.dynamicRTLSubscription) {
            this.dynamicRTLSubscription.unsubscribe();
        }
    };
    /**
     * Manually triggers the validity check configured by the [isValid]({% slug api_layout_stepperstep %}#toc-isvalid) property of the steps.
     *
     * Steps that have their [validate]({% slug api_layout_stepperstep %}#toc-validate) property set to `false`, will not be validated.
     */
    StepperComponent.prototype.validateSteps = function () {
        this.stepperService.validateSteps();
    };
    StepperComponent.prototype.applyHostStyling = function () {
        var stepFramesStyle = this.orientation === 'horizontal' ? 'grid-template-columns' : 'grid-template-rows';
        var stepFramesValue = "repeat(" + this.steps.length * 2 + ", 1fr)";
        this.renderer.setStyle(this.elem.nativeElement, stepFramesStyle, stepFramesValue);
    };
    Object.defineProperty(StepperComponent.prototype, "progressAnimation", {
        /**
         * @hidden
         */
        get: function () {
            return { duration: this.animationDuration };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StepperComponent.prototype, "animationDuration", {
        /**
         * @hidden
         */
        get: function () {
            if (typeof this.animation === 'number') {
                return this.animation;
            }
            if (typeof this.animation === 'boolean' && this.animation) {
                return DEFAULT_ANIMATION_DURATION;
            }
            return 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StepperComponent.prototype, "stepsListStyling", {
        /**
         * @hidden
         */
        get: function () {
            if (this.orientation === 'horizontal') {
                return { 'grid-column-start': 1, 'grid-column-end': -1 };
            }
            return { 'grid-row-start': 1, 'grid-row-end': -1 };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StepperComponent.prototype, "progressBarStyling", {
        /**
         * @hidden
         */
        get: function () {
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
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StepperComponent.prototype, "isHorizontal", {
        /***
         * @hidden
         */
        get: function () {
            return this.stepperService.isHorizontal;
        },
        enumerable: true,
        configurable: true
    });
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
                    template: "\n        <ng-container kendoStepperLocalizedMessages\n            i18n-optional=\"kendo.stepper.optional|The text for the optional segment of the step label\"\n            optional=\"Optional\"\n         >\n        </ng-container>\n        <ol kendoStepperList\n            [stepType]='stepType'\n            [linear]='linear'\n            [orientation]='orientation'\n            [steps]='steps'\n            [currentStep]='currentStep'\n            [successIcon]='successIcon'\n            [errorIcon]='errorIcon'\n            [indicatorTemplate]='indicatorTemplate?.templateRef'\n            [labelTemplate]='labelTemplate?.templateRef'\n            [stepTemplate]='stepTemplate?.templateRef'\n            class='k-step-list'\n            [class.k-step-list-horizontal]='isHorizontal'\n            [class.k-step-list-vertical]='!isHorizontal'\n            [ngStyle]='stepsListStyling'>\n        </ol>\n\n        <kendo-progressbar *ngIf='steps.length > 0'\n            [attr.aria-hidden]='true'\n            [animation]='progressAnimation'\n            [max]='steps.length - 1'\n            [label]='false'\n            [orientation]='orientation'\n            [reverse]='!isHorizontal'\n            [value]='currentStep'\n            [ngStyle]='progressBarStyling'>\n        </kendo-progressbar>\n    "
                },] },
    ];
    /** @nocollapse */
    StepperComponent.ctorParameters = function () { return [
        { type: Renderer2 },
        { type: ElementRef },
        { type: LocalizationService },
        { type: StepperService }
    ]; };
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
    return StepperComponent;
}());

var SIZE_CLASSES = {
    'small': 'k-avatar-sm',
    'medium': 'k-avatar-md',
    'large': 'k-avatar-lg'
};
var SHAPE_CLASSES = {
    'circle': 'k-avatar-circle',
    'square': 'k-avatar-square',
    'rectangle': 'k-avatar-rectangle',
    'rounded': 'k-avatar-rounded'
};
/**
 * Displays images, icons or initials representing people or other entities.
 */
var AvatarComponent = /** @class */ (function () {
    function AvatarComponent(renderer, element) {
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
    Object.defineProperty(AvatarComponent.prototype, "solidClass", {
        /**
         * @hidden
         */
        get: function () {
            return this.fill === 'solid';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AvatarComponent.prototype, "outlineClass", {
        /**
         * @hidden
         */
        get: function () {
            return this.fill === 'outline';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AvatarComponent.prototype, "borderClass", {
        /**
         * @hidden
         */
        get: function () {
            return this.border;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AvatarComponent.prototype, "flexBasis", {
        /**
         * @hidden
         */
        get: function () {
            return this.width;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AvatarComponent.prototype, "shape", {
        get: function () {
            return this._shape;
        },
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
        set: function (shape) {
            this.renderer.removeClass(this.avatar, SHAPE_CLASSES[this.shape]);
            this.renderer.addClass(this.avatar, SHAPE_CLASSES[shape]);
            this._shape = shape;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AvatarComponent.prototype, "size", {
        get: function () {
            return this._size;
        },
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
        set: function (size) {
            this.renderer.removeClass(this.avatar, SIZE_CLASSES[this.size]);
            this.renderer.addClass(this.avatar, SIZE_CLASSES[size]);
            this._size = size;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AvatarComponent.prototype, "themeColor", {
        get: function () {
            return this._themeColor;
        },
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
        set: function (themeColor) {
            this.renderer.removeClass(this.avatar, "k-avatar-" + this.themeColor);
            this.renderer.addClass(this.avatar, "k-avatar-" + themeColor);
            this._themeColor = themeColor;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AvatarComponent.prototype, "avatarWidth", {
        /**
         * @hidden
         */
        get: function () {
            return this.width;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AvatarComponent.prototype, "avatarHeight", {
        /**
         * @hidden
         */
        get: function () {
            return this.height;
        },
        enumerable: true,
        configurable: true
    });
    AvatarComponent.prototype.ngAfterViewInit = function () {
        this.setAvatarClasses();
    };
    Object.defineProperty(AvatarComponent.prototype, "imageUrl", {
        /**
         * @hidden
         */
        get: function () {
            return "url(" + this.imageSrc + ")";
        },
        enumerable: true,
        configurable: true
    });
    AvatarComponent.prototype.ngOnInit = function () {
        this.verifyProperties();
    };
    /**
     * @hidden
     */
    AvatarComponent.prototype.iconClasses = function () {
        if (this.icon) {
            return "k-icon k-i-" + this.icon;
        }
        if (this.iconClass) {
            return "" + this.iconClass;
        }
    };
    Object.defineProperty(AvatarComponent.prototype, "customAvatar", {
        /**
         * @hidden
         */
        get: function () {
            return !(this.imageSrc || this.initials || this.icon || this.iconClass);
        },
        enumerable: true,
        configurable: true
    });
    AvatarComponent.prototype.verifyProperties = function () {
        if (!isDevMode()) {
            return;
        }
        var inputs = [this.icon || this.iconClass, this.imageSrc, this.initials];
        var inputsLength = inputs.filter(function (value) { return value; }).length;
        if (inputsLength > 1) {
            throw new Error("\n                Invalid property configuration given.\n                The kendo-avatar component can accept only one of:\n                icon, imageSrc or initials properties.\n            ");
        }
    };
    AvatarComponent.prototype.setAvatarClasses = function () {
        this.renderer.addClass(this.avatar, SHAPE_CLASSES[this.shape]);
        this.renderer.addClass(this.avatar, "k-avatar-" + this.themeColor);
        this.renderer.addClass(this.avatar, SIZE_CLASSES[this.size]);
    };
    AvatarComponent.decorators = [
        { type: Component, args: [{
                    selector: 'kendo-avatar',
                    template: "\n        <ng-content *ngIf=\"customAvatar\"></ng-content>\n\n        <ng-container *ngIf=\"imageSrc\">\n            <div class=\"k-avatar-image\" [ngStyle]=\"cssStyle\" [style.backgroundImage]=\"imageUrl\"></div>\n        </ng-container>\n\n        <ng-container *ngIf=\"initials\">\n            <span class=\"k-avatar-text\" [ngStyle]=\"cssStyle\">{{ initials.substring(0, 2) }}</span>\n        </ng-container>\n\n        <ng-container *ngIf=\"icon || iconClass\">\n            <span class=\"k-avatar-icon\" [ngStyle]=\"cssStyle\" [ngClass]=\"iconClasses()\"></span>\n        </ng-container>\n    "
                },] },
    ];
    /** @nocollapse */
    AvatarComponent.ctorParameters = function () { return [
        { type: Renderer2 },
        { type: ElementRef }
    ]; };
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
    return AvatarComponent;
}());

/**
 * Represents the [Kendo UI Card component for Angular]({% slug overview_card %})
 */
var CardComponent = /** @class */ (function () {
    function CardComponent(localizationService) {
        var _this = this;
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
        this.dynamicRTLSubscription = this.localizationService.changes.subscribe(function (_a) {
            var rtl = _a.rtl;
            _this.rtl = rtl;
            _this.direction = _this.rtl ? 'rtl' : 'ltr';
        });
    }
    Object.defineProperty(CardComponent.prototype, "widthStyle", {
        get: function () {
            return this.width;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CardComponent.prototype, "vertical", {
        get: function () {
            return this.orientation === 'vertical';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CardComponent.prototype, "horizontal", {
        get: function () {
            return this.orientation === 'horizontal';
        },
        enumerable: true,
        configurable: true
    });
    CardComponent.prototype.ngOnDestroy = function () {
        if (this.dynamicRTLSubscription) {
            this.dynamicRTLSubscription.unsubscribe();
        }
    };
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
                    template: "\n        <ng-content></ng-content>\n    "
                },] },
    ];
    /** @nocollapse */
    CardComponent.ctorParameters = function () { return [
        { type: LocalizationService }
    ]; };
    CardComponent.propDecorators = {
        hostClass: [{ type: HostBinding, args: ['class.k-widget',] }, { type: HostBinding, args: ['class.k-card',] }],
        widthStyle: [{ type: HostBinding, args: ['style.width',] }],
        vertical: [{ type: HostBinding, args: ['class.k-card-vertical',] }],
        horizontal: [{ type: HostBinding, args: ['class.k-card-horizontal',] }],
        direction: [{ type: HostBinding, args: ['attr.dir',] }],
        orientation: [{ type: Input }],
        width: [{ type: Input }]
    };
    return CardComponent;
}());

/**
 * Specifies the content in the Card header.
 */
var CardHeaderComponent = /** @class */ (function () {
    function CardHeaderComponent() {
        this.hostClass = true;
    }
    CardHeaderComponent.decorators = [
        { type: Component, args: [{
                    selector: 'kendo-card-header',
                    template: "\n        <ng-content></ng-content>\n    "
                },] },
    ];
    CardHeaderComponent.propDecorators = {
        hostClass: [{ type: HostBinding, args: ['class.k-card-header',] }]
    };
    return CardHeaderComponent;
}());

/**
 * Specifies the content in the Card body.
 */
var CardBodyComponent = /** @class */ (function () {
    function CardBodyComponent() {
        this.hostClass = true;
    }
    CardBodyComponent.decorators = [
        { type: Component, args: [{
                    selector: 'kendo-card-body',
                    template: "\n        <ng-content></ng-content>\n    "
                },] },
    ];
    CardBodyComponent.propDecorators = {
        hostClass: [{ type: HostBinding, args: ['class.k-card-body',] }]
    };
    return CardBodyComponent;
}());

/**
 * Specifies the content in the Card footer.
 */
var CardFooterComponent = /** @class */ (function () {
    function CardFooterComponent() {
        this.hostClass = true;
    }
    CardFooterComponent.decorators = [
        { type: Component, args: [{
                    selector: 'kendo-card-footer',
                    template: "\n        <ng-content></ng-content>\n    "
                },] },
    ];
    CardFooterComponent.propDecorators = {
        hostClass: [{ type: HostBinding, args: ['class.k-card-footer',] }]
    };
    return CardFooterComponent;
}());

/**
 * Specifies the action buttons of the Card.
 * * ([see example]({% slug actions_card %})).
 */
var CardActionsComponent = /** @class */ (function () {
    function CardActionsComponent() {
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
    Object.defineProperty(CardActionsComponent.prototype, "stretchedClass", {
        get: function () {
            return this.layout === 'stretched';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CardActionsComponent.prototype, "startClass", {
        get: function () {
            return this.layout === 'start';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CardActionsComponent.prototype, "endClass", {
        get: function () {
            return this.layout === 'end';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CardActionsComponent.prototype, "centerClass", {
        get: function () {
            return this.layout === 'center';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CardActionsComponent.prototype, "verticalClass", {
        get: function () {
            return this.orientation === 'vertical';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CardActionsComponent.prototype, "horizontalClass", {
        get: function () {
            return this.orientation === 'horizontal';
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @hidden
     */
    CardActionsComponent.prototype.onClick = function (action) {
        this.action.emit(action);
    };
    /**
     * @hidden
     */
    CardActionsComponent.prototype.actionTemplate = function () {
        return this.actions instanceof TemplateRef;
    };
    CardActionsComponent.decorators = [
        { type: Component, args: [{
                    selector: 'kendo-card-actions',
                    template: "\n        <ng-content *ngIf=\"!actions\"></ng-content>\n\n        <ng-container *ngIf=\"!actionTemplate()\">\n            <button type=\"button\"\n                class=\"k-button\"\n                [class.k-primary]=\"action.primary\"\n                [class.k-flat]=\"action.flat\"\n                (click)=\"onClick(action)\"\n                *ngFor=\"let action of actions\"\n            >\n                {{ action.text }}\n            </button>\n        </ng-container>\n\n        <ng-template [ngTemplateOutlet]=\"actions\" *ngIf=\"actionTemplate()\"></ng-template>\n    "
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
    return CardActionsComponent;
}());

/**
 * Specifies a separator in the content of the Card.
 */
var CardSeparatorDirective = /** @class */ (function () {
    function CardSeparatorDirective() {
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
    Object.defineProperty(CardSeparatorDirective.prototype, "verticalClass", {
        get: function () {
            return this.orientation === 'vertical';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CardSeparatorDirective.prototype, "horizontalClass", {
        get: function () {
            return this.orientation === 'horizontal';
        },
        enumerable: true,
        configurable: true
    });
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
    return CardSeparatorDirective;
}());

/**
 * Specifies the text and styles for the title of the Card.
 */
var CardTitleDirective = /** @class */ (function () {
    function CardTitleDirective() {
        this.hostClass = true;
    }
    CardTitleDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[kendoCardTitle]'
                },] },
    ];
    CardTitleDirective.propDecorators = {
        hostClass: [{ type: HostBinding, args: ['class.k-card-title',] }]
    };
    return CardTitleDirective;
}());

/**
 * Specifies the text and styles for the subtitle of the Card.
 */
var CardSubtitleDirective = /** @class */ (function () {
    function CardSubtitleDirective() {
        this.hostClass = true;
    }
    CardSubtitleDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[kendoCardSubtitle]'
                },] },
    ];
    CardSubtitleDirective.propDecorators = {
        hostClass: [{ type: HostBinding, args: ['class.k-card-subtitle',] }]
    };
    return CardSubtitleDirective;
}());

/**
 * Specifies any media that will be displayed and aligned in the Card.
 */
var CardMediaDirective = /** @class */ (function () {
    function CardMediaDirective() {
        this.hostClass = true;
    }
    CardMediaDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[kendoCardMedia]'
                },] },
    ];
    CardMediaDirective.propDecorators = {
        hostClass: [{ type: HostBinding, args: ['class.k-card-media',] }]
    };
    return CardMediaDirective;
}());

/**
 * The settings of the Card action buttons.
 */
var CardAction = /** @class */ (function () {
    function CardAction() {
    }
    return CardAction;
}());

var exportedModules = [
    AvatarComponent
];
var declarations = exportedModules.slice();
/**
 * Represents the [NgModule]({{ site.data.urls.angular['ngmoduleapi'] }})
 * definition for the Avatar component.
 */
var AvatarModule = /** @class */ (function () {
    function AvatarModule() {
    }
    AvatarModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [declarations],
                    exports: [exportedModules],
                    imports: [CommonModule]
                },] },
    ];
    return AvatarModule;
}());

var cardDirectives = [
    CardTitleDirective,
    CardSubtitleDirective,
    CardSeparatorDirective,
    CardMediaDirective
];
var exportedModules$1 = [
    CardComponent,
    CardHeaderComponent,
    CardBodyComponent,
    CardFooterComponent,
    CardActionsComponent
].concat(cardDirectives);
var declarations$1 = exportedModules$1.slice();
/**
 * Represents the [NgModule]({{ site.data.urls.angular['ngmoduleapi'] }})
 * definition for the Card component.
 */
var CardModule = /** @class */ (function () {
    function CardModule() {
    }
    CardModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [declarations$1],
                    exports: [exportedModules$1],
                    imports: [CommonModule]
                },] },
    ];
    return CardModule;
}());

/**
 * @hidden
 */
var DRAWER_LINK_SELECTOR = '.k-drawer-link';
/**
 * @hidden
 */
var ACTIVE_NESTED_LINK_SELECTOR = ':focus:not(.k-state-disabled) .k-drawer-link';
/**
 * @hidden
 */
var nestedLink = function (element, selector) { return element.querySelector(selector); };

/**
 * @hidden
 */
var DrawerItemComponent = /** @class */ (function () {
    function DrawerItemComponent(drawer, element, renderer) {
        this.drawer = drawer;
        this.element = element;
        this.renderer = renderer;
    }
    Object.defineProperty(DrawerItemComponent.prototype, "disabledClass", {
        get: function () {
            return this.item.disabled;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DrawerItemComponent.prototype, "selectedClass", {
        get: function () {
            return this.drawer.selectedIndices.indexOf(this.index) >= 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DrawerItemComponent.prototype, "label", {
        get: function () {
            return this.item.text ? this.item.text : null;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @hidden
     */
    DrawerItemComponent.prototype.ngAfterViewInit = function () {
        var link = nestedLink(this.element.nativeElement, DRAWER_LINK_SELECTOR);
        if (link) {
            this.renderer.removeAttribute(link, 'tabindex');
        }
    };
    /**
     * @hidden
     */
    DrawerItemComponent.prototype.iconClasses = function (icon) {
        return "k-icon " + icon;
    };
    DrawerItemComponent.decorators = [
        { type: Component, args: [{
                    selector: '[kendoDrawerItem]',
                    template: "\n        <ng-template *ngIf=\"itemTemplate; else defaultTemplate\"\n            [ngTemplateOutlet]=\"itemTemplate\"\n            [ngTemplateOutletContext]=\"{ $implicit: item }\">\n        </ng-template>\n\n        <ng-template #defaultTemplate>\n            <ng-container *ngIf=\"expanded\">\n                <span [ngClass]=\"iconClasses(item.icon)\"></span>\n                <span class=\"k-item-text\">{{ item.text }}</span>\n            </ng-container>\n            <ng-container *ngIf=\"mini && !expanded\">\n                <span [ngClass]=\"iconClasses(item.icon)\"></span>\n            </ng-container>\n        </ng-template>\n    "
                },] },
    ];
    /** @nocollapse */
    DrawerItemComponent.ctorParameters = function () { return [
        { type: DrawerService },
        { type: ElementRef },
        { type: Renderer2 }
    ]; };
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
    return DrawerItemComponent;
}());

/**
 * @hidden
 */
var DRAWER_ITEM_INDEX = 'data-kendo-drawer-index';

/**
 * @hidden
 */
var DrawerListComponent = /** @class */ (function () {
    function DrawerListComponent(drawerService, renderer, ngZone, changeDetector, element) {
        this.drawerService = drawerService;
        this.renderer = renderer;
        this.ngZone = ngZone;
        this.changeDetector = changeDetector;
        this.element = element;
        this.subscriptions = new Subscription();
    }
    DrawerListComponent.prototype.ngOnInit = function () {
        this.initialSelection();
        this.initDomEvents();
    };
    DrawerListComponent.prototype.ngOnDestroy = function () {
        this.subscriptions.unsubscribe();
    };
    DrawerListComponent.prototype.initialSelection = function () {
        /* Differentiates a user selected item */
        if (this.drawerService.selectedIndices.length === 0) {
            this.drawerService.initSelection();
        }
    };
    DrawerListComponent.prototype.initDomEvents = function () {
        var _this = this;
        if (!this.element) {
            return;
        }
        this.ngZone.runOutsideAngular(function () {
            var nativeElement = _this.element.nativeElement;
            _this.subscriptions.add(_this.renderer.listen(nativeElement, 'click', _this.clickHandler.bind(_this)));
            _this.subscriptions.add(_this.renderer.listen(nativeElement, 'keydown', _this.keyDownHandler.bind(_this)));
        });
    };
    DrawerListComponent.prototype.clickHandler = function (e) {
        var _this = this;
        var itemIdx = this.getDrawerItemIndex(e.target);
        var item = this.items[itemIdx];
        if (!item) {
            return;
        }
        if (item.disabled) {
            e.preventDefault();
            return;
        }
        var args = {
            index: itemIdx,
            item: item,
            originalEvent: e
        };
        this.ngZone.run(function () {
            if (!_this.drawerService.emit('select', args)) {
                _this.drawerService.onSelect(itemIdx);
                _this.changeDetector.detectChanges();
            }
        });
    };
    DrawerListComponent.prototype.keyDownHandler = function (e) {
        var isEnterOrSpace = e.keyCode === Keys.Enter || e.keyCode === Keys.Space;
        if (!isEnterOrSpace) {
            return;
        }
        this.clickHandler(e);
        var link = nestedLink(this.element.nativeElement, ACTIVE_NESTED_LINK_SELECTOR);
        if (link) {
            link.click();
        }
        return false;
    };
    DrawerListComponent.prototype.getDrawerItemIndex = function (target) {
        var item = closestItem(target, DRAWER_ITEM_INDEX, this.element.nativeElement);
        if (item) {
            return itemIndex(item, DRAWER_ITEM_INDEX);
        }
    };
    DrawerListComponent.decorators = [
        { type: Component, args: [{
                    selector: '[kendoDrawerList]',
                    template: "\n        <ng-container *ngFor=\"let item of items; let idx = index\">\n            <li *ngIf=\"!item.separator\" kendoDrawerItem\n                class=\"k-drawer-item\"\n                [item]=\"item\"\n                [index]=\"idx\"\n                [mini]=\"mini\"\n                [expanded]=\"expanded\"\n                [itemTemplate]=\"itemTemplate\"\n                [attr." + DRAWER_ITEM_INDEX + "]=\"idx\"\n                [ngClass]=\"item.cssClass\"\n                [ngStyle]=\"item.cssStyle\"\n                tabindex=\"0\">\n            </li>\n\n            <li *ngIf=\"item.separator\"\n                class=\"k-drawer-item k-drawer-separator\"\n                [ngClass]=\"item.cssClass\"\n                [ngStyle]=\"item.cssStyle\">\n                &nbsp;\n            </li>\n        </ng-container>\n    "
                },] },
    ];
    /** @nocollapse */
    DrawerListComponent.ctorParameters = function () { return [
        { type: DrawerService },
        { type: Renderer2 },
        { type: NgZone },
        { type: ChangeDetectorRef },
        { type: ElementRef }
    ]; };
    DrawerListComponent.propDecorators = {
        items: [{ type: Input }],
        itemTemplate: [{ type: Input }],
        mini: [{ type: Input }],
        expanded: [{ type: Input }]
    };
    return DrawerListComponent;
}());

var templateDirectives = [
    DrawerTemplateDirective,
    DrawerHeaderTemplateDirective,
    DrawerFooterTemplateDirective,
    DrawerItemTemplateDirective
];
var exportedModules$2 = [
    DrawerComponent,
    DrawerContainerComponent,
    DrawerContentComponent
].concat(templateDirectives);
var declarations$2 = [
    DrawerItemComponent,
    DrawerListComponent
].concat(exportedModules$2);
/**
 * Represents the [NgModule]({{ site.data.urls.angular['ngmoduleapi'] }})
 * definition for the Drawer component.
 */
var DrawerModule = /** @class */ (function () {
    function DrawerModule() {
    }
    DrawerModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [declarations$2],
                    exports: [exportedModules$2],
                    imports: [CommonModule]
                },] },
    ];
    return DrawerModule;
}());

var exportedModules$3 = [
    PanelBarComponent,
    PanelBarItemComponent,
    PanelBarContentDirective,
    PanelBarItemTemplateDirective,
    PanelBarItemTitleDirective
];
var declarations$3 = exportedModules$3.slice();
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
var PanelBarModule = /** @class */ (function () {
    function PanelBarModule() {
    }
    PanelBarModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [declarations$3],
                    exports: [exportedModules$3],
                    imports: [CommonModule]
                },] },
    ];
    return PanelBarModule;
}());

var stopPropagation = function (_a) {
    var event = _a.originalEvent;
    event.stopPropagation();
    event.preventDefault();
};
var preventOnDblClick = function (release) { return function (mouseDown) {
    return of(mouseDown).pipe(delay(150), takeUntil(release));
}; };
var classFromObject = function (classes) { return Object.keys(classes).filter(function (c) { return classes[c]; }).join(' '); };
var createMoveStream = function (draggable) { return function (mouseDown) {
    return draggable.kendoDrag
        .pipe(takeUntil(draggable.kendoRelease), map(function (_a) {
        var pageX = _a.pageX, pageY = _a.pageY;
        return ({
            originalX: mouseDown.pageX,
            originalY: mouseDown.pageY,
            pageX: pageX,
            pageY: pageY
        });
    }));
}; };
/**
 * @hidden
 */
var SplitterBarComponent = /** @class */ (function () {
    function SplitterBarComponent(draggable, splitter, localization) {
        this.draggable = draggable;
        this.splitter = splitter;
        this.localization = localization;
        this.orientation = 'horizontal';
        this.index = 0;
        this.ariaRole = 'separator';
        this.focused = false;
        this.subscriptions = new Subscription();
    }
    Object.defineProperty(SplitterBarComponent.prototype, "direction", {
        get: function () {
            return this.localization.rtl ? 'rtl' : 'ltr';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SplitterBarComponent.prototype, "tabIndex", {
        get: function () {
            return this.splitter.isStatic(this.index) ? -1 : 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SplitterBarComponent.prototype, "hostClasses", {
        get: function () {
            var isHorizontal = this.orientation === 'horizontal';
            var isDraggable = this.splitter.isDraggable(this.index);
            var isStatic = this.splitter.isStatic(this.index);
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
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SplitterBarComponent.prototype, "touchAction", {
        get: function () {
            if (this.splitter.isDraggable(this.index)) {
                return 'none';
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SplitterBarComponent.prototype, "order", {
        get: function () {
            return 2 * this.index + 1;
        },
        enumerable: true,
        configurable: true
    });
    SplitterBarComponent.prototype.collapseAny = function () {
        if (this.expandLast) {
            this.toggleNext();
        }
        else {
            this.tryToggleNearest();
        }
    };
    SplitterBarComponent.prototype.onFocusIn = function () {
        this.focused = true;
    };
    SplitterBarComponent.prototype.onFocusOut = function () {
        this.focused = false;
    };
    SplitterBarComponent.prototype.onKeyDown = function (event) {
        var _this = this;
        var keyCode = event && event.keyCode;
        var isHorizontal = this.orientation === 'horizontal';
        var resize = function (delta) {
            event.preventDefault();
            var state$$1 = _this.splitter.dragState(_this.index);
            _this.splitter.setSize(state$$1, delta);
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
    };
    Object.defineProperty(SplitterBarComponent.prototype, "expandLast", {
        get: function () {
            var panes = this.splitter.panes;
            return panes.length === 2 && panes[1].collapsed;
        },
        enumerable: true,
        configurable: true
    });
    SplitterBarComponent.prototype.ngOnInit = function () {
        var _this = this;
        var state$$1;
        var listener = this.draggable.kendoPress.pipe(tap(stopPropagation), filter(function () { return _this.splitter.isDraggable(_this.index); }), tap(function () { return state$$1 = _this.splitter.dragState(_this.index); }), tap(function () { return _this.splitter.toggleContentOverlay(_this.index, true); }), switchMap(preventOnDblClick(this.draggable.kendoRelease)), switchMap(createMoveStream(this.draggable))).subscribe(function (_a) {
            var pageX = _a.pageX, pageY = _a.pageY, originalX = _a.originalX, originalY = _a.originalY;
            var delta;
            if (_this.orientation === 'vertical') {
                delta = pageY - originalY;
            }
            else if (_this.direction === 'rtl') {
                delta = originalX - pageX;
            }
            else {
                delta = pageX - originalX;
            }
            _this.splitter.setSize(state$$1, delta);
        });
        this.subscriptions.add(listener);
        this.subscriptions.add(this.draggable.kendoRelease.subscribe(function () { return _this.splitter.toggleContentOverlay(_this.index, false); }));
    };
    SplitterBarComponent.prototype.ngOnDestroy = function () {
        if (this.subscriptions) {
            this.subscriptions.unsubscribe();
        }
    };
    SplitterBarComponent.prototype.togglePrevious = function () {
        this.splitter.tryToggle(this.index);
    };
    SplitterBarComponent.prototype.toggleNext = function () {
        this.splitter.tryToggle(this.index + 1);
    };
    SplitterBarComponent.prototype.previousArrowClass = function () {
        var pane = this.splitter.pane(this.index);
        var nextPane = this.splitter.pane(this.index + 1);
        var isCollapsible = pane.collapsible;
        var isCollapsed = pane.collapsed;
        var isHorizontal = this.orientation === 'horizontal';
        return classFromObject({
            'k-icon': true,
            'k-hidden': !isCollapsible || nextPane.isHidden,
            'k-collapse-prev': isCollapsible,
            'k-i-arrow-60-left': isCollapsible && isHorizontal && !isCollapsed,
            'k-i-arrow-60-right': isCollapsible && isHorizontal && isCollapsed,
            'k-i-arrow-60-up': isCollapsible && !isHorizontal && !isCollapsed,
            'k-i-arrow-60-down': isCollapsible && !isHorizontal && isCollapsed
        });
    };
    SplitterBarComponent.prototype.nextArrowClass = function () {
        var pane = this.splitter.pane(this.index + 1);
        var prevPane = this.splitter.pane(this.index);
        var isCollapsible = pane.collapsible;
        var isCollapsed = pane.collapsed;
        var isHorizontal = this.orientation === 'horizontal';
        return classFromObject({
            'k-icon': true,
            'k-hidden': !isCollapsible || prevPane.isHidden,
            'k-collapse-next': isCollapsible,
            'k-i-arrow-60-right': isCollapsible && isHorizontal && !isCollapsed,
            'k-i-arrow-60-left': isCollapsible && isHorizontal && isCollapsed,
            'k-i-arrow-60-down': isCollapsible && !isHorizontal && !isCollapsed,
            'k-i-arrow-60-up': isCollapsible && !isHorizontal && isCollapsed
        });
    };
    SplitterBarComponent.prototype.tryToggleNearest = function () {
        var prev = this.index;
        var next = this.index + 1;
        if (!this.splitter.tryToggle(prev)) {
            this.splitter.tryToggle(next);
        }
    };
    SplitterBarComponent.decorators = [
        { type: Component, args: [{
                    selector: 'kendo-splitter-bar',
                    template: "\n      <div [class]=\"previousArrowClass()\" (click)=\"togglePrevious()\"></div>\n      <div class=\"k-resize-handle\"></div>\n      <div [class]=\"nextArrowClass()\" (click)=\"toggleNext()\"></div>\n    "
                },] },
    ];
    /** @nocollapse */
    SplitterBarComponent.ctorParameters = function () { return [
        { type: DraggableDirective, decorators: [{ type: Host }] },
        { type: SplitterService },
        { type: LocalizationService }
    ]; };
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
    return SplitterBarComponent;
}());

var exportedModules$4 = [
    SplitterComponent,
    SplitterPaneComponent
];
var declarations$4 = [
    SplitterBarComponent
].concat(exportedModules$4);
/**
 * Represents the [NgModule]({{ site.data.urls.angular['ngmoduleapi'] }})
 * definition for the Splitter component.
 *
 * The module registers:
 * - `SplitterComponent`&mdash;The `Splitter` component class.
 * - `SplitterPaneComponent`&mdash;The `SplitterPane` component class.
 */
var SplitterModule = /** @class */ (function () {
    function SplitterModule() {
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
    return SplitterModule;
}());

/**
 * @hidden
 */
var StepperStepComponent = /** @class */ (function () {
    function StepperStepComponent(service, localization, ngZone) {
        var _this = this;
        this.service = service;
        this.localization = localization;
        this.ngZone = ngZone;
        this.isStepValid = undefined;
        this.shouldCheckValidity = undefined;
        this.subs = this.service.focusedStepChange.subscribe(function () {
            _this.onFocusedStepChange();
        });
        this.subs.add(this.service.triggerValidation.subscribe(function () {
            _this.handleValidityChecks();
        }));
    }
    Object.defineProperty(StepperStepComponent.prototype, "errorStepClass", {
        get: function () {
            if (isPresent(this.isStepValid)) {
                return !this.isStepValid;
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StepperStepComponent.prototype, "successStepClass", {
        get: function () {
            if (isPresent(this.isStepValid)) {
                return this.isStepValid;
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    StepperStepComponent.prototype.ngOnInit = function () {
        this.handleValidityChecks();
    };
    StepperStepComponent.prototype.ngOnChanges = function (changes) {
        if (changes.current && !changes.current.firstChange) {
            this.handleValidityChecks();
        }
    };
    StepperStepComponent.prototype.ngOnDestroy = function () {
        if (this.subs) {
            this.subs.unsubscribe();
        }
    };
    StepperStepComponent.prototype.onFocusedStepChange = function () {
        var _this = this;
        this.ngZone.runOutsideAngular(function () {
            if (_this.index === _this.service.focusedStep) {
                _this.stepLink.nativeElement.focus();
            }
        });
    };
    StepperStepComponent.prototype.onFocus = function () {
        this.service.focus(this.index);
    };
    Object.defineProperty(StepperStepComponent.prototype, "tabIndexAttr", {
        get: function () {
            var active = this.service.focusedStep || this.service.currentStep;
            return this.index === active ? 0 : -1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StepperStepComponent.prototype, "indicatorIconClasses", {
        get: function () {
            if (this.step.icon) {
                return "k-icon k-i-" + this.step.icon;
            }
            if (this.step.iconClass) {
                return "" + this.step.iconClass;
            }
            if (this.shouldCheckValidity) {
                return this.validationIconClasses;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StepperStepComponent.prototype, "showIndicatorIcon", {
        get: function () {
            if (this.shouldCheckValidity) {
                return true;
            }
            if (this.step.icon || this.step.iconClass) {
                return true;
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StepperStepComponent.prototype, "showLabelIcon", {
        get: function () {
            if (this.shouldCheckValidity) {
                if (this.type === 'label') {
                    return true;
                }
                if (this.step.icon || this.step.iconClass) {
                    return true;
                }
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StepperStepComponent.prototype, "showLabelText", {
        get: function () {
            return this.type === 'label' || this.type === 'full';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StepperStepComponent.prototype, "validationIconClasses", {
        get: function () {
            if (this.isStepValid) {
                return this.successIcon ? "" + this.successIcon : 'k-icon k-i-check';
            }
            else {
                return this.errorIcon ? "" + this.errorIcon : 'k-icon k-i-warning';
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StepperStepComponent.prototype, "indicatorText", {
        get: function () {
            var text = this.step.text;
            return text ? text : this.index + 1;
        },
        enumerable: true,
        configurable: true
    });
    StepperStepComponent.prototype.updateStepValidity = function () {
        if (typeof this.step.isValid === 'boolean') {
            return this.step.isValid;
        }
        if (typeof this.step.isValid === 'function') {
            return this.step.isValid(this.index);
        }
        return undefined;
    };
    Object.defineProperty(StepperStepComponent.prototype, "showIndicator", {
        get: function () {
            return this.type === 'indicator' || this.type === 'full';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StepperStepComponent.prototype, "showLabel", {
        get: function () {
            if (this.type === 'label' || this.type === 'full') {
                return true;
            }
            return this.step.optional;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StepperStepComponent.prototype, "optionalText", {
        get: function () {
            return this.localization.get('optional');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StepperStepComponent.prototype, "transitionDuration", {
        get: function () {
            return this.service.owner.animationDuration;
        },
        enumerable: true,
        configurable: true
    });
    StepperStepComponent.prototype._shouldCheckValidity = function () {
        if (isPresent(this.step.validate)) {
            if (typeof this.step.validate === 'boolean') {
                return this.step.validate;
            }
            if (typeof this.step.validate === 'function') {
                return this.step.validate(this.index);
            }
        }
        return isPresent(this.step.isValid) && this.index < this.current;
    };
    StepperStepComponent.prototype.handleValidityChecks = function () {
        this.isStepValid = undefined;
        this.shouldCheckValidity = this._shouldCheckValidity();
        if (this.shouldCheckValidity) {
            this.isStepValid = this.updateStepValidity();
        }
    };
    StepperStepComponent.decorators = [
        { type: Component, args: [{
                    selector: '[kendoStepperStep]',
                    template: "\n        <a href='#' class='k-step-link' #stepLink\n            [attr.tabindex]='tabIndexAttr'\n            [attr.title]='step.label'\n            [attr.aria-disabled]='step.disabled'\n            [attr.aria-current]='index === current ? \"step\" : null'\n            (focus)='onFocus()'\n        >\n            <ng-template *ngIf='stepTemplate'\n                [ngTemplateOutlet]='stepTemplate'\n                [ngTemplateOutletContext]='{ $implicit: step, index: index }'>\n            </ng-template>\n\n            <ng-container *ngIf='!stepTemplate'>\n                <span *ngIf='showIndicator'\n                    class='k-step-indicator'\n                    aria-hidden='true'\n                    [style.transition-duration.ms]='transitionDuration'\n                >\n                    <ng-template *ngIf='indicatorTemplate'\n                        [ngTemplateOutlet]='indicatorTemplate'\n                        [ngTemplateOutletContext]='{ $implicit: step, index: index }'>\n                    </ng-template>\n\n                    <ng-container *ngIf='!indicatorTemplate'>\n                        <span *ngIf='showIndicatorIcon' class='k-step-indicator-icon' [ngClass]='indicatorIconClasses'></span>\n                        <span class='k-step-indicator-text' *ngIf='!showIndicatorIcon'>{{ indicatorText }}</span>\n                    </ng-container>\n                </span>\n\n                <span class='k-step-label' *ngIf='showLabel'>\n                    <ng-template *ngIf='labelTemplate'\n                        [ngTemplateOutlet]='labelTemplate'\n                        [ngTemplateOutletContext]='{ $implicit: step, index: index }'>\n                    </ng-template>\n\n                    <ng-container *ngIf='!labelTemplate'>\n                        <span class='k-step-text' *ngIf='showLabelText'>{{ step.label }}</span>\n                        <span [ngClass]='validationIconClasses' *ngIf='showLabelIcon' aria-hidden='true'></span>\n                        <span class='k-step-label-optional' *ngIf='step.optional'>({{optionalText}})</span>\n                    </ng-container>\n                </span>\n            </ng-container>\n        </a>\n    "
                },] },
    ];
    /** @nocollapse */
    StepperStepComponent.ctorParameters = function () { return [
        { type: StepperService },
        { type: LocalizationService },
        { type: NgZone }
    ]; };
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
    return StepperStepComponent;
}());

/**
 * @hidden
 */
var STEPPER_STEP_INDEX = 'data-kendo-stepper-index';

/**
 * @hidden
 */
var StepperListComponent = /** @class */ (function () {
    function StepperListComponent(renderer, ngZone, service, element) {
        this.renderer = renderer;
        this.ngZone = ngZone;
        this.service = service;
        this.element = element;
    }
    StepperListComponent.prototype.ngOnInit = function () {
        this.initDomEvents();
    };
    StepperListComponent.prototype.ngOnDestroy = function () {
        if (this.domSubs) {
            this.domSubs();
        }
    };
    Object.defineProperty(StepperListComponent.prototype, "maxStepWidth", {
        get: function () {
            return this.maxStepDimension('width');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StepperListComponent.prototype, "maxStepHeight", {
        get: function () {
            return this.maxStepDimension('height');
        },
        enumerable: true,
        configurable: true
    });
    StepperListComponent.prototype.maxStepDimension = function (dimension) {
        if (dimension === 'width' && this.orientation === 'vertical') {
            return null;
        }
        if (dimension === 'height' && this.orientation === 'horizontal') {
            return null;
        }
        return 100 / this.steps.length;
    };
    StepperListComponent.prototype.initDomEvents = function () {
        var _this = this;
        if (!this.element) {
            return;
        }
        this.ngZone.runOutsideAngular(function () {
            var nativeElement = _this.element.nativeElement;
            var clickSubscription = _this.renderer.listen(nativeElement, 'click', _this.clickHandler.bind(_this));
            var keydownSubscription = _this.renderer.listen(nativeElement, 'keydown', function (e) {
                if (hasClass(e.target, 'k-step-link')) {
                    _this.service.keydown(e);
                }
            });
            _this.domSubs = function () {
                clickSubscription();
                keydownSubscription();
            };
        });
    };
    StepperListComponent.prototype.clickHandler = function (e) {
        e.preventDefault();
        var stepIdx = this.getStepIndex(e.target);
        var step = this.steps[stepIdx];
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
    };
    StepperListComponent.prototype.getStepIndex = function (target) {
        var step = closestItem(target, STEPPER_STEP_INDEX, this.element.nativeElement);
        if (step) {
            return itemIndex(step, STEPPER_STEP_INDEX);
        }
    };
    StepperListComponent.decorators = [
        { type: Component, args: [{
                    selector: '[kendoStepperList]',
                    template: "\n        <ng-container *ngFor='let step of steps; let idx = index'>\n            <li kendoStepperStep\n                [attr." + STEPPER_STEP_INDEX + "]='idx'\n                [type]='stepType'\n                [step]='step'\n                [index]='idx'\n                [current]='currentStep'\n                [successIcon]='successIcon'\n                [errorIcon]='errorIcon'\n                [indicatorTemplate]='indicatorTemplate'\n                [labelTemplate]='labelTemplate'\n                [stepTemplate]='stepTemplate'\n                class='k-step'\n                [class.k-step-first]='idx === 0'\n                [class.k-step-last]='idx === steps.length - 1'\n                [class.k-step-done]='idx < currentStep'\n                [class.k-step-current]='idx === currentStep'\n                [class.k-step-optional]='step.optional'\n                [class.k-step-disabled]='step.disabled'\n                [ngClass]='step.cssClass'\n                [ngStyle]='step.cssStyle'\n                [style.max-width.%] = 'maxStepWidth'\n                [style.max-height.%] = 'maxStepHeight'\n            >\n            </li>\n        </ng-container>\n    "
                },] },
    ];
    /** @nocollapse */
    StepperListComponent.ctorParameters = function () { return [
        { type: Renderer2 },
        { type: NgZone },
        { type: StepperService },
        { type: ElementRef }
    ]; };
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
    return StepperListComponent;
}());

/**
 * @hidden
 */
var Messages = /** @class */ (function (_super) {
    __extends(Messages, _super);
    function Messages() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Messages.propDecorators = {
        optional: [{ type: Input }]
    };
    return Messages;
}(ComponentMessages));

/**
 * @hidden
 */
var LocalizedMessagesDirective = /** @class */ (function (_super) {
    __extends(LocalizedMessagesDirective, _super);
    function LocalizedMessagesDirective(service) {
        var _this = _super.call(this) || this;
        _this.service = service;
        return _this;
    }
    LocalizedMessagesDirective.decorators = [
        { type: Directive, args: [{
                    providers: [
                        {
                            provide: Messages,
                            useExisting: forwardRef(function () { return LocalizedMessagesDirective; })
                        }
                    ],
                    selector: "\n      [kendoStepperLocalizedMessages]\n    "
                },] },
    ];
    /** @nocollapse */
    LocalizedMessagesDirective.ctorParameters = function () { return [
        { type: LocalizationService }
    ]; };
    return LocalizedMessagesDirective;
}(Messages));

/**
 * Custom component messages override default component messages
 * ([see example]({% slug rtl_layout %})).
 */
var CustomMessagesComponent = /** @class */ (function (_super) {
    __extends(CustomMessagesComponent, _super);
    function CustomMessagesComponent(service) {
        var _this = _super.call(this) || this;
        _this.service = service;
        return _this;
    }
    Object.defineProperty(CustomMessagesComponent.prototype, "override", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    CustomMessagesComponent.decorators = [
        { type: Component, args: [{
                    providers: [
                        {
                            provide: Messages,
                            useExisting: forwardRef(function () { return CustomMessagesComponent; })
                        }
                    ],
                    selector: 'kendo-stepper-messages',
                    template: ""
                },] },
    ];
    /** @nocollapse */
    CustomMessagesComponent.ctorParameters = function () { return [
        { type: LocalizationService }
    ]; };
    return CustomMessagesComponent;
}(Messages));

var templateDirectives$1 = [
    StepperStepTemplateDirective,
    StepperLabelTemplateDirective,
    StepperIndicatorTemplateDirective
];
var exportedModules$5 = [
    StepperComponent,
    CustomMessagesComponent
].concat(templateDirectives$1);
var declarations$5 = [
    StepperStepComponent,
    StepperListComponent,
    LocalizedMessagesDirective
].concat(exportedModules$5);
/**
 * Represents the [NgModule]({{ site.data.urls.angular['ngmoduleapi'] }})
 * definition for the Stepper component.
 */
var StepperModule = /** @class */ (function () {
    function StepperModule() {
    }
    StepperModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [declarations$5],
                    exports: [exportedModules$5],
                    imports: [CommonModule, ProgressBarModule]
                },] },
    ];
    return StepperModule;
}());

var exportedModules$6 = [
    TabStripComponent,
    TabStripTabComponent,
    TabContentDirective,
    TabTitleDirective
];
var declarations$6 = exportedModules$6.slice();
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
var TabStripModule = /** @class */ (function () {
    function TabStripModule() {
    }
    TabStripModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [declarations$6],
                    exports: [exportedModules$6],
                    imports: [CommonModule]
                },] },
    ];
    return TabStripModule;
}());

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
var LayoutModule = /** @class */ (function () {
    function LayoutModule() {
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
    return LayoutModule;
}());

/**
 * Generated bundle index. Do not edit.
 */

export { PreventableEvent, DrawerService, DrawerItemComponent, DrawerListComponent, DRAWER_ITEM_INDEX, CustomMessagesComponent, LocalizedMessagesDirective, Messages, PanelBarService, SplitterBarComponent, SplitterService, StepperListComponent, STEPPER_STEP_INDEX, StepperStepComponent, StepperService, PanelBarComponent, PanelBarItemComponent, PanelBarContentDirective, PanelBarItemTemplateDirective, PanelBarItemTitleDirective, PanelBarExpandMode, SplitterComponent, SplitterPaneComponent, TabStripComponent, TabStripTabComponent, TabContentDirective, TabTitleDirective, SelectEvent, DrawerComponent, DrawerContainerComponent, DrawerContentComponent, DrawerSelectEvent, StepperComponent, StepperActivateEvent, AvatarComponent, CardComponent, CardHeaderComponent, CardBodyComponent, CardFooterComponent, CardActionsComponent, CardSeparatorDirective, CardTitleDirective, CardSubtitleDirective, CardMediaDirective, CardAction, AvatarModule, CardModule, DrawerModule, LayoutModule, PanelBarModule, SplitterModule, StepperModule, TabStripModule, DrawerTemplateDirective, DrawerItemTemplateDirective, DrawerHeaderTemplateDirective, DrawerFooterTemplateDirective, StepperIndicatorTemplateDirective, StepperLabelTemplateDirective, StepperStepTemplateDirective };
