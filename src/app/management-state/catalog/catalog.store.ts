import { Injectable } from '@angular/core';
import { EntityStore, Store, StoreConfig } from '@datorama/akita';

export interface CatalogState {
}

export function createInitialCatalogState(): CatalogState {
    return {
    };
}

@Injectable({
    providedIn: 'root',
})
@StoreConfig({
    name: 'catalog',
    cache: {
        ttl: 3600000,
    },
})
export class CatalogStore extends Store<CatalogState> {
    constructor() {
        super(createInitialCatalogState());
    }
}
