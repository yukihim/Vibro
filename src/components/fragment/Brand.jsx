import React from "react";
import {Link} from "react-router-dom";
import "../assets/scss/Brand.scss";
import Logo from "../assets/img/Login/headphones.svg"

class Brand extends React.Component {
    render() {
        return (
            <div  className={"brand"}>
                <Link to={"/home"}>
                    <h1>
                        Vibr<img src={Logo} width={"24px"} alt=""/>
                    </h1>
                </Link>
            </div>
        );
    }
}

export default Brand;