import { FaUsers, FaRocket, FaRegLightbulb } from "react-icons/fa";
import "./About.css";
import bannerImg from "../assets/images/slider_1.jpg";

function About() {
  return (
    <div className="about-container">
      
      <div className="about-banner" style={{ backgroundImage: `url(${bannerImg})` }}>
      </div>

      <div className="container mt-5">
        <div className="row justify-content-center">
         
          <div className="col-md-8">
            <div className="card shadow-lg p-4 text-center">
              <h2><FaRegLightbulb /> Sứ Mệnh Của Chúng Tôi</h2>
              <p>
                Sứ mệnh của chúng tôi là mang đến cho khách hàng những sản phẩm chất lượng cao 
                với trải nghiệm mua sắm tuyệt vời nhất.
              </p>
            </div>
          </div>

          <div className="col-md-8 mt-4">
            <div className="card shadow-lg p-4 text-center">
              <h2><FaUsers /> Đội Ngũ Của Chúng Tôi</h2>
              <ul className="team-list">
                <li>Nghiêm Chí Thiện</li>
                <li>Nguyễn Trần Gia Sĩ</li>
                <li>Nguyễn Tâm Thành</li>
                <li>Nguyễn Thị Thanh Thương</li>
                <li>Lê Minh Tiến</li>
              </ul>
            </div>
          </div>

          <div className="col-md-8 mt-4">
            <div className="card shadow-lg p-4 text-center">
              <h2><FaRocket /> Động Lực Phát Triển</h2>
              <p>
                Chúng tôi không ngừng đổi mới và phát triển để mang đến sản phẩm chất lượng nhất,
                giúp khách hàng có trải nghiệm tuyệt vời.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;

