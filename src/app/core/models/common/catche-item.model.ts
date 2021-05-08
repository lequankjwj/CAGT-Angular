export interface ICacheItem {
    url: string;
    data: any;
}

export interface ICacheRequest {
    url: string;
    isCache: boolean;
}

export class CacheItem {
    url: string;
    data: any;
}
