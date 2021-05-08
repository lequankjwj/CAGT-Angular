import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CachingService } from '@core/services/common/caching.service';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class CacheInterceptor implements HttpInterceptor {
    private cache = new Map<string, any>();

    constructor(private cacheService: CachingService) {}
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (request.method !== 'GET') {
            return next.handle(request);
        }

        const configUrl = request.url.split('/');
        if (configUrl.includes('_config') || configUrl.includes('i18n')) {
            request = request.clone({
                setHeaders: {
                    'Cache-Control': 'no-cache',
                    Pragma: 'no-cache',
                    'Expires': '-1'
                },
            });
            return next.handle(request);
        }

        // Delete cache if no header is set by service's method
        if (!request.headers.get('cache-response')) {
            if (this.cacheService.cacheMap.get(request.urlWithParams)) {
                this.cacheService.cacheMap.delete(request.urlWithParams);
            }

            return next.handle(request);
        }

        // Checked if there is cached data for this URI
        const cachedResponse = this.cacheService.getFromCache(request);
        if (cachedResponse) {
            // In case of parallel requests to same URI,
            // return the request already in progress
            // otherwise return the last cached data
            return cachedResponse instanceof Observable ? cachedResponse : of(cachedResponse.clone());
        }

        // If the request of going through for first time
        // then let the request proceed and cache the response
        return next.handle(request).pipe(
            tap(event => {
                if (event instanceof HttpResponse) {
                    this.cacheService.addToCache(request, event);
                }
            })
        );
    }
}
