import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfig } from '@core/config/app.config';
import { CacheItem, ICacheItem } from '@core/models/common/catche-item.model';
import { IPagedResult, IResponseData } from '@core/models/common/response-data.model';
import { CachingService } from '@core/services/common/caching.service';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { BehaviorSubject, Observable } from 'rxjs';
import { finalize, map, shareReplay, tap } from 'rxjs/operators';

export abstract class AbstractRestService<T> {
    constructor(protected http: HttpClient) {}
}

@Injectable({
    providedIn: 'root',
})
export class ApiService extends BehaviorSubject<GridDataResult> {

    
    private config = AppConfig.settings;

    private apiCmdUrl: string;
    private apiReadUrl: string;

    private cache: ICacheItem[] = [];
    public loading: boolean;

    constructor(private http: HttpClient, private cachingService: CachingService) {

        super(null);
        
        // set environment
        this.apiCmdUrl = `${this.config.apiServer}/api/cmd/${this.config.version}/`;
        this.apiReadUrl = `${this.config.apiServer}/api/read/${this.config.version}/`;
    }

    /**
     * Gets http client service
     * @param api
     * @param [params]
     * @param [isCache]
     * @returns get
     */
    get(
        api: string,
        // tslint:disable-next-line:ban-types
        params?: Object,
        isCache: boolean = false
    ): Observable<IResponseData<any>> {
        let url: string = null;
        params == null ? (url = this.apiReadUrl + api) : (url = this.apiReadUrl + api + '?' + this.parseParamURL(params));

        let header: HttpHeaders;
        if (isCache) {
            header = new HttpHeaders({ 'cache-response': 'true' });
        }

        return this.http.get<IResponseData<any>>(url, {
            headers: header,
        });
    }

    /**
     * Puts http client service
     * @param api
     * @param data
     * @returns put
     */
    put(api: string, data: any): Observable<IResponseData<any>> {
        return this.http.put<IResponseData<any>>(this.apiCmdUrl + api, data);
    }

    /**
     * Posts http client service
     * @param api
     * @param data
     * @param isRead
     * @returns post
     */
    post(api: string, data: any, isRead?: boolean): Observable<IResponseData<any>> {
        const header = new HttpHeaders({ Read: isRead ? 'true' : 'false' });
        return this.http.post<IResponseData<any>>(this.apiCmdUrl + api, data, {
            headers: header,
        });
    }

    /**
     * API delete for single && multiple record
     * @param api
     * @param [body]
     * @returns delete
     */
    delete(api: string, body?: any): Observable<any> {
        const options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            }),
            body,
        };
        return this.http.delete(this.apiCmdUrl + api, options);
    }

    /**
     * Reads api service
     * @param api
     * @param data
     * @returns read
     */
    read(api: string, data: any): Observable<IResponseData<any>> {
        const header = new HttpHeaders({ Read: 'true' });
        return this.http.post<IResponseData<any>>(this.apiReadUrl + api, data, {
            headers: header,
        }).pipe(shareReplay());
    }

    /**
     * Fetchs post
     * @param api
     * @param [params]
     * @returns post
     */
    // tslint:disable-next-line: ban-types
    fetchPost(api: string, params?: Object): Observable<GridDataResult> {
        this.loading = true;
        return this.http.post(this.apiReadUrl + api, params).pipe(
            map((res: IResponseData<IPagedResult<any>>) => {
                if (res.result) {
                    return {
                        data: res.result ? res.result.items : [],
                        total: res.result ? res.result.pagingInfo?.totalItems : 0,
                    };
                } else {
                    return {
                        data: [],
                        total: 0,
                    };
                }
            }),
            tap(() => (this.loading = false)),
            finalize(() => (this.loading = false))
        );
    }

    /**
     * Parses param url
     * @param params
     * @returns
     */
    // tslint:disable-next-line:ban-types
    private parseParamURL(params: Object) {
        let urlParams = new HttpParams();

        for (const prop in params) {
            if (params.hasOwnProperty(prop)) {
                if (!params[prop] || params[prop].length === 0) {
                    delete params[prop];
                } else {
                    if (Array.isArray(params[prop])) {
                        params[prop].forEach(element => {
                            urlParams = urlParams.append(prop, String(element));
                        });
                    } else {
                        urlParams = urlParams.append(prop, String(params[prop]));
                    }
                }
            }
        }
        return urlParams;
    }

    /**
     * Gets cached item
     * @param url
     * @returns cached item
     */
    private getCachedItem(url: string): CacheItem {
        return this.cache.find(item => item.url === url);
    }

    /**
     * Caches data
     * @param [url]
     * @param [data]
     */
    private cacheData(url: string = '', data: any = null) {
        let cachedItem: CacheItem = this.getCachedItem(url);
        if (!cachedItem) {
            cachedItem = new CacheItem();
            cachedItem.url = url;
            this.cache.push(cachedItem);
        }
        cachedItem.data = data;
    }
}
