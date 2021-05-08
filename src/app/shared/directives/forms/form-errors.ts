import {InjectionToken} from '@angular/core';

export const defaultErrors = {
    required: () => 'Vui lòng không được bỏ trống',
    minlength: (field) => `Bắt buộc nhập tối thiểu ${field.requiredLength} kí tự`,
    maxlength: (field) => `Bắt buộc nhập tối đa ${field.requiredLength} kí tự`,
    email: () => 'Định dạng Email không chính xác',
    invalidNumber: () => 'Bắt buộc phải nhập số',
    invalidSpace: () => 'Nội dung không được có khoảng trắng',
    invalidPhoneNumber: () => 'Định dạng số điện thoại không chính xác',
    mustMatch: () => 'Xác nhận mật khẩu không khớp',
};

export const FORM_ERRORS = new InjectionToken('FORM_ERRORS', {
    providedIn: 'root',
    factory: () => defaultErrors
});


