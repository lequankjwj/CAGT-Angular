import { Component, OnInit } from '@angular/core';
import { AuthQuery } from '@management-state/auth/auth.query';
import { IUserInfo } from '@core/auth/user-token.model';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
    userInfo: IUserInfo;
    constructor(private authQuery: AuthQuery) {}

    ngOnInit(): void {
        this.authQuery.select().subscribe(res => {
            this.userInfo = res;
        });
    }
}
