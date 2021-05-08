/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { EventEmitter, TemplateRef } from '@angular/core';
import { ActionsLayout } from './models/actions-layout';
import { CardAction } from './models/card-action';
import { Orientation } from '../common/orientation';
/**
 * Specifies the action buttons of the Card.
 * * ([see example]({% slug actions_card %})).
 */
export declare class CardActionsComponent {
    hostClass: boolean;
    readonly stretchedClass: boolean;
    readonly startClass: boolean;
    readonly endClass: boolean;
    readonly centerClass: boolean;
    readonly verticalClass: boolean;
    readonly horizontalClass: boolean;
    /**
     * Specifies the layout of the Card action buttons.
     *
     * * The possible values are:
     * * (Default) `horizontal`
     * * `vertical`
     *
     */
    orientation: Orientation;
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
    layout: ActionsLayout;
    /**
     * Allows the declarative specification of the Card actions.
     */
    actions?: CardAction[] | TemplateRef<any>;
    /**
     * Fires when the user clicks an action button.
     */
    action: EventEmitter<CardAction>;
    /**
     * @hidden
     */
    onClick(action: CardAction): void;
    /**
     * @hidden
     */
    actionTemplate(): boolean;
}
