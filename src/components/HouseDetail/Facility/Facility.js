import React, {useContext} from 'react';
import {HouseDetailContext} from "../HouseDetail";

const Facility = () => {
    const {house} = useContext(HouseDetailContext);
    return (
        <div className="" style={{textAlign: 'justify'}}>
                <h4 className="mb-3">Tiện ích:</h4>
                <div dangerouslySetInnerHTML={{__html: house.facility}}></div>
        </div>
    );
};

export default Facility;