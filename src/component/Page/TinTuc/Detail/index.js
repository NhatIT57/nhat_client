import React, { useEffect, useState } from "react";
import "./index.scss";
import * as api from "./../../../../api/tin_tuc";
import { moment } from "moment";
const TinTucDetail = (props) => {
  const [data, setData] = useState();
  async function loadData() {
    if (props.match.params) {
      await api.xemTinTuc(props.match.params.id).then((res) => {
        if (res.data.success === 1) {
          setData(res.data.data);
        }
      });
    }
  }
  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="container">
      <div class="padmb">
        <h2 class="titlenews">{data?.ten_tin_tuc}</h2>
        <div class="motangan">{data?.tom_tat}</div>
      </div>
      <div>
      <div dangerouslySetInnerHTML={{__html: data?.noi_dung}} />
      </div>
    </div>
  );
};

TinTucDetail.propTypes = {};

export default TinTucDetail;
