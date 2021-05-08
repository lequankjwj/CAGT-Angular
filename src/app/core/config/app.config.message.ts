import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConstant } from '@core/constants/app.constant';
@Injectable({ providedIn: 'root' })
export class AppMessageConfig {
    static settings: any;
    constructor(private http: HttpClient) {}
    load() {
        const jsonFile = `_config/message.json?v=${AppConstant.VERSION}`;
        // const jsonFile = `https://egov.ascvn.com.vn/Content/Resource/resource-page-vn.json`;
        return new Promise<void>((resolve, reject) => {
            this.http
                .get(jsonFile)
                .toPromise()
                .then((response: any) => {
                    AppMessageConfig.settings = response as any;
                    resolve();
                })
                .catch((response: any) => {
                    reject(`Could not load file '${jsonFile}': ${JSON.stringify(response)}`);
                });
        });
    }

    getConfig() {
        return AppMessageConfig.settings;
    }
}
