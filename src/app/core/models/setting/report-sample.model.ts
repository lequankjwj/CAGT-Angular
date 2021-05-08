export interface ISettingBieuMau {
    id: number;
    maBieuMau: string;
    tenBieuMau: string;
    idFileDinhKem: number;
    tenFile: string;
    loaiFile: string;
    type: number;
    size: number;
    path: string;
    forWeb: true;
    checkSum: string;
    guidId: string;
    isExportPDF?: boolean;
}
