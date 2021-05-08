import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filterArray',
    pure: false,
})
export class ArrayFilterPipe implements PipeTransform {
    // tslint:disable-next-line:ban-types
    transform(items): any {
        if (!items) {
            return items;
        }
        return items.filter(m => !m.isDelete);
    }
}
