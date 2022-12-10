import React, { useEffect, useState } from "react";
import "./index.scss";
import * as apiTiTuc from "./../../../api/tin_tuc";
import * as apiThongKew from "./../../../api/thong_ke";
import * as apiImage from "./../../../contants/index";
import { Link } from "react-router-dom";
const TinTuc = (props) => {
  var d = new Date();
  const [data, setData] = useState([]);
  const [dataHot, setDataHot] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    await apiTiTuc.getTinTuc().then((res) => {
      const { data } = res;
      if (res.status === 200) {
        setData(data.data);
      }
    });

    await apiThongKew
      .getHotByMonth({ year: d.getFullYear(), month: d.getMonth() })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          setDataHot(res.data.data);
        }
      });
  }

  return (
    <div className="container">
      <div className="padmb">
        <div className="newsleft">
          <div className="clear10" />
          <ul className="boxnews tutorial_list">
            {data.length > 0
              ? data.map((item) => {
                  return (
                    <li key={item.id}>
                      <Link to={`/Tintuc/id=${item.id}`}
                        title={item.ten_giay}
                        className="img"
                      >
                        <img
                          className=" lazyloaded"
                          src={`http://localhost:8080/images/${item.hinh_anh}`}
                        />
                      </Link>
                      <Link to={`/Tintuc/id=${item.id}`}
                        title={item.ten_giay}
                      >
                        <h3>{item.ten_tin_tuc}</h3>
                      </Link>
                      <p className="date">14:43:49 12-07-2022</p>
                      <div>{item.tom_tat}</div>
                    </li>
                  );
                })
              : null}
          </ul>
          <div className="clear10" />
        </div>
        <div className="newsright">
          <div className="titnews blue">Hàng bán chạy tháng {d.getMonth()}</div>
          <ul className="selling">
            {dataHot &&
              dataHot.map((item) => {
                const d = item.hinh_anh.split(",");
                let arr = [];
                for (var i = 0; i < d.length; i++) {
                  arr.push(d[i]);
                }
                return (
                  <li>
                    <Link to={`/XemSamPham/${item.id}`}
                    >
                      <img
                        className="images lazy"
                        src={`${apiImage.API_ENPOINT}/images/${arr[0]}`}
                      />
                      <h3>{item.ten_giay}</h3>
                      <p>
                        <span className="price">
                          {`${item?.gia_ban.toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}đ`}
                        </span>
                      </p>
                      <label>
                        Đã bán <b>{item.so_luong}</b> sản phẩm
                      </label>
                    </Link>
                  </li>
                );
              })}
          </ul>
        </div>
        <div className="clear" />

      </div>
    </div>
  );
};

export default TinTuc;
