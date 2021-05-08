import { AfterViewInit, Directive, HostBinding, OnDestroy } from '@angular/core';

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[print-section]',
})
export class PrintSectionDirective implements AfterViewInit, OnDestroy {
    @HostBinding('class.print-section') private printSection = true;
    private style: HTMLStyleElement;

    public ngAfterViewInit() {
        this.style = document.createElement('style');
        this.style.type = 'text/css';
        this.style.innerText = `
            @media print {

                @page {
                    size: a4;
                    margin: 0 2cm;
                    font-size: 20px;
                }

                body {
                    font-family: "Times New Roman" !important;
                }

                .form-layouts .k-dialog-titlebar {
                    display: none;
                }

                kendo-window {
                    top: 0 !important;
                    left: 0 !important;
                    top: 0 !important;
                }

                body * {
                     visibility: hidden;
                }

                .print-section, .print-section * {
                    visibility: visible;
                    font-size: 18pt;
                }

                .print-section {
                    width: 100%;
                    height: 100%;
                }

                .form_wapper .m-portlet__body {
                    padding: 0;
                }

                .print-section .m-portlet__head-text {
                    font-size: 18pt !important;
                    margin: 10px 0;
                }

                .print-section .export-title1 {
                    line-height: 1.2;
                    padding-bottom: 3px
                }

                .print-section .export-tenPhieu {
                    margin-top: 40px !important;
                }

                .print-section .export-title1 {
                    margin-top: -5px;
                }

                .print-section table{
                    width: 99%;
                }

                .print-section .linehead {
                    width: 130px;
                    border-bottom: 1px solid #000;
                    margin: auto;
                    visibility: visible;
                }

                .print-section .linehead-print {
                    width: 300px;
                }

                .print-section .maPhieuDG * {
                    font-size: 12pt !important;
                    line-height: 1.2 !important;
                    margin: 0;
                    padding: 0;
                }

                .print-section .table thead th {
                    font-size: 18pt;
                    font-family: "Times New Roman" !important;
                    vertical-align: middle;
                    min-width: 120px;
                }

                .print-section .m-content {
                    padding: 0 !important;
                }

                .print-section pre {
                    border: none;
                    margin-bottom: 0;
                    word-break: break-all;
                }

                img {
                    width:100%;
                }

                .export-footer {
                    font-size: 12pt;
                    display: block !important;
                    color: #666;
                    position: relative;
                    bottom: 0;
                }

                .print-section-header,
                .print-section-footer, .footer-space{
                    height: 2cm;
                }

                .footer-space {
                    position: fixed;
                    bottom: 0;
                }

            }
        `;

        document.head.appendChild(this.style);
    }

    public ngOnDestroy() {
        document.head.removeChild(this.style);
    }
}
