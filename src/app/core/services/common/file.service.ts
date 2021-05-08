import { ElementRef, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HandlerService } from './handler-error.service';
import { catchError, finalize, map } from 'rxjs/operators';
import { Observable, of, fromEvent } from 'rxjs';
import { AppConfig } from '@core/config/app.config';
import { FileExtensionEnum } from '@core/constants/enum.constant';
import { ReportUtil } from '@core/utils/report';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({ providedIn: 'root' })
export class FileService {
    private config = AppConfig.settings;
    private apiUrl: string;

    constructor(private http: HttpClient, private handlerService: HandlerService, private spinner: NgxSpinnerService) {
        this.apiUrl = `${this.config.apiServer}/api/read/${this.config.version}/`;
    }

    /**
     * Downloads file
     * @returns
     * @param url
     * @param option
     */
    downloadFile(url: string, option) {
        return this.http
            .post(this.apiUrl + url, option, {
                observe: 'response',
                responseType: 'blob',
            })
            .pipe(catchError(this.handlerService.parseErrorBlob));
    }

    /**
     * Export file
     * @param url
     * @param option
     * @param prefixName
     */
    exportFile(url: string, option, prefixName: string) {
        this.spinner.show();
        return this.http
            .post(this.apiUrl + url, option, {
                observe: 'response',
                responseType: 'blob',
            })
            .pipe(
                catchError(this.handlerService.parseErrorBlob),
                finalize(() => this.spinner.hide())
            )
            .subscribe(res => {
                const contentDisposition = res.headers.get('content-disposition');
                this.convertResourceToBlob(
                    res.body,
                    FileExtensionEnum.DOCX,
                    `${prefixName}_${ReportUtil.generateExtensionReport()}.${ReportUtil.getExtension(contentDisposition)}`
                );
            });
    }

    /**
     * Converts resource to blob
     * @param resource
     * @param fileType
     * @param fileName
     */
    convertResourceToBlob(resource, fileType: string, fileName: string) {
        const blob = new Blob([resource], {
            type: fileType,
        });

        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = fileName;
        document.body.appendChild(link);

        link.click();
        setTimeout(() => {
            document.body.removeChild(link);
            window.URL.revokeObjectURL(link.href);
        }, 100);
    }

    /**
     * Clones file
     * @param file
     * @returns file
     */
    cloneFile(file: File): Observable<File> {
        if (!(file && file instanceof File)) {
            return of(null);
        }
        const reader = new FileReader();
        const stream$ = fromEvent(reader, 'loadend');
        reader.readAsArrayBuffer(file);
        return stream$.pipe(
            map(() => {
                const blob = new Blob([reader.result]);
                return new File([blob], file.name, {
                    lastModified: file.lastModified,
                });
            })
        );
    }
}
