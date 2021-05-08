export interface ITokenInfo {
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
}

export interface IUserInfo {
    aud?: string;
    doiTuongId: string;
    email?: string;
    exp?: number;
    firstName: string;
    iss?: string;
    jti?: string;
    lastName: string;
    loaiDoiTuong?: string;
    mobileNumber?: string;
    permissions?: string;
    functions?: string;
    phoneNumber?: string;
    sub?: string;
    userId: string;
    avatar?: string;
    deviceHash?: string;
}

export interface IUserDevice {
    type: string;
    osName: string;
    osVersion: string;
    engineName: string;
    engineVersion: string;
    browserName: string;
    browserVersion: string;
    ipAddress: string;
    cityName: string;
    countryName: string;
    countryIsoCode: string;
    timeZone: string;
    postalCode: string;
    userAgent: string;
    deviceHash: string;
    loggedTime: number;
    logoutTime: number;
}
