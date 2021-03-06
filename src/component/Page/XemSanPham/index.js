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
        `S??? l?????ng b???n c?? th??? mua l??: ${dataSubmit.soluong_con}`
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
            `S??? l?????ng b???n c?? th??? mua l??: ${dataSubmit.soluong_con}`
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
      notify.notificatonWarning(`H??y nh???p s??? l?????ng b???n mu???n mua`);
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
                  <div className="select-fast__modify">Gi?? b??n:</div>
                 <div className="d-flex">
                 <div className={data.gia_ban_khuyen_mai !== 0 ? "select-fast__modify ml-2 amount" : "select-fast__modify ml-2"}>
                    {`${dataSubmit.gia_ban
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`}
                    ???
                  </div>
                  <div className="select-fast__modify ml-2">
                    {`${dataSubmit.gia_ban_khuyen_mai
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`}
                    ???
                  </div>
                 </div>
                </div>
                <div className="watch-product__price mt-3">
                  <div className="select-fast__modify">S??? l?????ng gi???i h???n:</div>
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
                      <div className="select-quantity__header">s??? l?????ng:</div>
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
                            Th??m v??o gi??? h??ng
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
            <div className="fs-3 fw-bold">H?????NG D???N CH???N SIZE GI??Y</div>
            <div className="mt-1">
              <div className="fs-5 fw-bold">CHU???N B???</div>
              <div>1 t??? gi???y tr???ng l???n, ph???i to h??n b??n ch??n b???n</div>
              <div>1 c??y b??t</div>
              <div>1 c??y th?????c ??o</div>
            </div>
            <div className="mt-1">
              <div className="fs-5 fw-bold">C??CH TH???C HI???N</div>
              <div className="fw-bold">Quy ?????c:</div>
              <div>C??? gi??y l?? N</div>
              <div>Chi???u d??i b??n ch??n l?? L</div>
              <div className="fw-bold">B1: V??? K??CH C??? CH??N</div>
              <div>
                B???n ?????t t??? gi???y xu???ng s??n nh??, sau ???? ?????t b??n ch??n c???a b???n th???t
                ch???c ch???n l??n t??? gi???y. D??ng b??t ch?? ????? v??? l???i khung b??n ch??n c???a
                m??nh cho th???t chu???n. B???n n??n gi??? b??t ch?? th???ng ?????ng v?? vu??ng g??c
                v???i t??? gi???y ????? v??? ???????c ch??nh x??c h??n.
              </div>
              <div>
                **L??u ??: B???n ph???i lu??n gi??? b??n ch??n ??? v??? tr?? c?? v?? kh??ng ???????c di
                chuy???n b??n ch??n ngay khi d???ng b??t ch?? gi???a ch???ng.
              </div>
              <img
                src="https://cdn.shopify.com/s/files/1/1472/9264/files/do_giay_b1.jpg?v=1498491162"
                alt="??o size gi??y b?????c 1"
                width={`100%`}
              ></img>
              <div className="fw-bold">
                B2: ????NH D???U C??C S??? ??O CHI???U D??I V?? CHI???U R???NG
              </div>
              <div>
                B???n s??? d???ng b??t ch?? ????? v??? m???t ???????ng th???ng ????? ch???m v??o c??c ??i???m
                tr??n c??ng, d?????i c??ng v?? 2 b??n c???a b???n ph??c th???o b??n ch??n nh??
                h??nh ???nh d?????i ????? ch??ng ta ??o chi???u d??i ch??n.
              </div>
              <img
                src="https://cdn.shopify.com/s/files/1/1472/9264/files/do_giay_B2.jpg?v=1498491251"
                alt="??o size gi??y b?????c 2"
                width={`100%`}
              />
              <div className="fw-bold">B3: X??C ?????NH CHI???U D??I B??N CH??N (L)</div>
              <div>
                B???n s??? d???ng th?????c k??? ????? ??o chi???u d??i t??? ph??a d?????i d??ng k??? tr??n
                ?????n d??ng k??? d?????i m?? b???n ???? v???. Sau khi ??o xong, b???n c?? th??? l??m
                tr??n s??? trong kho???ng 0.5cm. B???n n??n l??m tr??n xu???ng ????? tr??? hao
                cho nh???ng sai l???ch khi v??? khu??n ch??n v?? c??c ???????ng k??? th?????ng
                ch??nh l??n m???t ch??t so v???i k??ch th?????c th???t c???a b??n ch??n b???n.
              </div>
              <div>
                **L??u ?? khi ??o: b???n ph???i ??o tr??n ???????ng th???ng vu??ng g??c v???i hai
                ???????ng k??? tr??n v?? d?????i.
              </div>
            </div>
            <div className="text-center">
              <img
                src="https://cdn.shopify.com/s/files/1/1472/9264/files/Do_giay_b3_8ff6184e-4160-448b-84a7-4bdc75af2c99.jpg?v=1498491704"
                alt="??o size gi??y b?????c 3"
              />
            </div>
            <div className="fw-bold">B4: T??M V?? CH???N SIZE GI??Y PH?? H???P</div>
            <div>
              Ghi con s??? m?? b???n ??o ???????c v??o t??? gi???y, r???i ??p d???ng c??ng th???c sau
              ????? x??c ?????nh size gi??y c???a m??nh tr??n thang ??o: N = L+1.5 cm = c???
              gi??y
            </div>
            <div>
              V?? d???: B???n ??o ???????c L= 23 cm => N= 23cm + 1.5cm= 24.5 cm. V???y c???
              gi??y c???a b???n l?? 24.5 cm. D???a v??o b???ng ??o d?????i ????y b???n s??? x??c ?????nh
              ???????c c??? gi??y Nam l?? size 39 v?? c??? gi??y N??? l?? 42.
            </div>
            <div className="mt-1">
              <div className="fs-3 fw-bold">QUY ?????I SIZE GI??Y NAM</div>

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
