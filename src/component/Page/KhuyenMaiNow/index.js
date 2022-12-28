import React, { useEffect, useState, useRef, useMemo } from "react";
import "./homePage.scss";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { Link } from "react-router-dom";
import "./index.scss";
import * as giayAPI from "./../../../api/giay";
import * as apiKM from "./../../../api/khuyen_mai";
import { useHistory } from "react-router-dom";
import * as apiGiay from "./../../../api/giay";
import * as apiMauSac from "./../../../api/mausac";
import * as apiImage from "../../../contants/index";
import * as apiQuangCao from "../../../api/quang_cao";
import Pagination from "react-js-pagination";
import Loadding from "./../../../loadding/index";
import Moment from "moment";
import KhuyenMai from "../KhuyenMai";
function TrangChu(props) {
  const [dataQuanCao, setDataQuangCao] = useState([]);

  const [dataKM, setDataKM] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [allPage, setAllPage] = useState(0);
  const [data, setData] = useState([]);
  const [dataTam, setDataTam] = useState([]);
  const [dataTamAll, setDataTamAll] = useState([]);
  const history = useHistory();
  const [isActive, setActive] = useState("");
  const [isLoading, setIsLoadding] = useState(false);
  const [tu, settu] = useState("");
  const [den, setden] = useState("");
  const [mauSac, setMauSac] = useState([]);

  const [dataPost, setDataPost] = useState({
    sortBy: "ten_giay",
    groupBy: "DESC",
    limit: 12,
    offset: 0,
  });

  async function getMauSac() {
    await apiMauSac.getMauSac().then((res) => {
      if (res.data.success === 1) {
        setMauSac(res.data.data);
      }
    });
    await apiQuangCao.getQuangCao().then((res) => {
      if (res.status === 200) {
        setDataQuangCao(res.data.data);
      }
    });
  }
  useEffect(() => {
    getMauSac();
  }, []);

  useEffect(() => {
    if (props.match.params) {
      setDataPost((dataPost) => ({
        ...dataPost,
      }));
      //   function fetchPostsLists() {
      //     giayAPI
      //     .getProductsPageByLG({
      //       sortBy: "ten_giay",
      //       groupBy: "DESC",
      //       limit: 12,
      //       offset: 0,
      //       idMauSac: props?.match?.params?.idMauSac,
      //     })
      //     .then((res) => {
      //       const { data } = res;
      //       if (res.status === 200) {
      //         setDataTam(data.data);
      //         giayAPI
      //           .productsAllByLG({

      //             sortBy: "ten_giay",
      //             groupBy: "DESC",
      //             limit: 12,
      //             offset: 0,
      //             idMauSac: props?.match?.params?.idMauSac,
      //           })
      //           .then((resP) => {
      //             const dataAll = resP.data;
      //             if (resP.status === 200) {
      //               setDataTamAll(dataAll.data);
      //               setIsLoadding(false);
      //             }
      //           });
      //       }
      //     });
      //   apiGiay.getGiay().then((resP) => {
      //     if (resP.status === 200) {
      //       setAllPage(resP.data.data.length);
      //     }
      //   });
      //   }

      //   fetchPostsLists();
    }
    apiKM
      .getNow({ date_now: Moment(Date()).format("YYYY-MM-DD HH:mm") })
      .then((res) => {
        const { data } = res;
        if (res.status === 200) {
            setDataKM(data.data)
          setDataTam(data.data);
          setIsLoadding(false);
          giayAPI
            .getAllKM()
            .then((resP) => {
              const dataAll = resP.data;
              if (resP.status === 200) {
                setDataTamAll(dataAll.data);
                setIsLoadding(false);
              }
            });
        }
      });
    return () => (setDataTam([]), setDataTamAll([]));
  }, [props.match.params]);

  useEffect(() => {
    let current = true;
    if (dataTam?.length > 0 && dataTamAll?.length > 0) {
      let dataTLG = [];
      console.log(dataTamAll, dataTam)
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
    } else {
      setData([]);
    }
    return () => (current = false);
  }, [dataTam, dataTamAll]);
  console.log(dataTamAll)
  function renderContent() {
    if (isLoading) {
      return (
        <div className="isLoading">
          <Loadding type={`bubbles`} color={`#333`}></Loadding>
        </div>
      );
    } else {
      return (
        <div className="homePage">
          <div className="ThuongHieuTC">
            <div className="ThuongHieuTC_css">
              <div className="p-4">
                <div className="row">
                  {data.length > 0 && data[0].mausac.length > 0 ? (
                    data.map((item, index) => {
                      const d = item?.mausac[0]?.hinh_anh.split(",");
                      let arr = [];
                      if (d?.length) {
                        for (var i = 0; i < d.length; i++) {
                          arr.push(d[i]);
                        }
                      }
                      let stemp = null;
                      let stemps = 0;
                      if (dataKM.length > 0) {
                        const filter = dataKM.filter(
                          (items) => items.id_giay === item.id
                        );

                        if (filter.length > 0) {
                          stemp = filter[0].phan_tram;
                        } else {
                          stemp = null;
                        }
                      }
                      if (stemp) {
                        stemps =
                          stemp !== null
                            ? item.gia_ban - (item.gia_ban * stemp) / 100
                            : 0;
                      }

                      return (
                        <div
                          key={item.id}
                          className="height-margin col-xs-6 col-sm-4 col-md-4 col-lg-3 col-xl-2"
                        >
                          <Link
                            to={`/XemSamPham/${item.id}`}
                            className="title-hp"
                          >
                            <div className="one-procuts">
                              <div className="width-image">
                                <img
                                  className="img"
                                  src={`${apiImage.API_ENPOINT}/images/${arr[0]}`}
                                />
                              </div>

                              <div className="name-price">
                                <div className="name-product">
                                  {item.ten_giay}
                                </div>
                                <div
                                  className={
                                    stemps !== 0
                                      ? `price-product amount`
                                      : ` price-product`
                                  }
                                >
                                  {`${item.gia_ban
                                    .toString()
                                    .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}đ`}
                                </div>
                                <div className={` price-product`}>
                                  {stemps ? (
                                    `${stemps
                                      .toString()
                                      .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}đ`
                                  ) : (
                                    <></>
                                  )}
                                </div>
                              </div>
                            </div>
                          </Link>
                        </div>
                      );
                    })
                  ) : (
                    <div></div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
  return renderContent();
}

export default TrangChu;
