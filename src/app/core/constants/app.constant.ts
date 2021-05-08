import { environment } from '@env/environment';

export const AppConstant = {
    VERSION: environment.version,        
    NO_AVATAR_URL: './assets/images/no-avatar.jpg',
    CURRENT_LANG: 'current_lang',
    TITLE: 'Thông báo',
    TYPE: {
        SUCCESS: 'success',
        DANGER: 'danger',
        WARNING: 'warning',
    },
};

export const FOLDER = {
    HINH_DAI_DIEN: 'NS_HinhNhanSu',
    FOLDER_FUNCTION: 'FolderFunc',
};

export const PageConfig = {
    buttonCount: 5,
    pageSizes: [10, 20, 50],
    previousNext: true,
};

export const ModalDeleteConfig = {
    title: 'Bạn có muốn xóa dòng này ?',
    content: '<b style="color: red;">Xác nhận xóa</b>',
    yes: 'Đồng ý',
    no: 'Không',
};

export const ReziseTable = 140;
