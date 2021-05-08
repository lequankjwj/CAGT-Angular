import { Injectable } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AppConstant } from '@core/constants/app.constant';

@Injectable({ providedIn: 'root' })
export class NotificationService {
    constructor(private notification: NzNotificationService) {}
    private option = {
        nzDuration: 3000,
        nzAnimate: true,
        nzTop: -100,
    };

    static getStatusComponentInsideIframe() {
        // true: inside iframe, false: outside iframe
        return window !== window.top;
    }

    /**
     * Creates notification
     * @param type
     * @param title
     * @param content
     */
    createNotification(type: string, title: string, content: string): void {
        this.notification.create(type, title, content, this.option);
    }

    /**
     * Shows error message
     * @param mes
     */
    showSuccessMessage(mes: string): void {
        this.notification.success(AppConstant.TITLE, mes, this.option);
    }

    /**
     * Shows error message
     * @param mes
     */
    showErrorMessage(mes: string): void {
        this.notification.error(AppConstant.TITLE, mes, this.option);
    }

    /**
     * Shows warning message
     * @param mes
     */
    showWarningMessage(mes: string) {
        this.notification.warning(AppConstant.TITLE, mes, this.option);
    }
}
