import React from "react";
import { FaGreaterThan, FaFacebookSquare, FaTwitterSquare  } from "react-icons/fa";
import { Link } from "react-router-dom";
import style from "../../styles/Footer.module.css"

const Footer = () => {
  return (
    <div>
      <div className={style.footer_container}>
        <div className={style.first_flex}>
          <img src="/assets/TCN_logo.png" alt="Church Logo" className={style.church_img} />
          <p className={style.first_flex_para}>
            The BRMS is an integrated solution that maps passengers and routes
            together to facilitate the movement of passengers from designated
            points to a common destination.
          </p>
          <FaFacebookSquare className={style.social_icons}/>
          <FaTwitterSquare className={style.social_icons}/>
        </div>
        <div className={style.second_flex}>
          <h3>Links</h3>
            <Link><FaGreaterThan className={style.greater_than_icon} />About Us</Link>
            <Link><FaGreaterThan className={style.greater_than_icon}/>Faq</Link>
            <Link><FaGreaterThan className={style.greater_than_icon}/>Contact Us</Link>
        </div>
        <div className={style.third_flex}>
          <h3>Policy</h3>
          <Link><FaGreaterThan className={style.greater_than_icon} />Terms and Conditions</Link>
          <Link><FaGreaterThan className={style.greater_than_icon} />Privacy Policy</Link>
        </div>
        <div className={style.fourth_flex}>
          <h3>Contact Us</h3>
          <p>87, Itire Road, Surulere, Lagos, Nigeria</p>
          <p>Phone: +234-810-146-2138</p>
          <p>Email: support@cake001.com</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
