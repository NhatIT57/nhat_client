import React, { useState, useEffect } from "react";
import Slidebar from "../Slidebar/index";
import "./ListMenu.scss";
import imageLogo from "./../../assets/image/wonderland.png";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import SearchIcon from "@material-ui/icons/Search";
import MenuIcon from "@material-ui/icons/Menu";
import { Container } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actionLoaiGiay from "../../actions/loai_giay";
import * as actionGiay from "../../actions/giay";
import * as actionModal from "../../actions/modal";
import jwt from "jsonwebtoken";

function DashBoard(props) {
  const { children, name, ListLoaiGiay, createActionNP, createModal, token } =
    props;
  const [sidebar, setSidebar] = useState(false);
  const { showModal } = createModal;
  const {
    fetchListNewProductRequest,
    fetchListChiTietMauSacRequest,
    fetchListChiTietSizeRequest,
  } = createActionNP;
  const { show, setShow } = useState(false);
  const [tokens, setTokens] = useState(null);
  const history = useHistory();
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

  function dropLoaiGiays() {
    if (ListLoaiGiay.length > 0) {
      let xhtml = null;
      xhtml = ListLoaiGiay.map((route) => {
        return (
          <Link
            key={route.id}
            to={`/ThuongHieu=${route.id}`}
            className="dropdown-item"
          >
            {route.ten_loai_giay}
          </Link>
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
    showModal();
  }
  return (
    <div key={name} className="chia">
      <Container>
        <div className="header-CT">
          <div className="iconMenu">
            <MenuIcon onClick={onClickHide}></MenuIcon>
          </div>
          <div className="logo">
            <img
              src={imageLogo}
              title="Trang ch???"
              onClick={() => history.push("/")}
            />
          </div>
          <div className="dk-acoount">
            <div className="account befores flex-dk" title="T??i kho???n">
              <div className="flex-dk">
                <div className="title-account">T??i kho???n</div>
                <AccountBoxIcon></AccountBoxIcon>
              </div>
              <ul>
                <li>
                  {tokens !== null ? (
                    <a rel="nofollow">{`Xin ch??o ${tokens.ten_khach_hang}`}</a>
                  ) : (
                    <Link rel="nofollow" to="/DangNhap" title="????ng Nh???p">
                      ????ng nh???p
                    </Link>
                  )}
                </li>
                <li>
                  {tokens !== null ? (
                    <a rel="nofollow" title="????ng k??" onClick={deleteLocal}>
                      ????ng xu???t
                    </a>
                  ) : (
                    <Link rel="nofollow" to="/DangKy" title="????ng k??">
                      ????ng k??
                    </Link>
                  )}
                </li>
              </ul>
            </div>
            <div
              className="giohang flex-dk"
              title="Gi??? h??ng"
              onClick={showModals}
            >
              <div className="title-giohang">Gi??? h??ng</div>
              <div className="cart">
                <div className="cart-product">
                  <div className="cart-poduct-sl">{token.length}</div>
                  <ShoppingCartIcon className="cart-product__icon"></ShoppingCartIcon>
                </div>
              </div>
            </div>
            <div className="search flex-dk" title="T??m ki???m">
              <div className="title-search">T??m ki???m</div>
              <SearchIcon></SearchIcon>
            </div>
          </div>
        </div>
      </Container>
      <div
        className={sidebar ? "MuiBackdrop-root" : ""}
        onClick={onClickHide}
      ></div>
      <Slidebar
        onClickShowSlider={onClickShowSlider}
        sidebar={sidebar}
      ></Slidebar>
      <div className="container nav-evo-watch">
        <div className="row">
          <div className="col-md-12 col-lg-12">
            <ul id="nav" className="nav">
              <li className="nav-item ">
                <Link to="/" title="Trang ch???">
                  Trang ch???
                </Link>
              </li>

              <li className="row-menu">
                <Dropdown show={show}>
                  <Dropdown.Toggle
                    id="title"
                    variant="success"
                    id="dropdown-basic"
                  >
                    Gi??y T??y
                  </Dropdown.Toggle>
                  <Dropdown.Menu className="dropdown-item-menu">
                    {dropLoaiGiays()}
                  </Dropdown.Menu>
                </Dropdown>
              </li>

              <li className="nav-item ">
                <Link to="/GioiThieu" title="Gi???i Thi???u">
                  Gi???i Thi???u
                </Link>
              </li>
              <li className="nav-item ">
                <Link to="/DangNhap" title="????ng nh???p">
                  ????ng nh???p
                </Link>
              </li>
              <li className="nav-item ">
                <Link to="/DangKy" title="????ng k??">
                  ????ng k??
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {children}
      <div className="footer-TC">
        <div className="container">
          <div className="row">
            <div className="col-sm-6 col-12 dislay-center">
              <div className="huongdan">
                <div className="title-huongdan">H?????NG D???N</div>
                <ul className="list-huongdan">
                  <li>
                    <Link to="/HuongDanMuaHang">H?????NG D???N MUA H??NG</Link>
                  </li>
                  <li>
                    <Link to="/DangKy">????NG K?? TH??NH VI??N</Link>
                  </li>
                  <li>
                    <Link to="/TraCuuDonHang">TRA C???U ????N H??NG</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-sm-6 col-12 dislay-center">
              <div className="huongdan">
                <div className="title-huongdan">CH??NH S??CH</div>
                <ul className="list-huongdan">
                  <li>
                    <Link to="/ChinhSachDoiHang">CH??NH S??CH ?????I H??NG</Link>
                  </li>
                  <li>
                    <Link to="/ChinhSachBaoHanh">CH??NH S??CH B???O H??NH</Link>
                  </li>
                  <li>
                    <Link to="/ChinhSachThanhToan">CH??NH S??CH THANH TO??N</Link>
                  </li>
                  <li>
                    <Link to="/HinhThucVanChuyen">H??NH TH???C V???N CHUY???N</Link>
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
