/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { OnInit, OnDestroy } from '@angular/core';
import { TreeListComponent } from '../treelist.component';
import { EditService } from './edit-service.interface';
import { Subscription, Observable } from 'rxjs';
/**
 * @hidden
 */
export declare abstract class EditingDirectiveBase implements OnInit, OnDestroy {
    protected treelist: TreeListComponent;
    /**
     * The edit service that will handle the operations.
     */
    editService: EditService;
    /**
     * Gets or sets a function that will be called to determine the unique identifier
     * for new items. The function receives the `item` and its `parent` as parameters
     * and must return an ID.
     */
    newItemId: (item: any, parent?: any) => any;
    /**
     * A function that is called to confirm if the `dataItem` will be removed.
     */
    removeConfirmation: (dataItem: any, parent?: any) => Promise<boolean> | Observable<boolean> | boolean;
    protected subscriptions: Subscription;
    protected userEditService: EditService;
    protected isNew: boolean;
    protected parent: any;
    protected dataItem: any;
    protected idCallback: any;
    protected abstract createModel(args: any): any;
    protected abstract saveModel(args: any): any;
    constructor(treelist: TreeListComponent);
    /**
     * @hidden
     */
    ngOnInit(): void;
    /**
     * @hidden
     */
    ngOnDestroy(): void;
    protected readonly defaultEditService: EditService;
    protected addHandler({ parent }: any): void;
    protected saveHandler(args: any): void;
    protected cancelHandler(args: any): void;
    protected removeHandler({ dataItem, parent }: any): void;
    protected closeEditor(args?: any): void;
    protected clean(): void;
    protected onStateChange(): void;
}
