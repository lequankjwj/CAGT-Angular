export interface IAppConfig {
    env: {
        name: string;
    };
    logging: {
        console: boolean;
        appInsights: boolean;
    };
    menu: {
        left: boolean;
        top: boolean;
    }
    resourceUrl: string;
    apiServer: string;
    sso: string;
    version: string;
}
