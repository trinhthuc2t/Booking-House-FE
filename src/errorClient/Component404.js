import React from 'react';
import './404.scss'
import {Link} from "react-router-dom";
const Component404 = () => {
    return (
        <div className={'container-contact'}>
            <img src="https://i.ibb.co/W6tgcKQ/softcodeon.gif"  alt={'img'}/>
                <h1 className="error-text">Không tìm thấy trang</h1>

                <div className="text-center">
                    <Link className="error" to={'/'}>Đi đến trang chủ</Link>
                </div>
        </div>
    );
};

export default Component404;