// --- Loại bổ sung quyền
export enum LoaiBoSungQuyenEnum {
    KhongApDung = 1,
    ApDungCapDuoiGanNhat = 2,
    ApDungTatCaCapDuoi = 3,
}

export const LoaiBoSungQuyenDescription = new Map<number, string>([
    [LoaiBoSungQuyenEnum.KhongApDung, 'Không áp dụng'],
    [LoaiBoSungQuyenEnum.ApDungCapDuoiGanNhat, 'Áp dụng cấp dưới gần nhất'],
    [LoaiBoSungQuyenEnum.ApDungTatCaCapDuoi, 'Áp dụng tất cả cấp dưới'],
]);

// --- Loại thu hồi quyền
export enum LoaiThuHoiQuyenEnum {
    ThuHoiTatCa = 1,
    KhongThuHoi = 2,
}

export const LoaiThuHoiQuyenDescription = new Map<number, string>([
    [LoaiThuHoiQuyenEnum.ThuHoiTatCa, 'Thu hồi tất cả'],
    [LoaiThuHoiQuyenEnum.KhongThuHoi, 'Không thu hồi'],
]);

// --- Loại kế thừa quyền
export enum LoaiKeThuaQuyenEnum {
    KhongApDung = 1,
    KeThuaQuyenTuNhom = 2,
}

export const LoaiKeThuaQuyenDescription = new Map<number, string>([
    [LoaiKeThuaQuyenEnum.KhongApDung, 'Không áp dụng'],
    [LoaiKeThuaQuyenEnum.KeThuaQuyenTuNhom, 'Kế thừa quyền từ nhóm'],
]);

// --- ViewModel
export interface ITreeUser {
    id: number;
    name: string;
    isGroup: boolean;
    parentId: number;
    level?: number;
    key?: number;
    childrens?: ITreeUser[];
}

export interface IGridPermission {
    g_Id: number;
    g_Name: string;
    g_GroupName: string;
    g_Order: number;
    f_Id: number;
    f_Name: string;
    f_Order: number;
    isView?: boolean;
    isAdd?: boolean;
    isEdit?: boolean;
    isDelete?: boolean;
    isOption: boolean;
    lstOption: IFeatureOption[];
    state?: boolean;
    isHasRole?: boolean;
}

export interface IGridGroupPermission {
    gF_Id: number;
    gF_Name: string;
    gF_GroupName: string;
    gF_ShortName: string;
    gF_Order: number;
    f_Id: number;
    f_Name: string;
    f_Order: number;
    isView?: boolean;
    isAdd?: boolean;
    isEdit?: boolean;
    isDelete?: boolean;
    isOption: boolean;
    lstOfOption: IFeatureOption[];
    state?: boolean;
    isHasRole?: boolean;
}

export interface IFeatureOption {
    a_Id: number;
    a_Name: string;
    isCheck: boolean;
}

export interface IPermisisonOfUser {
    arrAclView: number[];
    arrAclAdd: number[];
    arrAclEdit: number[];
    arrAclDelete: number[];
    arrAclOption: number[];
}

export interface IUpdatePermission extends IPermisisonOfUser {
    idSelected: number;
    typeOfAddition: LoaiBoSungQuyenEnum;
    typeOfWithdraw: LoaiThuHoiQuyenEnum;
    typeOfInherited: LoaiKeThuaQuyenEnum;
    arrIdInherited: number;
}

export interface ITreeGroupPermission {
    idGroupPermission: number;
    idParent: number;
    groupName: string;
    notes?: string;
    level?: number;
    location?: string;
    hasSubGroup?: boolean;

    // extensions
    value?: string;
    key?: number;
    isLeaf?: boolean;
    children?: ITreeGroupPermission[];
    childrens?: ITreeGroupPermission[];
}
