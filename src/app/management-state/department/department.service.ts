import { Injectable } from '@angular/core';
import { UrlConstant } from '@core/constants/url.constant';
import { ApiService } from '@core/data-services/api.service';
// import { ITreeCoQuan } from '@themes/views/management/human-resource/_models/co-quan.model';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { DepartmentStore } from './department.store';

@Injectable({
    providedIn: 'root',
})
export class DepartmentService {
    constructor(private store: DepartmentStore, private apiService: ApiService) {}

    // getDepartments(manHinh?: number): Observable<ITreeCoQuan[]> {
    //     const values = this.store.getValue();
    //     if (values && values.departments.length > 0 && !manHinh) {
    //         return of(values.departments);
    //     } else {
    //         return this.apiService
    //             .read(UrlConstant.API.HRM_DANH_MUC_CO_QUAN, {
    //                 manHinh: manHinh ?? null,
    //             })
    //             .pipe(
    //                 map(res => {
    //                     const departments = res.result;
    //                     if (departments) {
    //                         if (!manHinh) {
    //                             this.setState(departments);
    //                             return departments;
    //                         }
    //                     }
    //                     return departments;
    //                 })
    //             );
    //     }
    // }

    setState(coQuans) {
        const body = {
            departments: coQuans,
        };
        this.store.update(state => ({
            ...state,
            ...body,
        }));
    }

    reset() {
        this.store.update(state => ({
            ...state,
            ...{
                departments: [],
            },
        }));
    }
}
