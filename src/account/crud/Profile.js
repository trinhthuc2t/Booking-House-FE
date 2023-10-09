import React, {useEffect, useState} from 'react';
import {Link, Outlet, useParams} from "react-router-dom";
import accountService from "../AccountService";

import _ from 'lodash';
import LeftSidebar from "./Left-sidebar";
import {useSelector} from "react-redux";


const Profile = () => {

    const account = useSelector(state => state.account);

    return (
        <div className="container-fluid">
            <div className=" rounded bg-white mb-5">
                {!_.isEmpty(account) &&
                    <div className="row">
                        <LeftSidebar id={account.id}></LeftSidebar>

                        <Outlet></Outlet>
                    </div>
                }
            </div>
        </div>
    );
};

export default Profile;