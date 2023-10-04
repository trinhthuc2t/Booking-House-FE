import React, {useEffect, useState} from 'react';
import propertyService from "../service/PropertyService";

const PropertyComponent = () => {

    const [properties, setProperties] = useState([])
    const [categories, setCategories] = useState([])

    const getAllProperty = () => {
        propertyService
            .getAllProperty()
            .then((properties) => {
                setProperties(properties);

            })

            .catch((error) => {
                alert("error");
            });
    };

    const getAllCategories = () => {
        propertyService.getCategory().then((categories) => {
            setCategories(categories)

        }).catch((error) => {
            alert("error");
        })
    }

    const getPropertyByCategory = (id) => {
        console.log(id)

        propertyService
            .getPropertyByCategory(id)
            .then((properties) => {
                console.log(properties)
                setProperties(properties);

            })

            .catch((error) => {
                alert("error");
            });
    };
    useEffect(() => {
        getAllProperty()
        getAllCategories();
    }, [])

    return (
        <div>
            <div className="container-fluid bg-primary mb-5 wow fadeIn" data-wow-delay="0.1s" style={{padding: 35}}>
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
            <div className="container-xxl py-5">
                <div className="container">
                    <div className="text-center mx-auto mb-5 wow fadeInUp" data-wow-delay="0.1s"
                         style={{maxWidth: '600px'}}>
                        <h1 className="mb-3">Property Types</h1>
                        <p>Eirmod sed ipsum dolor sit rebum labore magna erat. Tempor ut dolore lorem kasd vero ipsum
                            sit eirmod sit. Ipsum diam justo sed rebum vero dolor duo.</p>
                    </div>
                    <div className="row g-4">

                        {categories.map((c) => {
                            return (
                                <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.1s" key={c.id}>
                                    <a className="cat-item d-block bg-light text-center rounded p-3" onClick={()=>{
                                        getPropertyByCategory(c.id)
                                    }}>
                                        <div className="rounded p-4">
                                            <div className="icon mb-3">
                                                <img className="img-fluid" src={c.img} alt="Icon"/>
                                            </div>
                                            <h6>{c.name}</h6>
                                        </div>
                                    </a>
                                </div>
                            )
                        })}
                    </div>


                </div>
            </div>
            {/*Property List Start*/}
            <div className="container-xxl py-5">
                <div className="container">
                    <div className="row g-0 gx-5 align-items-end">
                        <div className="col-lg-6">
                            <div className="text-start mx-auto mb-5 wow slideInLeft" data-wow-delay="0.1s">
                                <h1 className="mb-3">Property Listing</h1>
                                <p>Eirmod sed ipsum dolor sit rebum labore magna erat. Tempor ut dolore lorem kasd vero
                                    ipsum sit eirmod sit diam justo sed rebum.</p>
                            </div>
                        </div>
                        <div className="col-lg-6 text-start text-lg-end wow slideInRight" data-wow-delay="0.1s">
                            <ul className="nav nav-pills d-inline-flex justify-content-end mb-5">
                                <li className="nav-item me-2">
                                    <a className="btn btn-outline-primary active" data-bs-toggle="pill" onClick={getAllProperty}>Featured</a>
                                </li>
                                <li className="nav-item me-2">
                                    <a className="btn btn-outline-primary" data-bs-toggle="pill" href="#tab-2">For
                                        Sell</a>
                                </li>
                                <li className="nav-item me-0">
                                    <a className="btn btn-outline-primary" data-bs-toggle="pill" href="#tab-3">For
                                        Rent</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="tab-content">
                        <div id="tab-1" className="tab-pane fade show p-0 active">
                            <div className="row g-4">

                                {properties.map((p=>{
                                    return (
                                        <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s" key={p.id}>
                                            <div className="property-item rounded overflow-hidden">
                                                <div className="position-relative overflow-hidden">
                                                    <a href=""><img src={p.images}  height={275} alt=""/></a>
                                                    <div
                                                        className="bg-primary rounded text-white position-absolute start-0 top-0 m-4 py-1 px-3">For
                                                        Sell
                                                    </div>
                                                    <div
                                                        className="bg-white rounded-top text-primary position-absolute start-0 bottom-0 mx-4 pt-1 px-3">{p.category.name}
                                                    </div>
                                                </div>
                                                <div className="p-4 pb-0">
                                                    <h5 className="text-primary mb-3">{p.price} VNĐ/NĐ</h5>
                                                    <a className="d-block h5 mb-2" href="">{p.title}</a>
                                                    <p><i className="fa fa-map-marker-alt text-primary me-2"></i>{p.location}, {p.city.name}, {p.city.country.name}</p>
                                                </div>
                                                <div className="d-flex border-top">
                                                    <small className="flex-fill text-center border-end py-2"><i
                                                        className="fa fa-ruler-combined text-primary me-2"></i>{p.area} m2</small>
                                                    <small className="flex-fill text-center border-end py-2"><i
                                                        className="fa fa-bed text-primary me-2"></i>{p.bedrooms} Bed</small>
                                                    <small className="flex-fill text-center py-2"><i
                                                        className="fa fa-bath text-primary me-2"></i>{p.bathrooms} Bath</small>
                                                </div>
                                            </div>
                                        </div>

                                    )
                                }))}
                                <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.5s">
                                    <div className="property-item rounded overflow-hidden">
                                        <div className="position-relative overflow-hidden">
                                            <a href=""><img className="img-fluid" src="img/property/property-3.jpg"
                                                            alt=""/></a>
                                            <div
                                                className="bg-primary rounded text-white position-absolute start-0 top-0 m-4 py-1 px-3">For
                                                Sell
                                            </div>
                                            <div
                                                className="bg-white rounded-top text-primary position-absolute start-0 bottom-0 mx-4 pt-1 px-3">Office
                                            </div>
                                        </div>
                                        <div className="p-4 pb-0">
                                            <h5 className="text-primary mb-3">$12,345</h5>
                                            <a className="d-block h5 mb-2" href="">Golden Urban House For Sell</a>
                                            <p><i className="fa fa-map-marker-alt text-primary me-2"></i>123 Street, New
                                                York, USA</p>
                                        </div>
                                        <div className="d-flex border-top">
                                            <small className="flex-fill text-center border-end py-2"><i
                                                className="fa fa-ruler-combined text-primary me-2"></i>1000 Sqft</small>
                                            <small className="flex-fill text-center border-end py-2"><i
                                                className="fa fa-bed text-primary me-2"></i>3 Bed</small>
                                            <small className="flex-fill text-center py-2"><i
                                                className="fa fa-bath text-primary me-2"></i>2 Bath</small>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
                                    <div className="property-item rounded overflow-hidden">
                                        <div className="position-relative overflow-hidden">
                                            <a href=""><img className="img-fluid" src="img/property/property-4.jpg"
                                                            alt=""/></a>
                                            <div
                                                className="bg-primary rounded text-white position-absolute start-0 top-0 m-4 py-1 px-3">For
                                                Rent
                                            </div>
                                            <div
                                                className="bg-white rounded-top text-primary position-absolute start-0 bottom-0 mx-4 pt-1 px-3">Building
                                            </div>
                                        </div>
                                        <div className="p-4 pb-0">
                                            <h5 className="text-primary mb-3">$12,345</h5>
                                            <a className="d-block h5 mb-2" href="">Golden Urban House For Sell</a>
                                            <p><i className="fa fa-map-marker-alt text-primary me-2"></i>123 Street, New
                                                York, USA</p>
                                        </div>
                                        <div className="d-flex border-top">
                                            <small className="flex-fill text-center border-end py-2"><i
                                                className="fa fa-ruler-combined text-primary me-2"></i>1000 Sqft</small>
                                            <small className="flex-fill text-center border-end py-2"><i
                                                className="fa fa-bed text-primary me-2"></i>3 Bed</small>
                                            <small className="flex-fill text-center py-2"><i
                                                className="fa fa-bath text-primary me-2"></i>2 Bath</small>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.3s">
                                    <div className="property-item rounded overflow-hidden">
                                        <div className="position-relative overflow-hidden">
                                            <a href=""><img className="img-fluid" src="img/property/property-5.jpg"
                                                            alt=""/></a>
                                            <div
                                                className="bg-primary rounded text-white position-absolute start-0 top-0 m-4 py-1 px-3">For
                                                Sell
                                            </div>
                                            <div
                                                className="bg-white rounded-top text-primary position-absolute start-0 bottom-0 mx-4 pt-1 px-3">Home
                                            </div>
                                        </div>
                                        <div className="p-4 pb-0">
                                            <h5 className="text-primary mb-3">$12,345</h5>
                                            <a className="d-block h5 mb-2" href="">Golden Urban House For Sell</a>
                                            <p><i className="fa fa-map-marker-alt text-primary me-2"></i>123 Street, New
                                                York, USA</p>
                                        </div>
                                        <div className="d-flex border-top">
                                            <small className="flex-fill text-center border-end py-2"><i
                                                className="fa fa-ruler-combined text-primary me-2"></i>1000 Sqft</small>
                                            <small className="flex-fill text-center border-end py-2"><i
                                                className="fa fa-bed text-primary me-2"></i>3 Bed</small>
                                            <small className="flex-fill text-center py-2"><i
                                                className="fa fa-bath text-primary me-2"></i>2 Bath</small>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.5s">
                                    <div className="property-item rounded overflow-hidden">
                                        <div className="position-relative overflow-hidden">
                                            <a href=""><img className="img-fluid" src="img/property/property-6.jpg"
                                                            alt=""/></a>
                                            <div
                                                className="bg-primary rounded text-white position-absolute start-0 top-0 m-4 py-1 px-3">For
                                                Rent
                                            </div>
                                            <div
                                                className="bg-white rounded-top text-primary position-absolute start-0 bottom-0 mx-4 pt-1 px-3">Shop
                                            </div>
                                        </div>
                                        <div className="p-4 pb-0">
                                            <h5 className="text-primary mb-3">$12,345</h5>
                                            <a className="d-block h5 mb-2" href="">Golden Urban House For Sell</a>
                                            <p><i className="fa fa-map-marker-alt text-primary me-2"></i>123 Street, New
                                                York, USA</p>
                                        </div>
                                        <div className="d-flex border-top">
                                            <small className="flex-fill text-center border-end py-2"><i
                                                className="fa fa-ruler-combined text-primary me-2"></i>1000 Sqft</small>
                                            <small className="flex-fill text-center border-end py-2"><i
                                                className="fa fa-bed text-primary me-2"></i>3 Bed</small>
                                            <small className="flex-fill text-center py-2"><i
                                                className="fa fa-bath text-primary me-2"></i>2 Bath</small>
                                        </div>
                                    </div>
                                </div>


                                <div className="col-12 text-center wow fadeInUp" data-wow-delay="0.1s">
                                    <a className="btn btn-primary py-3 px-5" href="">Browse More Property</a>
                                </div>
                            </div>
                        </div>
                        <div id="tab-2" className="tab-pane fade show p-0">
                            <div className="row g-4">
                                <div className="col-lg-4 col-md-6">
                                    <div className="property-item rounded overflow-hidden">
                                        <div className="position-relative overflow-hidden">
                                            <a href=""><img className="img-fluid" src="img/property/property-1.jpg"
                                                            alt=""/></a>
                                            <div
                                                className="bg-primary rounded text-white position-absolute start-0 top-0 m-4 py-1 px-3">For
                                                Sell
                                            </div>
                                            <div
                                                className="bg-white rounded-top text-primary position-absolute start-0 bottom-0 mx-4 pt-1 px-3">Appartment
                                            </div>
                                        </div>
                                        <div className="p-4 pb-0">
                                            <h5 className="text-primary mb-3">$12,345</h5>
                                            <a className="d-block h5 mb-2" href="">Golden Urban House For Sell</a>
                                            <p><i className="fa fa-map-marker-alt text-primary me-2"></i>123 Street, New
                                                York, USA</p>
                                        </div>
                                        <div className="d-flex border-top">
                                            <small className="flex-fill text-center border-end py-2"><i
                                                className="fa fa-ruler-combined text-primary me-2"></i>1000 Sqft</small>
                                            <small className="flex-fill text-center border-end py-2"><i
                                                className="fa fa-bed text-primary me-2"></i>3 Bed</small>
                                            <small className="flex-fill text-center py-2"><i
                                                className="fa fa-bath text-primary me-2"></i>2 Bath</small>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-6">
                                    <div className="property-item rounded overflow-hidden">
                                        <div className="position-relative overflow-hidden">
                                            <a href=""><img className="img-fluid" src="img/property/property-2.jpg"
                                                            alt=""/></a>
                                            <div
                                                className="bg-primary rounded text-white position-absolute start-0 top-0 m-4 py-1 px-3">For
                                                Rent
                                            </div>
                                            <div
                                                className="bg-white rounded-top text-primary position-absolute start-0 bottom-0 mx-4 pt-1 px-3">Villa
                                            </div>
                                        </div>
                                        <div className="p-4 pb-0">
                                            <h5 className="text-primary mb-3">$12,345</h5>
                                            <a className="d-block h5 mb-2" href="">Golden Urban House For Sell</a>
                                            <p><i className="fa fa-map-marker-alt text-primary me-2"></i>123 Street, New
                                                York, USA</p>
                                        </div>
                                        <div className="d-flex border-top">
                                            <small className="flex-fill text-center border-end py-2"><i
                                                className="fa fa-ruler-combined text-primary me-2"></i>1000 Sqft</small>
                                            <small className="flex-fill text-center border-end py-2"><i
                                                className="fa fa-bed text-primary me-2"></i>3 Bed</small>
                                            <small className="flex-fill text-center py-2"><i
                                                className="fa fa-bath text-primary me-2"></i>2 Bath</small>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-6">
                                    <div className="property-item rounded overflow-hidden">
                                        <div className="position-relative overflow-hidden">
                                            <a href=""><img className="img-fluid" src="img/property/property-3.jpg"
                                                            alt=""/></a>
                                            <div
                                                className="bg-primary rounded text-white position-absolute start-0 top-0 m-4 py-1 px-3">For
                                                Sell
                                            </div>
                                            <div
                                                className="bg-white rounded-top text-primary position-absolute start-0 bottom-0 mx-4 pt-1 px-3">Office
                                            </div>
                                        </div>
                                        <div className="p-4 pb-0">
                                            <h5 className="text-primary mb-3">$12,345</h5>
                                            <a className="d-block h5 mb-2" href="">Golden Urban House For Sell</a>
                                            <p><i className="fa fa-map-marker-alt text-primary me-2"></i>123 Street, New
                                                York, USA</p>
                                        </div>
                                        <div className="d-flex border-top">
                                            <small className="flex-fill text-center border-end py-2"><i
                                                className="fa fa-ruler-combined text-primary me-2"></i>1000 Sqft</small>
                                            <small className="flex-fill text-center border-end py-2"><i
                                                className="fa fa-bed text-primary me-2"></i>3 Bed</small>
                                            <small className="flex-fill text-center py-2"><i
                                                className="fa fa-bath text-primary me-2"></i>2 Bath</small>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-6">
                                    <div className="property-item rounded overflow-hidden">
                                        <div className="position-relative overflow-hidden">
                                            <a href=""><img className="img-fluid" src="img/property/property-4.jpg"
                                                            alt=""/></a>
                                            <div
                                                className="bg-primary rounded text-white position-absolute start-0 top-0 m-4 py-1 px-3">For
                                                Rent
                                            </div>
                                            <div
                                                className="bg-white rounded-top text-primary position-absolute start-0 bottom-0 mx-4 pt-1 px-3">Building
                                            </div>
                                        </div>
                                        <div className="p-4 pb-0">
                                            <h5 className="text-primary mb-3">$12,345</h5>
                                            <a className="d-block h5 mb-2" href="">Golden Urban House For Sell</a>
                                            <p><i className="fa fa-map-marker-alt text-primary me-2"></i>123 Street, New
                                                York, USA</p>
                                        </div>
                                        <div className="d-flex border-top">
                                            <small className="flex-fill text-center border-end py-2"><i
                                                className="fa fa-ruler-combined text-primary me-2"></i>1000 Sqft</small>
                                            <small className="flex-fill text-center border-end py-2"><i
                                                className="fa fa-bed text-primary me-2"></i>3 Bed</small>
                                            <small className="flex-fill text-center py-2"><i
                                                className="fa fa-bath text-primary me-2"></i>2 Bath</small>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-6">
                                    <div className="property-item rounded overflow-hidden">
                                        <div className="position-relative overflow-hidden">
                                            <a href=""><img className="img-fluid" src="img/property/property-5.jpg"
                                                            alt=""/></a>
                                            <div
                                                className="bg-primary rounded text-white position-absolute start-0 top-0 m-4 py-1 px-3">For
                                                Sell
                                            </div>
                                            <div
                                                className="bg-white rounded-top text-primary position-absolute start-0 bottom-0 mx-4 pt-1 px-3">Home
                                            </div>
                                        </div>
                                        <div className="p-4 pb-0">
                                            <h5 className="text-primary mb-3">$12,345</h5>
                                            <a className="d-block h5 mb-2" href="">Golden Urban House For Sell</a>
                                            <p><i className="fa fa-map-marker-alt text-primary me-2"></i>123 Street, New
                                                York, USA</p>
                                        </div>
                                        <div className="d-flex border-top">
                                            <small className="flex-fill text-center border-end py-2"><i
                                                className="fa fa-ruler-combined text-primary me-2"></i>1000 Sqft</small>
                                            <small className="flex-fill text-center border-end py-2"><i
                                                className="fa fa-bed text-primary me-2"></i>3 Bed</small>
                                            <small className="flex-fill text-center py-2"><i
                                                className="fa fa-bath text-primary me-2"></i>2 Bath</small>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-6">
                                    <div className="property-item rounded overflow-hidden">
                                        <div className="position-relative overflow-hidden">
                                            <a href=""><img className="img-fluid" src="img/property/property-6.jpg"
                                                            alt=""/></a>
                                            <div
                                                className="bg-primary rounded text-white position-absolute start-0 top-0 m-4 py-1 px-3">For
                                                Rent
                                            </div>
                                            <div
                                                className="bg-white rounded-top text-primary position-absolute start-0 bottom-0 mx-4 pt-1 px-3">Shop
                                            </div>
                                        </div>
                                        <div className="p-4 pb-0">
                                            <h5 className="text-primary mb-3">$12,345</h5>
                                            <a className="d-block h5 mb-2" href="">Golden Urban House For Sell</a>
                                            <p><i className="fa fa-map-marker-alt text-primary me-2"></i>123 Street, New
                                                York, USA</p>
                                        </div>
                                        <div className="d-flex border-top">
                                            <small className="flex-fill text-center border-end py-2"><i
                                                className="fa fa-ruler-combined text-primary me-2"></i>1000 Sqft</small>
                                            <small className="flex-fill text-center border-end py-2"><i
                                                className="fa fa-bed text-primary me-2"></i>3 Bed</small>
                                            <small className="flex-fill text-center py-2"><i
                                                className="fa fa-bath text-primary me-2"></i>2 Bath</small>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 text-center">
                                    <a className="btn btn-primary py-3 px-5" href="">Browse More Property</a>
                                </div>
                            </div>
                        </div>
                        <div id="tab-3" className="tab-pane fade show p-0">
                            <div className="row g-4">
                                <div className="col-lg-4 col-md-6">
                                    <div className="property-item rounded overflow-hidden">
                                        <div className="position-relative overflow-hidden">
                                            <a href=""><img className="img-fluid" src="img/property/property-1.jpg"
                                                            alt=""/></a>
                                            <div
                                                className="bg-primary rounded text-white position-absolute start-0 top-0 m-4 py-1 px-3">For
                                                Sell
                                            </div>
                                            <div
                                                className="bg-white rounded-top text-primary position-absolute start-0 bottom-0 mx-4 pt-1 px-3">Appartment
                                            </div>
                                        </div>
                                        <div className="p-4 pb-0">
                                            <h5 className="text-primary mb-3">$12,345</h5>
                                            <a className="d-block h5 mb-2" href="">Golden Urban House For Sell</a>
                                            <p><i className="fa fa-map-marker-alt text-primary me-2"></i>123 Street, New
                                                York, USA</p>
                                        </div>
                                        <div className="d-flex border-top">
                                            <small className="flex-fill text-center border-end py-2"><i
                                                className="fa fa-ruler-combined text-primary me-2"></i>1000 Sqft</small>
                                            <small className="flex-fill text-center border-end py-2"><i
                                                className="fa fa-bed text-primary me-2"></i>3 Bed</small>
                                            <small className="flex-fill text-center py-2"><i
                                                className="fa fa-bath text-primary me-2"></i>2 Bath</small>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-6">
                                    <div className="property-item rounded overflow-hidden">
                                        <div className="position-relative overflow-hidden">
                                            <a href=""><img className="img-fluid" src="img/property/property-2.jpg"
                                                            alt=""/></a>
                                            <div
                                                className="bg-primary rounded text-white position-absolute start-0 top-0 m-4 py-1 px-3">For
                                                Rent
                                            </div>
                                            <div
                                                className="bg-white rounded-top text-primary position-absolute start-0 bottom-0 mx-4 pt-1 px-3">Villa
                                            </div>
                                        </div>
                                        <div className="p-4 pb-0">
                                            <h5 className="text-primary mb-3">$12,345</h5>
                                            <a className="d-block h5 mb-2" href="">Golden Urban House For Sell</a>
                                            <p><i className="fa fa-map-marker-alt text-primary me-2"></i>123 Street, New
                                                York, USA</p>
                                        </div>
                                        <div className="d-flex border-top">
                                            <small className="flex-fill text-center border-end py-2"><i
                                                className="fa fa-ruler-combined text-primary me-2"></i>1000 Sqft</small>
                                            <small className="flex-fill text-center border-end py-2"><i
                                                className="fa fa-bed text-primary me-2"></i>3 Bed</small>
                                            <small className="flex-fill text-center py-2"><i
                                                className="fa fa-bath text-primary me-2"></i>2 Bath</small>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-6">
                                    <div className="property-item rounded overflow-hidden">
                                        <div className="position-relative overflow-hidden">
                                            <a href=""><img className="img-fluid" src="img/property/property-3.jpg"
                                                            alt=""/></a>
                                            <div
                                                className="bg-primary rounded text-white position-absolute start-0 top-0 m-4 py-1 px-3">For
                                                Sell
                                            </div>
                                            <div
                                                className="bg-white rounded-top text-primary position-absolute start-0 bottom-0 mx-4 pt-1 px-3">Office
                                            </div>
                                        </div>
                                        <div className="p-4 pb-0">
                                            <h5 className="text-primary mb-3">$12,345</h5>
                                            <a className="d-block h5 mb-2" href="">Golden Urban House For Sell</a>
                                            <p><i className="fa fa-map-marker-alt text-primary me-2"></i>123 Street, New
                                                York, USA</p>
                                        </div>
                                        <div className="d-flex border-top">
                                            <small className="flex-fill text-center border-end py-2"><i
                                                className="fa fa-ruler-combined text-primary me-2"></i>1000 Sqft</small>
                                            <small className="flex-fill text-center border-end py-2"><i
                                                className="fa fa-bed text-primary me-2"></i>3 Bed</small>
                                            <small className="flex-fill text-center py-2"><i
                                                className="fa fa-bath text-primary me-2"></i>2 Bath</small>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-6">
                                    <div className="property-item rounded overflow-hidden">
                                        <div className="position-relative overflow-hidden">
                                            <a href=""><img className="img-fluid" src="img/property/property-4.jpg"
                                                            alt=""/></a>
                                            <div
                                                className="bg-primary rounded text-white position-absolute start-0 top-0 m-4 py-1 px-3">For
                                                Rent
                                            </div>
                                            <div
                                                className="bg-white rounded-top text-primary position-absolute start-0 bottom-0 mx-4 pt-1 px-3">Building
                                            </div>
                                        </div>
                                        <div className="p-4 pb-0">
                                            <h5 className="text-primary mb-3">$12,345</h5>
                                            <a className="d-block h5 mb-2" href="">Golden Urban House For Sell</a>
                                            <p><i className="fa fa-map-marker-alt text-primary me-2"></i>123 Street, New
                                                York, USA</p>
                                        </div>
                                        <div className="d-flex border-top">
                                            <small className="flex-fill text-center border-end py-2"><i
                                                className="fa fa-ruler-combined text-primary me-2"></i>1000 Sqft</small>
                                            <small className="flex-fill text-center border-end py-2"><i
                                                className="fa fa-bed text-primary me-2"></i>3 Bed</small>
                                            <small className="flex-fill text-center py-2"><i
                                                className="fa fa-bath text-primary me-2"></i>2 Bath</small>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-6">
                                    <div className="property-item rounded overflow-hidden">
                                        <div className="position-relative overflow-hidden">
                                            <a href=""><img className="img-fluid" src="img/property/property-5.jpg"
                                                            alt=""/></a>
                                            <div
                                                className="bg-primary rounded text-white position-absolute start-0 top-0 m-4 py-1 px-3">For
                                                Sell
                                            </div>
                                            <div
                                                className="bg-white rounded-top text-primary position-absolute start-0 bottom-0 mx-4 pt-1 px-3">Home
                                            </div>
                                        </div>
                                        <div className="p-4 pb-0">
                                            <h5 className="text-primary mb-3">$12,345</h5>
                                            <a className="d-block h5 mb-2" href="">Golden Urban House For Sell</a>
                                            <p><i className="fa fa-map-marker-alt text-primary me-2"></i>123 Street, New
                                                York, USA</p>
                                        </div>
                                        <div className="d-flex border-top">
                                            <small className="flex-fill text-center border-end py-2"><i
                                                className="fa fa-ruler-combined text-primary me-2"></i>1000 Sqft</small>
                                            <small className="flex-fill text-center border-end py-2"><i
                                                className="fa fa-bed text-primary me-2"></i>3 Bed</small>
                                            <small className="flex-fill text-center py-2"><i
                                                className="fa fa-bath text-primary me-2"></i>2 Bath</small>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-6">
                                    <div className="property-item rounded overflow-hidden">
                                        <div className="position-relative overflow-hidden">
                                            <a href=""><img className="img-fluid" src="img/property/property-6.jpg"
                                                            alt=""/></a>
                                            <div
                                                className="bg-primary rounded text-white position-absolute start-0 top-0 m-4 py-1 px-3">For
                                                Rent
                                            </div>
                                            <div
                                                className="bg-white rounded-top text-primary position-absolute start-0 bottom-0 mx-4 pt-1 px-3">Shop
                                            </div>
                                        </div>
                                        <div className="p-4 pb-0">
                                            <h5 className="text-primary mb-3">$12,345</h5>
                                            <a className="d-block h5 mb-2" href="">Golden Urban House For Sell</a>
                                            <p><i className="fa fa-map-marker-alt text-primary me-2"></i>123 Street, New
                                                York, USA</p>
                                        </div>
                                        <div className="d-flex border-top">
                                            <small className="flex-fill text-center border-end py-2"><i
                                                className="fa fa-ruler-combined text-primary me-2"></i>1000 Sqft</small>
                                            <small className="flex-fill text-center border-end py-2"><i
                                                className="fa fa-bed text-primary me-2"></i>3 Bed</small>
                                            <small className="flex-fill text-center py-2"><i
                                                className="fa fa-bath text-primary me-2"></i>2 Bath</small>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 text-center">
                                    <a className="btn btn-primary py-3 px-5" href="">Browse More Property</a>
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

export default PropertyComponent;