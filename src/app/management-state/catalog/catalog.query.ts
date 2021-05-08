import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { CatalogState, CatalogStore } from './catalog.store';

@Injectable({ providedIn: 'root' })
export class CatalogQuery extends Query<CatalogState> {
    all$ = this.select();

    constructor(protected store: CatalogStore) {
        super(store);
    }
}
