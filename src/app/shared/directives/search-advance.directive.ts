import { AfterViewInit, Directive, ElementRef, HostBinding, HostListener, OnDestroy } from '@angular/core';

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[search-advance]',
})
export class SearchAdvanceDirective implements AfterViewInit, OnDestroy {
    @HostBinding('class.search-advanced') isOpenFirstTime = false;
    isSearchAdvanced = false;

    dropdown = document.querySelector('.dropdown-content-search-advance');
    // show-search-advance
    constructor(elRef: ElementRef) {}

    @HostListener('click', ['$event']) onClick() {
        this.isOpenFirstTime = true;
        const el = document.querySelector('.search-backdrop');

        this.isSearchAdvanced = !this.isSearchAdvanced;
        if (this.isSearchAdvanced) {
            el.classList.add('search-overlay');
            this.dropdown.classList.add('show-search-advance');
        } else {
            el.classList.remove('search-overlay');
            this.dropdown.classList.remove('show-search-advance');
        }
    }

    ngAfterViewInit() {
        document.querySelector('.search-backdrop').addEventListener(
            'click',
            e => {
                this.isSearchAdvanced = false;
                this.dropdown.classList.remove('show-search-advance');
            },
            true
        );
    }

    ngOnDestroy() {}
}
