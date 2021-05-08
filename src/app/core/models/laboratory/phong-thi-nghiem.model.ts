// export interface IPhongThiNghiem {
//     id: number;
//     idCoQuan: number;
//     tenCoQuan: string;
//     idLoaiHinhPhong: number;
//     maPhongThiNghiem: string;
//     tenPhongThiNghiem: string;
//     moTa: string;
//     chungChi: string;
//     tuCachPhapNhan: string;
//     soTaiKhoan: string;
//     chuTaiKhoan: string;
//     nganHang: string;
//     diaChi: string;
//     soDienThoai: string;
//     stt: number;
//     idFileDinhKem: number;
//     isVisible: true;
//     ghiChu: string;
//     tenPhongThiNghiem_EN: string;
//     tenVietTat: string;
//     namThanhLap: number;
//     soQuyetDinhThanhLap: string;
//     noiDungQuyetDinhThanhLap: string;
//     mucTieu: string;
//     idCapDo: number;
//     idCapQuanLy: number;
// }

// export interface IDangKySuDungPhong {
//     id: number;
//     idPhongThiNghiem: number;
//     idNhanSu: number;
//     idCoQuanNhanSu: number;
//     ngayBatDau: Date;
//     ngayKetThuc: Date;
//     mucTieu: string;
//     nangLucSuDung: string;
//     soNguoiThamGia: number;
//     idTrangThaiDangKy: number;
//     idFileDinhKem: number;
//     ghiChu: string;
// }

// export interface IChuyenNganh {
//     id: number;
//     idPhongThiNghiem?: number;
//     maChuyenNganh: string;
//     tenChuyenNganh: string;
// }

// export interface IDangKySuDungThietBi {
//     id: number;
//     idDangKySuDung: number;
//     idThietBi: number;
//     maThietBi: string;
//     tenThietBi: string;
//     mucTieuHao: number;
//     dieuKienVanHanh: string;
//     ghiChu: string;
// }

// export interface INhatKySuDungPhong {
//     id: number;
//     idDangKySuDung: number;
//     ngayBatDau: Date;
//     ngayKetThuc: Date;
//     ketQuaSuDung: string;
//     chatThai: string;
//     vanDeAnToan: string;
//     kienNghi: string;
//     ghiChu: string;
//     idNguoiSuDung: number;
//     mucDichSuDung: string;
//     soNguoiThamGia: number;
// }

// export interface INhatKySuDungPhongChiTiet {
//     id: number;
//     idDangKySuDung_NhatKySuDung: number;
//     idThietBi: number;
//     idTinhTrangThietBiTruocSD: number;
//     idTinhTrangThietBiSauSD: number;
//     mucTieuHao: 0;
//     ghiChu: string;
// }
// export interface IThietBi {
//     id: number;
//     idCongCu: number;
//     idCoQuan: number;
//     idTinhTrangThietBi: number;
//     maThietBi: string;
//     nguyenGia: number;
//     khauHao: number;
//     giaTriConLai: number;
//     isVisible: boolean;
//     moTa: string;
//     nhaCungCap: string;
//     ghiChu: string;
//     idPhongThiNghiem: number;
//     tenThietBi: string;
//     idQuocGia: number;
//     thongTinKyThuat: string;
//     dieuKienVanHanh: string;
//     namSuDung: number;
//     soNamSuDung: number;
//     tyLeKhauHao: number;
//     ngayBatDauTinhKhauHao: Date;
// }

// export interface IDinhMucTieuHao {
//     id: number;
//     tenThietBi: string;
//     maThietBi: string;
//     tenVatTu: string;
//     donViTinh: string;
//     tenLoaiTieuHao: string;
//     idThietBi: number;
//     idVatTu: number;
//     idDonViTinh: number;
//     tieuHao: number;
//     loaiTieuHao: number;
//     ghiChu: string;
// }

// export interface ITinhTrangThietBi {
//     id: number;
//     ma: string;
//     ten: string;
//     stt: number;
//     isVisible: boolean;
//     ghiChu: string;
//     cssClass: string;
// }

// export interface IThietBiPhuThuoc {
//     id: number;
//     idThietBiParent: number;
//     idThietBi: number;
//     ghiChu: string;
//     maThietBi: string;
//     tenThietBi: string;
//     maThietBiParent: string;
//     tenThietBiParent: string;
// }

// export interface IHuongDanSuDung {
//     id: number;
//     idThietBi: number;
//     tieuDe: string;
//     stt: number;
//     ghiChu: string;
// }

// export interface IBaoHanhBaoTri {
//     id: number;
//     idThietBi: number;
//     ngayThucHien: Date;
//     idNguoiThucHien: number;
//     idTinhTrangThietBi: number;
//     hinhThuc: number;
//     noiDungThucHien: string;
//     ghiChu: string;
// }

// export interface IMangRaNgoai {
//     id: number;
//     idThietBi: number;
//     ngayThucHien: Date;
//     idNguoiDangKy: number;
//     lyDo: string;
//     idTrangThaiMangRaNgoai: number;
//     idNguoiDuyet: number;
//     ngayDuyet: Date;
//     lyDoDuyet: string;
//     ghiChu: string;
// }

// export interface ITheoDoiTrangThai {
//     id: number;
//     maThietBi: string;
//     tenThietBi: string;
//     tenPhongThiNghiem: string;
//     ngayBatDau: Date;
//     ngayKetThuc: Date;
//     tuGio: string;
//     denGio: string;
//     tenCoQuan: string;
//     tenTrangThai: string;
//     isFullDay: boolean,
// }

// export interface IScheduler {
//     id: number,
//     start: Date,
//     end: Date,
//     title: string,
//     isAllDay: boolean,
// }

// export interface ITrangThaiDangKyPhong {
//     id: number;
//     ma: string;
//     ten: string;
//     stt: number;
//     isVisible: boolean;
//     ghiChu: string;
//     cssClass: string;
// }

// export interface IVaiTro {
//     id: number;
//     ma: string;
//     ten: string;
//     stt: number;
//     isVisible: boolean;
//     ghiChu: string;
// }

// export interface IDoiNguCanBo{
//     id: number,
//     idPhongThiNghiem: number,
//     idNhanSu: number,
//     idNganh: number,
//     idChuyenNganh: number,
//     khoaHocDaoTao: string,
//     vanHanhThietBi: string,
//     kinhNghiemVanHanh: string,
//     chungChi: string,
//     idKyNangVanHanh: number,
//     isVisible: boolean,
//     ghiChu: string,
//     idVaiTro: number,
//     isCoHuu: true,
//     maNhanSu: string,
//     hoDem: string,
//     ten: string,
//     tenGioiTinh: string,
//     tenTrinhDo: string,
//     ngaySinh: Date,
//     tenCoQuan: string,
//     tenKyNangVanHanh: string,
//     tenVaiTro: string
// }
