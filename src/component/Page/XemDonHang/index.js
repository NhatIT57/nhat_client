import React, { useEffect, useState } from "react";
import * as api from "./../../../api/dat_hang";
import moment from "moment";
import "./index.scss";
import { useHistory } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import Carousel from "react-bootstrap/Carousel";

function XemDonHang(props) {
  const [data, setData] = useState({});
  const [status, setStatus] = useState("DAT_HANG");
  const [khuyenmai, setKhuyenMai] = useState([]);
  const [dataTK, setDataTK] = useState([]);
  const [show, setShow] = useState(false);
  const [nd, setNd] = useState("");
  const handleClose = () => {
    setShow(false);
  };

  function imageArray(h) {
    const d = h.split(",");
    let arr = [];
    for (var i = 0; i < d.length; i++) {
      arr.push(d[i]);
    }
    return arr;
  }

  function closeDidalog() {
    api
      .update({
        id: parseInt(props.match.params.id),
        trang_thai: status,
        id_khach_hang: data.id_khach_hang,
        ten_nguoi_nhan: data.ten_nguoi_nhan,
        sdt_nguoi_nhan: data.sdt_nguoi_nhan,
        dia_chi_nguoi_nhan: data.dia_chi_nguoi_nhan,
        thoi_gian_dat: moment(data.thoi_gian_dat).format("YYYY-MM-DD HH:mm"),
        date_update: moment(new Date()).format("YYYY-MM-DD HH:mm"),
      })
      .then((response) => {
        if (response.status === 200) {
          history.push("/donhang");
        }
      })
      .catch((error) => {
        console.log(error);
      });

    setShow(false);
  }

  const history = useHistory();
  useEffect(() => {
    if (props.match.params) {
      function fetchPostsLists() {
        if (props.match.params.id) {
          api.getDonHangByID({ id: props.match.params.id }).then((res) => {
            if (res.status === 200) {
              api.getGiayByID({ id: props.match.params.id }).then((resP) => {
                if (resP.status === 200) {
                  let d = res.data.data[0];
                  d.chitiet = resP.data.data;
                  setData(d);
                  setStatus(d.trang_thai);
                }
              });
            }
          });
        }
      }

      fetchPostsLists();
    }
    return () => {
      setData([]);
    };
  }, [props.match.params]);
  function onchangeSelect(e) {
    e.persist();
    setStatus(e.target.value);
  }
  function getTongTien() {
    let tong = 0;
    if (data.id) {
      data.chitiet.forEach((item, index) => {
        tong += item.so_luong * item.gia_ban;
      });
    }
    return tong;
  }
  // function onCancle() {
  //   history.push("/donhang");
  // }
  // function onUpdateTT() {
  //   setShow(true);
  //   setNd(`Bạn có chắc chắn muốn chỉnh sửa đơn hàng`);
  // }
  return (
    <div className="donhang menumonan mt-5">
      <div className="list card_dh container">
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Thông báo</Modal.Title>
          </Modal.Header>
          <Modal.Body>{nd}</Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={closeDidalog}>
              Đồng ý
            </Button>
          </Modal.Footer>
        </Modal>

        <div className="donhang-content">
          {/* <div className="search_reservation">
            <div className="title_reservation"></div>
            <div className="search_RVT">
              <div className="rights">
                <button
                  type="button"
                  className="btn btn-secondary mr-2"
                  onClick={onCancle}
                >
                  Trở về
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={onUpdateTT}
                >
                  Thực hiện
                </button>
              </div>
            </div>
          </div> */}

          <div className="listusers">
            <Table striped bordered hover variant="dark" className="table_type">
              <tbody>
                <tr>
                  <td>Người gửi</td>
                  <td colSpan={5}>{data.ten_khach_hang}</td>
                </tr>
                <tr>
                  <td>Người nhận</td>
                  <td colSpan={5}>{data.ten_nguoi_nhan}</td>
                </tr>
                <tr>
                  <td>Số điện thoại</td>
                  <td colSpan={5}>{data.sdt_nguoi_nhan}</td>
                </tr>

                <tr>
                  <td>Địa chỉ</td>
                  <td colSpan={5}>{data.dia_chi_nguoi_nhan}</td>
                </tr>
                <tr>
                  <td>Thời gian đặt</td>
                  <td colSpan={5}>
                    {moment(data.tg_dathang).utc().format("DD-MM-YYYY HH:mm")}
                  </td>
                  {/* <td>Thời gian Giao hàng</td>
                  <td colSpan={3}>
                    {moment(data.tg_giaohang).utc().format("YYYY-MM-DD HH:mm")}
                  </td> */}
                </tr>
                <tr>
                  <td>Tình trạng</td>
                  <td colSpan={5}>
                    <select
                    disabled={true}
                      onChange={(e) => onchangeSelect(e)}
                      className="form-control"
                      id="category"
                      value={status}
                    >
                      <option value={0}>Đặt hàng</option>
                      <option value={1}>Xác nhận</option>
                      <option value={2}>Hoàn thành</option>
                      <option value={3}>Hủy đơn hàng</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <td>Tổng tiền</td>
                  <td colSpan={5}>
                    {" "}
                    {`${getTongTien()
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}đ`}
                  </td>
                </tr>
              </tbody>
            </Table>
          </div>
          <div className="title-sanpham">Sản phẩm</div>
          {data.id ? (
            <div className="row">
              {data.chitiet.map((list, i) => {
                return (
                  <div key={i + 1} className="col-sm-4">
                    <div className="row">
                      <div className="col-sm-12">
                        <div className="card">
                          <div className="img">
                            <Carousel>
                              {imageArray(list.hinh_anh).map(
                                (l, indexImage) => {
                                  return (
                                    <Carousel.Item key={indexImage}>
                                      <img
                                        className=" w-100"
                                        src={`http://localhost:8080/images/${l}`}
                                        alt=""
                                      />
                                    </Carousel.Item>
                                  );
                                }
                              )}
                            </Carousel>
                          </div>
                          <div className="card-body">
                            <h5 className="card-title fs-4">{list.ten_giay}</h5>

                            <p className="card-text">
                              Giá bán:{" "}
                              {`${list.gia_ban
                                .toString()
                                .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}đ`}
                            </p>
                            <p className="card-text">
                              Số lượng: {list.so_luong}
                            </p>

                            <p className="card-text">
                              Tổng tiền: {list.gia_ban * list.so_luong}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </div>
  );
}

XemDonHang.propTypes = {};

export default XemDonHang;
