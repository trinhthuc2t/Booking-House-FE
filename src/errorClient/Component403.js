import React, {useEffect} from 'react';
import './403.scss'

const Component403 = () => {
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }, [])
    return (
        <div className={'body-403'}>
            <div className="forbidden">
                <div className="text">
                    {/*   FORBIDEN*/}
                </div>
            </div>
            <div className="text-403">4003</div>

            <div className="door"></div>
            <div id="hodor">
                <div className="l-arm">
                    <div className="hand"></div>
                    <div className="arm"></div>
                </div>
                <div className="r-arm">
                    <div className="hand"></div>
                    <div className="arm"></div>
                </div>
                <div className="body">
                    <div className="backpack-strap-r"></div>
                    <div className="backpack-strap-l"></div>
                </div>
                <div className="belt"></div>
                <div className="head">
                    <div className="hair"></div>
                    <div className="face"></div>
                    <div className="r-eye"></div>
                    <div className="l-eye"></div>
                    <div className="r-brow"></div>
                    <div className="l-brow"></div>
                    <div className="beard"></div>
                    <div className="bubble">Bạn không có quyền truy cập!</div>
                </div>
                <div className="l-leg">
                    <div className="foot"></div>
                </div>
                <div className="r-leg">
                    <div className="foot"></div>
                </div>
            </div>
        </div>
    );
};

export default Component403;