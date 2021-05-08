/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Component, HostBinding, Input, isDevMode, Renderer2, ElementRef } from '@angular/core';
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
export { AvatarComponent };
