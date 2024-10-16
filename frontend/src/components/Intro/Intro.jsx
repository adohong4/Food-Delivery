import React, { useContext } from 'react';
import './Intro.css';
import { assets } from '../../assets/assets';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faHeadphones, faList, faFish } from '@fortawesome/free-solid-svg-icons'; // Import các biểu tượng cần thiết
import { faShopify } from '@fortawesome/free-brands-svg-icons';


const Intro = () => {
    return (
        <section className="choose-dola text-center py-5">
            <h2 className="section-title">Why are we the best choice?</h2>
            <div className="icons-container d-flex justify-content-center flex-wrap">
                <div className="icon-item">
                    <FontAwesomeIcon icon={faStar} size="3x" />
                    <p>Top quality dishes</p>
                </div>
                <div className="icon-item">
                    <FontAwesomeIcon icon={faHeadphones} size="3x" />
                    <p>Excellent customer service</p>
                </div>
                <div className="icon-item">
                    <FontAwesomeIcon icon={faList} size="3x" />
                    <p>Diverse and rich menu</p>
                </div>
                <div className="icon-item">
                    <FontAwesomeIcon icon={faFish} size="3x" />
                    <p>High-quality raw materials</p>
                </div>
                <div className="icon-item">
                    <FontAwesomeIcon icon={faShopify} size="3x" />
                    <p>Attractive offers and promotions</p>
                </div>
            </div>
        </section>
    );
};

export default Intro;
