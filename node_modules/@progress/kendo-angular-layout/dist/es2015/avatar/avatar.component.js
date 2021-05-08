/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Component, HostBinding, Input, isDevMode, Renderer2, ElementRef } from '@angular/core';
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
export class AvatarComponent {
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
