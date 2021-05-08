import { DateUtil } from '@core/utils/date';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'customDate',
    pure: false,
})
export class CustomDatePipe implements PipeTransform {
    // tslint:disable-next-line:ban-types
    transform(item) {
       return DateUtil.convertDateTime(item);
    }
}
