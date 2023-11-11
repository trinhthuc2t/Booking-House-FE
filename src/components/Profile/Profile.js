import React, {useEffect} from 'react';
import {Outlet, useNavigate} from "react-router-dom";
import _ from 'lodash';
import LeftSidebar from "./LeftSideBar/LeftSidebar";
import {useSelector} from "react-redux";
import './profile.scss';

const Profile = () => {
    const account = useSelector(state => state.account);
    const navigate = useNavigate();
    useEffect(()=>{
        if (_.isEmpty(account)){
            navigate("/403");
        }
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }, [account])

    return (
        <div className="container-fluid">
            <div className=" rounded bg-white mb-5">
                {!_.isEmpty(account) &&
                    <div className="row">
                        <LeftSidebar/>
                        <Outlet/>
                    </div>
                }
            </div>
        </div>
    );
};

export default Profile;