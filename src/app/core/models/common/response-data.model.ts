export interface IResponseData<T> {
    result?: T;
    errorMessages: IErrorMessage[];
    isOk: boolean;
}

export interface IErrorMessage {
    errorCode: string;
    errorMessage: string;
    errorValues: Array<string>;
}

export interface IPagedResult<T> {
    items: T;
    pagingInfo: IPagingInfo;
}

export interface IPagingInfo {
    pageSize: number;
    pageNumber: number;
    totalItems: number;
}
