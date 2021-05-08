import { Injectable } from '@angular/core';
// import { ITreeCoQuan } from '@themes/views/management/human-resource/_models/co-quan.model';
import { Store, StoreConfig } from '@datorama/akita';

export interface DepartmentState {
    // departments: ITreeCoQuan[];
}

export function createInitialDepartmentState(): DepartmentState {
    return {
        departments: [],
    };
}

@Injectable({
    providedIn: 'root',
})
@StoreConfig({
    name: 'department',
})
export class DepartmentStore extends Store<DepartmentState> {
    constructor() {
        super(createInitialDepartmentState());
    }
}
