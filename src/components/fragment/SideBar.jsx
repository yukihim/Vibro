/*
import React, {useContext} from "react";
import "../assets/scss/SideBar.scss";
import SideBarOptions from "./SideBarOptions";
import {ThemeContext} from "../../api/Theme";
import {HomeOutlined, PlaylistPlay, SearchOutlined, AddCircle} from "@material-ui/icons";

function SideBar() {
    const useStyle = useContext(ThemeContext);
    return (
        <aside style={useStyle.component} className={"aside-bar"}>
            <div className="aside-bar-container">
                <SideBarOptions className={"lib-sub"} Icon={HomeOutlined} href={"/home"} title={"Home"} />
                <SideBarOptions className={"lib-sub"} Icon={SearchOutlined} href={"/home/search"}  title={"Search"}/>
                <SideBarOptions className={"lib-sub"} Icon={AddCircle} href={"/home/add"}  title={"Add Music"}/>
            </div>
            <div className="aside-bar-container playlist">
                <p className={"p1"}>
                    <span>MY PLAYLIST</span>
                </p>
                <SideBarOptions className={"lib-sub"} Icon={PlaylistPlay} href={"/home/playlist/all"}  title={"All"}/>
                <SideBarOptions className={"lib-sub"} Icon={PlaylistPlay} href={"/home/playlist/instrumental"}  title={"Instrumental"}/>
                <SideBarOptions className={"lib-sub"} Icon={PlaylistPlay} href={"/home/playlist/electronic"}  title={"Electronic"}/>
            </div>
        </aside>
    );
}

export default SideBar;
*/

import React, {useContext, useEffect, useState} from "react";
import "../assets/scss/SideBar.scss";
import SideBarOptions from "./SideBarOptions";
import {ThemeContext} from "../../api/Theme";
import {HomeOutlined, PlaylistPlay, SearchOutlined, AddCircle} from "@material-ui/icons";
import {useSelector} from "react-redux";

function SideBar() {
    const useStyle = useContext(ThemeContext);
    
    const {playlists} = useSelector(state => state.musicReducer);
    const [playlistTypes, setPlaylistTypes] = useState([]);

    useEffect(() => {
        const types = [...new Set(playlists.map(item => item.type.toLowerCase()))];
        setPlaylistTypes(types);
    }, [playlists]);

    return (
        <aside style={useStyle.component} className={"aside-bar"}>
            <div className="aside-bar-container">
                <SideBarOptions className={"lib-sub"} Icon={HomeOutlined} href={"/home"} title={"Home"} />
                <SideBarOptions className={"lib-sub"} Icon={SearchOutlined} href={"/home/search"}  title={"Search"}/>
                <SideBarOptions className={"lib-sub"} Icon={AddCircle} href={"/home/add"}  title={"Add Music"}/>
            </div>
            <div className="aside-bar-container playlist">
                <p className={"p1"}>
                    <span>MY PLAYLIST</span>
                </p>
                <SideBarOptions className={"lib-sub"} Icon={PlaylistPlay} href={"/home/playlist/all"}  title={"All"}/>
                {playlistTypes.map((type, index) => (
                    <SideBarOptions key={index} className={"lib-sub"} Icon={PlaylistPlay} href={`/home/playlist/${type.toLowerCase()}`}  title={type}/>
                ))}
            </div>
        </aside>
    );
}

export default SideBar;
