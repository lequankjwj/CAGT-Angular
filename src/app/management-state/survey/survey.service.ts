import { Injectable } from '@angular/core';
import { UrlConstant } from '@core/constants/url.constant';
import { ApiService } from '@core/data-services/api.service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { SurveyStore } from './survey.store';

@Injectable({
    providedIn: 'root',
})
export class SurveyService {
    constructor(private store: SurveyStore, private apiService: ApiService) {}

    getItemsPhieuTuDanhGia() {
        const values = this.store.getValue();
        if (values && values.surveys && values.isUpdated) {
            return of(values.surveys);
        } else {
            return this.apiService
                .read('' + '/Search', {
                    pageNumber: 0,
                    pageSize: 0,
                    nhanSuId: null,
                    dotDanhGiaChiTietId: null,
                    manHinh: 1,
                    keyword: null,
                    nam: null,
                    quy: null,
                    tuNgay: null,
                    denNgay: null,
                    sortCol: 'Id',
                    sortByASC: true,
                })
                .pipe(
                    map(res => {
                        const surveys = res.result?.items;
                        if (surveys) {
                            this.setState(surveys, true);
                            return surveys;
                        }

                        return surveys ?? [];
                    })
                );
        }
    }

    setState(surveys, isUpdated: boolean) {
        const body = {
            surveys: surveys,
            isUpdated: isUpdated,
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
                surveys: [],
            },
        }));
    }
}
