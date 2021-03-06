import validator from 'validator';
export default function validateInfo(values) {
    let errors = {};

    if (!values.email) {
        errors.email = 'Không được để trống';
    } else if (!validator.isEmail(values.email)) {
        errors.email = 'Bạn hãy kiểm tra lại email';
    }
    if (!values.password) {
        errors.password = 'Không được để trống';
    }
    if (!values.passwords) {
        errors.passwords = 'Không được để trống';
    }else if(values.passwords === values.password){
        errors.passwords = 'Trùng với password cũ';
    }

    return errors;
}