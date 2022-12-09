import React, { useEffect, useState } from 'react'
import './index.scss';
import * as apiTiTuc from "./../../../api/tin_tuc";
const TinTuc = props => {
  const [data, setData] = useState([]);

useEffect(()=>{
  loadData();
},[]);

async function loadData(){
  await apiTiTuc.getTinTuc().then((res) => {
    const { data } = res;
    if (res.status === 200) {
      setData(data.data);
    }
  });
}
  return (
   <div className='container'>
         <div className="padmb">
    <div className="newsleft">
      <div className="clear10" />
      <ul className="boxnews tutorial_list">
      {data.length>0 ?data.map((item)=>{
        return <li key={item.id}>
         <a href="giay-air-jordan-1-high-rebellionaire.html" title="Air Jordan 1 High Rebellionaire thiết kế độc lạ chưa từng thấy" className="img"><img className=" lazyloaded"  src={`http://localhost:8080/images/${item.hinh_anh}`}/></a>
         <a href="giay-air-jordan-1-high-rebellionaire.html" title="Air Jordan 1 High Rebellionaire thiết kế độc lạ chưa từng thấy"><h3>{item.ten_tin_tuc}</h3></a>
         <p className="date">14:43:49 12-07-2022</p>
         <div>{item.tom_tat}</div>
       </li>
      }) :null}
      </ul>
      <div className="clear10" /> 
      <div className="show_more_main  show_morenews" val={17} count={17} url="tin-tuc-giay-the-thao"> Xem thêm Tin tức</div> 
    </div>
    <div className="newsright">
      <ul id="midadv_in" className="owl-carousel owl-loaded owl-drag"> 
        <div className="owl-stage-outer"><div className="owl-stage" style={{transform: 'translate3d(-3736px, 0px, 0px)', transition: 'all 1s ease 0s', width: '7472px'}}><div className="owl-item cloned" style={{width: '934px'}}><li className="item">
                <a href title="Adidas Ultra Boost 20"> <img className="owl-lazy" data-src="upload/banner/adidas-ultra-boost-20.png" alt="Adidas Ultra Boost 20" src="upload/banner/adidas-ultra-boost-20.png" style={{opacity: 1}} /></a>
              </li></div><div className="owl-item cloned" style={{width: '934px'}}><li className="item">
                <a href="adidas-yeezy-350" title="Adidas yeezy 350"> <img className="owl-lazy" data-src="upload/banner/cac-mau-adidas-yeezy-350-moi-nhat-2019.png" alt="Adidas yeezy 350" /></a>
              </li></div><div className="owl-item" style={{width: '934px'}}><li className="item">
                <a href="https://giaygiare.vn/jordan" title="Nike Air Jordan 1"> <img className="owl-lazy" data-src="upload/banner/nike-air-jordan-1.png" alt="Nike Air Jordan 1" src="upload/banner/nike-air-jordan-1.png" style={{opacity: 1}} /></a>
              </li></div><div className="owl-item" style={{width: '934px'}}><li className="item">
                <a href="adidas-yeezy-700" title="Adidas yeezy 700"> <img className="owl-lazy" data-src="upload/banner/cac-mau-adidas-yeezy-700-moi-nhat-2019.png" alt="Adidas yeezy 700" src="upload/banner/cac-mau-adidas-yeezy-700-moi-nhat-2019.png" style={{opacity: 1}} /></a>
              </li></div><div className="owl-item active" style={{width: '934px'}}><li className="item">
                <a href title="Adidas Ultra Boost 20"> <img className="owl-lazy" data-src="upload/banner/adidas-ultra-boost-20.png" alt="Adidas Ultra Boost 20" src="upload/banner/adidas-ultra-boost-20.png" style={{opacity: 1}} /></a>
              </li></div><div className="owl-item" style={{width: '934px'}}><li className="item">
                <a href="adidas-yeezy-350" title="Adidas yeezy 350"> <img className="owl-lazy" data-src="upload/banner/cac-mau-adidas-yeezy-350-moi-nhat-2019.png" alt="Adidas yeezy 350" /></a>
              </li></div><div className="owl-item cloned" style={{width: '934px'}}><li className="item">
                <a href="https://giaygiare.vn/jordan" title="Nike Air Jordan 1"> <img className="owl-lazy" data-src="upload/banner/nike-air-jordan-1.png" alt="Nike Air Jordan 1" src="upload/banner/nike-air-jordan-1.png" style={{opacity: 1}} /></a>
              </li></div><div className="owl-item cloned" style={{width: '934px'}}><li className="item">
                <a href="adidas-yeezy-700" title="Adidas yeezy 700"> <img className="owl-lazy" data-src="upload/banner/cac-mau-adidas-yeezy-700-moi-nhat-2019.png" alt="Adidas yeezy 700" src="upload/banner/cac-mau-adidas-yeezy-700-moi-nhat-2019.png" style={{opacity: 1}} /></a>
              </li></div></div></div><div className="owl-nav disabled"><button type="button" role="presentation" className="owl-prev"><span aria-label="Previous">‹</span></button><button type="button" role="presentation" className="owl-next"><span aria-label="Next">›</span></button></div><div className="owl-dots"><button role="button" className="owl-dot"><span /></button><button role="button" className="owl-dot"><span /></button><button role="button" className="owl-dot active"><span /></button><button role="button" className="owl-dot"><span /></button></div></ul> 
      <div className="clear10" /> 
      <div className="titnews">Lượt xem nhiều</div>
      <div className="viewsmuch"><a href="10-mau-giay-sneaker-hot-nhat-dip-tet-canh-ty-2020.html" title="10 mẫu giày Sneaker 'Hot Trend' nhất nên sắm 2022"><i>1</i><div><h3>10 mẫu giày Sneaker 'Hot Trend' nhất nên sắm 2022</h3><span>307.994</span></div></a><a href="top-5-dong-giay-adidas-duoc-ua-chuong-nhat-nam-2020.html" title="Top 5 dòng giày Adidas được ưa chuộng nhất năm 2022"><i>2</i><div><h3>Top 5 dòng giày Adidas được ưa chuộng nhất năm 2022</h3><span>69.243</span></div></a><a href="3-cach-check-giay-adidas-stan-smith-fake-real-chuan-nhat-2020.html" title="3 cách check giày Adidas Stan Smith Fake & Real chuẩn nhất"><i>3</i><div><h3>3 cách check giày Adidas Stan Smith Fake &amp; Real chuẩn nhất</h3><span>51.893</span></div></a><a href="giay-balenciaga-sf-va-rep-1-1-la-gi-gia-bao-nhieu.html" title="Giày Balenciaga sf và rep 1:1 là gì? Giá bao nhiêu trên thị trường?"><i>4</i><div><h3>Giày Balenciaga sf và rep 1:1 là gì? Giá bao nhiêu trên thị trường?</h3><span>47.948</span></div></a><a href="giay-balenciaga-real-auth-nam-nu-gia-bao-nhieu-tren-thi-truong.html" title="Giày balenciaga real (auth) nam & nữ giá bao nhiêu trên thị trường?"><i>5</i><div><h3>Giày balenciaga real (auth) nam &amp; nữ giá bao nhiêu trên thị trường?</h3><span>45.890</span></div></a></div>
      <div className="clear10" />
      <div className="titnews blue">Hàng bán chạy tháng 10</div><ul className="selling"><li>
          <a href="adidas-yeezy-350-v2-static-black-reflective.html" title="Adidas Yeezy Boost 350 V2 Static Black 3m 'Reflective'">
            <img className="images lazy" data-src="upload/sanpham/small/adidas-yeezy-boost-350-v2-static-black-3m-reflective.jpg" alt="Adidas Yeezy Boost 350 V2 Static Black 3m 'Reflective'" />
            <h3>Adidas Yeezy Boost 350 V2 Static Black 3m 'Reflective'</h3>
            <p><span className="price">1,260,000<sup>đ</sup></span><del><span>1,680,000</span></del></p>
            <label><img className="lazy" data-src="images/verify.png" width={13} height={13} />Đã bán <b>26</b> sản phẩm</label>
          </a>
        </li><li>
          <a href="nike-air-jordan-1-high-black-white-1-1.html" title="Nike Air Jordan 1 High 'Black White'">
            <img className="images lazy" data-src="upload/sanpham/small/nike-air-jordan-1-high-black-white-1-1.jpg" alt="Nike Air Jordan 1 High 'Black White'" />
            <h3>Nike Air Jordan 1 High 'Black White'</h3>
            <p><span className="price">990,000<sup>đ</sup></span><del><span>1,320,000</span></del></p>
            <label><img className="lazy" data-src="images/verify.png" width={13} height={13} />Đã bán <b>24</b> sản phẩm</label>
          </a>
        </li><li>
          <a href="nike-air-force-1-low-sp-21-coffee.html" title="Nike Air Force 1 Low SP 21 'Coffee'">
            <img className="images lazy" data-src="upload/sanpham/small/nike-air-force-1-low-sp-21-coffee.jpg" alt="Nike Air Force 1 Low SP 21 'Coffee'" />
            <h3>Nike Air Force 1 Low SP 21 'Coffee'</h3>
            <p><span className="price">900,000<sup>đ</sup></span><del><span>1,300,000</span></del></p>
            <label><img className="lazy" data-src="images/verify.png" width={13} height={13} />Đã bán <b>24</b> sản phẩm</label>
          </a>
        </li><li>
          <a href="nike-air-jordan-1-high-pink-oxford.html" title="Nike Air Jordan 1 High Zoom CMFT Pink Oxford">
            <img className="images lazy" data-src="upload/sanpham/small/nike-air-jordan-1-high-zoom-cmft-pink-oxford.jpg" alt="Nike Air Jordan 1 High Zoom CMFT Pink Oxford" />
            <h3>Nike Air Jordan 1 High Zoom CMFT Pink Oxford</h3>
            <p><span className="price">1,080,000<sup>đ</sup></span><del><span>1,450,000</span></del></p>
            <label><img className="lazy" data-src="images/verify.png" width={13} height={13} />Đã bán <b>24</b> sản phẩm</label>
          </a>
        </li><li>
          <a href="giay-nike-air-force-1-trang-full-nam-nu.html" title="Nike Air Force 1 Trắng Full Nam, Nữ">
            <img className="images lazy" data-src="upload/sanpham/small/nike-air-force-1-trang-full-nam-nu.jpg" alt="Nike Air Force 1 Trắng Full Nam, Nữ" />
            <h3>Nike Air Force 1 Trắng Full Nam, Nữ</h3>
            <p><span className="price">720,000<sup>đ</sup></span><del><span>1,100,000</span></del></p>
            <label><img className="lazy" data-src="images/verify.png" width={13} height={13} />Đã bán <b>24</b> sản phẩm</label>
          </a>
        </li></ul>
      <div className="clear10" />
      <div className="titnews blue"><a href="kinh-nghiem-giay-the-thao" title="Kinh nghiệm hay">Kinh nghiệm hay</a></div><ul className="aside"><li>
          <a href="mix-do-yeezy-750-moi-nhat.html" title="Mách bạn cách mix đồ chuẩn cá tính với Yeezy 750 mới nhất">
            <img className="images lazy" data-src="upload/sanpham/thumbs/mach-ban-cach-mix-do-chuan-ca-tinh-voi-yeezy-750-moi-nhat.jpg" alt="Mách bạn cách mix đồ chuẩn cá tính với Yeezy 750 mới nhất" />
            <h3>Mách bạn cách mix đồ chuẩn cá tính với Yeezy 750 mới nhất</h3>
          </a>
        </li><li>
          <a href="toplist-giay-sneaker-trang.html" title="Toplist 10 mẫu sneaker trắng thời trang được yêu thích nhất">
            <img className="images lazy" data-src="upload/sanpham/thumbs/toplist-10-mau-sneaker-trang-thoi-trang-duoc-yeu-thich-nhat.jpg" alt="Toplist 10 mẫu sneaker trắng thời trang được yêu thích nhất" />
            <h3>Toplist 10 mẫu sneaker trắng thời trang được yêu thích nhất</h3>
          </a>
        </li><li>
          <a href="phoi-mix-do-voi-giay-adidas-ozweego.html" title="Bí quyết phối mix đồ với giày Adidas Ozweego chuẩn đẹp">
            <img className="images lazy" data-src="upload/sanpham/thumbs/bi-quyet-phoi-mix-do-voi-giay-adidas-ozweego-chuan-dep.jpg" alt="Bí quyết phối mix đồ với giày Adidas Ozweego chuẩn đẹp" />
            <h3>Bí quyết phối mix đồ với giày Adidas Ozweego chuẩn đẹp</h3>
          </a>
        </li><li>
          <a href="mix-do-chuan-dep-voi-giay-adidas-swift-run.html" title="Mix đồ chuẩn đẹp với giày thể thao Adidas Swift Run">
            <img className="images lazy" data-src="upload/sanpham/thumbs/mix-do-chuan-dep-voi-giay-the-thao-adidas-swift-run.jpg" alt="Mix đồ chuẩn đẹp với giày thể thao Adidas Swift Run" />
            <h3>Mix đồ chuẩn đẹp với giày thể thao Adidas Swift Run</h3>
          </a>
        </li><li>
          <a href="mix-giay-adidas-superstar.html" title="Mix giày Adidas Superstar Outfit với Style nào phù hợp?">
            <img className="images lazy" data-src="upload/sanpham/thumbs/mix-giay-adidas-superstar-outfit-voi-style-nao-phu-hop.jpg" alt="Mix giày Adidas Superstar Outfit với Style nào phù hợp?" />
            <h3>Mix giày Adidas Superstar Outfit với Style nào phù hợp?</h3>
          </a>
        </li><li>
          <a href="phoi-dam-vay-nu-voi-sneaker-chuan-han.html" title="Bí quyết phối đầm váy nữ với sneaker chuẩn Hàn cực xinh">
            <img className="images lazy" data-src="upload/sanpham/thumbs/bi-quyet-phoi-dam-vay-nu-voi-sneaker-chuan-han-cuc-xinh.jpg" alt="Bí quyết phối đầm váy nữ với sneaker chuẩn Hàn cực xinh" />
            <h3>Bí quyết phối đầm váy nữ với sneaker chuẩn Hàn cực xinh</h3>
          </a>
        </li><li>
          <a href="giay-nike-zoom-2k.html" title="Điểm mạnh trong thiết kế của dòng giày Nike Zoom 2K">
            <img className="images lazy" data-src="upload/sanpham/thumbs/diem-manh-trong-thiet-ke-cua-dong-giay-nike-zoom-2k.jpg" alt="Điểm mạnh trong thiết kế của dòng giày Nike Zoom 2K" />
            <h3>Điểm mạnh trong thiết kế của dòng giày Nike Zoom 2K</h3>
          </a>
        </li></ul><div className="titnews blue"><a href="khuyen-mai" title="Khuyến mãi">Khuyến mãi</a></div><ul className="aside"><li>
          <a href="gui-anh-feedback-tang-qua-lien-tay.html" title="Gửi ảnh Feedback - Tặng quà liền tay">
            <img className="images lazy" data-src="upload/sanpham/thumbs/gui-anh-feedback-tang-qua-lien-tay.jpg" alt="Gửi ảnh Feedback - Tặng quà liền tay" />
            <h3>Gửi ảnh Feedback - Tặng quà liền tay</h3>
          </a>
        </li><li>
          <a href="chuong-trinh-sale-black-friday.html" title="Chương trình Sale khủng lớn nhất năm - Black Friday 2021">
            <img className="images lazy" data-src="upload/sanpham/thumbs/chuong-trinh-sale-khung-lon-nhat-nam-black-friday-2020.jpg" alt="Chương trình Sale khủng lớn nhất năm - Black Friday 2021" />
            <h3>Chương trình Sale khủng lớn nhất năm - Black Friday 2021</h3>
          </a>
        </li><li>
          <a href="dang-ky-ngay-tich-diem-nhan-nhieu-uu-dai-tai-tulo-shop.html" title="Đăng ký ngay - Tích điểm nhận nhiều ưu đãi tại Tulo Shop">
            <img className="images lazy" data-src="upload/sanpham/thumbs/dang-ky-ngay-tich-diem-nhan-nhieu-uu-dai-tai-tulo-shop.jpg" alt="Đăng ký ngay - Tích điểm nhận nhiều ưu đãi tại Tulo Shop" />
            <h3>Đăng ký ngay - Tích điểm nhận nhiều ưu đãi tại Tulo Shop</h3>
          </a>
        </li></ul>
    </div>
    <div className="clear" /> 
    <div className="addthis_inline_share_toolbox" /> 
    <div className="clear" /> 
    <div className="fb-comments fb_iframe_widget fb_iframe_widget_fluid_desktop" data-href="https://giaygiare.vn/tin-tuc-giay-the-thao" data-numposts={5} data-width="100%" fb-xfbml-state="rendered" fb-iframe-plugin-query="app_id=&container_width=934&height=100&href=https%3A%2F%2Fgiaygiare.vn%2Ftin-tuc-giay-the-thao&locale=vi_VN&numposts=5&sdk=joey&version=v7.0&width=" style={{width: '100%'}}><span style={{verticalAlign: 'bottom', width: '100%', height: '204px'}}><iframe name="f2d891b840931b4" width="1000px" height="100px" data-testid="fb:comments Facebook Social Plugin" title="fb:comments Facebook Social Plugin" frameBorder={0} allowTransparency="true" allowFullScreen="true" scrolling="no" allow="encrypted-media" src="https://web.facebook.com/v7.0/plugins/comments.php?app_id=&channel=https%3A%2F%2Fstaticxx.facebook.com%2Fx%2Fconnect%2Fxd_arbiter%2F%3Fversion%3D46%23cb%3Dff15112edcf7cc%26domain%3Dgiaygiare.vn%26is_canvas%3Dfalse%26origin%3Dhttps%253A%252F%252Fgiaygiare.vn%252Ff27ca04b8e7dc9%26relation%3Dparent.parent&container_width=934&height=100&href=https%3A%2F%2Fgiaygiare.vn%2Ftin-tuc-giay-the-thao&locale=vi_VN&numposts=5&sdk=joey&version=v7.0&width=" style={{border: 'none', visibility: 'visible', width: '100%', height: '204px'}} className /></span></div> 
  </div>
   </div>
  )
}

export default TinTuc
