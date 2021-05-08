import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { NhanSuState, NhanSuStore } from './nhan-su.store';

@Injectable({ providedIn: 'root' })
export class NhanSuQuery extends Query<NhanSuState> {
    all$ = this.select();
    nhanSus$ = this.select('nhanSus');

    constructor(protected store: NhanSuStore) {
        super(store);
    }
}
