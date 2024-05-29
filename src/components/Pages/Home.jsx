import React, {useContext, useEffect, useState} from "react";
import './css/Home.scss';
import Navigation from "../fragment/Navigation";
import MobileTopNavigation from "../fragment/MobileTopNavigation";
import SideBar from "../fragment/SideBar";
import FooterMusicPlayer from "../fragment/FooterMusicPlayer";
import BottomNavigationMobile from "../fragment/BottomNavigationMobile";
import MusicCardContainer from "../fragment/MusicCardContainer";
import {useSelector} from "react-redux";
import {ThemeContext} from "../../api/Theme";
import Profile from "./Profile";
import AddMusic from "../fragment/AddMusic";
import FooterSelectMusic from "../fragment/FooterSelectMusic";
import CurrentPlayingLarge from "../fragment/CurrentPlayingLarge";
import Search from "./Search";
import Playlist from "../fragment/Playlist";
import PlaylistAll from "../fragment/PlaylistAll";

//
import Login from "./Login";
import {Skeleton} from "@material-ui/lab";
import {useHistory} from "react-router-dom";


import {BrowserRouter as Router, Route, useLocation} from 'react-router-dom';
import Logout from './Logout'; // Import the Logout component

import PrivateRoute from './PrivateRoute';

// ...

<Router>
    {/* ... other routes ... */}
    <PrivateRoute path="/home" component={Home} />
    <Route path="/login" component={Login} />
    <Route path="/logout" component={Logout} />
</Router>


function getCurrPage(pathName) {
    switch (pathName) {
        case "/home":
            return <MusicCardContainer/>
        case "/home/search":
            return <Search/>
        case "/home/profile":
            return <Profile/>
        case "/home/add":
            return <AddMusic/>
        case "/home/logout":
            return <Logout/>
        default:
            if (pathName.startsWith("/home/playlist/")) {
                if (pathName.startsWith("/home/playlist/all"))
                    return <PlaylistAll/>
                
                return <Playlist/>
            } else
                return null
    }
}

function Home() {
    const [screenSize, setScreenSize] = useState(undefined);
    const [currMusic, setCurrMusic] = useState(null);
    const [Page, setCurrPage] = useState(<MusicCardContainer/>);

    /*
    let pathname = window.location.pathname;
    useEffect(() => {
        setCurrPage(getCurrPage(pathname))
    }, [pathname]);
    */
    //////////////////////////////////////////
    let location = useLocation();
    useEffect(() => {
        setCurrPage(getCurrPage(location.pathname))
    }, [location]);
    //////////////////////////////////////////

    window.addEventListener("resize", handleResize);

    function handleResize() {
        setScreenSize(window.innerWidth);
    }

    useEffect(() => {
        handleResize();
        return () => window.removeEventListener("resize", handleResize);
    });

    const useStyle = useContext(ThemeContext);
    const {playing, bannerOpen} = useSelector(state => state.musicReducer);

    useEffect(() => {
        setCurrMusic(playing)
    }, [playing]);

    const [loaded, setLoaded] = useState(false);
    useEffect(() => {
        setLoaded(true)
    }, []);

    //
    const [showLoginSuccess, setShowLoginSuccess] = useState(false);
    const history = useHistory();

    useEffect(() => {
        if (history.location.state && history.location.state.loginSuccess) {
            setShowLoginSuccess(true);
            setTimeout(() => setShowLoginSuccess(false), 3000); // hide after 3 seconds
        }
    }, [history]);

    return (
        <div style={useStyle.component} className={"home-container"}>
            {
                showLoginSuccess &&
                <div className="login-success" onClick={() => setShowLoginSuccess(false)}>Login Successful!</div>
            }
            {
                !loaded ?
                    <div className="Home-skeleton">
                        <Skeleton animation={"wave"} variant={"rect"} height={"100vh"}/>
                    </div>
                    :
                    <>
                        {
                            screenSize <= 970 ?
                                <MobileTopNavigation/> :
                                <Navigation/>
                        }
                        <section className={"home-music-container"}>
                            <div className="sidebar-home">
                                <SideBar/>
                            </div>
                            <div className="main-home">
                                {
                                    Page
                                }
                            </div>
                        </section>
                        {
                            bannerOpen
                            &&
                            <section className="current-large-banner">
                                <CurrentPlayingLarge/>
                            </section>
                        }

                        <React.Fragment>
                            {
                                currMusic
                                    ?
                                    <FooterMusicPlayer music={currMusic}/>
                                    :
                                    <FooterSelectMusic/>
                            }
                            {
                                screenSize <= 970 && <BottomNavigationMobile/>
                            }
                        </React.Fragment>
                    </>
            }
        </div>
    );
}

export default Home;
