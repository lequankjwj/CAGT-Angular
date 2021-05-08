import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { DepartmentState, DepartmentStore } from './department.store';

@Injectable({ providedIn: 'root' })
export class DepartmentQuery extends Query<DepartmentState> {
    all$ = this.select();
    departments$ = this.select('departments');

    constructor(protected store: DepartmentStore) {
        super(store);
    }
}
