import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild, Input, ElementRef, AfterViewInit } from '@angular/core';
import { HostListener } from '@angular/core';
import { NotificationService } from '@core/services/common/notification.service';
import { TabService } from '@core/services/common/tab.service';

@Component({
    selector: 'app-iframe-content',
    templateUrl: './iframe-content.component.html',
    styleUrls: ['./iframe-content.component.scss'],
})
export class IframeContentComponent implements OnInit, AfterViewInit {
    @ViewChild('iframe') iframe: ElementRef;
    @Input() selectedContent: string;

    constructor(private route: ActivatedRoute, private notification: NotificationService, private tabService: TabService) {}

    ngAfterViewInit(): void {}

    /**
     * Registers a callback for retrieving the target based on the selected content
     */
    ngOnInit() {}

    @HostListener('window:message', ['$event'])
    onMessage(e) {
        if (e.data && e.data.location === this.selectedContent) {
            const res = e.data;
            if (res.type === 'success') {
                this.notification.showSuccessMessage(res.message);
            } else {
                this.notification.showErrorMessage(res.message);
            }
        }

        if (e.data && e.data.type === 'openNewTab') {
            const res = e.data;
            this.tabService.addTab(res);
        }

        if (e.data && e.data.type === 'closeTab') {
            const res = e.data;

            const tab = this.tabService.getTabs().find(x => x.url === res.url);
            if (tab) {
                this.tabService.removeTab(tab);
            }
        }

        if (e.data && e.data.type === 'resizeIframe') {
            const res = e.data;
            // this.iframe.nativeElement.style.height = res.height + 20 + 'px';
        }

        if (e.data && e.data.type === 'changeClass') {
            const res = e.data;
            this.iframe.nativeElement.contentWindow.postMessage(
                {
                    type: 'changeClass',
                    class: res.class,
                },
                '*',
            );
        }
    }

    resizeIframe(iframe) {
        iframe.height = iframe.contentWindow.document.body.scrollHeight + 'px';
    }
}
