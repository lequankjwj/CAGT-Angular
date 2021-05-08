import { Pipe, PipeTransform } from '@angular/core';
import { ActionTypeEnum } from '@core/constants/enum.constant';
export const actionNames = ['Xem', 'Thêm', 'Xóa', 'Sửa', 'Tùy chọn'];
@Pipe({ name: 'action' })
export class TranferActionPipe implements PipeTransform {
    transform(actionType: ActionTypeEnum): string {
        return actionNames[actionType];
    }
}
