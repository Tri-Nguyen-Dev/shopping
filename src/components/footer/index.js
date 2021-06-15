import React, { useEffect, useRef } from 'react'
import './style.scss'

function Footer() {
    const refBackTop = useRef()
    const handleToTop = () => {
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    }
    useEffect(() => {
        if (refBackTop.current) {
            if (document.body.scrollTop < 20 || document.documentElement.scrollTop < 20) {
                refBackTop.current.style.display = "none";
            }
        }
        const showTop = () => {
            if (refBackTop.current) {
                if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
                    refBackTop.current.style.display = "flex";
                } else {
                    refBackTop.current.style.display = "none";
                }
            }
        }
        window.addEventListener("scroll", showTop)

        return () => {
            window.removeEventListener("scroll", showTop)
        }
    }, [])
    return (
        <footer className="footer">
            <div className="grid wide">
                <div className="row">
                    <div className="col l-3">
                        <div className="footer__about">
                            <h3>ABOUT US</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipis cing elit. Cras convallis, eros non finibus imperdiet ipsum mi posuere diam, nec imperdiet arcu urna et est. Curabitur feugiat lobortis sempe
                            </p>
                            <ul className="footer__content">
                                <li>
                                    <i className="fas fa-phone-volume"></i>
                                    <span>(+612) 2531 5600</span>
                                </li>
                                <li>
                                    <i className="far fa-envelope"></i>
                                    <span>minhtri1314@gmail.com</span>
                                </li>
                                <li>
                                    <i className="fas fa-map-marker-alt"></i>
                                    <span>O PBox 1622 Vissaosang Street West</span>
                                </li>
                                <li>
                                    <i className="far fa-clock"></i>
                                    <span>Opening Hours : 8.00AM - 21.00AM</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col l-3">
                        <div className="footer__customer">
                            <h3>CUSTOMER SERVICE</h3>
                            <ul>
                                <li>Contact us</li>
                                <li>Help and advice</li>
                                <li>Shipping & Returns</li>
                                <li>Terms and conditions</li>
                                <li>Refund Policy</li>
                            </ul>
                        </div>
                    </div>
                    <div className="col l-3">
                        <div className="footer__info">
                            <h3>INFORMATION</h3>
                            <ul>
                                <li>Who We Are ?</li>
                                <li>Corporate Responsibility</li>
                                <li>Shipping & Returns</li>
                                <li>California Laws</li>
                                <li>Privacy Policy</li>
                            </ul>
                        </div>
                    </div>
                    <div className="col l-3">
                        <div className="footer__new">
                            <h3>NEWSLETTER</h3>
                            <p>
                                Sign up for newsletter to receive special offers and exclusive news about TEE products
                            </p>

                            <input type="text" placeholder="Send Mail" />
                            <button>SUBSCRIBE</button>
                        </div>
                    </div>
                </div>
            </div>
            <div ref={refBackTop} className="back-to-top" onClick={handleToTop}>
                <i className="fas fa-cloud-upload-alt"></i>
            </div>
        </footer>
    )
}

export default Footer
