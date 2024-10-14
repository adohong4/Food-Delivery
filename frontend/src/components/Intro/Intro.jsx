import React, { useContext } from 'react';
import './Intro.css';
import { assets } from '../../assets/assets';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faHeadphones, faList, faFish } from '@fortawesome/free-solid-svg-icons'; // Import các biểu tượng cần thiết
import { faShopify } from '@fortawesome/free-brands-svg-icons';


const Intro = () => {
    return (
        <section className="choose-dola text-center py-5">
            <h2 className="section-title">Tại sao chúng tôi là sự lựa chọn tốt nhất?</h2>
            <div className="icons-container d-flex justify-content-center flex-wrap">
                <div className="icon-item">
                    <FontAwesomeIcon icon={faStar} size="3x" />
                    <p>Chất lượng món ăn hàng đầu</p>
                </div>
                <div className="icon-item">
                    <FontAwesomeIcon icon={faHeadphones} size="3x" />
                    <p>Dịch vụ chăm sóc khách hàng xuất sắc</p>
                </div>
                <div className="icon-item">
                    <FontAwesomeIcon icon={faList} size="3x" />
                    <p>Menu đa dạng phong phú</p>
                </div>
                <div className="icon-item">
                    <FontAwesomeIcon icon={faFish} size="3x" />
                    <p>Chất lượng nguyên liệu cao cấp</p>
                </div>
                <div className="icon-item">
                    <FontAwesomeIcon icon={faShopify} size="3x" />
                    <p>Ưu đãi và khuyến mãi hấp dẫn</p>
                </div>
            </div>
        </section>
    );
};

export default Intro;
