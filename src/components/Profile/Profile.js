import React from 'react';
import {Outlet} from "react-router-dom";
import _ from 'lodash';
import LeftSidebar from "./Left-sidebar";
import {useSelector} from "react-redux";
import './profile.scss';

const Profile = () => {

    const account = useSelector(state => state.account);
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    })

    return (
        <div className="container-fluid">
            <div className=" rounded bg-white mb-5">
                {!_.isEmpty(account) &&
                    <div className="row">
                        <LeftSidebar id={account.id}/>
                        <Outlet/>
                    </div>
                }
            </div>
        </div>
    );
};

export default Profile;