/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { AfterContentInit, AfterViewInit, EventEmitter, OnInit, OnDestroy, ElementRef, TemplateRef, Renderer2, ChangeDetectorRef } from '@angular/core';
import { DialogActionsComponent } from './dialog-actions.component';
import { DialogTitleBarComponent } from './dialog-titlebar.component';
import { LocalizationService } from '@progress/kendo-angular-l10n';
import { ActionsLayout } from '../common/actions-layout';
import { DialogAction } from './dialog-settings';
/**
 * Represents the [Kendo UI Dialog component for Angular]({% slug overview_dialog_dialogs %}).
 */
export declare class DialogComponent implements AfterContentInit, AfterViewInit, OnInit, OnDestroy {
    private _elRef;
    private _renderer;
    private cdr;
    /**
     * Specifies the action buttons that will be rendered.
     */
    actions: DialogAction[];
    /**
     * Specifies the layout of the action buttons in the Dialog.
     * This option is only applicable if the action buttons are specified through the `actions` options.
     *
     * @default 'stretched'
     */
    actionsLayout: ActionsLayout;
    /**
     * Specifies the query selector used to set the initial focus.
     */
    autoFocusedElement: string;
    /**
     * Specifies the text that is rendered in the title bar.
     */
    title: string;
    /**
     * Specifies the width of the Dialog.
     * A numeric value sets the width in pixels.
     * A string value sets the width in arbitrary units&mdash;for example, `50%`.
     */
    width: number | string;
    /**
     * Specifies the minimum width of the Dialog.
     * A numeric value sets the minimum width in pixels.
     * A string value sets the minimum width in arbitrary units&mdash;for example, `50%`.
     */
    minWidth: number | string;
    /**
     * Specifies the maximum width of the Dialog.
     * A numeric value sets the maximum width in pixels.
     * A string value sets the maximum width in arbitrary units&mdash;for example, `50%`.
     */
    maxWidth: number | string;
    /**
     * Specifies the height of the Dialog.
     * A numeric value sets the height in pixels.
     * A string value sets the height in arbitrary units&mdash;for example, `50%`.
     */
    height: number | string;
    /**
     * Specifies the minimum height of the Dialog.
     * A numeric value sets the minimum height in pixels.
     * A string value sets the minimum height in arbitrary units&mdash;for example, `50%`.
     */
    minHeight: number | string;
    /**
     * Specifies the maximum height of the Dialog.
     * A numeric value sets the maximum height in pixels.
     * A string value sets the maximum height in arbitrary units&mdash;for example, `50%`.
     */
    maxHeight: number | string;
    /**
     * @hidden
     */
    contentTemplate: TemplateRef<any>;
    /**
     * @hidden
     */
    titleId: string;
    /**
     * @hidden
     */
    closeTitle: string;
    /**
     * Fires when the user clicks an action button of the Dialog.
     * The event is fired only when the action buttons are specified through the `actions` options.
     */
    action: EventEmitter<DialogAction>;
    /**
     * Fires when the user clicks the **Close** button of the Dialog.
     */
    close: EventEmitter<any>;
    readonly dir: string;
    tabIndex: number;
    titlebarContent: DialogTitleBarComponent;
    titlebarView: DialogTitleBarComponent;
    actionsView: DialogActionsComponent;
    private direction;
    private subscriptions;
    constructor(_elRef: ElementRef, _renderer: Renderer2, localization: LocalizationService, cdr: ChangeDetectorRef);
    /**
     * @hidden
     */
    onComponentKeydown(event: any): void;
    ngAfterContentInit(): void;
    ngAfterViewInit(): void;
    ngOnInit(): void;
    ngOnDestroy(): void;
    /**
     * Focuses the wrapper of the Dialog component.
     */
    focus(): void;
    /**
     * @hidden
     */
    private handleInitialFocus;
    /**
     * @hidden
     */
    private handleActionButtonFocus;
    /**
     * @hidden
     */
    private keepFocusWithinComponent;
    /**
     * @hidden
     */
    private shouldFocusPrimary;
    /**
     * @hidden
     */
    private getAllFocusableChildren;
    /**
     * @hidden
     */
    private getLastFocusableElement;
    /**
     * @hidden
     */
    private generateTitleId;
    readonly wrapperClass: boolean;
    readonly styles: any;
    private bubble;
}
