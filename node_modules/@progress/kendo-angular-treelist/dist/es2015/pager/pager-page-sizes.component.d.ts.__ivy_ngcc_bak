/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { ChangeDetectorRef } from '@angular/core';
import { PagerElementComponent } from './pager-element.component';
import { LocalizationService } from '@progress/kendo-angular-l10n';
import { PagerContextService, PagerContextChanges } from "./pager-context.service";
import { PageSizeItem } from './pagesize-item.interface';
/**
 * Displays a drop-down list for the page size selection ([see example]({% slug paging_treelist %}#toc-pager-templates)).
 */
export declare class PagerPageSizesComponent extends PagerElementComponent {
    protected pagerContext: PagerContextService;
    /**
    * The page sizes collection. Can be an Array of numbers and/or PageSizeItem objects.
    *
    * {% meta height:500 %}
    * {% embed_file configuration/pager-template-page-sizes/app.component.ts preview %}
    * {% embed_file shared/app.module.ts %}
    * {% embed_file shared/filesystem.ts %}
    * {% embed_file shared/main.ts %}
    * {% endmeta %}
    */
    pageSizes: Array<PageSizeItem | number>;
    /**
     * @hidden
     *
     * @readonly
     */
    readonly classes: boolean;
    /**
     * @hidden
     *
     * @readonly
     */
    readonly showInitialPageSize: boolean;
    private _pageSizes;
    constructor(localization: LocalizationService, cd: ChangeDetectorRef, pagerContext: PagerContextService);
    /**
     * @hidden
     */
    pageSizeChange(value: any): void;
    /**
     * @hidden
     */
    getValue(page: PageSizeItem): number;
    /**
     * @hidden
     */
    getSelectedState(page: PageSizeItem): boolean | undefined;
    protected onChanges({ total, skip, pageSize }: PagerContextChanges): void;
}
