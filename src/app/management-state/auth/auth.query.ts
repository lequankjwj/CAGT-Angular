import { Injectable } from '@angular/core';
import { AuthStore, AuthState } from './auth.store';
import { Query } from '@datorama/akita';
import { map } from 'jquery';

@Injectable({ providedIn: 'root' })
export class AuthQuery extends Query<AuthState> {
    all$ = this.select();
    userId$ = this.select('userId');
    permision$ = this.select('permissions');
    constructor(protected store: AuthStore) {
        super(store);
    }

    getPermission() {
        // this.permision$.pipe(
        //     map()
        // )
    }

    getUserId() {
        this.userId$.subscribe(res => {
            return res;
        });
    }
}
