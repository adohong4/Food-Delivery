import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
    return (
        <div className="section-footer">
            <div className="container-fluid">
                <div className="footer" id="footer">
                    <div className="footer-content row">
                        {/* Footer Content Left */}
                        <div className="footer-content-left col-md-4">
                            <img src={assets.logo} alt="" className="mb-3" />
                            <p className="text-muted">Mang đồ ăn - Đem hài lòng</p>
                            <p className="text-muted">Hãy để chúng tôi là sự lựa chọn của quý vị</p>
                            <div className="footer-social-icons d-flex">
                                <img src={assets.facebook_icon} alt="" className="mr-3" />
                                <img src={assets.twitter_icon} alt="" className="mr-3" />
                                <img src={assets.linkedin_icon} alt="" />
                            </div>
                            
                        </div>
    
                        {/* Footer Content Right */}
                        <div className="footer-content-right col-md-4">
                            <h2>GET IN TOUCH</h2>
                            <ul className="list-unstyled">
                                <li>+1-212-456-7890</li>
                                <li>nvietanh170@gmail.com</li>
                            </ul>
                        </div>
    
                        {/* Footer Content Center */}
                        <div className="footer-content-center col-md-4">
                            <h2>COMPANY</h2>
                            <ul className="list-unstyled">
                                <li>Home</li>
                                <li>About us</li>
                                <li>Delivery</li>
                                <li>Privacy policy</li>
                            </ul>
                        </div>
                    </div>
                    <div className="map mt-4">
                                <iframe 
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3414.849105145253!2d105.78669357486109!3d20.981011980656326!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135acce612c766f%3A0xf1fff967689168e!2zxJDhuqFpIEjhu41jIEtp4bq_biBUcsO6YyAtIFRy4bqnbiBQaMO6IChIw6AgxJDDtG5nKQ!5e1!3m2!1svi!2s!4v1728668036820!5m2!1svi!2s"
                                    width="100%" 
                                    height="250" 
                                    style={{ border: 0 }}
                                    allowFullScreen
                                    loading="lazy" 
                                    referrerPolicy="no-referrer-when-downgrade"
                                ></iframe>
                            </div>
                    <hr />
                    <p className="text-center text-muted footer-copyright">
                        Design 2024 by Group 2 All Right Reserved.
                    </p>
                </div>
            </div>
        </div>
    );
    
}    

export default Footer
