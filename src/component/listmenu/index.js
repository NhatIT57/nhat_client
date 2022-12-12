import React, { useState, useEffect, useRef, useCallback } from "react";
import Slidebar from "./../Slidebar/index";
import "./ListMenu.scss";
import imageLogo from "./../../assets/image/nhat.png";
import MenuIcon from "@material-ui/icons/Menu";
import { Link, useHistory } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actionLoaiGiay from "./../../actions/loai_giay";
import * as actionGiay from "./../../actions/giay";
import * as actionModal from "./../../actions/modal";
import jwt from "jsonwebtoken";

function DashBoard(props) {
  const { children, name, ListLoaiGiay, createActionNP, createModal, token } =
    props;
  const [sidebar, setSidebar] = useState(false);
  const { showModal } = createModal;
  const ref = useRef()
  const {
    fetchListNewProductRequest,
    fetchListChiTietMauSacRequest,
    fetchListChiTietSizeRequest,
  } = createActionNP;
  const { show, setShow } = useState(false);
  const [tokens, setTokens] = useState(null);
  const [tokenPro, setTokenPro] = useState([]);
  const [query, setQuery] = useState("");
  const history = useHistory();
  useEffect(() => {
    let current = true;
    (async () => {
      async function fetchPostsList() {
        await fetchListNewProductRequest();
        await fetchListChiTietMauSacRequest();
        await fetchListChiTietSizeRequest();
        setTokenPro(
          localStorage.getItem("product")
            ? JSON.parse(localStorage.getItem("product"))
            : []
        );
        const tokenss = localStorage.getItem("tokenTC");
        if (tokenss) {
          try {
            var decoded = jwt.verify(tokenss, "qwe1234");
            if (decoded.result) {
              setTokens(decoded.result);
            }
          } catch (err) {
            // err
          }
          //qwe1234
        } else {
          setTokens(null);
        }
      }
      await fetchPostsList();
    })();
    return () => (current = false);
  }, []);
  const handleScroll = useCallback(() => {
    console.log("scrolling")
  }, [])
  useEffect(() => {
    const div1 = ref.current
    div1.addEventListener("scroll", handleScroll)
  }, [handleScroll])

  useEffect(() => {
    let current = true;
    (async () => {
      async function fetchPostsList() {
        await fetchListNewProductRequest();
        await fetchListChiTietMauSacRequest();
        await fetchListChiTietSizeRequest();
        const tokenss = localStorage.getItem("tokenTC");
        if (tokenss) {
          try {
            var decoded = jwt.verify(tokenss, "qwe1234");
            if (decoded.result) {
              setTokens(decoded.result);
            }
          } catch (err) {
            // err
          }
          //qwe1234
        } else {
          setTokens(null);
        }
      }
      await fetchPostsList();
    })();
    return () => (current = false);
  }, []);
  function onClickShowSlider(data) {
    setSidebar(!sidebar);
  }

  function onClickHide() {
    setSidebar(!sidebar);
  }

  function onShow() {
    setShow(false);
  }

  function valueImage(name) {
    switch (name) {
      case "Nike":
        return "nike.png";
      case "Adidas":
        return "adidas.png";
      case "Converse":
        return "converse.png";
      case "New Balance":
        return "new-balance.png";
      case "Vans":
        return "vans.png";
      case "MLB":
        return "mlb.png";
      default:
        return "nike.png";
    }
  }

  function dropLoaiGiays() {
    if (ListLoaiGiay.length > 0) {
      let xhtml = null;
      xhtml = ListLoaiGiay.map((route) => {
        return (
          <li className="nav-item">
            <div className="img-menu">
              <img
                src={`http://localhost:8080/images/${valueImage(
                  route.ten_loai_giay
                )}`}
              ></img>
            </div>
            <Link key={route.id} to={`/ThuongHieu=${route.id}`}>
              {route.ten_loai_giay}
            </Link>
          </li>
        );
      });
      return xhtml;
    }
  }
  function deleteLocal() {
    localStorage.removeItem("tokenTC");
    setTokens(null);
  }

  function showModals() {
    const tokenss = localStorage.getItem("tokenTC");
    if (tokenss) {
      showModal();
    } else {
      history.push("/DangNhap");
    }
  }

  function onSubmit(e) {
    e.preventDefault();
    history.push(`/TimKiem/Search=${query}&&Page=${1}`);
  }

  function onChangSearch(e) {
    e.persist();
    setQuery(e.target.value);
  }

  return (
    <div key={name} className="chia" ref={ref}>
        <div className="head">
        <div className="container">
        <h1>Shop Giày Thể Thao - Sneaker Nam</h1>
        <div className="texttop">
          <ul className="text">
            <li>
              <p>Free ship</p> <span>Toàn quốc</span>
            </li>
            <li>
              <p>Check hàng</p> <span>Mới thanh toán</span>
            </li>
            <li>
              <p>Bảo hành</p> <span>Trong 6 tháng</span>
            </li>
          </ul>
          <ul className="top">
            <li>
              <Link
                to="/TinTuc"
                title="Cập nhật tin tức về các thương hiệu giày sneaker mới 2021"
              >
                <div className="img">
                  <img
                    src="http://localhost:8080/images/tin-tuc.png"
                    alt="Cập nhật tin tức về các thương hiệu giày sneaker mới 2021"
                    width={24}
                    height={24}
                  />
                </div>
                <p>Tin tức</p>
              </Link>
            </li>
            <li>
              <Link
                to="/khuyen-mai"
                title="Cập nhật các tin khuyến mãi - Sale cực khủng về Sneaker"
              >
                <div className="img">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    version="1.1"
                    id="Capa_1"
                    x="0px"
                    y="0px"
                    viewBox="0 0 512 512"
                    style={{ enableBackground: "new 0 0 512 512" }}
                    xmlSpace="preserve"
                    width="512px"
                    height="512px"
                  >
                    <g>
                      <g>
                        <g>
                          <path
                            d="M301.676,195.469c-5.487,0-9.938,4.45-9.938,9.937v0.142c0,5.487,4.45,9.937,9.938,9.937c5.487,0,9.937-4.45,9.937-9.937    v-0.142C311.613,199.918,307.164,195.469,301.676,195.469z"
                            data-original="#000000"
                            className="active-path"
                            data-old_color="#000000"
                            fill="#FFFFFF"
                          />
                        </g>
                      </g>
                      <g>
                        <g>
                          <path
                            d="M358.981,239.257v-81.566c0-3.151-1.495-6.116-4.029-7.99c-2.533-1.873-5.806-2.436-8.819-1.511l-222.865,68.251H66.392    C29.784,216.441,0,246.223,0,282.832c0,34.638,26.668,63.148,60.548,66.119l21.873,104.867    c3.595,17.238,18.986,29.75,36.595,29.75c11.304,0,21.877-5.031,29.007-13.802c7.13-8.772,9.896-20.148,7.587-31.215    l-4.793-22.976c20.962-6.47,36.843-23.876,41.464-45.217l153.85,47.115c0.954,0.292,1.934,0.435,2.909,0.435    c2.103,0,4.179-0.668,5.91-1.948c2.534-1.874,4.029-4.839,4.029-7.99v-81.566c19.881-4.532,34.766-22.341,34.766-43.574    C393.745,261.599,378.86,243.79,358.981,239.257z M66.392,329.346c-25.65,0-46.517-20.867-46.517-46.515    c0-25.65,20.868-46.516,46.517-46.516h48.425v93.032H68.683H66.392z M132.603,457.229c-3.339,4.108-8.292,6.464-13.586,6.464    c-8.247,0-15.455-5.859-17.139-13.933L80.907,349.221h35.77l12.697,60.873c0.002,0.007,0.003,0.015,0.005,0.022l6.777,32.493    C137.237,447.792,135.942,453.121,132.603,457.229z M146.735,395.992l-8.82-42.285l35.27,10.801    C170.668,379,160.483,391.043,146.735,395.992z M339.106,394.534L339.106,394.534l-27.492-8.419V245.255    c0-5.487-4.45-9.938-9.937-9.938s-9.937,4.45-9.937,9.938v134.774L188.166,348.31c-0.964-0.482-2.016-0.812-3.127-0.958    l-50.345-15.418v-98.206l204.413-62.6V394.534z M358.98,305.575v-45.488c8.756,3.84,14.889,12.587,14.889,22.744    C373.869,292.988,367.736,301.735,358.98,305.575z"
                            data-original="#000000"
                            className="active-path"
                            data-old_color="#000000"
                            fill="#FFFFFF"
                          />
                        </g>
                      </g>
                      <g>
                        <g>
                          <path
                            d="M466.785,272.894h-44.322c-5.487,0-9.938,4.45-9.938,9.938c0,5.487,4.45,9.937,9.938,9.937h44.322    c5.487,0,9.937-4.45,9.937-9.937C476.722,277.344,472.272,272.894,466.785,272.894z"
                            data-original="#000000"
                            className="active-path"
                            data-old_color="#000000"
                            fill="#FFFFFF"
                          />
                        </g>
                      </g>
                      <g>
                        <g>
                          <path
                            d="M438.442,196.233c-3.234-4.435-9.453-5.406-13.885-2.172l-22.303,16.267c-4.434,3.234-5.407,9.451-2.173,13.885    c1.945,2.668,4.97,4.082,8.036,4.082c2.031,0,4.081-0.621,5.848-1.91l22.303-16.267    C440.703,206.884,441.676,200.667,438.442,196.233z"
                            data-original="#000000"
                            className="active-path"
                            data-old_color="#000000"
                            fill="#FFFFFF"
                          />
                        </g>
                      </g>
                      <g>
                        <g>
                          <path
                            d="M436.27,355.546l-22.167-16.168c-4.433-3.233-10.651-2.262-13.885,2.173c-3.235,4.434-2.261,10.651,2.173,13.885    l22.167,16.167c1.767,1.289,3.816,1.91,5.848,1.91c3.066,0,6.092-1.416,8.036-4.082    C441.678,364.996,440.704,358.779,436.27,355.546z"
                            data-original="#000000"
                            className="active-path"
                            data-old_color="#000000"
                            fill="#FFFFFF"
                          />
                        </g>
                      </g>
                      <g>
                        <g>
                          <path
                            d="M452.763,64.207H246.495c-5.487,0-9.937,4.45-9.937,9.937s4.45,9.937,9.937,9.937h206.268c5.487,0,9.938-4.45,9.938-9.937    S458.251,64.207,452.763,64.207z"
                            data-original="#000000"
                            className="active-path"
                            data-old_color="#000000"
                            fill="#FFFFFF"
                          />
                        </g>
                      </g>
                      <g>
                        <g>
                          <path
                            d="M145.734,67.119c-1.849-1.848-4.411-2.912-7.026-2.912c-2.614,0-5.177,1.062-7.025,2.912    c-1.858,1.848-2.913,4.412-2.913,7.026s1.054,5.177,2.913,7.025c1.847,1.848,4.411,2.913,7.025,2.913    c2.615,0,5.177-1.063,7.026-2.913c1.848-1.847,2.912-4.411,2.912-7.025S147.583,68.967,145.734,67.119z"
                            data-original="#000000"
                            className="active-path"
                            data-old_color="#000000"
                            fill="#FFFFFF"
                          />
                        </g>
                      </g>
                      <g>
                        <g>
                          <path
                            d="M109.214,67.119c-1.849-1.848-4.411-2.912-7.026-2.912c-2.614,0-5.177,1.062-7.025,2.912    c-1.848,1.848-2.913,4.412-2.913,7.026s1.063,5.177,2.913,7.025c1.847,1.848,4.411,2.913,7.025,2.913    c2.615,0,5.177-1.063,7.026-2.913c1.848-1.847,2.912-4.411,2.912-7.025S111.063,68.967,109.214,67.119z"
                            data-original="#000000"
                            className="active-path"
                            data-old_color="#000000"
                            fill="#FFFFFF"
                          />
                        </g>
                      </g>
                      <g>
                        <g>
                          <path
                            d="M182.254,67.119c-1.858-1.849-4.411-2.912-7.026-2.912c-2.623,0-5.177,1.062-7.035,2.912    c-1.848,1.848-2.903,4.412-2.903,7.026s1.054,5.177,2.903,7.025c1.857,1.848,4.411,2.913,7.035,2.913    c2.615,0,5.167-1.063,7.026-2.913c1.848-1.847,2.912-4.411,2.912-7.025S184.103,68.967,182.254,67.119z"
                            data-original="#000000"
                            className="active-path"
                            data-old_color="#000000"
                            fill="#FFFFFF"
                          />
                        </g>
                      </g>
                      <g>
                        <g>
                          <path
                            d="M470.263,28.432H84.689c-23.014,0-41.737,18.723-41.737,41.737v136.143c0,5.487,4.45,9.937,9.937,9.937    s9.937-4.45,9.937-9.937v-38.684h61.928c5.487,0,9.938-4.45,9.938-9.937s-4.45-9.938-9.938-9.938H62.827v-27.903    c0.037,0,0.073,0.006,0.108,0.006h429.19v258.374c0,12.055-9.807,21.862-21.862,21.862h-79.169c-5.487,0-9.938,4.45-9.938,9.938    s4.45,9.937,9.938,9.937h79.169c23.014,0,41.737-18.723,41.737-41.737V70.169C512,47.155,493.277,28.432,470.263,28.432z     M492.125,99.982H62.935c-0.037,0-0.073,0.005-0.108,0.006V70.169c0-12.055,9.807-21.862,21.862-21.862h385.574    c12.055,0,21.862,9.807,21.862,21.862V99.982z"
                            data-original="#000000"
                            className="active-path"
                            data-old_color="#000000"
                            fill="#FFFFFF"
                          />
                        </g>
                      </g>
                      <g>
                        <g>
                          <path
                            d="M164.009,150.663c-1.847-1.848-4.411-2.913-7.025-2.913c-2.614,0-5.177,1.063-7.026,2.913    c-1.848,1.847-2.912,4.411-2.912,7.025c0,2.615,1.062,5.178,2.912,7.026c1.848,1.858,4.412,2.912,7.026,2.912    c2.614,0,5.177-1.052,7.025-2.912c1.848-1.847,2.913-4.411,2.913-7.026C166.922,155.074,165.858,152.51,164.009,150.663z"
                            data-original="#000000"
                            className="active-path"
                            data-old_color="#000000"
                            fill="#FFFFFF"
                          />
                        </g>
                      </g>
                    </g>
                  </svg>
                </div>
                <p>Khuyến mãi</p>
              </Link>
            </li>
          </ul>
          <div id="cart" onClick={showModals}>
            <i>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                version="1.1"
                id="Capa_1"
                x="0px"
                y="0px"
                width="512px"
                height="512px"
                viewBox="0 0 475.084 475.085"
                style={{ enableBackground: "new 0 0 475.084 475.085" }}
                xmlSpace="preserve"
              >
                <g>
                  <g>
                    <path
                      d="M365.446,401.998c0,10.092,3.579,18.702,10.711,25.834c7.132,7.139,15.749,10.711,25.845,10.711    c10.081,0,18.698-3.572,25.83-10.711c7.139-7.132,10.711-15.742,10.711-25.834s-3.568-18.702-10.711-25.841    c-7.132-7.132-15.749-10.704-25.83-10.704c-10.096,0-18.713,3.572-25.845,10.704C369.025,383.296,365.446,391.906,365.446,401.998    z"
                      fill="#FFFFFF"
                    />
                    <path
                      d="M469.658,78.51c-3.618-3.617-7.898-5.426-12.848-5.426H113.918c-0.193-1.331-0.621-3.756-1.287-7.277    c-0.666-3.523-1.188-6.329-1.569-8.425c-0.383-2.087-1.093-4.611-2.142-7.561c-1.047-2.952-2.284-5.286-3.711-6.995    c-1.425-1.718-3.328-3.189-5.708-4.43c-2.378-1.233-5.092-1.853-8.136-1.853H18.276c-4.952,0-9.234,1.812-12.85,5.424    C1.809,45.583,0,49.868,0,54.816s1.809,9.231,5.426,12.847c3.619,3.617,7.902,5.424,12.85,5.424h58.237l50.532,234.976    c-0.378,0.76-2.329,4.373-5.852,10.848c-3.521,6.475-6.328,12.135-8.42,16.988c-2.093,4.859-3.14,8.616-3.14,11.279    c0,4.948,1.809,9.232,5.424,12.854c3.621,3.606,7.902,5.421,12.851,5.421h18.272h255.815h18.261c4.948,0,9.232-1.814,12.847-5.421    c3.62-3.621,5.427-7.905,5.427-12.854c0-4.949-1.807-9.233-5.427-12.847c-3.614-3.614-7.898-5.428-12.847-5.428h-262.66    c4.57-9.138,6.854-15.222,6.854-18.268c0-1.909-0.238-4.004-0.715-6.283s-1.047-4.805-1.713-7.569    c-0.667-2.752-1.093-4.799-1.283-6.133l298.077-34.831c4.753-0.575,8.658-2.614,11.703-6.14c3.046-3.518,4.565-7.562,4.565-12.133    V91.363C475.082,86.415,473.278,82.132,469.658,78.51z"
                      fill="#FFFFFF"
                    />
                    <path
                      d="M109.632,401.998c0,10.092,3.567,18.702,10.706,25.834c7.141,7.139,15.75,10.711,25.841,10.711    c10.085,0,18.699-3.572,25.835-10.711c7.139-7.132,10.71-15.742,10.71-25.834s-3.568-18.702-10.71-25.841    c-7.137-7.132-15.75-10.704-25.835-10.704c-10.09,0-18.704,3.572-25.841,10.704C113.203,383.296,109.632,391.906,109.632,401.998z    "
                      fill="#FFFFFF"
                    />
                  </g>
                </g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
              </svg>
            </i>
            <span>{`${tokenPro.length} sản phẩm`}</span>
          </div>
        </div>
        <div className="clear" />
        <div className="header">
        <div className="iconMenu mr-4">
            <div className="d-flex align-items-center" style={{height: '100%'}}> <MenuIcon onClick={onClickHide}></MenuIcon></div>
          </div>
          <div className="logo">
            <img
              src={imageLogo}
              title="Trang chủ"
              onClick={() => history.push("/")}
            />
          </div>

          <div className="account account befores">
            <Link to='/DangNhap' title="Đăng ký & tạo tài khoản">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                version="1.1"
                id="Capa_2"
                x="0px"
                y="0px"
                viewBox="0 0 480 480"
                style={{ enableBackground: "new 0 0 480 480" }}
                xmlSpace="preserve"
              >
                <path
                  style={{ fill: "#EFECE8" }}
                  d="M240,8C111.872,8,8,111.872,8,240c0,56.256,20.032,107.824,53.336,147.992  c15.512-63.176,63.688-113.384,125.552-132.04C161.048,238.744,144,209.376,144,176c0-53.016,42.984-96,96-96s96,42.984,96,96  c0,33.376-17.048,62.744-42.896,79.952c61.864,18.656,110.04,68.864,125.552,132.04C451.968,347.824,472,296.256,472,240  C472,111.872,368.128,8,240,8z"
                />
                <path
                  style={{ fill: "#C6C3BD" }}
                  d="M293.104,255.952C318.952,238.744,336,209.376,336,176c0-53.016-42.984-96-96-96s-96,42.984-96,96  c0,33.376,17.048,62.744,42.896,79.952c-61.864,18.656-110.04,68.864-125.552,132.04c0,0,0,0.008,0.008,0.008  c2.528,3.048,5.152,6.024,7.832,8.944c0.648,0.712,1.328,1.392,1.992,2.088c2.064,2.192,4.152,4.352,6.296,6.464  c0.888,0.872,1.792,1.712,2.696,2.568c1.984,1.888,3.992,3.752,6.04,5.568c1.016,0.896,2.048,1.784,3.072,2.664  c2.008,1.72,4.04,3.408,6.112,5.056c1.088,0.872,2.184,1.728,3.28,2.584c2.096,1.616,4.224,3.184,6.376,4.72  c1.112,0.792,2.208,1.6,3.336,2.376c2.272,1.568,4.584,3.072,6.912,4.56c1.048,0.664,2.072,1.352,3.128,2.008  c2.688,1.656,5.424,3.24,8.184,4.792c0.728,0.408,1.44,0.848,2.176,1.248c3.568,1.952,7.192,3.824,10.872,5.592  c0.088,0.04,0.184,0.08,0.272,0.12c3.512,1.68,7.08,3.272,10.688,4.776c1.12,0.472,2.264,0.888,3.392,1.336  c2.608,1.04,5.216,2.064,7.872,3.008c1.408,0.504,2.832,0.96,4.248,1.44c2.416,0.816,4.848,1.608,7.296,2.336  c1.552,0.464,3.112,0.896,4.68,1.328c2.368,0.656,4.752,1.28,7.16,1.864c1.624,0.392,3.256,0.768,4.896,1.128  c2.408,0.528,4.824,1.008,7.256,1.456c1.648,0.304,3.288,0.616,4.952,0.88c2.512,0.408,5.04,0.752,7.576,1.08  c1.6,0.208,3.192,0.44,4.8,0.608c2.8,0.304,5.624,0.52,8.448,0.72c1.368,0.096,2.72,0.24,4.088,0.312  c4.216,0.24,8.448,0.376,12.72,0.376s8.504-0.136,12.72-0.36c1.368-0.072,2.728-0.216,4.088-0.312c2.832-0.2,5.656-0.416,8.448-0.72  c1.608-0.176,3.2-0.4,4.8-0.608c2.536-0.328,5.064-0.672,7.576-1.08c1.656-0.272,3.304-0.576,4.952-0.88  c2.432-0.448,4.856-0.928,7.256-1.456c1.64-0.36,3.272-0.736,4.896-1.128c2.4-0.584,4.784-1.208,7.16-1.864  c1.56-0.432,3.128-0.864,4.68-1.328c2.456-0.736,4.88-1.528,7.296-2.336c1.416-0.48,2.848-0.936,4.248-1.44  c2.648-0.952,5.264-1.968,7.872-3.008c1.128-0.448,2.272-0.872,3.392-1.336c3.592-1.504,7.144-3.08,10.64-4.76  c0.104-0.048,0.216-0.096,0.32-0.144c3.68-1.768,7.304-3.64,10.872-5.592c0.736-0.4,1.448-0.84,2.176-1.248  c2.76-1.552,5.496-3.136,8.184-4.792c1.056-0.648,2.088-1.336,3.128-2.008c2.328-1.488,4.64-3,6.912-4.56  c1.12-0.776,2.224-1.576,3.336-2.376c2.152-1.544,4.28-3.112,6.376-4.72c1.104-0.848,2.192-1.712,3.28-2.584  c2.064-1.648,4.104-3.336,6.112-5.056c1.032-0.88,2.064-1.768,3.072-2.664c2.048-1.816,4.056-3.68,6.04-5.568  c0.896-0.856,1.808-1.704,2.696-2.568c2.144-2.112,4.24-4.272,6.296-6.464c0.656-0.704,1.336-1.384,1.992-2.088  c2.68-2.92,5.304-5.896,7.832-8.944c0,0,0-0.008,0.008-0.008C403.152,324.816,354.976,274.6,293.104,255.952z"
                />
                <path
                  style={{ fill: "#4B413A" }}
                  d="M240,0C107.664,0,0,107.664,0,240c0,57.96,20.656,111.184,54.992,152.704  c0.088,0.12,0.096,0.272,0.192,0.384c24.792,29.896,55.928,52.816,90.624,67.624c0.4,0.168,0.792,0.352,1.192,0.52  c2.808,1.184,5.648,2.28,8.496,3.352c1.12,0.424,2.24,0.856,3.376,1.264c2.456,0.88,4.928,1.712,7.416,2.512  c1.592,0.512,3.184,1.016,4.792,1.496c2.2,0.656,4.408,1.288,6.632,1.888c1.952,0.528,3.92,1.016,5.888,1.488  c1.992,0.48,3.992,0.96,6,1.384c2.24,0.48,4.504,0.904,6.776,1.32c1.824,0.336,3.64,0.688,5.48,0.984  c2.52,0.408,5.056,0.728,7.6,1.056c1.64,0.208,3.272,0.448,4.92,0.624c2.88,0.304,5.784,0.52,8.696,0.72  c1.352,0.096,2.696,0.24,4.056,0.312c4.248,0.24,8.544,0.368,12.872,0.368s8.624-0.128,12.888-0.352  c1.36-0.072,2.704-0.216,4.056-0.312c2.912-0.208,5.816-0.416,8.696-0.72c1.648-0.176,3.28-0.416,4.92-0.624  c2.544-0.328,5.08-0.648,7.6-1.056c1.832-0.296,3.656-0.648,5.48-0.984c2.264-0.416,4.528-0.84,6.776-1.32  c2.008-0.432,4-0.904,6-1.384c1.968-0.48,3.936-0.968,5.888-1.488c2.224-0.592,4.432-1.232,6.632-1.888  c1.608-0.48,3.2-0.984,4.792-1.496c2.488-0.8,4.96-1.632,7.416-2.512c1.128-0.408,2.248-0.84,3.376-1.264  c2.856-1.072,5.688-2.176,8.496-3.352c0.4-0.168,0.792-0.352,1.192-0.52c34.688-14.808,65.832-37.728,90.624-67.624  c0.096-0.112,0.104-0.272,0.192-0.384C459.344,351.184,480,297.96,480,240C480,107.664,372.336,0,240,0z M287.872,249.736  c-3.152,2.048-6.432,3.88-9.8,5.48c-0.4,0.192-0.792,0.392-1.192,0.576c-23.168,10.536-50.592,10.536-73.76,0  c-0.4-0.184-0.8-0.384-1.192-0.576c-3.376-1.6-6.648-3.432-9.8-5.48C168.008,234.024,152,206.864,152,176c0-48.52,39.48-88,88-88  s88,39.48,88,88C328,206.864,311.992,234.024,287.872,249.736z M189.152,266.632c0.672,0.376,1.336,0.776,2.016,1.136  c2.384,1.264,4.8,2.448,7.272,3.512c1.896,0.832,3.856,1.536,5.808,2.256c0.384,0.136,0.768,0.288,1.152,0.424  c10.848,3.84,22.456,6.04,34.6,6.04c12.144,0,23.752-2.2,34.592-6.04c0.384-0.136,0.768-0.288,1.152-0.424  c1.952-0.72,3.912-1.424,5.808-2.256c2.472-1.064,4.888-2.248,7.272-3.512c0.68-0.368,1.344-0.76,2.016-1.136  c1.144-0.64,2.312-1.248,3.432-1.936c56.32,18.272,100.088,64.176,115.56,121.112c-20.008,23.272-44.664,42.44-72.576,55.952  c-0.12,0.056-0.232,0.12-0.352,0.176c-2.856,1.376-5.76,2.672-8.688,3.936c-0.664,0.28-1.32,0.568-1.984,0.848  c-2.56,1.072-5.152,2.088-7.76,3.064c-1.088,0.408-2.176,0.808-3.272,1.192c-2.312,0.824-4.632,1.616-6.976,2.368  c-1.456,0.464-2.92,0.904-4.384,1.336c-2.08,0.624-4.168,1.224-6.28,1.784c-1.776,0.472-3.568,0.904-5.36,1.328  c-1.88,0.448-3.752,0.904-5.648,1.304c-2.072,0.44-4.16,0.816-6.24,1.192c-1.688,0.312-3.368,0.64-5.072,0.912  c-2.344,0.368-4.712,0.664-7.072,0.96c-1.496,0.192-2.984,0.416-4.496,0.576c-2.696,0.288-5.416,0.472-8.128,0.664  c-1.208,0.08-2.408,0.216-3.632,0.28c-3.96,0.208-7.928,0.32-11.912,0.32s-7.952-0.112-11.904-0.32  c-1.216-0.064-2.416-0.192-3.632-0.28c-2.72-0.184-5.432-0.376-8.128-0.664c-1.512-0.16-3-0.384-4.496-0.576  c-2.36-0.296-4.728-0.592-7.072-0.96c-1.704-0.272-3.384-0.6-5.072-0.912c-2.088-0.376-4.176-0.76-6.24-1.192  c-1.896-0.4-3.776-0.856-5.648-1.304c-1.792-0.432-3.584-0.856-5.36-1.328c-2.104-0.56-4.2-1.168-6.28-1.784  c-1.464-0.432-2.928-0.872-4.384-1.336c-2.344-0.752-4.672-1.544-6.976-2.368c-1.096-0.392-2.184-0.792-3.272-1.192  c-2.608-0.976-5.2-1.992-7.76-3.064c-0.664-0.272-1.312-0.56-1.976-0.84c-2.928-1.256-5.832-2.56-8.696-3.936  c-0.12-0.056-0.232-0.112-0.352-0.176c-27.912-13.504-52.568-32.672-72.576-55.952c15.464-56.944,59.24-102.848,115.56-121.112  C186.848,265.384,188.008,265.992,189.152,266.632z M421.832,370.584c-18.136-53.552-59.512-96.832-112.376-117.392  C330.6,234.144,344,206.64,344,176c0-57.344-46.656-104-104-104s-104,46.656-104,104c0,30.64,13.4,58.144,34.552,77.192  c-52.864,20.568-94.24,63.84-112.376,117.392C31.672,333.792,16,288.704,16,240C16,116.488,116.488,16,240,16s224,100.488,224,224  C464,288.704,448.328,333.792,421.832,370.584z"
                />
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
              </svg>
             {tokens && tokens.ten_khach_hang ? <span>{`Xin chào ${tokens.ten_khach_hang}`}</span>:<span>Đăng ký / đăng nhập</span>}
              <p className="capdo">
                <i>Nhận ngay ưu đãi</i>
              </p>
            </Link>
            <ul>
                <li>
                </li>
                <li>
                  {tokens !== null ? (
                    <a rel="nofollow" title="Đăng ký" onClick={deleteLocal}>
                      Đăng xuất
                    </a>
                  ) : (
                    <Link rel="nofollow" to="/DangKy" title="Đăng ký">
                      Đăng ký
                    </Link>
                  )}
                </li>
                {tokens !== null ? (
                  <li>
                    <a href="/DoiMatKhau" title="Đổi mật khẩu">
                      Đổi mật khẩu
                    </a>
                  </li>
                ) : null}
              </ul>
            <p>
              <Link href="/DangNhap" title="Đăng ký & tạo tài khoản" />
            </p>
          </div>
          <div className="feedback">
            <a href="hinh-anh-feedback" title="Hình ảnh feedback">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                version="1.1"
                id="Layer_1"
                x="0px"
                y="0px"
                viewBox="0 0 512 512"
                style={{ enableBackground: "new 0 0 512 512" }}
                xmlSpace="preserve"
              >
                <g>
                  <g>
                    <path d="M494.933,38.4h-409.6c-9.412,0-17.067,7.654-17.067,17.067v17.067H51.2c-9.412,0-17.067,7.654-17.067,17.067v17.067    H17.067C7.654,106.667,0,114.321,0,123.733v332.8c0,9.412,7.654,17.067,17.067,17.067h409.6c9.412,0,17.067-7.654,17.067-17.067    v-17.067H460.8c9.412,0,17.067-7.654,17.067-17.067v-17.067h17.067c9.412,0,17.067-7.654,17.067-17.067v-332.8    C512,46.054,504.346,38.4,494.933,38.4z M17.067,123.733h409.6l0.009,190.635l-44.783-51.183c-3.251-3.721-9.6-3.721-12.851,0    l-54.067,61.79L167.799,194.159c-3.234-2.884-8.098-2.884-11.332,0L17.067,318.071V123.733z M426.684,431.01v25.523H17.067V340.89    l145.067-128.947l147.934,131.49c1.69,1.51,3.942,2.193,6.204,2.142c2.278-0.145,4.395-1.186,5.888-2.901l53.308-60.911    l51.209,58.53l0.008,90.573c0,0.017-0.017,0.043-0.017,0.068S426.684,430.985,426.684,431.01z M460.8,422.4h-17.067V123.733    c0-9.412-7.654-17.067-17.067-17.067H51.2V89.6h409.6V422.4z M494.933,388.267h-17.067V89.6c0-9.412-7.654-17.067-17.067-17.067    H85.333V55.467h409.6V388.267z" />
                  </g>
                </g>
                <g>
                  <g>
                    <path d="M307.2,174.933c-18.825,0-34.133,15.309-34.133,34.133S288.375,243.2,307.2,243.2s34.133-15.309,34.133-34.133    S326.025,174.933,307.2,174.933z M307.2,226.133c-9.412,0-17.067-7.654-17.067-17.067c0-9.412,7.654-17.067,17.067-17.067    s17.067,7.654,17.067,17.067C324.267,218.479,316.612,226.133,307.2,226.133z" />
                  </g>
                </g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
              </svg>
              <span>Hình ảnh Feedback</span>
              <p className="capdo">
                <i>của khách hàng</i>
              </p>
            </a>
            <p>
              <a href="hinh-anh-feedback" title="Hình ảnh feedback" />
            </p>
          </div>
          <div className="search">
            <form action="TimKiem/Search=:search" onSubmit={onSubmit} method="get" target="_top">
              <input
                type="text"
                name="key"
                placeholder="Nhập gợi ý từ khóa..."
                onChange={onChangSearch}
              />
              <input type="submit" defaultValue="Tìm kiếm" />
              <ul className="search_result" />
            </form>
          </div>

        </div>
      </div>
        </div>
      {/* <Container>
        <div className="header-CT">
        
       
        </div>
      </Container>
      <div
        className={sidebar ? "MuiBackdrop-root" : ""}
        onClick={onClickHide}
      ></div> */}
      <Slidebar
        onClickShowSlider={()=>onClickShowSlider()}
        sidebar={sidebar}
        onClickHide={()=>onClickHide()}
      ></Slidebar>
      <div className="background_css">
        <div className="container nav-evo-watch">
          <div className="row">
            <div className="col-md-12 col-lg-12">
              <ul id="nav" className="nav">
                <li className="nav-item nav-item__css">
                  <div className="img-menu">
                    <img src={`http://localhost:8080/images/pro-new.png`}></img>
                  </div>
                  <Link to="/" title="Trang chủ" style={{ color: "#fad064" }}>
                    Trang chủ
                  </Link>
                </li>
                {dropLoaiGiays()}
                {/* <li className="nav-item ">
                  <Link to="/GioiThieu" title="Giới Thiệu">
                    Giới Thiệu
                  </Link>
                </li>
                <li className="nav-item ">
                  <Link to="/LienHe" title="Liên hệ">
                    Liên hệ
                  </Link>
                </li>
                <li className="nav-item ">
                  <Link to="/DangNhap" title="Đăng nhập">
                    Đăng nhập
                  </Link>
                </li>
                <li className="nav-item ">
                  <Link to="/DangKy" title="Đăng ký">
                    Đăng ký
                  </Link>
                </li> */}
              </ul>
            </div>
          </div>
        </div>
      </div>
      {children}
      <div className="footer-TC">
        <div className="container">
          <div className="row">
            <div className="col-sm-6 col-12 dislay-center">
              <div className="huongdan">
                <div className="title-huongdan">HƯỚNG DẪN</div>
                <ul className="list-huongdan">
                  <li>
                    <Link to="/HuongDanMuaHang">HƯỚNG DẪN MUA HÀNG</Link>
                  </li>
                  <li>
                    <Link to="/DangKy">ĐĂNG KÝ THÀNH VIÊN</Link>
                  </li>
                  <li>
                    <Link to="/TraCuuDonHang">TRA CỨU ĐƠN HÀNG</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-sm-6 col-12 dislay-center">
              <div className="huongdan">
                <div className="title-huongdan">CHÍNH SÁCH</div>
                <ul className="list-huongdan">
                  <li>
                    <Link to="/ChinhSachDoiHang">CHÍNH SÁCH ĐỔI HÀNG</Link>
                  </li>
                  <li>
                    <Link to="/ChinhSachBaoHanh">CHÍNH SÁCH BẢO HÀNH</Link>
                  </li>
                  <li>
                    <Link to="/ChinhSachThanhToan">CHÍNH SÁCH THANH TOÁN</Link>
                  </li>
                  <li>
                    <Link to="/HinhThucVanChuyen">HÌNH THỨC VẬN CHUYỂN</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
const mapDispatchToProps = (dispatch) => {
  return {
    CreateActionLoaiGiay: bindActionCreators(actionLoaiGiay, dispatch),
    createActionNP: bindActionCreators(actionGiay, dispatch),
    createModal: bindActionCreators(actionModal, dispatch),
  };
};

const mapStateToProps = (state) => {
  return {
    ListLoaiGiay: state.loaigiay.ListLoaiGiay,
    token: state.modal.token,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DashBoard);
