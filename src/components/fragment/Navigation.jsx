import React, {useContext, useState} from "react";
import '../assets/scss/Navigation.scss';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import SearchBar from "./SearchBar";
import Brand from "./Brand";
import DropDownProfile from "./DropDownProfile";
import {Avatar, Button} from "@material-ui/core";
import {ThemeContext} from "../../api/Theme";

function Navigation() {
    const [isOpenProfile, setOpenProfile] = useState(false);

    function handleOpenProfile() {
        setOpenProfile(!isOpenProfile);
    }

    const useStyle = useContext(ThemeContext);
    return (
        <nav style={useStyle.component}>
            <Brand/>
            <SearchBar/>
            <div className="profile" onClick={handleOpenProfile}>
                <Button className={"Dropdown-btn"}
                        startIcon={<Avatar style={{width:'30px',height:'30px',padding:'18px'}} >Q</Avatar>}
                        endIcon={isOpenProfile ? <ExpandMoreIcon/> : <ExpandLessIcon/>}>
                </Button>
                {
                    isOpenProfile &&
                    <DropDownProfile/>
                }
            </div>
        </nav>
    );
}

export default Navigation;
