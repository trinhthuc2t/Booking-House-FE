import React from 'react';

const houseComponent = () => {



    return (
        <div>
            {/*Search Start*/}
            <div className="container-fluid mb-5 wow fadeIn" data-wow-delay="0.1s" style={{padding: "35px", backgroundColor:"rgb(0,185,142)"}}>
                <div className="container">
                    <div className="row g-2">
                        <div className="col-md-10">
                            <div className="row g-2">
                                <div className="col-md-4">
                                    <input type="text" className="form-control border-0 py-3"
                                           placeholder="Search Keyword"/>
                                </div>
                                <div className="col-md-4">
                                    <select className="form-select border-0 py-3">
                                        <option selected>Property Type</option>
                                        <option value="1">Property Type 1</option>
                                        <option value="2">Property Type 2</option>
                                        <option value="3">Property Type 3</option>
                                    </select>
                                </div>
                                <div className="col-md-4">
                                    <select className="form-select border-0 py-3">
                                        <option selected>Location</option>
                                        <option value="1">Location 1</option>
                                        <option value="2">Location 2</option>
                                        <option value="3">Location 3</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-2">
                            <button className="btn btn-dark border-0 w-100 py-3">Search</button>
                        </div>
                    </div>
                </div>
            </div>
            {/*Search End*/}


            {/*Category Start*/}
            <div className="container-xxl py-5">
                <div className="container">
                    <div className="text-center mx-auto mb-5 wow fadeInUp" data-wow-delay="0.1s"
                         style={{maxWidth: '600px'}}>
                    </div>
                    <div className="row g-4">
                        {/*map category*/}
                        <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.1s">
                            <a className="cat-item d-block bg-light text-center rounded p-3" href="" style={{textDecoration: "none"}}>
                                <div className="rounded p-4">
                                    <div className="icon mb-3">
                                        <img className="img-fluid" src="img/house/icon-apartment.png" alt="Icon"/>
                                    </div>
                                    <h6 style={{color: "black"}}>Apartment</h6>
                                    <span style={{color: "rgb(0,185,142)"}}>123 Properties</span>
                                </div>
                            </a>
                        </div>
                        {/*map category*/}

                    </div>

                </div>
            </div>
            {/*Category End*/}


            {/*Property List Start*/}
            <div className="container-xxl py-5">
                <div className="container">
                    <div className="tab-content">
                        <div id="tab-1" className="tab-pane fade show p-0 active">
                            <div className="row g-4">
                                {/*map house*/}

                                <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
                                    <div className="property-item rounded overflow-hidden">
                                        <div className="position-relative overflow-hidden">
                                            <a href=""><img className="img-fluid" src="img/house/property-1.jpg"
                                                            alt=""/></a>

                                            <div
                                                className="bg-white rounded-top position-absolute start-0 bottom-0 mx-4 pt-1 px-3" style={{color: "rgb(0,185,142)"}}>Category
                                            </div>
                                        </div>
                                        <div className="p-4 pb-0">
                                            <h5 className=" mb-3" style={{color: "rgb(0,185,142)"}}>$12,345</h5>
                                            <a className="d-block h5 mb-2" href="">Golden Urban House For Sell</a>
                                            <p><i className="fa fa-map-marker-alt me-2" style={{color: "rgb(0,185,142)"}}></i>123 Street, New
                                                York, USA</p>
                                        </div>
                                        <div className="d-flex border-top">
                                            <small className="flex-fill text-center border-end py-2"><i
                                                className="fa fa-ruler-combined me-2" style={{color: "rgb(0,185,142)"}}></i>1000 Sqft</small>
                                            <small className="flex-fill text-center border-end py-2"><i
                                                className="fa fa-bed  me-2" style={{color: "rgb(0,185,142)"}}></i>3 Bed</small>
                                            <small className="flex-fill text-center py-2"><i
                                                className="fa fa-bath  me-2" style={{color: "rgb(0,185,142)"}}></i>2 Bath</small>
                                        </div>
                                    </div>
                                </div>

                                {/*map house*/}


                                <div className="col-12 text-center wow fadeInUp" data-wow-delay="0.1s">
                                    <a className="btn py-3 px-5" href="" style={{backgroundColor:"rgb(0,185,142)" , color: "white"}}>Browse More Property</a>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </div>
            {/*Property List End*/}

        </div>
    );
};

export default houseComponent;