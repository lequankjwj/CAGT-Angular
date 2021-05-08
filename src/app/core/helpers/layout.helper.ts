// import * as $ from 'jquery';

export class LayoutHelpers {
    static bodyClass(strClass: string) {
        const body = document.body;

        body.classList.add(strClass);
        // $('body').attr('class', strClass);
    }

    static loadScript(url: string) {
        const body = document.body as HTMLDivElement;
        const script = document.createElement('script');
        script.innerHTML = '';
        script.src = url;
        script.async = true;
        script.defer = true;
        body.appendChild(script);
    }
}
