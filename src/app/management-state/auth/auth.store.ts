import { Injectable } from '@angular/core';
import { IUserInfo } from '@core/auth/user-token.model';
import { Store, StoreConfig } from '@datorama/akita';

export interface AuthState extends IUserInfo {}

export function createInitialAuthState(): AuthState {
    return {
        firstName: '',
        lastName: '',
        userId: '',
        doiTuongId: '',
    };
}

@Injectable({
    providedIn: 'root',
})
@StoreConfig({
    name: 'auth',
})
export class AuthStore extends Store<AuthState> {
    constructor() {
        super(createInitialAuthState());
    }
}
