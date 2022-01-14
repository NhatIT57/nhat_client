import React, { useState, useEffect } from "react";
import "./index.scss";
import useform from "./useForm/useForm";
import validate from "./validateForm/validateForm";
import validatePassWord from "./validateForm/validateFormPass";
import * as api from "../../../api/khach_hang";
import * as apiSend from "../../../api/sent_mail";
import * as notify from "../../../contants/notifycation";
import { Link, useHistory } from "react-router-dom";
function DangNhap(props) {
  const history = useHistory();
  const { onChangeInput, handleSubmit, data, setData, errors } = useform(
    submit,
    validate,
    validatePassWord,
    props.match.params
  );
  const { email, password, passwords } = data;
  const [isLoadding, setIsLoadding] = useState(false);
  // useEffect(() => {
  //   if (props.match.params) {
  //     function fetchPostsLists() {
  //       if (props.match.params.id) {
  //         api
  //           .getByID({ id: props.match.params.id })
  //           .then((response) => {
  //             if (response.status === 200) {
  //               setData(response.data.data);
  //             }
  //           })
  //           .catch((error) => {
  //             console.log(error);
  //           });
  //       }
  //     }
  //     fetchPostsLists();
  //   }
  // }, [props.match.params]);

  async function submit() {
    setIsLoadding(true);
    if (props.match.params.id) {
      let stemp = null;
      await  api
      .getByID({ id: props.match.params.id })
      .then((response) => {
        if (response.status === 200) {
          stemp = response.data.data
        }
      })
      .catch((error) => {
        console.log(error);
      });
      stemp.password = data.password
      await api
        .update(stemp)
        .then((response) => {
          if (response.status === 200) {
            if (response.data.success === 1) {
              setIsLoadding(false);
              notify.notificatonSuccess("Đổi mật khẩu thành công");
              history.push("/DangNhap");
            } else {
              setIsLoadding(false);
            }
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      await api
        .getEmail(data)
        .then((response) => {
          if (response.status === 200) {
            if (response.data.success === 2) {
              setIsLoadding(false);
              notify.notificatonWarning("Hãy kiểm tra lại email");
            } else {
              setIsLoadding(false);
              notify.notificatonSuccess(
                "Bạn hãy xác nhân mail của bạn để tiếp tục"
              );
              let dataStemp = response.data.data;
              apiSend
                .sendMail({
                  to: dataStemp.email,
                  subject: "Xác nhận mail",
                  body: `<div><div>Để xác nhận việc thay đổi tài khoản hãy bấm vào link bên dưới</div><div><a href=http://localhost:3000/QuenMatKhau/id=${dataStemp.id}>Link</a></div></div>`,
                })
                .then((response) => {
                  if (response.status === 200) {
                    setIsLoadding(true);
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
  }

  return (
    <div className="DangKy-tk">
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <h1 className="title-head text-center">Đổi mật khẩu</h1>
            <form className="row tm-edit-product-form" onSubmit={handleSubmit}>
              {!props.match.params.id ? (
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
              ) : (
                <div>
                  <div className="col-sm-12 margin-top">
                    <div className="form-group mb-3">
                      <label> MẬT KHẨU MỚI</label>
                      <input
                        id="password"
                        name="password"
                        type="password"
                        value={password}
                        className="form-control validate"
                        onChange={(e) => onChangeInput(e)}
                        placeholder="NHẬP MẬT KHẨU MỚI"
                      />
                      {errors.password && (
                        <p className="error"> {errors.password} </p>
                      )}
                    </div>
                  </div>
                  <div className="col-sm-12 margin-top">
                    <div className="form-group mb-3">
                      <label> NHẬP LẠI MẬT KHẨU </label>
                      <input
                        id="passwords"
                        name="passwords"
                        type="password"
                        value={passwords}
                        className="form-control validate"
                        onChange={(e) => onChangeInput(e)}
                        placeholder="NHẬP LẠI MẬT KHẨU "
                      />
                      {errors.passwords && (
                        <p className="error"> {errors.passwords} </p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              <div className="centen-button">
                <Link to="/DangNhap" className="btn_dangky">
                  Đăng nhập
                </Link>
              </div>
              <div className="centen-button">
                <button
                  disabled={isLoadding}
                  type="submit"
                  className="btn btn-primary text-uppercase add_type"
                >
                  Submit
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
