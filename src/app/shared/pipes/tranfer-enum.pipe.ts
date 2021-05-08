import { Pipe, PipeTransform } from '@angular/core';
import {
    LoaiBoSungQuyenDescription,
    LoaiBoSungQuyenEnum,
    LoaiKeThuaQuyenDescription,
    LoaiKeThuaQuyenEnum,
    LoaiThuHoiQuyenDescription,
    LoaiThuHoiQuyenEnum,
} from '@core/models/permissions/permission.model';
@Pipe({ name: 'typeOfAddition' })
export class TranferLoaiBoSungQuyenPipe implements PipeTransform {
    transform(type: LoaiBoSungQuyenEnum): string {
        return LoaiBoSungQuyenDescription.get(type);
    }
}

@Pipe({ name: 'typeOfWithDraw' })
export class TranferLoaiThuHoiQuyenPipe implements PipeTransform {
    transform(type: LoaiThuHoiQuyenEnum): string {
        return LoaiThuHoiQuyenDescription.get(type);
    }
}

@Pipe({ name: 'typeOfInherited' })
export class TranferLoaiThuaKeQuyenPipe implements PipeTransform {
    transform(type: LoaiKeThuaQuyenEnum): string {
        return LoaiKeThuaQuyenDescription.get(type);
    }
}
