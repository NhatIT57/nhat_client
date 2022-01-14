import validator from 'validator';
export default function validateInfo(values) {
    let errors = {};
    if (!values.password) {
        errors.password = 'Không được để trống';
    }
    if (!values.passwords) {
        errors.passwords = 'Không được để trống';
    }else if(values.passwords !== values.password){
        errors.passwords = 'Mật khẩu nhập lại chưa đúng';
    }

    return errors;
}