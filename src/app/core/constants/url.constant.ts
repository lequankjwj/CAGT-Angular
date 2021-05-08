const prefixDM = 'DANH-MUC/';
const prefixACL = 'ACL/';
const prefixHRM = 'HRM/';
const prefixPTN = 'PTN/';
const prefixKHCN = 'KHCN/';

export const UrlConstant = {
    API: {
        DM_NGOAI_NGU: prefixDM + 'NgoaiNgus',
        DM_TINH_THANH: prefixDM + 'TinhThanhs',
        ACL_ACCOUNT:'',


        // SYSTEM
        SYSTEM: {
            MAN_HINH: prefixACL + 'Functions',
            CHUC_NANG: prefixACL + 'Actions',
            USERS: prefixACL + 'Users',
        },
    },
    ROUTE: {
        LOGIN: '/login',
        DASHBOARD: '/management/dashboard',
        FORBIDEN: '/management/403',
        PROFILE: '/management/profile',
        LOGIN_NS: '/management/login-ns',
    },
};
