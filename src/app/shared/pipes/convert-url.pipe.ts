import { Pipe, PipeTransform } from '@angular/core';
import { AppConfig } from '@core/config/app.config';

@Pipe({
    name: 'convertUrl',
})
export class ConvertUrlPipe implements PipeTransform {
    transform(url: string): string {
        if (url !== null) {
            return AppConfig.settings.resourceUrl + url;
        } else {
            return null;
        }
    }
}
