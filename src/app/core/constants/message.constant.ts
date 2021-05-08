export const MessageConstant = {
    COMMON: {
        MSG_SERVER_DISCONNECT: 'Không kết nối được tới server, vui lòng kiểm tra lại !',
        MSG_INTERNET_REFUSE: 'Kiểm tra lại kết nối internet',
        MSG_ERROR_SYSTEM: 'Có lỗi xảy ra, vui lòng kiểm tra lại !',
        MSG_CREATE_DONE: 'Tạo mới thành công',
        MSG_UPDATE_DONE: 'Cập nhật dữ liệu thành công',
        MSG_DELETE_DONE: 'Xóa dữ liệu thành công',
        MSG_LOGIN_DONE: 'Đăng nhập vào hệ thống thành công !',
        MSG_REGISTER_DONE: 'Đăng ký tài khoản thành công, Vui lòng nhập tài khoản để đăng nhập vào hệ thống !',
        MSG_ERROR_CODE_NOTFOUND: 'Mã lỗi chưa được định nghĩa',
        MSG_FORMAT_INVALID: 'Định dạng dữ liệu chưa chính xác',
        MSG_RATED_DONE: 'Đánh giá thành công',
    },
    AUTH: {},
};

export const MessageErrorVI = {
    // --------------- USER LOGIN
    UC01: 'FirstName không được quá 100 ký tự.',
    UC02: 'LastName không được quá 500 ký tự.',
    UC03: 'Têm đăng nhập không được quá 50 ký tự.',
    UC04: 'Email không được quá 200 ký tự',
    UC05: 'Số điện thoại không được quá 50 ký tự',
    UC06: 'Địa chỉ không được quá 500 ký tự',
    UC07: 'PasswordHash không được quá 100 ký tự',
    UC08: 'Số điện thoại không được quá 200 ký tự',
    UC09: 'Tên định danh không được quá 50 ký tự',
    UC10: 'Nhóm người dùng không được quá 50 ký tự',
    UC11: 'FirstName không được để trống.',
    UC12: 'LastName không được để trống.',
    UC13: 'Tên đăng nhập không được để trống.',
    UC14: 'Mật khẩu không được để trống.',
    UC15: 'Email không đúng định dạng.',
    UC16: 'Email đã tồn tại trong Hệ Thống.',
    UC17: 'Số điện thoại đã tồn tại trong Hệ Thống.',
    UC18: 'Số điện thoại đã tồn tại trong Hệ Thống.',
    UC19: 'Tên đăng nhập đã tồn tại trong Hệ Thống.',
    UC20: 'Nhóm người dùng không tồn tại trong Hệ Thống',
    UC21: 'Người dùng không tồn tại trong Hệ Thống.',
    UC22: 'Nhóm người dùng đã tồn tại trong Hệ Thống',
    UC23: 'Không thể cập nhật thông tin người dùng vào nhóm người dùng.',

    US01: 'Số điện thoại đã tồn tại trong Hệ Thống.',
    US02: 'Số điện thoại không tồn tại trong Hệ Thống.',
    US07: 'Mật khẩu không chính xác.',
    US08: 'Người dùng không tồn tại trong Hệ Thống',
    US09: 'Email đã tồn tại trong Hệ Thống.',
    US14: 'Số điện thoại bị trùng.',
    US15: 'Số điện thoại hoặc địa chỉ Email đã tồn tại trong Hệ Thống',
    US17: 'Mật khẩu không được nhỏ hơn 6 ký tự',
    US18: 'Mật khẩu không được để trống.',
    US19: 'Email không đúng định dạng',
    US20: 'Số điện thoại không đúng định dạng',
    US21: 'Số điện thoại không được để trống.',

    // --------------- MÀN HÌNH, NHÓM MÀN HÌNH
    FC01: 'Màn hình không tồn tại trong Hệ Thống.',
    FC02: 'Tên màn hình đã tồn tại trong Hệ Thống.',
    FC03: 'Tên màn hình hoặc nhóm màn hình đã tồn tại trong Hệ Thống',
    FC04: 'Tên màn hình không được để trống.',
    FC05: 'Nhóm màn hình không được để trống.',
    FC06: 'Nhóm màn hình không được quá 50 ký tự.',
    FC07: 'Action không được quá 200 ký tự.',
    FC08: 'Controller không được quá 200 ký tự.',
    FC09: 'Area không được quá 200 ký tự.',
    FC10: 'Ghi chú không được quá 1000 ký tự.',
    FC11: 'CssClass không được quá 100 ký tự.',
    FC12: 'CssBadge không được quá 50 ký tự.',
    FC13: 'ParentId không tồn tại trong Hệ Thống.',

    AC01: 'ActionName không được quá 200 ký tự.',
    AC02: 'ActionName Không được để trống',
    AC03: 'ControllerName không được quá 200 ký tự.',
    AC04: 'Ghi chú không được quá 200 ký tự.',
    AC05: 'Tên chức năng không được quá 200 ký tự.',
    AC06: 'Loại chức năng không hợp lệ.',
    AC07: 'Action không tồn tại trong Hệ Thống.',
    AC08: 'Màn hình không tồn tại trong Hệ Thống.',


    // --------------- PHÒNG THÍ NGHIỆM
    PTN01: 'Vui lòng chọn thiết bị',
    PTN02: 'Vui lòng chọn thông tin',
    PTN03: 'Thời gian không hợp lệ',
    PTN04: 'Vui lòng chọn nhân sự',
    PTN05: 'Vui lòng chọn vai trò',



    //---------------- KHOA HỌC CÔNG NGHỆ
    KHCN01: 'Vui lòng chọn nhân sự',
    KHCN02: 'Vui lòng chọn vai trò cho nhân sự',
    KHCN03: 'Vui lòng chọn phòng thí nghiệm',
    KHCN04: 'Vui lòng chọn mức độ sử dụng'

};

export const MessageErrorEN = {};
