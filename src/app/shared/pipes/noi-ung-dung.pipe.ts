import { Pipe, PipeTransform } from '@angular/core';
export const noiUngDungs = ['', 'Trong nước', 'Ngoài nước', 'Trong và ngoài nước'];
@Pipe({ name: 'noiUngDung' })
export class TranferNoiUngDungPipe implements PipeTransform {
    transform(index: number | 0): string {
        return noiUngDungs[index];
    }
}
