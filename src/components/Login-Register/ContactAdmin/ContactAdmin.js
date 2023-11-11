import React from 'react';
import './contactAdmin.scss';
import AdminTeam from "../../HomePage/AdminTeam/AdminTeam";
const ContactAdmin = () => {
    return (
        <div className={'container-contact-admin mt-3'}>
            <div className={"d-flex justify-content-center"}>
                <h4>Tài khoản của bạn hiện đang bị khóa, vui lòng liên hệ với Admin để biết thêm thông tin .</h4>
            </div>
            <AdminTeam/>
        </div>
    );
};

export default ContactAdmin;