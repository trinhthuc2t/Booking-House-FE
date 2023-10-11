import React, {useState} from 'react';
import './footer.scss';

const Footer = () => {
    const [visible, setVisible] = useState(false)

    const toggleVisible = () => {
        const scrolled = document.documentElement.scrollTop;
        setVisible(scrolled > window.innerHeight)
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    window.addEventListener('scroll', toggleVisible);
    return (
        <>
            {/*Footer Start*/}
            <div className="container-fluid bg-dark text-white-50 pt-5 mt-5 footer">
                <div className="container py-5">
                    <div className="row g-5">
                        <div className="col-lg-3 col-md-6">
                            <h5 className="text-white mb-4">Về chúng tôi</h5>
                            <p className="mb-2"><i className="fa fa-map-marker-alt me-3"></i>123 Street, New York, USA</p>
                            <p className="mb-2"><i className="fa fa-phone-alt me-3"></i>+012 345 67890</p>
                            <p className="mb-2"><i className="fa fa-envelope me-3"></i>info@example.com</p>
                            <div className="d-flex pt-2">
                                <a className="btn btn-outline-light btn-social" href=""><i className="fab fa-twitter"></i></a>
                                <a className="btn btn-outline-light btn-social" href=""><i className="fab fa-facebook-f"></i></a>
                                <a className="btn btn-outline-light btn-social" href=""><i className="fab fa-youtube"></i></a>
                                <a className="btn btn-outline-light btn-social" href=""><i className="fab fa-linkedin-in"></i></a>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <h5 className="text-white mb-4">Quick Links</h5>
                            <a className="btn btn-link nav-link text-white-50" href="">About Us</a>
                            <a className="btn btn-link nav-link text-white-50" href="">Contact Us</a>
                            <a className="btn btn-link nav-link text-white-50" href="">Our Services</a>
                            <a className="btn btn-link nav-link text-white-50" href="">Privacy Policy</a>
                            <a className="btn btn-link nav-link text-white-50" href="">Terms & Condition</a>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <h5 className="text-white mb-4">Photo Gallery</h5>
                            <div className="row g-2 pt-2">
                                <div className="col-4">
                                    <img className="img-fluid rounded bg-light p-1" src={require("../../image/property-1.jpg")} alt=""/>
                                </div>
                                <div className="col-4">
                                    <img className="img-fluid rounded bg-light p-1" src={require("../../image/property-2.jpg")} alt=""/>
                                </div>
                                <div className="col-4">
                                    <img className="img-fluid rounded bg-light p-1" src={require("../../image/property-3.jpg")} alt=""/>
                                </div>
                                <div className="col-4">
                                    <img className="img-fluid rounded bg-light p-1" src={require("../../image/property-4.jpg")} alt=""/>
                                </div>
                                <div className="col-4">
                                    <img className="img-fluid rounded bg-light p-1" src={require("../../image/property-5.jpg")} alt=""/>
                                </div>
                                <div className="col-4">
                                    <img className="img-fluid rounded bg-light p-1" src={require("../../image/property-6.jpg")} alt=""/>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <h5 className="text-white mb-4">Newsletter</h5>
                            <p>Dolor amet sit justo amet elitr clita ipsum elitr est.</p>
                            <div className="position-relative mx-auto" style={{maxWidth:'400px'}}>
                                <input className="form-control bg-transparent w-100 py-3 ps-4 pe-5" type="text" placeholder="Your email"/>
                                    <button type="button" className="btn btn-primary py-2 position-absolute top-0 end-0 mt-2 me-2">SignUp</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="copyright">
                        <div className="row">
                            <div className="col-md-6 text-center text-md-start mb-3 mb-md-0 d-flex">
                                &copy; 2023, All Right Reserved.

                                Designed By <a className="border-bottom nav-link ms-2" href="#">Nhóm 4</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/*Footer End*/}

            {/*Back to Top*/}
            <button className={`btn btn-primary rounded-circle back-to-top ${visible ? "d-block" : "d-none"}`}
                    style={{position: 'fixed', bottom: '20px', right: '20px', padding: '8px 12px', fontSize: '18px'}}
                    onClick={scrollToTop}>
                <i className="bi bi-arrow-up"></i>
            </button>
        </>
    );
};

export default Footer;