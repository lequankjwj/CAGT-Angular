import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';

export interface NhanSuState {
    nhanSus: any[];
}

export function createInitialNhanSuState(): NhanSuState {
    return {
        nhanSus: [],
    };
}

@Injectable({
    providedIn: 'root',
})
@StoreConfig({
    name: 'nhanSu',
})
export class NhanSuStore extends Store<NhanSuState> {
    constructor() {
        super(createInitialNhanSuState());
    }
}
