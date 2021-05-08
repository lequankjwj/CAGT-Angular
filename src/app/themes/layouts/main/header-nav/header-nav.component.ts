import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AuthenticateService } from '@core/auth/authenticate.service';

@Component({
    selector: 'app-header-nav',
    templateUrl: './header-nav.component.html',
    styleUrls: ['./header-nav.component.css'],
})
export class HeaderNavComponent implements OnInit, AfterViewInit {
    openDropdownlist = false;
    constructor(private auth: AuthenticateService) {}

    ngOnInit(): void {}

    ngAfterViewInit(): void {}

    onLogout() {
        const body = {
            deviceHash: [],
            isCurrentUserLogout: true,
        };
        this.auth.doLogout(body);
    }

    toggleHeader() {
        this.openDropdownlist = !this.openDropdownlist;
    }
}
