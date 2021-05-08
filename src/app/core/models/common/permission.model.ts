export enum LoaiBoSungQuyenEnum {}

export enum LoaiThuHoiQuyenEnum {}

export enum LoaiKeThuaQuyenEnum {}

export class CapNhatPhanQuyenViewModel {
    LoaiBoSungQuyen: LoaiBoSungQuyenEnum;
    LoaiThuHoiQuyen: LoaiThuHoiQuyenEnum;
    LoaiKeThuaQuyen: LoaiKeThuaQuyenEnum;
    TenNhomDangChon: string;
    IsViewPhanQuyen: boolean;
    IDNhomNguoiDung: number;
    ArrAclXem: number[];
    ArrAclThem: number[];
    ArrAclSua: number[];
    ArrAclXoa: number[];
    ArrAclTuyChon: number[];
    ArrIDNhomKeThua: number[];
}

export interface IGridViewPermission {
    ID: number;
    GuID: string;
    IDNhom: number;
    TenNhom: string;
    TenGroupManHinh: string;
    ID_TenNhom: string;
    TenChucNang: string;
    TenAction: string;
    TenController: string;
    Area?: string;
    MoTa?: string;
    SoThuTu?: number;
    Xem?: boolean;
    Them?: boolean;
    Sua?: boolean;
    Xoa?: boolean;
    TuyChon: boolean;
    HtmlQuyenTuyChon?: string; // html
    HtmlNguoiDungQuyenTuyChon?: string; // html
    SoThuTuNhom: number;
    LstQuyenTuyChon?: IRoleOption[];

    // field option
    State?: boolean;
    IsHasRole?: boolean;
}

export interface IRoleOption {
    ID: number;
    TenQuyen: string;
    IsCheck: boolean;
}

export interface IPermissionUserTreeDTO {
    ID: number;
    IDThamChieu: number;
    TenNhom: string;
    IsNhom: boolean;
    MaNhanSu?: string;
    childrens: IPermissionUserTreeDTO[];
}

export interface IPermissionUserTree {
    id: number;
    idThamChieu: number;
    tenNhom: string;
    isNhom: boolean;
    maNhanSu: string;
    childrens?: IPermissionUserTree[];
}
