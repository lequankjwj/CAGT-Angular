/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { ElementRef, Renderer2 } from '@angular/core';
import { FocusableElement } from './focusable-element.interface';
/**
 * @hidden
 */
export declare class DefaultFocusableElement implements FocusableElement {
    private renderer;
    private readonly enabled;
    private readonly visible;
    private element;
    private focusable;
    constructor(host: ElementRef, renderer: Renderer2);
    isNavigable(): boolean;
    toggle(active: boolean): void;
    focus(): void;
    canFocus(): boolean;
    hasFocus(): boolean;
}
