import React from 'react';
import './404.scss'
import {Link} from "react-router-dom";
const Component404 = () => {
    return (
        <div className={'container-contact'}>
            <title>Page Not Found</title>
            <img src="https://i.ibb.co/W6tgcKQ/softcodeon.gif"  alt={'img'}/>
                <h1 className="error-text">Không tim thấy trang</h1>

                <div className="btn1">
                    <Link className="error" to={'/'}>Go to Homepage</Link>
                </div>
        </div>
    );
};

export default Component404;