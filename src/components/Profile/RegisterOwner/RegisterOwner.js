
import EditProfile from "../EditProfile/EditProfile";
import {useEffect, useState} from "react";
import AccountService from "../../../service/AccountService";
import {useSelector} from "react-redux";

const RegisterOwner = () => {
    const account = useSelector(state => state.account);
    const [owner, setOwner] = useState({});
    useEffect(() => {
        getOwner();
    }, []);
    const getOwner = () => {
        AccountService.getOwner(account.id).then((response) => {
            console.log(response);
            setOwner(response);
        }).catch(function (err) {
            console.log(err);
        })
    }

    const checkOwner = () => {
        if (owner.status === "Chờ xác nhận" ){
            return <div className={"col-9 text-center"}>
                <h3 className="text-uppercase mb-4">Đơn đăng ký làm chủ nhà</h3>
                <div style={{color : 'blue'}}>Đơn đăng ký đang chờ xác nhận</div>
            </div>
        }else if (owner.status === "Đã xác nhận"){
            return <div className={"col-9 "}>
                <h3>Bạn đã trở thành chủ nhà</h3>
            </div>
        } else {
           return <EditProfile status={false}/>
        }
    }

    return (
            checkOwner()
    );
};

export default RegisterOwner;