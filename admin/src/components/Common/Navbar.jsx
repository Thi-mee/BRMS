import React from "react";
import {NavLink} from "react-router-dom";
import style from "../../styles/Navbar.module.css";
import { Button } from "../../components/Common/Button/Button";
import ButtonOutline from "./Button/ButtonOutline";
import { useNavigate } from "react-router-dom";
// import { usePageUtils } from "../utils/PageUtils";
// import { useFormUtils } from "../utils/FormUtils.js";
// import ChangeText from "../App/HOC/ChangeText.jsx";

const Navbar = ({setShowThis}) => {
    const navigate = useNavigate();

    const goToLogin = () => {
        navigate("/auth")
        setShowThis(true);
    }

    const goToReg = () => {
        navigate("/auth");
        setShowThis(false);
    }

    return(
        <>
            <div className={style.container}>
                    <img src="/assets/TCN_logo.png" alt="Church Logo" className={style.church_logo}/>
                    <div className={style.link_flex}>
                        <NavLink to="/">About</NavLink>
                        <NavLink to="/">FAQ</NavLink>
                        <NavLink to="/">Contact Us</NavLink>
                    </div>
                    <div className={style.navbar_btn_flex}>
                        <ButtonOutline onClick={goToReg}>Register</ButtonOutline>
                        <Button onClick={goToLogin}>Login</Button>
                    </div>
            </div>
        </>
    )
}

export default Navbar