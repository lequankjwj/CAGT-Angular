import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class CachingService {
    cacheMap = new Map<any, any>(null);

    constructor() {}

    /**
     * Gets from cache
     * @param req
     * @returns from cache
     */
    getFromCache(req: HttpRequest<any>): HttpResponse<any> | undefined {
        const url = req.urlWithParams;
        const cached = this.cacheMap.get(url);

        if (!cached) {
            return undefined;
        }

        return this.cacheMap.get(url).response;
    }

    /**
     * Adds to cache
     * @param req
     * @param response
     */
    addToCache(req: HttpRequest<any>, response: HttpResponse<any>): void {
        const url = req.url;
        const entry = { url, response, addedTime: Date.now() };
        this.cacheMap.set(url, entry);
    }
}
