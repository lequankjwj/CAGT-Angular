/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { OnInit, Renderer2, ElementRef, AfterViewInit } from '@angular/core';
import { AvatarFill } from './models/fill';
import { Shape } from './models/shape';
import { AvatarSize } from './models/size';
import { AvatarThemeColor } from './models/theme-color';
/**
 * Displays images, icons or initials representing people or other entities.
 */
export declare class AvatarComponent implements OnInit, AfterViewInit {
    private renderer;
    private element;
    hostClass: boolean;
    /**
     * @hidden
     */
    readonly solidClass: boolean;
    /**
     * @hidden
     */
    readonly outlineClass: boolean;
    /**
     * @hidden
     */
    readonly borderClass: boolean;
    /**
     * @hidden
     */
    readonly flexBasis: string;
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
    shape: Shape;
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
    size: AvatarSize;
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
    themeColor: AvatarThemeColor;
    /**
     * Specifies the appearance fill style of the avatar.
     *
     * The possible values are:
     * * `solid` (Default)
     * * `outline`
     *
     */
    fill: AvatarFill;
    /**
     * Sets a border to the avatar.
     */
    border: boolean;
    /**
     * Defines a CSS class — or multiple classes separated by spaces —
     * which are applied to a span element inside the avatar.
     * Allows the usage of custom icons.
     */
    iconClass: string;
    /**
     * Sets the width of the avatar.
     */
    width: string;
    /**
     * @hidden
     */
    readonly avatarWidth: string;
    /**
     * Sets the height of the avatar.
     */
    height: string;
    /**
     * @hidden
     */
    readonly avatarHeight: string;
    /**
     * The CSS styles that will be rendered on the content element of the avatar.
     * Supports the type of values that are supported by [`ngStyle`]({{ site.data.urls.angular['ngstyleapi'] }}).
     */
    cssStyle?: any;
    /**
     * Sets `initials` to the avatar.
     */
    initials: string;
    /**
     * Sets the `icon` for the avatar.
     * All [Kendo UI Icons]({% slug icons %}#toc-list-of-font-icons) are supported.
     */
    icon: string;
    /**
     * Sets the `image` source of the avatar.
     */
    imageSrc: string;
    private _themeColor;
    private _size;
    private _shape;
    private avatar;
    constructor(renderer: Renderer2, element: ElementRef);
    ngAfterViewInit(): void;
    /**
     * @hidden
     */
    readonly imageUrl: string;
    ngOnInit(): void;
    /**
     * @hidden
     */
    iconClasses(): string;
    /**
     * @hidden
     */
    readonly customAvatar: boolean;
    private verifyProperties;
    private setAvatarClasses;
}
