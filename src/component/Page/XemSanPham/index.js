import React, { useState, useEffect } from "react";
import * as giayAPI from "./../../../api/giay";
import * as apiKM from "./../../../api/khuyen_mai";
import "./index.scss";
import SelectSize from "./select_Size/index";
import SelectFast from "./select_Fast/index";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import * as apiImage from "./../../../contants/index";
import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as ActionModal from "./../../../actions/modal";
import { useHistory } from "react-router-dom";
import jwt from "jsonwebtoken";
import * as notify from "../../../contants/notifycation";
import Moment from "moment";

function XemSanPham(props) {
  const { CreateModal } = props;
  const history = useHistory();
  const [data, setData] = useState({});
  const [dataTam, setDataTam] = useState([]);
  const [dataTamAll, setDataTamAll] = useState([]);
  const [dataSubmit, setDataSubmit] = useState({
    id_giay: "",
    ten_giay: "",
    gia_ban: 0,
    gia_ban_khuyen_mai: 0,
    id_size: 0,
    ten_size: 0,
    id_mau_sac: 0,
    ten_mau_sac: "",
    soluong: 0,
    hinh_anh: "",
    soluong_con: 0,
  });
  const [dataKM, setDataKM] = useState([]);
  const [mausac, setMausac] = useState([]);
  useEffect(() => {
    if (props.match.params) {
      async function fetchPostsLists() {
        if (props.match.params.th) {
          await giayAPI
            .xemSanPham({
              id: props.match.params.th,
            })
            .then((res) => {
              const { data } = res;
              if (res.status === 200) {
                setDataTam(data.data);
                giayAPI
                  .xemSanPhamAll({
                    id: props.match.params.th,
                  })
                  .then((resP) => {
                    const dataAll = resP.data;
                    if (resP.status === 200) {
                      setDataTamAll(dataAll.data);
                    }
                  });
              }
            });
          await apiKM
            .getNow({ date_now: Moment(Date()).format("YYYY-MM-DD") })
            .then((res) => {
              const { data } = res;
              if (res.status === 200) {
                setDataKM(data.data);
              }
            });
        }
      }

      fetchPostsLists();
    }
    return () => (setDataTam([]), setDataTamAll([]));
  }, [props.match.params]);

  useEffect(() => {
    let current = true;
    if (dataTam.length > 0 && dataTamAll.length > 0) {
      let dataTLG = [];
      dataTam.forEach((giay) => {
        const mauTam = [];
        const filterMS = dataTamAll.filter((it) => it.id_giay === giay.id);
        filterMS.forEach((i) => {
          const s = dataTamAll.filter((item) => item.id === i.id);
          if (mauTam.length > 0) {
            let dem = 0;
            mauTam.forEach((ms) => {
              if (ms.id === i.id) {
                dem++;
              }
            });
            if (dem === 0) {
              const m = {
                id: i.id,
                id_giay: i.id_giay,
                id_mau_sac: i.id_mau_sac,
                hinh_anh: i.hinh_anh,
                ten_mau_sac: i.ten_mau_sac,
                size: s,
              };
              mauTam.push(m);
            }
          } else if (mauTam.length === 0) {
            const m = {
              id: i.id,
              id_giay: i.id_giay,
              id_mau_sac: i.id_mau_sac,
              hinh_anh: i.hinh_anh,
              ten_mau_sac: i.ten_mau_sac,
              size: s,
            };
            mauTam.push(m);
          }
        });
        const g = {
          id: giay.id,
          ten_giay: giay.ten_giay,
          mo_ta: giay.mo_ta,
          id_loai_giay: giay.id_loai_giay,
          gia_ban: giay.gia_ban,
          gia_ban_khuyen_mai: giay.gia_ban_khuyen_mai,
          trang_thai: giay.trang_thai,
          mausac: mauTam,
        };
        dataTLG.push(g);
      });
     
      setData(dataTLG);
      if (dataTLG.length > 0) {
        const d = dataTLG[0].mausac[0].hinh_anh.split(",");
        let stemp = null;
        let stemps = 0;
        if (dataKM.length > 0) {
          const filter = dataKM.filter(
            (items) => items.id_giay === dataTLG[0].id
          );
          if (filter.length > 0) {
            stemp = filter[0].phan_tram;
          } else {
            stemp = null;
          }
          if (stemp) {
            stemps =
              stemp !== null
                ? dataTLG[0].mausac[0].size[0].gia_ban - (dataTLG[0].mausac[0].size[0].gia_ban * stemp) / 100
                : 0;
          }
        }
        setDataSubmit((dataSubmit) => ({
          ...dataSubmit,
          id_giay: dataTLG[0].id,
          ten_giay: dataTLG[0].ten_giay,
          gia_ban: dataTLG[0].mausac[0].size[0].gia_ban,
          id_size: dataTLG[0].mausac[0].size[0].id_size,
          ten_size: dataTLG[0].mausac[0].size[0].ten_size,
          soluong_con: dataTLG[0].mausac[0].size[0].so_luong,
          id_mau_sac: dataTLG[0].mausac[0].id_mau_sac,
          ten_mau_sac: dataTLG[0].mausac[0].ten_mau_sac,
          gia_ban_khuyen_mai: stemps ? stemps : 0,
          soluong: 1,
          hinh_anh: d[0],
        }));
      }
    }

    return () => (current = false);
  }, [dataTam, dataTamAll, dataKM]);

  function handleSubmit(e) {
    e.preventDefault();
  }
  function fast_select(datas) {
    const m = data[0].mausac.filter(
      (arr, index) => arr.id_mau_sac === datas.id_mau_sac
    );
    if (m.length > 0) {
      const d = m[0].hinh_anh.split(",");
      let arr = [];
      for (var i = 0; i < d.length; i++) {
        arr.push(d[i]);
      }
      setMausac(arr);
      setDataSubmit((dataSubmit) => ({
        ...dataSubmit,
        id_mau_sac: datas.id_mau_sac,
        ten_mau_sac: datas.ten_mau_sac,
        id_size: data[0].mausac[0].size[0].id,
        ten_size: data[0].mausac[0].size[0].ten_size,
        hinh_anh: d[0],
      }));
    }
  }
  function selectSizes(data) {
    setDataSubmit((dataSubmit) => ({
      ...dataSubmit,
      id_size: data.id_size,
      ten_size: parseInt(data.ten_size),
      gia_ban: data.gia_ban,
      soluong_con: data.soluong,
    }));
  }

  function handleQuantity(d) {
    if (
      parseInt(d) + parseInt(dataSubmit.soluong) <=
        parseInt(dataSubmit.soluong_con) &&
      parseInt(d) + parseInt(dataSubmit.soluong) > 0
    ) {
      setDataSubmit((dataSubmit) => ({
        ...dataSubmit,
        soluong: parseInt(d) + parseInt(dataSubmit.soluong),
      }));
    } else {
      notify.notificatonWarning(
        `Số lượng bạn có thể mua là: ${dataSubmit.soluong_con}`
      );
    }
  }
  function onChangeSelectQuantity(e) {
    e.persist();
    const rx_live = /^[+-]?\d*(?:[.,]\d*)?$/;
    if (rx_live.test(e.target.value)) {
      if (e.target.value !== "") {
        if (parseInt(e.target.value) <= parseInt(dataSubmit.soluong_con)) {
          setDataSubmit((dataSubmit) => ({
            ...dataSubmit,
            soluong: e.target.value,
          }));
        } else {
          notify.notificatonWarning(
            `Số lượng bạn có thể mua là: ${dataSubmit.soluong_con}`
          );
        }
      } else {
        setDataSubmit((dataSubmit) => ({
          ...dataSubmit,
          soluong: e.target.value,
        }));
      }
    }
  }

  useEffect(() => {
    if (data.length > 0) {
      const m = data[0].mausac.filter(
        (arr, index) => arr.id_mau_sac === dataSubmit.id_mau_sac
      );
      if (m.length > 0) {
        const d = m[0].hinh_anh.split(",");
        let arr = [];
        for (var i = 0; i < d.length; i++) {
          arr.push(d[i]);
        }
        setMausac(arr);
      }
    }
  }, [data, dataSubmit]);

  function showModals() {
    if (dataSubmit.soluong !== "") {
      const { setterToken } = CreateModal;
      var token = localStorage.getItem("tokenTC");
      if (token) {
        const dd = JSON.parse(localStorage.getItem("product"));
        const gb = dataSubmit.gia_ban;
        const sl = dataSubmit.soluong;
        let d = [];
        var dataTamToken = dataSubmit;
        dataTamToken.tongtien = gb * sl;

        if (dd) {
          let tam = [];
          tam = dd.filter((item) => {
            return item.id_giay === dataTamToken.id_giay;
          });

          if (tam.length > 0) {
            const i = dd.findIndex(
              (item) => item.id_giay === dataTamToken.id_giay
            );
            dataTamToken.soluong =
              parseInt(dataTamToken.soluong) + parseInt(tam[0].soluong);

            if (i !== -1) {
              const newlist = [
                ...dd.slice(0, i),
                dataTamToken,
                ...dd.slice(i + 1),
              ];
              d = newlist;
            }
          } else {
            d = dd;
            d.push(dataTamToken);
          }
        } else {
          d.push(dataTamToken);
        }
        localStorage.setItem("product", JSON.stringify(d));
        setterToken(d);
        const { showModal } = CreateModal;
        showModal();
      } else {
        history.push("/DangNhap");
      }
    } else {
      notify.notificatonWarning(`Hãy nhập số lượng bạn muốn mua`);
    }
  }
  if (mausac.length > 0) {
    return (
      <div className="xem_san_pham">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-sm-6 col-lg-6 col-md-6">
              <OwlCarousel items={1} className="owl-theme" loop nav margin={8}>
                {mausac.length > 0 ? (
                  mausac.map((item, index) => {
                    return (
                      <Link
                        key={index + 1}
                        to="/SanPhamMoi"
                        className="title-hp"
                      >
                        <div className="one-procut">
                          <div className="width-image">
                            <img
                              className="img"
                              src={`${apiImage.API_ENPOINT}/images/${item}`}
                            />
                          </div>
                        </div>
                      </Link>
                    );
                  })
                ) : (
                  <div>sss</div>
                )}
              </OwlCarousel>
            </div>
            <div className="col-xs-12 col-sm-6 col-lg-6 col-md-6">
              <div className="watch-product">
                <div className="watch-product__name">
                  CAPTOE BROGUES OXFORD - LIMITED EDITION - OF21
                </div>
                <div className="watch-product__price mt-3">
                  <div className="select-fast__modify">Giá bán:</div>
                 <div className="d-flex">
                 <div className={data.gia_ban_khuyen_mai !== 0 ? "select-fast__modify ml-2 amount" : "select-fast__modify ml-2"}>
                    {`${dataSubmit.gia_ban
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`}
                    ₫
                  </div>
                  <div className="select-fast__modify ml-2">
                    {`${dataSubmit.gia_ban_khuyen_mai
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`}
                    ₫
                  </div>
                 </div>
                </div>
                <div className="watch-product__price mt-3">
                  <div className="select-fast__modify">Số lượng giới hạn:</div>
                  <span className="select-fast__modify ml-2">{`${dataSubmit.soluong_con}`}</span>
                </div>
                <div className="form_watch  mt-3">
                  <form onSubmit={handleSubmit}>
                    {dataSubmit.id_size !== 0 ? (
                      <SelectSize
                        dataSubmits={dataSubmit}
                        arrSize={data.length > 0 ? data[0].mausac[0].size : []}
                        selectSizes={selectSizes}
                      ></SelectSize>
                    ) : (
                      <div></div>
                    )}

                    {dataSubmit.id_mau_sac !== 0 ? (
                      <SelectFast
                        dataSubmits={dataSubmit}
                        fast_select={fast_select}
                        arrFast={data.length > 0 ? data[0].mausac : []}
                      ></SelectFast>
                    ) : (
                      <div></div>
                    )}
                    <div className="select-quantity mt-3">
                      <div className="select-quantity__header">số lượng:</div>
                      <div className="select-btn">
                        <span
                          className="select-btn__minus"
                          onClick={() => handleQuantity(-1)}
                        >
                          -
                        </span>
                        <input
                          type="text"
                          value={dataSubmit.soluong}
                          pattern="[+-]?\d+(?:[.,]\d+)?"
                          name="soluong"
                          className="select-btn_quantity"
                          onChange={onChangeSelectQuantity}
                        />
                        <span
                          className="select-btn__plus"
                          onClick={() => handleQuantity(1)}
                        >
                          +
                        </span>
                      </div>
                    </div>
                    <div className="clearfix form-group mt-3">
                      <div className="btn-mua btnsold">
                        <button
                          type="submit"
                          data-role="addtocart"
                          className="btn btn-lg btn-gray btn-cart btn_buy add_to_cart"
                          // disabled="disabled"
                          onClick={showModals}
                        >
                          <span className="txt-main">
                            <i className="fa fa-cart-arrow-down padding-right-10"></i>{" "}
                            Thêm vào giỏ hàng
                          </span>
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <div className="fs-3 fw-bold">HƯỚNG DẪN CHỌN SIZE GIÀY</div>
            <div className="mt-1">
              <div className="fs-5 fw-bold">CHUẨN BỊ</div>
              <div>1 tờ giấy trắng lớn, phải to hơn bàn chân bạn</div>
              <div>1 cây bút</div>
              <div>1 cây thước đo</div>
            </div>
            <div className="mt-1">
              <div className="fs-5 fw-bold">CÁCH THỰC HIỆN</div>
              <div className="fw-bold">Quy ước:</div>
              <div>Cỡ giày là N</div>
              <div>Chiều dài bàn chân là L</div>
              <div className="fw-bold">B1: VẼ KÍCH CỠ CHÂN</div>
              <div>
                Bạn đặt tờ giấy xuống sàn nhà, sau đó đặt bàn chân của bạn thật
                chắc chắn lên tờ giấy. Dùng bút chì để vẽ lại khung bàn chân của
                mình cho thật chuẩn. Bạn nên giữ bút chì thẳng đứng và vuông góc
                với tờ giấy để vẽ được chính xác hơn.
              </div>
              <div>
                **Lưu ý: Bạn phải luôn giữ bàn chân ở vị trí cũ và không được di
                chuyển bàn chân ngay khi dừng bút chì giữa chừng.
              </div>
              <img
                src="https://cdn.shopify.com/s/files/1/1472/9264/files/do_giay_b1.jpg?v=1498491162"
                alt="đo size giày bước 1"
                width={`100%`}
              ></img>
              <div className="fw-bold">
                B2: ĐÁNH DẤU CÁC SỐ ĐO CHIỀU DÀI VÀ CHIỀU RỘNG
              </div>
              <div>
                Bạn sử dụng bút chì để vẽ một đường thẳng để chạm vào các điểm
                trên cùng, dưới cùng và 2 bên của bản phác thảo bàn chân như
                hình ảnh dưới để chúng ta đo chiều dài chân.
              </div>
              <img
                src="https://cdn.shopify.com/s/files/1/1472/9264/files/do_giay_B2.jpg?v=1498491251"
                alt="đo size giày bước 2"
                width={`100%`}
              />
              <div className="fw-bold">B3: XÁC ĐỊNH CHIỀU DÀI BÀN CHÂN (L)</div>
              <div>
                Bạn sử dụng thước kẻ để đo chiều dài từ phía dưới dòng kẻ trên
                đến dòng kẻ dưới mà bạn đã vẽ. Sau khi đo xong, bạn có thể làm
                tròn số trong khoảng 0.5cm. Bạn nên làm tròn xuống để trừ hao
                cho những sai lệch khi vẽ khuôn chân vì các đường kẻ thường
                chênh lên một chút so với kích thước thật của bàn chân bạn.
              </div>
              <div>
                **Lưu ý khi đo: bạn phải đo trên đường thẳng vuông góc với hai
                đường kẻ trên và dưới.
              </div>
            </div>
            <div className="text-center">
              <img
                src="https://cdn.shopify.com/s/files/1/1472/9264/files/Do_giay_b3_8ff6184e-4160-448b-84a7-4bdc75af2c99.jpg?v=1498491704"
                alt="đo size giày bước 3"
              />
            </div>
            <div className="fw-bold">B4: TÌM VÀ CHỌN SIZE GIÀY PHÙ HỢP</div>
            <div>
              Ghi con số mà bạn đo được vào tờ giấy, rồi áp dụng công thức sau
              để xác định size giày của mình trên thang đo: N = L+1.5 cm = cỡ
              giày
            </div>
            <div>
              Ví dụ: Bạn đo được L= 23 cm => N= 23cm + 1.5cm= 24.5 cm. Vậy cỡ
              giày của bạn là 24.5 cm. Dựa vào bảng đo dưới đây bạn sẽ xác định
              được cỡ giày Nam là size 39 và cỡ giày Nữ là 42.
            </div>
            <div className="mt-1">
              <div className="fs-3 fw-bold">QUY ĐỔI SIZE GIÀY NAM</div>

              <table className="mce-item-table">
                <tbody>
                  <tr>
                    <td width="93">
                      <p>
                        <strong>
                          <b>Centimet</b>
                        </strong>
                      </p>
                    </td>
                    <td width="77">
                      <p>
                        <strong>
                          <b>Size US</b>
                        </strong>
                      </p>
                    </td>
                    <td width="81">
                      <p>
                        <strong>
                          <b>Size VN</b>
                        </strong>
                      </p>
                    </td>
                    <td width="82">
                      <p>
                        <strong>
                          <b>Size UK</b>
                        </strong>
                      </p>
                    </td>
                    <td width="87">
                      <p>
                        <strong>
                          <b>Inches</b>
                        </strong>
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td width="93">
                      <p>23.5</p>
                    </td>
                    <td width="77">
                      <p>6</p>
                    </td>
                    <td width="81">
                      <p>39</p>
                    </td>
                    <td width="82">
                      <p>5.5</p>
                    </td>
                    <td width="87">
                      <p>9.25"</p>
                    </td>
                  </tr>
                  <tr>
                    <td width="93">
                      <p>24.1</p>
                    </td>
                    <td width="77">
                      <p>6.5</p>
                    </td>
                    <td width="81">
                      <p>39-40</p>
                    </td>
                    <td width="82">
                      <p>6</p>
                    </td>
                    <td width="87">
                      <p>9.5"</p>
                    </td>
                  </tr>
                  <tr>
                    <td width="93">
                      <p>24.4</p>
                    </td>
                    <td width="77">
                      <p>7</p>
                    </td>
                    <td width="81">
                      <p>40</p>
                    </td>
                    <td width="82">
                      <p>6.5</p>
                    </td>
                    <td width="87">
                      <p>9.625"</p>
                    </td>
                  </tr>
                  <tr>
                    <td width="93">
                      <p>24.8</p>
                    </td>
                    <td width="77">
                      <p>7.5</p>
                    </td>
                    <td width="81">
                      <p>40-41</p>
                    </td>
                    <td width="82">
                      <p>7</p>
                    </td>
                    <td width="87">
                      <p>9.75"</p>
                    </td>
                  </tr>
                  <tr>
                    <td width="93">
                      <p>25.4</p>
                    </td>
                    <td width="77">
                      <p>8</p>
                    </td>
                    <td width="81">
                      <p>41</p>
                    </td>
                    <td width="82">
                      <p>7.5</p>
                    </td>
                    <td width="87">
                      <p>9.9375"</p>
                    </td>
                  </tr>
                  <tr>
                    <td width="93">
                      <p>25.7</p>
                    </td>
                    <td width="77">
                      <p>8.5</p>
                    </td>
                    <td width="81">
                      <p>41-42</p>
                    </td>
                    <td width="82">
                      <p>8</p>
                    </td>
                    <td width="87">
                      <p>10.125"</p>
                    </td>
                  </tr>
                  <tr>
                    <td width="93">
                      <p>26</p>
                    </td>
                    <td width="77">
                      <p>9</p>
                    </td>
                    <td width="81">
                      <p>42</p>
                    </td>
                    <td width="82">
                      <p>8.5</p>
                    </td>
                    <td width="87">
                      <p>10.25"</p>
                    </td>
                  </tr>
                  <tr>
                    <td width="93">
                      <p>26.7</p>
                    </td>
                    <td width="77">
                      <p>9.5</p>
                    </td>
                    <td width="81">
                      <p>42-43</p>
                    </td>
                    <td width="82">
                      <p>9</p>
                    </td>
                    <td width="87">
                      <p>10.4375"</p>
                    </td>
                  </tr>
                  <tr>
                    <td width="93">
                      <p>27</p>
                    </td>
                    <td width="77">
                      <p>10</p>
                    </td>
                    <td width="81">
                      <p>43</p>
                    </td>
                    <td width="82">
                      <p>9.5</p>
                    </td>
                    <td width="87">
                      <p>10.5625"</p>
                    </td>
                  </tr>
                  <tr>
                    <td width="93">
                      <p>27.3</p>
                    </td>
                    <td width="77">
                      <p>10.5</p>
                    </td>
                    <td width="81">
                      <p>43-44</p>
                    </td>
                    <td width="82">
                      <p>10</p>
                    </td>
                    <td width="87">
                      <p>10.75"</p>
                    </td>
                  </tr>
                  <tr>
                    <td width="93">
                      <p>27.9</p>
                    </td>
                    <td width="77">
                      <p>11</p>
                    </td>
                    <td width="81">
                      <p>44</p>
                    </td>
                    <td width="82">
                      <p>10.5</p>
                    </td>
                    <td width="87">
                      <p>10.9375"</p>
                    </td>
                  </tr>
                  <tr>
                    <td width="93">
                      <p>28.3</p>
                    </td>
                    <td width="77">
                      <p>11.5</p>
                    </td>
                    <td width="81">
                      <p>44-45</p>
                    </td>
                    <td width="82">
                      <p>11</p>
                    </td>
                    <td width="87">
                      <p>11.125"</p>
                    </td>
                  </tr>
                  <tr>
                    <td width="93">
                      <p>28.6</p>
                    </td>
                    <td width="77">
                      <p>12</p>
                    </td>
                    <td width="81">
                      <p>45</p>
                    </td>
                    <td width="82">
                      <p>11.5</p>
                    </td>
                    <td width="87">
                      <p>11.25"</p>
                    </td>
                  </tr>
                  <tr>
                    <td width="93">
                      <p>29.4</p>
                    </td>
                    <td width="77">
                      <p>13</p>
                    </td>
                    <td width="81">
                      <p>46</p>
                    </td>
                    <td width="82">
                      <p>12.5</p>
                    </td>
                    <td width="87">
                      <p>11.5625"</p>
                    </td>
                  </tr>
                  <tr>
                    <td width="93">
                      <p>30.2</p>
                    </td>
                    <td width="77">
                      <p>14</p>
                    </td>
                    <td width="81">
                      <p>47</p>
                    </td>
                    <td width="82">
                      <p>13.5</p>
                    </td>
                    <td width="87">
                      <p>11.875"</p>
                    </td>
                  </tr>
                  <tr>
                    <td width="93">
                      <p>31</p>
                    </td>
                    <td width="77">
                      <p>15</p>
                    </td>
                    <td width="81">
                      <p>48</p>
                    </td>
                    <td width="82">
                      <p>14.5</p>
                    </td>
                    <td width="87">
                      <p>12.1875"</p>
                    </td>
                  </tr>
                  <tr>
                    <td width="93">
                      <p>31.8</p>
                    </td>
                    <td width="77">
                      <p>16</p>
                    </td>
                    <td width="81">
                      <p>49</p>
                    </td>
                    <td width="82">
                      <p>15.5</p>
                    </td>
                    <td width="87">
                      <p>12.5"</p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    CreateModal: bindActionCreators(ActionModal, dispatch),
  };
};

const mapStateToProps = (state) => {
  return {
    showmodal: state.modal.showmodal,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(XemSanPham);
