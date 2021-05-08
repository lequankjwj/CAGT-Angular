import { Component, forwardRef, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { UrlConstant } from '@core/constants/url.constant';
import { ApiService } from '@core/data-services/api.service';
import { IGroupUser } from '@core/models/users/users.model';
import { CatalogService } from '@management-state/catalog/catalog.service';
import { Subject } from 'rxjs';
import { finalize, map, takeUntil, tap } from 'rxjs/operators';
import { DropDownListEnum } from './c-select.enum';
import { DateUtil } from '@core/utils/date';

export interface AscSelectOption {
    id: number;
    text: string;
    item?: any;
}

@Component({
    selector: 'c-select',
    templateUrl: './c-select.component.html',
    styleUrls: ['./c-select.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: forwardRef(() => CSelectComponent),
        },
    ],
})
export class CSelectComponent implements OnInit, OnDestroy, OnChanges, ControlValueAccessor {
    @Input() modeOfDropDowList: DropDownListEnum;
    @Input() placeHolder?: string;
    @Input() isReference = false;
    @Input() referenceId?: string;
    @Input() selected?: number;
    @Input() mode = 'default';
    @Input() isDisabled = false;
    @Input() permissionType?: number = 1;
    value: string;

    listOfOption: AscSelectOption[] = [];
    selectedValue: number;
    reference: string;

    isLoading = false;

    private destroyed$ = new Subject();
    private fieldSortOfCatalog = 'stt';

    constructor(private apiService: ApiService, private catalogService: CatalogService) {}

    onChange(value) {}

    onTouched() {}

    writeValue(value): void {
        this.value = value;
        this.selectedValue = value;
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    setDisabledState?(isDisabled: boolean): void {
        this.isDisabled = isDisabled;
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.referenceId) {
            this.reference = changes.referenceId.currentValue;
            this.isDisabled = !(this.reference && this.isReference);
            if (this.reference === null || this.reference === undefined) {
                this.value = null;
                this.writeValue(this.value);
            }

            if (!changes.referenceId.firstChange && changes.referenceId.currentValue !== changes.referenceId.previousValue) {
                this.value = null;
                this.writeValue(this.value);
            }
            this.init();
        }
    }

    ngOnInit() {
        this.init();
    }

    ngOnDestroy() {
        this.destroyed$.next();
        this.destroyed$.complete();
    }

    init() {
        switch (this.modeOfDropDowList) {
        }
    }

    get queryOptionsCatalog() {
        return {
            pageSize: 0,
            pageNumber: 0,
            sortCol: 'stt',
            sortByASC: true,
        };
    }

    /**
     * Loads group users
     */
    loadGroupUsers() {
        this.apiService
            .post(UrlConstant.API.SYSTEM.USERS + '/GetUserGroup', {
                pageSize: 0,
                pageNumber: 0,
                sortByASC: false,
                sortCol: 'id',
                keyword: null,
            })
            .pipe(takeUntil(this.destroyed$))
            .subscribe(res => {
                if (res.result) {
                    const result = res.result?.items as IGroupUser[];
                    this.listOfOption = result.map(m => {
                        return {
                            id: m.id,
                            text: m.groupName,
                        };
                    });
                }
            });
    }

  
}
