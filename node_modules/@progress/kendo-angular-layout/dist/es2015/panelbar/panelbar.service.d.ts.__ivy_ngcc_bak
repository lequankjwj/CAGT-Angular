/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Observable } from 'rxjs';
import { PanelBarItemComponent } from "./panelbar-item.component";
import { PanelBarExpandMode } from './panelbar-expand-mode';
/**
 * @hidden
 */
export declare class PanelBarService {
    children$: Observable<PanelBarItemComponent>;
    keepContent$: Observable<boolean>;
    parent$: Observable<boolean>;
    pbId: number;
    animate: boolean;
    expandMode: PanelBarExpandMode;
    private childSource;
    private keepContentSource;
    private parentSource;
    onKeepContent(keepContent: boolean): void;
    onSelect(event: PanelBarItemComponent): void;
    onFocus(): void;
    onBlur(): void;
    constructor();
}
