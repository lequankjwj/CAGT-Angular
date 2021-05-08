import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppMessageConfig } from '@core/config/app.config.message';
import { MessageConstant } from '@core/constants/message.constant';
import { IResponseData } from '@core/models/common/response-data.model';
import { NotificationService } from '@core/services/common/notification.service';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { UrlConstant } from '@core/constants/url.constant';
import { NzModalService } from 'ng-zorro-antd/modal';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private notification: NotificationService, private router: Router, private modalService: NzModalService) {}

    private static getMessageToJson(key: string): string {
        const message = AppMessageConfig.settings[key];
        if (!message) {
            return MessageConstant.COMMON.MSG_ERROR_CODE_NOTFOUND;
        }
        return message;
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            catchError((error: HttpErrorResponse) => {
                if (error.error instanceof ProgressEvent) {
                    this.notification.showErrorMessage(MessageConstant.COMMON.MSG_SERVER_DISCONNECT);
                } else if (error.error instanceof ErrorEvent) {
                    this.notification.showErrorMessage(MessageConstant.COMMON.MSG_INTERNET_REFUSE);
                } else {
                    const statusCode = error.status;
                    const params = req.url.split('/');
                    switch (statusCode) {
                        case 401:
                            // 401 handled in auth.interceptor
                            if (
                                (params.includes('Accounts') && params.includes('Refresh-Token')) ||
                                (params.includes('Accounts') && params.includes('Logout'))
                            ) {
                                // error.error?.status === 401
                                this.router.navigate([UrlConstant.ROUTE.LOGIN]);
                            }
                            break;
                        case 403:
                            this.modalService.closeAll();
                            // 403 handled in auth.interceptor
                            this.modalService.warning({
                                nzTitle: 'Thông báo',
                                nzContent: 'Bạn không có quyền truy cập vào chức năng này !',
                                nzOkText: 'Đồng ý',
                            });
                            this.router.navigate([UrlConstant.ROUTE.FORBIDEN]);
                            break;
                        case 404:
                            this.notification.showErrorMessage(error.statusText);
                            break;
                        case 500:
                            if (
                                (params.includes('Accounts') && params.includes('Refresh-Token')) ||
                                (params.includes('Accounts') && params.includes('Logout'))
                            ) {
                                this.router.navigate([UrlConstant.ROUTE.LOGIN]);
                            } else if (params.includes('Users') && params.includes('SyncUserAvatar')) {
                                // Hidden error
                            } else {
                                this.notification.showErrorMessage(MessageConstant.COMMON.MSG_ERROR_SYSTEM);
                            }

                            break;
                        case 503:
                            this.notification.showErrorMessage(MessageConstant.COMMON.MSG_ERROR_SYSTEM);
                            break;
                        default:
                            if (statusCode !== 200 && params.includes('Accounts') && params.includes('Refresh-Token')) {
                                this.router.navigate([UrlConstant.ROUTE.LOGIN]);
                            } else {
                                if (error.error) {
                                    const serverError = error.error as IResponseData<any>;
                                    if (error.error && error.error.traceId) {
                                        this.notification.showErrorMessage(MessageConstant.COMMON.MSG_FORMAT_INVALID);
                                    } else {
                                        const messages = serverError.errorMessages
                                            .map(x => {
                                                // return this.getMessage(x.errorCode);
                                                return ErrorInterceptor.getMessageToJson(x.errorCode);
                                            })
                                            .join('<br/>');
                                        this.notification.showErrorMessage(messages);
                                    }
                                } else {
                                    this.notification.showErrorMessage(error.error.error.message);
                                }
                            }
                            break;
                    }
                }
                return throwError(error);
            })
        );
    }
}
