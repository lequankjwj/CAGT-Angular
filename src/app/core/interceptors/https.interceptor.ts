// import { Injectable } from '@angular/core';
// import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
// import { Observable } from 'rxjs';

// @Injectable()
// export class HttpsInterceptor implements HttpInterceptor {
//     constructor() {}

//     intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//         const httpsReq = req.clone({
//             url: req.url.replace('http://', 'https://'),
//         });
//         return next.handle(httpsReq);
//     }
// }
