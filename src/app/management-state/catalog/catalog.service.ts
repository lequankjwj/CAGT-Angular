import { Injectable } from '@angular/core';
import { UrlConstant } from '@core/constants/url.constant';
import { ApiService } from '@core/data-services/api.service';
import { Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { CatalogQuery } from './catalog.query';
import { CatalogStore } from './catalog.store';
import { EMPTY } from 'rxjs';

// return this.query.selectHasCache().pipe(
//     switchMap(hasCache => {
//         const apiCall = this.apiService.read(UrlConstant.API.DM_TINH_THANH + '/List', this.queryOption)
//             .pipe(
//                 map(res => res.result.items),
//                 tap(res => this.store.set(res))
//             );

//         return hasCache ? this.store.getValue().tinhThanhs : apiCall;
//     })
// )
@Injectable({
    providedIn: 'root',
})
export class CatalogService {
    constructor(private store: CatalogStore, private query: CatalogQuery, private apiService: ApiService) {}

    // getAllTinhThanhForSelect() {
    //     const values = this.store.getValue();
    //     if (values && values.tinhThanhs.length > 0) {
    //         return of(values.tinhThanhs);
    //     } else {
    //         return this.apiService.read(UrlConstant.API.DM_TINH_THANH + '/List', CatalogService.queryOption).pipe(
    //             map(res => {
    //                 const results = res.result?.items;
    //                 this.setStateTinhThanh(results);
    //                 return results;
    //             }),
    //         );
    //     }
    // }

    // getAllQuocGiaForSelect() {
    //     const values = this.store.getValue();
    //     if (values && values.quocGias.length > 0) {
    //         return of(values.quocGias);
    //     } else {
    //         return this.apiService.read(UrlConstant.API.DM_QUOC_GIA + '/List', CatalogService.queryOption).pipe(
    //             map(res => {
    //                 const results = res.result?.items;
    //                 this.setStateQuocGia(results);
    //                 return results;
    //             }),
    //         );
    //     }
    // }

    // getAllChucVuForSelect() {
    //     const values = this.store.getValue();
    //     if (values && values.chucVus.length > 0) {
    //         return of(values.chucVus);
    //     } else {
    //         return this.apiService.read(UrlConstant.API.DM_CHUC_VU + '/List', CatalogService.queryOption).pipe(
    //             map(res => {
    //                 const results = res.result?.items;
    //                 this.setStateChucVu(results);
    //                 return results;
    //             }),
    //         );
    //     }
    // }

    // getAllChucDanhForSelect() {
    //     const values = this.store.getValue();
    //     if (values && values.chucDanhs.length > 0) {
    //         return of(values.chucDanhs);
    //     } else {
    //         return this.apiService.read(UrlConstant.API.DM_CHUC_DANH + '/List', CatalogService.queryOption).pipe(
    //             map(res => {
    //                 const results = res.result?.items;
    //                 this.setStateChucDanh(results);
    //                 return results;
    //             }),
    //         );
    //     }
    // }

    // getAllDanTocForSelect() {
    //     const values = this.store.getValue();
    //     if (values && values.danTocs.length > 0) {
    //         return of(values.danTocs);
    //     } else {
    //         return this.apiService.read(UrlConstant.API.DM_DAN_TOC + '/List', CatalogService.queryOption).pipe(
    //             map(res => {
    //                 const results = res.result?.items;
    //                 this.setStateDanToc(results);
    //                 return results;
    //             }),
    //         );
    //     }
    // }

    // getAllTonGiaoForSelect() {
    //     const values = this.store.getValue();
    //     if (values && values.tonGiaos.length > 0) {
    //         return of(values.tonGiaos);
    //     } else {
    //         return this.apiService.read(UrlConstant.API.DM_TON_GIAO + '/List', CatalogService.queryOption).pipe(
    //             map(res => {
    //                 const results = res.result?.items;
    //                 this.setStateTonGiao(results);
    //                 return results;
    //             }),
    //         );
    //     }
    // }

    // setStateDanToc(values) {
    //     const body = {
    //         danTocs: values,
    //     };
    //     this.store.update(state => ({
    //         ...state.danTocs,
    //         ...body,
    //     }));
    // }

    // setStateTonGiao(values) {
    //     const body = {
    //         tonGiaos: values,
    //     };
    //     this.store.update(state => ({
    //         ...state.tonGiaos,
    //         ...body,
    //     }));
    // }

    // setStateTinhThanh(values) {
    //     const body = {
    //         tinhThanhs: values,
    //     };
    //     this.store.update(state => ({
    //         ...state.tinhThanhs,
    //         ...body,
    //     }));
    // }

    // setStateChucVu(values) {
    //     const body = {
    //         chucVus: values,
    //     };
    //     this.store.update(state => ({
    //         ...state.chucVus,
    //         ...body,
    //     }));
    // }

    // setStateChucDanh(values) {
    //     const body = {
    //         chucDanhs: values,
    //     };
    //     this.store.update(state => ({
    //         ...state.chucDanhs,
    //         ...body,
    //     }));
    // }

    // setStateQuocGia(values) {
    //     const body = {
    //         quocGias: values,
    //     };
    //     this.store.update(state => ({
    //         ...state.quocGias,
    //         ...body,
    //     }));
    // }

    // setState(values) {
    //     this.store.update(state => ({
    //         ...state,
    //         ...values,
    //     }));
    // }

    reset() {}

    private static get queryOption() {
        return {
            pageNumber: 0,
            pageSize: 0,
            sortCol: 'stt',
            sortByASC: true,
        };
    }
}
