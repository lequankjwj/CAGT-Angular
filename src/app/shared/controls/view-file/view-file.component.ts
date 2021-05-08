import { Component, Input, OnInit } from '@angular/core';
import { AppConfig } from '@core/config/app.config';
import { NotificationService } from '@core/services/common/notification.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

export const fileExts = ['mp4', 'mp3', 'rar'];
@Component({
    selector: 'app-view-file',
    templateUrl: './view-file.component.html',
    styleUrls: ['./view-file.component.css'],
})
export class ViewFileComponent implements OnInit {
    @Input() key: string;
    @Input() fileName: string;
   
    mediaUrl: SafeResourceUrl;
    isMedia = true;

    private config = AppConfig.settings;
    constructor(
        private notification: NotificationService, 
        private sanitizer: DomSanitizer) {}

    ngOnInit(): void {
        if (this.key) {
            const ext = this.fileName.split('.')[this.fileName.split('.').length - 1];
            if (fileExts.includes(ext)) {
                this.isMedia = false;
                return;
            }
            const media = `${this.config.resourceUrl}viewer.html?k=${this.key}`;
            this.mediaUrl = this.sanitizer.bypassSecurityTrustResourceUrl(media);
        } else {
            this.notification.showErrorMessage('Không tìm thấy tập tin đính kèm !');
        }
    }
}
