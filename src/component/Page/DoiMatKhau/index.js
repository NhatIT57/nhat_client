import React, { useState } from "react";
import "./index.scss";
import useform from "./useForm/useForm";
import validate from "./validateForm/validateForm";
import * as api from "../../../api/khach_hang";
import FacebookLogin from "react-facebook-login";
import * as notify from "../../../contants/notifycation";
import { Link, useHistory } from "react-router-dom";
function DangNhap(props) {
	const history = useHistory();
  const { onChangeInput, handleSubmit, data, setData, errors } = useform(
    submit,
    validate
  );
  const { email, password, passwords } = data;
	const [isLoadding, setIsLoadding] = useState(false);

  async function submit() {
	setIsLoadding(true);
    await api
      .loginEmail(data)
      .then((response) => {
        if (response.status === 200) {
          if (response.data.success === 0) {
			setIsLoadding(false);
            notify.notificatonWarning("Hãy kiểm tra lại email hoặc mật khẩu");
          } else {
            // notify.notificatonSuccess("Đăng nhập thành công");
            let dataStemp = response.data.data;
			      dataStemp.password = data.passwords;
            api
              .update(dataStemp)
              .then((response) => {
                if (response.status === 200) {
                  if (response.data.success === 1) {
					setIsLoadding(false);
					notify.notificatonSuccess("Đổi mật khẩu thành công");
					history.push('/DangNhap')
				} else{
					setIsLoadding(false);
				  }
                }
              })
              .catch((error) => {
                console.log(error);
              });
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className="DangKy-tk">
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <h1 className="title-head text-center">Đổi mật khẩu</h1>
            <form className="row tm-edit-product-form" onSubmit={handleSubmit}>
              <div className="col-sm-12 margin-top">
                <div className="form-group mb-3">
                  <label>EMAIL </label>
                  <input
                    id="email"
                    name="email"
                    type="text"
                    value={email}
                    className="form-control validate"
                    onChange={(e) => onChangeInput(e)}
                    placeholder="NHẬP EMAIL"
                  />
                  {errors.email && <p className="error"> {errors.email} </p>}
                </div>
              </div>
              <div className="col-sm-12 margin-top">
                <div className="form-group mb-3">
                  <label> MẬT KHẨU </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={password}
                    className="form-control validate"
                    onChange={(e) => onChangeInput(e)}
                    placeholder="NHẬP MẬT KHẨU"
                  />
                  {errors.password && (
                    <p className="error"> {errors.password} </p>
                  )}
                </div>
              </div>
              <div className="col-sm-12 margin-top">
                <div className="form-group mb-3">
                  <label> NHẬP MẬT KHẨU MỚI </label>
                  <input
                    id="passwords"
                    name="passwords"
                    type="password"
                    value={passwords}
                    className="form-control validate"
                    onChange={(e) => onChangeInput(e)}
                    placeholder="NHẬP MẬT KHẨU MỚI"
                  />
                  {errors.passwords && (
                    <p className="error"> {errors.passwords} </p>
                  )}
                </div>
              </div>
              <div className="centen-button">
                <Link to="/QuenMatKhau" className="btn_dangky">
                  Quên mật khẩu
                </Link>
              </div>
              <div className="centen-button">
                <button
				disabled={isLoadding}
                  type="submit"
                  className="btn btn-primary text-uppercase add_type"
                >
                  Đổi mật khẩu
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DangNhap;
