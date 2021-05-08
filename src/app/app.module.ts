import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from '@core/core.module';
import { MessageService } from '@progress/kendo-angular-l10n';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
import { AkitaNgRouterStoreModule } from '@datorama/akita-ng-router-store';
import { en_US, NZ_DATE_LOCALE, NZ_I18N, NzI18nService, vi_VN } from 'ng-zorro-antd/i18n';
import { environment } from '@env/environment';
import { registerLocaleData } from '@angular/common';
import { enUS, vi } from 'date-fns/locale';
import en from '@angular/common/locales/en';
import { GlobalErrorHandler } from '@core/config/global-handler.service';
import { AppCustomPreloader } from './preload';
import 'hammerjs';
import { MessageKendoService } from '@core/services/common';
import { CustomTranslateService } from '@core/services/common/custom-translate.service';
import { NgxSpinnerModule } from 'ngx-spinner';
import { HttpClientModule } from '@angular/common/http';

registerLocaleData(en);

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        CoreModule,
        environment.production ? [] : AkitaNgDevtools.forRoot(),
        AkitaNgRouterStoreModule,
        NgxSpinnerModule,
        HttpClientModule
    ],
    providers: [
        { provide: NZ_DATE_LOCALE, useValue: enUS },
        { provide: NZ_I18N, useValue: en_US },
        { provide: MessageService, useClass: MessageKendoService },
        { provide: ErrorHandler, useClass: GlobalErrorHandler },
        CustomTranslateService,
        AppCustomPreloader,
    ],
    bootstrap: [AppComponent],
})
export class AppModule {
    constructor(private i18n: NzI18nService) {
        this.i18n.setLocale(vi_VN);
        this.i18n.setDateLocale(vi);
    }
}
