/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { DomEventsService } from './../common/dom-events.service';
import { DraggableDirective } from '@progress/kendo-angular-common';
import { SelectionService } from './selection.service';
import { CellSelectionService } from './cell-selection.service';
/**
 * @hidden
 */
export declare class GridMarqueeDirective {
    private draggable;
    private selection;
    private cellSelection;
    private domEvents;
    readonly userSelection: string;
    private pressArgs;
    private marqueeElement;
    private pressTarget;
    private subscriptions;
    private selectionStarted;
    private dragEndSubscription;
    constructor(draggable: DraggableDirective, selection: SelectionService, cellSelection: CellSelectionService, domEvents: DomEventsService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    private start;
    private moveMarquee;
    private endSelection;
    private clean;
    private initMarquee;
    private getMarqueeQuadrant;
}
