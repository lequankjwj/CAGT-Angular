import { APP_INITIALIZER, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AuthGuard } from './guards/auth.guard';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpInterceptorProviders } from './interceptors';
import { ScriptLoaderService } from './services/common/script-loader.service';
import { AppConfig } from './config/app.config';
import { AppMessageConfig } from './config/app.config.message';
import { AppConstant } from '@core/constants/app.constant';
import { CookieService } from 'ngx-cookie-service';

import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzNotificationModule, NzNotificationService } from 'ng-zorro-antd/notification';
import { NgxSpinnerModule } from 'ngx-spinner';
// AoT requires an exported function for factories
export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, './i18n/', '.json?v=' + AppConstant.VERSION);
}

export function initializeApp(config: AppConfig) {
    return () => config.load();
}

export function initializeMessageApp(appMessageConfig: AppMessageConfig) {
    return () => appMessageConfig.load();
}

export const HelperModule = [NzModalModule, NzNotificationModule, NgxSpinnerModule];

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: createTranslateLoader,
                deps: [HttpClient],
            },
        }),
        HttpClientModule,
        HelperModule,
    ],
    exports: [HttpClientModule, HelperModule, TranslateModule],
    declarations: [],
    providers: [
        TranslateService,
        DatePipe,
        ScriptLoaderService,
        NzNotificationService,
        CookieService,
        AppConfig,
        {
            provide: APP_INITIALIZER,
            useFactory: initializeApp,
            deps: [AppConfig],
            multi: true,
        },
        // AppMessageConfig,
        // {
        //     provide: APP_INITIALIZER,
        //     useFactory: initializeMessageApp,
        //     deps: [AppMessageConfig],
        //     multi: true,
        // },
        HttpInterceptorProviders,
        AuthGuard,
    ],
})
export class CoreModule {
    constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
        if (parentModule) {
            throw new Error('Core is already loaded. Import it in the AppModule only');
        }
    }
}
