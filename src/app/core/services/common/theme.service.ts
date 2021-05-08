import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class ThemeService {
    private el = document.body;

    constructor(
    ) {}

    /**
     * Sets color
     * @param color
     */
    setColor(color) {
        this.clearAll();
        const classColor = 'theme-color-' + color;
        this.el.classList.add(classColor);

        // setLocalStorage
        localStorage.setItem('theme-color', classColor);
    }

    setBodyClass(className: string) {
        this.el.setAttribute('class', className);
    }

    toggleSidebar(isFlag) {
        if (isFlag) {
            this.el.classList.add('m-brand--minimize', 'm-aside-left--minimize');
        } else {
            this.el.classList.remove('m-brand--minimize', 'm-aside-left--minimize');
        }
    }

    /**
     * Loads color
     */
    loadColor() {
        const color = localStorage.getItem('theme-color');
        if (color) {
            this.clearAll();
            this.el.classList.add(color);
        } else {
            this.el.classList.add('theme-color-green');
        }
    }

    /**
     * Clears all
     */
    clearAll() {
        this.el.classList.remove('theme-color-default');
        this.el.classList.remove('theme-color-blue');
        this.el.classList.remove('theme-color-green');
        this.el.classList.remove('theme-color-red');
    }
}
