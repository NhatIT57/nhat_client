import React, { useState, useEffect } from "react";
import "./index.scss";
import * as ActionModal from "./../../../actions/modal";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import jwt from "jsonwebtoken";
import * as apiImage from "./../../../contants/index";
import { Link } from "react-router-dom";
import useform from "./useForm/useForm";
import validate from "./validateForm/validateForm";
import * as apiSize from "./../../../api/chi_tiet_size";
import * as apiDH from "./../../../api/dat_hang";
import * as apiCDH from "./../../../api/ct_don_hang";
import * as apiCTS from "./../../../api/chi_tiet_size";
import { useHistory } from "react-router-dom";
import * as notify from "../../../contants/notifycation";
import * as apiSend from "../../../api/sent_mail";
import Moment from "moment";
import * as apiKM from "./../../../api/khuyen_mai";
function DatHang(props) {
  const history = useHistory();
  const { onChangeInput, handleSubmit, data, setData, errors, setErrors } =
    useform(submit, validate);
  // const { token, CreateModal } = props;
  // const { setterToken } = CreateModal;
  const [token, setToken] = useState([]);
  const [dataSize, setDataSize] = useState([]);
  const [tinh, setTinh] = useState([]);
  const [tong, setTong] = useState(0);
  const [valueRadio, setValueRadio] = useState(true);
  var t = 0;
  const [dataKM, setDataKM] = useState([]);
  const [isKM, setIsKM] = useState(false);
  async function submit() {
    if (valueRadio) {
      await apiDH
        .Them(data)
        .then((response) => {
          if (response.status === 200) {
            var id = response.data.data.insertId;
            apiDH.notifyDat_hang({ id: response.data.data.insertId });
            notify.notificatonSuccess("Bạn đã đặt hàng thành công");
            apiSend
              .sendMail({
                to: data.email,
                subject: `Bạn về đặt một đơn hàng mã đơn hàng là: ${id}`,
                body: `<div><div><p>Bấm vào link bên dưới để xem chi tiết đơn hàng: <a href=http://localhost:3000/XemDonHang/id=${id}>Link</a></p></div></div>`,
              })
              .then((response) => {
                if (response.status === 200) {
                }
              })
              .catch((error) => {
                console.log(error);
              });
            token.map((i, index) => {
              var tam = dataSize;
              apiCDH
                .Them({
                  id_giay: i.id_giay,
                  id_dat_hang: id,
                  so_luong: i.soluong,
                  tong_tien: parseInt(i.soluong) * parseInt(i.gia_ban),
                  id_chi_tiet_mau_sac: dataSize[index].id_ct_mau_sac,
                })
                .then((response) => {
                  if (response.status === 200) {
                    var sl =
                      parseInt(dataSize[index].so_luong) - parseInt(i.soluong);
                    apiCTS
                      .update({
                        id_ct_mau_sac: dataSize[index].id_ct_mau_sac,
                        id_size: dataSize[index].id_size,
                        so_luong: sl,
                      })
                      .then((response) => {
                        if (response.status === 200) {
                          localStorage.removeItem("product");
                          // setterToken([]);
                          history.push("/");
                        }
                      })
                      .catch((error) => {
                        console.log(error);
                      });
                  }
                })
                .catch((error) => {
                  console.log(error);
                });
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      apiDH.getThanhToan(data).then((rsp) => {
        window.location.href = `http://localhost:8888/order/create_payment_url`;
      });
    }
  }

  async function onchangeSelect(e) {
    e.persist();
    var stemp = data;
    await setData((data) => ({
      ...data,
      matp: e.target.value,
    }));
    stemp.matp = e.target.value;
    const stempData = tinh.filter((item) => item.matp === e.target.value);
    if (stempData.length > 0) {
      await setData((data) => ({
        ...data,
        ship: stempData[0].ship,
        tong_tien: tong - stempData[0].ship,
      }));
    }
    await setErrors(validate(stemp));
  }

  useEffect(() => {
    const product = JSON.parse(localStorage.getItem("product"));
    setToken(product);
    var stemp = 0;
    apiKM
      .getNow({ date_now: Moment(Date()).format("YYYY-MM-DD") })
      .then((res) => {
        const { data } = res;
        if (res.status === 200) {
          setDataKM(data.data);
          if (data.data.length > 0) {
            setIsKM(true);
            product.map((item) => {
              const ste = data.data.filter(
                (items) => items.id_giay === item.id_giay
              );
              if (ste.length > 0) {
                stemp += item.soluong * item.gia_ban_khuyen_mai;
              } else {
                stemp += item.soluong * item.gia_ban;
              }
            });
          } else {
            product.map((item) => {
              stemp += item.soluong * item.gia_ban;
            });
          }
          setData((data) => ({
            ...data,
            tong_tien: stemp,
          }));
          setTong(stemp);
        }
      });
    getTinhThanh();
  }, []);

  async function getTinhThanh() {
    await await apiDH
      .getTinhThanh(data)
      .then((response) => {
        if (response.status === 200) {
          setTinh(response.data.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    const tokenss = localStorage.getItem("tokenTC");
    const product = JSON.parse(localStorage.getItem("product"));
    if (tokenss) {
      try {
        var decoded = jwt.verify(tokenss, "qwe1234");
        if (decoded.result) {
          setData((data) => ({
            ...data,
            id_khach_hang: decoded.result.id,
          }));
        }
      } catch (err) {
        // err
      }
      token.map((i) => {
        var d = dataSize;
        apiSize
          .getSize({
            id_giay: i.id_giay,
            id_mau_sac: i.id_mau_sac,
            id_size: i.id_size,
          })
          .then((response) => {
            if (response.data.success === 1) {
              if (response.data) {
                d.push(response.data.data[0]);
                setDataSize(d);
              }
            } else {
            }
          })
          .catch((error) => {
            console.log(error);
          });
      });
    }
  }, [token]);

  function handleChange(e, isBoolean) {
    setValueRadio(isBoolean);
  }

  if (token) {
    return (
      <div className="dathang">
        <div className="modal-all">
          <div className="container">
            <div className="modal-add__header">Sản phẩm </div>
            <div className="modal-table">
              <div className="row">
                <div className="col-md-6 col-xs-12">
                  <div className="modal-table__header">Sản phẩm</div>
                </div>
                <div className="col-md-2 col-xs-12">
                  <div className="modal-table__header">Đơn giá</div>
                </div>
                <div className="col-md-2 col-xs-12">
                  <div className="modal-table__header">Số lượng</div>
                </div>
                <div className="col-md-2 col-xs-12">
                  <div className="modal-table__header">Thành tiền</div>
                </div>
              </div>
            </div>
            {token ? (
              token.map((i, index) => {
                return (
                  <div key={index + 1} className="modal-list">
                    <div className="row">
                      <div className="col-md-6 col-xs-12">
                        <div className="modal-product">
                          <div className="modal-product__image">
                            <img
                              src={`${apiImage.API_ENPOINT}/images/${i.hinh_anh}`}
                              alt=""
                            />
                          </div>
                          <div className="productGH">
                            <div className="productGH-name">{i.ten_giay}</div>
                            <div className="productGH-fast">{`${i.ten_mau_sac}/${i.ten_size}`}</div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-2 col-xs-12 flex-modle__title">
                        <div className="title_block">Đơn giá:</div>
                        {isKM && i.gia_ban_khuyen_mai !== 0 ? (
                              <div className="modal-price">{`${i.gia_ban_khuyen_mai
                                .toString()
                                .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}đ`}</div>
                            ) : (
                              <div className="modal-price">{`${i.gia_ban
                                .toString()
                                .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}đ`}</div>
                            )}
                      </div>
                      <div className="col-md-2 col-xs-12 flex-modle__title">
                        <div className="title_block">Số lượng:</div>
                        <span>{i.soluong}</span>
                      </div>
                      <div className="col-md-2 col-xs-12 flex-modle__title">
                        <div className="title_block">Thành tiền:</div>
                        <div className="modal-priceAll">
                        {isKM && i.gia_ban_khuyen_mai !== 0 ? (
                              <div className="modal-priceAll">
                                {(
                                  parseInt(i.soluong) *
                                  parseInt(i.gia_ban_khuyen_mai)
                                )
                                  .toString()
                                  .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                                ₫
                              </div>
                            ) : (
                              <div className="modal-priceAll">
                                {(parseInt(i.soluong) * parseInt(i.gia_ban))
                                  .toString()
                                  .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                                ₫
                              </div>
                            )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div></div>
            )}
            <div className="hr"></div>
            <div className="mt-2">{`Phí vận chuyển: ${data.ship}`}</div>
            <div>{`Tổng tiền: ${data.tong_tien
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}đ`}</div>
            <div className="hr"></div>
          </div>
        </div>

        <div className="thkh">
          <div className="container mt-2">
            <div>
              <div className="main-header">Hình thúc thanh toán</div>
              <div className="radio-buttons d-flex">
                <div className="mr-2 thanhtoan">
                  <input
                    className="thanhtoan"
                    value="thanhtoan"
                    name="thanhtoan"
                    type="radio"
                    onChange={(e) => handleChange(e, true)}
                    checked={valueRadio === true ? true : false}
                  />
                  Thanh toán khi nhận hàng
                </div>
                <div className="mr-2 thanhtoan">
                  <input
                    className="thanhtoan"
                    value="vnp"
                    name="vnp"
                    type="radio"
                    onChange={(e) => handleChange(e, false)}
                    checked={valueRadio === false ? true : false}
                  />
                  Thanh toán VNPAY
                </div>
              </div>
            </div>
            <div className="main-header mt-3">Thông tin nhận hàng</div>
            <div className="main-form">
              <div className="row">
                <form action="" onSubmit={handleSubmit}>
                  <div className="col-sm-12">
                    <input
                      type="text"
                      value={data.email}
                      placeholder="email"
                      name="email"
                      onChange={onChangeInput}
                    />
                    {errors.email && <p className="error"> {errors.email} </p>}
                  </div>
                  <div className="col-sm-12">
                    <input
                      type="text"
                      value={data.ten_nguoi_nhan}
                      placeholder="Tên người nhận"
                      name="ten_nguoi_nhan"
                      onChange={onChangeInput}
                    />
                    {errors.ten_nguoi_nhan && (
                      <p className="error"> {errors.ten_nguoi_nhan} </p>
                    )}
                  </div>
                  <div className="col-sm-12">
                    <input
                      type="text"
                      value={data.sdt_nguoi_nhan}
                      placeholder="Số điện thoại"
                      name="sdt_nguoi_nhan"
                      onChange={onChangeInput}
                    />
                    {errors.sdt_nguoi_nhan && (
                      <p className="error"> {errors.sdt_nguoi_nhan} </p>
                    )}
                  </div>
                  <div className="col-sm-12 mt-2">
                    <select
                      onChange={onchangeSelect}
                      className="form-control border border-dark"
                      value={data.matp}
                    >
                      <option value="">Chọn tỉnh thành</option>
                      {tinh.map((l, index) => {
                        return (
                          <option key={l.matp} value={l.matp}>
                            {l.name}
                          </option>
                        );
                      })}
                    </select>
                    {errors.matp && (
                      <p className="error mt-2"> {errors.matp} </p>
                    )}
                  </div>
                  <div className="col-sm-12 mt-2">
                    <input
                      type="text"
                      value={data.dia_chi_nguoi_nhan}
                      placeholder="Địa chỉ"
                      name="dia_chi_nguoi_nhan"
                      onChange={onChangeInput}
                    />
                    {errors.dia_chi_nguoi_nhan && (
                      <p className="error"> {errors.dia_chi_nguoi_nhan} </p>
                    )}
                  </div>
                  <div className="col-sm-12">
                    <div className="btn-mua btnsold">
                      <button
                        type="submit"
                        data-role="addtocart"
                        className="btn btn-lg btn-gray btn-cart btn_buy add_to_cart"
                        // disabled="disabled"
                      >
                        <span className="txt-main">Đặt hàng</span>
                      </button>
                    </div>
                  </div>
                  <div className="col-sm-12 mt-3">
                    <div className="centen-button">
                      <Link to="/" className="btn_dangky">
                        Về trang chủ
                      </Link>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return <div>s</div>;
  }
}

DatHang.propTypes = {};

const mapDispatchToProps = (dispatch) => {
  return {
    CreateModal: bindActionCreators(ActionModal, dispatch),
  };
};

const mapStateToProps = (state) => {
  return {
    token: state.modal.token,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DatHang);
