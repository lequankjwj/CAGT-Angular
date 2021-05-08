import { Injectable } from '@angular/core';
import { IMenuSidebar } from '@core/models/common/menu-sidebar.model';
import { Store, StoreConfig } from '@datorama/akita';

export interface MenuState {
    menu: IMenuSidebar[];
}

export function createInitialMenuState(): MenuState {
    return {
        menu: [],
    };
}

@Injectable({
    providedIn: 'root',
})
@StoreConfig({
    name: 'menu',
})
export class MenuStore extends Store<MenuState> {
    constructor() {
        super(createInitialMenuState());
    }
}
