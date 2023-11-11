import React, {useContext} from 'react';
import {HouseDetailContext} from "../HouseDetail";

const Description = () => {
    const {house} = useContext(HouseDetailContext);
    return (
        <div className="row product-description" style={{textAlign: 'justify'}}>
            <div className="col-lg-8 col-md-8 col-12">
                <h4 className="mb-3">Mô tả nhà:</h4>
                <div dangerouslySetInnerHTML={{__html: house.description}}></div>
            </div>
        </div>
    );
};

export default Description;