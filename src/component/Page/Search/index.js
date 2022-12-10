import React, { useState, useEffect } from "react";
import Pagination from "react-js-pagination";
// import './index.scss';
import * as giayAPI from "./../../../api/giay";
import { Link, useHistory } from "react-router-dom";
import * as apiGiay from "./../../../api/giay";
import * as apiImage from "./../../../contants/index";
import "./index.scss";

function SanPhamMoi(props) {
  const [activePage, setActivePage] = useState(1);
  const [query, setQuery] = useState("");
  const [allPage, setAllPage] = useState(0);
  const [data, setData] = useState([]);
  const [dataTam, setDataTam] = useState([]);
  const [dataTamAll, setDataTamAll] = useState([]);
  const history = useHistory();
  const [isActive, setActive] = useState("");
  const [dataPost, setDataPost] = useState({
    sortBy: "date_create",
    groupBy: "DESC",
    limit: 12,
    offset: 0,
  });

  useEffect(() => {
    if (props.match.params) {
      function fetchPostsLists() {
        if (
          props.match.params.search &&
          parseInt(props.match.params.page) !== 0
        ) {
          setActivePage(parseInt(props.match.params.page));
          let pageN = 0;
          if (parseInt(props.match.params.page) === 1) {
            pageN = 0;
          } else {
            pageN = parseInt(props.match.params.page) * 12 - 12;
          }
          const d = {
            ten_giay: props.match.params.search,
            limit: 12,
            offset: pageN,
          };
          apiGiay
            .pageSearchGiay(d)
            .then((response) => {
              if (response.status === 200) {
                setDataTam(response.data.data);

                apiGiay
                  .pageSearchGiayAll(d)
                  .then((responses) => {
                    if (responses.status === 200) {
                      setDataTamAll(responses.data.data);
                      setAllPage(responses.data.data.length);
                      apiGiay
                        .pageSearchGiayMSAll(d)
                        .then((responsess) => {
                          if (responsess.status === 200) {
                            setDataTamAll(responsess.data.data);
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
              }
            })
            .catch((error) => {
              console.log(error);
            });
          //   const dataNew = ListGiay.filter((item) =>
          //     item.ten_giay.includes(query.toLowerCase())
          //   );
          //   setAllPage(dataNew.length);
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
    }
    return () => (current = false);
  }, [dataTam, dataTamAll]);

  function handlePageChange(pageNumber) {
    if (props.match.params.search && props.match.params.page) {
      history.push(
        `/TimKiem/Search=${props.match.params.search}&&Page=${pageNumber}`
      );
    } else {
      history.push(`/TimKiem/Page=${pageNumber}`);
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
    <div className="searchs">
      <div className="container">
        <form onSubmit={onSubmit} className="mt-4">
          <div className="input-group">
            <input
              type="text"
              name="query"
              className="form-control"
              onChange={onChangSearch}
              placeholder="Bạn cần tìm gì hôm nay?"
            />
            <span className="input-group-btn">
              <button className="btn button-search" type="submit">
                <i className="fa fa-search"></i>
              </button>
            </span>
          </div>
        </form>
        <div className="row mt-4">
          {data.length > 0 && data[0].mausac.length > 0 ? (
            data.map((item, index) => {
              const d = item.mausac[0].hinh_anh.split(",");
              let arr = [];
              for (var i = 0; i < d.length; i++) {
                arr.push(d[i]);
              }
              return (
                <div
                  key={item.id}
                  className="height-margin col-xs-6 col-sm-4 col-md-4 col-lg-4"
                >
                  <Link to={`/XemSamPham/${item.id}`} className="title-hp">
                    <div className="one-procuts">
                      <div className="width-image">
                        <img
                          className="img"
                          src={`${apiImage.API_ENPOINT}/images/${arr[0]}`}
                        />
                      </div>

                      <div className="name-price">
                        <div className="name-product">{item.ten_giay}</div>
                        <div className="price-product">
                          {`${item.gia_ban
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}đ`}
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
        {data.length > 0 ? (
          <div className="col-sm-12">
            <div className="pagination">
              <Pagination
                prevPageText="prev"
                nextPageText="next"
                activePage={activePage}
                itemsCountPerPage={12}
                totalItemsCount={allPage}
                pageRangeDisplayed={12}
                onChange={handlePageChange}
              />
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

SanPhamMoi.propTypes = {};

export default SanPhamMoi;
