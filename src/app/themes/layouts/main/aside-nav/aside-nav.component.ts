import {
    Component,
    OnInit,
    ViewEncapsulation,
    AfterViewInit,
} from '@angular/core';
import { Router } from '@angular/router';
declare let mLayout: any;
@Component({
    selector: 'app-aside-nav',
    templateUrl: './aside-nav.component.html',
    styleUrls: ['./aside-nav.component.css'],
    encapsulation: ViewEncapsulation.None,
})
export class AsideNavComponent implements OnInit, AfterViewInit {
    constructor(private router: Router) {}

    ngAfterViewInit(): void {
        mLayout.initAside();
    }

    ngOnInit(): void {}

    loadComponent(url) {
        if (url === this.router.url) {
            this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        } else {
            this.router.navigate([url]);
        }
    }
}
