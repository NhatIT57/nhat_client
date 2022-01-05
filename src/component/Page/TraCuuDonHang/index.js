import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import "./index.scss";
import Pagination from "react-js-pagination";
import * as apiDatHang from "./../../../api/dat_hang";

function TraCuuDonHang(props) {
  const [valueRadio, setValueRadio] = useState("sdt");
  const [valueData, setValueData] = useState("");
  const [valueDataEmail, setValueDataEmail] = useState("");

  const [allPage, setAllPage] = useState(3);
  const [data, setData] = useState([]);
  const [offset, setOffset] = useState(0);
  const [activePage, setActivePage] = useState(1);

  //   useEffect(() => {
  //     if (valueRadio === "email") {
  //       const stemp = {
  //         limit: 1,
  //         offset: offset,
  //         data: valueDataEmail,
  //       };
  //       loadData(stemp);
  //     } else {
  //       const stemp = {
  //         limit: 1,
  //         offset: offset,
  //         data: valueData,
  //       };
  //       loadData(stemp);
  //     }
  //   }, []);

  function handleChange(e) {
    setValueRadio(e.target.value);
  }

  function onChangeDataForm(e) {
    if (e.target.name === "data") {
      setValueData(e.target.value);
    } else {
      setValueDataEmail(e.target.value);
    }
  }

  function handlePageChange(pageNumber) {
    if (valueRadio === "email") {
      const stemp = {
        limit: 1,
        offset: pageNumber - 1,
        email: valueDataEmail,
      };
      loadData(stemp);
    } else {
      const stemp = {
        limit: 1,
        offset: pageNumber - 1,
        sdt: valueData,
      };
      loadData(stemp);
    }
  }

  async function loadData(datas) {
    setActivePage(datas.offset + 1);
    if (valueRadio === "email") {
      await apiDatHang
        .getDonHangByEmailAll(datas)
        .then((rsps) => {
          if (rsps.status === 200) {
            setAllPage(rsps.data.data.length);
          }
        })
        .catch((e) => console.log(e));
      await apiDatHang
        .getDonHangByEmail(datas)
        .then((rsp) => {
          if (rsp.status === 200) {
            setData(rsp.data.data);
          }
        })
        .catch((e) => console.log(e));
    } else {
      await apiDatHang
        .getDonHangBySDTAll(datas)
        .then((rsps) => {
          if (rsps.status === 200) {
            setAllPage(rsps.data.data.length);
          }
        })
        .catch((e) => console.log(e));
      await apiDatHang
        .getDonHangBySDT(datas)
        .then((rsp) => {
          if (rsp.status === 200) {
            setData(rsp.data.data);
          }
        })
        .catch((e) => console.log(e));
    }
  }

  function onSubmit(e) {
    e.preventDefault();
    if (valueRadio === "email") {
      const stemp = {
        limit: 1,
        offset: offset,
        email: valueDataEmail,
      };
      loadData(stemp);
    } else {
      const stemp = {
        limit: 1,
        offset: offset,
        sdt: valueData,
      };
      loadData(stemp);
    }
  }

  return (
    <div className="TraCuuDonHang mt-4">
      <Container>
        <div className="row d-flex justify-content-between">
          <div className="col-sm-12 col-lg-5 form-tracuu">
            <form onSubmit={onSubmit}>
              <div className="label-form d-flex justify-content-center">
                <i className="fa fa-search" aria-hidden="true"></i>
                <div className="fs-5 fw-bold ml-2">Kiểm tra đơn hàng</div>
              </div>
              <hr className="title-text"></hr>
              <div className="mt-3">
                <div className="label-radio">Kiểm tra bằng</div>
                <div className="radio-buttons d-flex">
                  <div className="mr-2">
                    <input
                      id="sdt"
                      value="sdt"
                      name="sdt"
                      type="radio"
                      className="mr-1"
                      onChange={handleChange}
                      checked={valueRadio === "sdt" ? true : false}
                    />
                    Số điện thoại
                  </div>
                  <div className="mr-2">
                    <input
                      id="email"
                      value="email"
                      name="email"
                      type="radio"
                      className="mr-1"
                      onChange={handleChange}
                      checked={valueRadio === "email" ? true : false}
                    />
                    Email
                  </div>
                </div>
              </div>
              {valueRadio === "sdt" ? (
                <div className="mt-3">
                  <label htmlFor="id-sdt">Số điện thoại</label>
                  <input
                    type="text"
                    name="data"
                    value={valueData}
                    onChange={onChangeDataForm}
                    className="form-control"
                  />
                </div>
              ) : (
                <div className="mt-3">
                  <label htmlFor="id-sdt">Email</label>
                  <input
                    type="text"
                    name="dataEmail"
                    value={valueDataEmail}
                    onChange={onChangeDataForm}
                    className="form-control"
                  />
                </div>
              )}
              <div className="mt-3 d-flex justify-content-end">
                <button type="submit" className="btn btn-primary">
                  Kiểm tra
                </button>
              </div>
            </form>
          </div>
          {data.length > 0 ? (
            <div className="col-sm-12 col-lg-6 data-tracuu">
              <div className="label-form d-flex">
                <div className="fs-5 fw-bold">{`Mã đơn hàng: ${data[0].ma_don_hang}`}</div>
              </div>
              <div className="mt-3">
                <div className="info-data">{`Họ và tên khách hàng: ${data[0].ten_nguoi_nhan}`}</div>
                <div className="info-data">{`Số điện thoại: ${data[0].sdt_nguoi_nhan}`}</div>
                <div className="info-data">{`Email: ${data[0].email}`}</div>
                <div className="info-data">{`Ngày mua: ${data[0].thoi_gian_dat}`}</div>
                <div className="info-data">{`Địa chỉ giao hàng: ${data[0].dia_chi_nguoi_nhan}`}</div>
              </div>
              <div className="mt-3">
                <div className="info-data">{`Trạng thái thanh toán: ${
                  data[0].trang_thai === "DAT_HANG"
                    ? "Đặt hàng"
                    : data[0].trang_thai === "XAC_NHAN"
                    ? "Đã xác nhận đơn hàng"
                    : "Hoàn thành"
                }`}</div>
              </div>
              <div className="label-form d-flex mt-3">
                <div className="fs-5 fw-bold">
                  {`Giá trị đơn hàng: ${data[0].tong_tien
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}đ`}
                </div>
              </div>
              <div className="label-form d-flex mt-3">
                <div className="fs-5 fw-bold">{`Số lượng sản phẩm: ${data[0].so_luong}`}</div>
              </div>
              <div className="col-sm-12">
                <div className="pagination">
                  <Pagination
                    prevPageText="prev"
                    nextPageText="next"
                    activePage={activePage}
                    itemsCountPerPage={1}
                    totalItemsCount={allPage}
                    pageRangeDisplayed={3}
                    onChange={handlePageChange}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="fs-4 fw-bold mt-4">Không tìm thấy</div>
          )}
        </div>
      </Container>
    </div>
  );
}

export default TraCuuDonHang;
