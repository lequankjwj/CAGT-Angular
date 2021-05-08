import { Pipe, PipeTransform } from '@angular/core';
const quyNames = ['', 'I', 'II', 'III', 'IV'];
@Pipe({ name: 'quy' })
export class TranferQuyPipe implements PipeTransform {
    transform(quyType: number): string {
        return quyNames[quyType];
    }
}
