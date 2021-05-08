import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { IAppConfig } from './app-config.model';
import { AppConstant } from '@core/constants/app.constant';

@Injectable()
export class AppConfig {
    static settings: IAppConfig;

    constructor(private http: HttpClient) {}

    load() {
        const jsonFile = `_config/config.${environment.name}.json?v=${AppConstant.VERSION}/`;
        debugger;

        return new Promise<void>((resolve, reject) => {
            this.http
                .get(jsonFile)
                .toPromise()
                .then((response: IAppConfig) => {
                    console.log(response);
                    AppConfig.settings = response as IAppConfig;
                    resolve();
                })
                .catch((response: any) => {
                    console.log(response);

                    reject(`Could not load file '${jsonFile}': ${JSON.stringify(response)}`);
                });
        });
    }

    getConfig() {
        return AppConfig.settings;
    }
}
