import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class HandlerService {
    constructor() {}

    /**
     * Handles error
     * @param error
     * @returns
     */
    handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
        } else {
            return throwError(error.error);
        }
        return throwError('Something bad happened; please try again later.');
    }

    /**
     * Parses error blob
     * @param err
     * @returns error blob
     */
    parseErrorBlob(err: HttpErrorResponse): Observable<any> {
        const reader: FileReader = new FileReader();

        const obs = Observable.create((observer: any) => {
            reader.onloadend = (e) => {
                observer.error(JSON.parse(reader.result as any));
                observer.complete();
            };
        });
        reader.readAsText(err.error);
        return obs;
    }
}
