import { Injectable } from '@angular/core';
import { AuthStore } from './auth.store';
import { IUserInfo } from '@core/auth/user-token.model';
import { IMenuSidebar } from '@core/models/common/menu-sidebar.model';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    constructor(private store: AuthStore) {}

    updateUserInfo(user: IUserInfo) {
        this.store.update(state => ({
            ...state,
            ...user,
        }));
    }

    setStateAvatar(avatarUrl: string) {
        const user = {
            ...this.store.getValue(),
            avatar: avatarUrl,
        };

        this.store.update(state => ({
            ...state,
            ...user,
        }));
    }

    updatePermission(per: IMenuSidebar) {
        this.store.update(state => ({
            ...state,
            ...per,
        }));
    }
}
