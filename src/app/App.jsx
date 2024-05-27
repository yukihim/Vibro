import React, {useEffect} from "react";
import './App.scss';
import Home from "../components/Pages/Home";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Login from "../components/Pages/Login";
import {ThemeContext, themes} from "../api/Theme";
import musicDB from "../db/music";
// import playlistsDB from "../db/playlists";
import {useDispatch, useSelector} from "react-redux";
import {setPlaylist, setPlaylists} from "../actions/actions";

const App = () => {
    const {language} = useSelector(state => state.musicReducer);

    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(setPlaylist(musicDB))
    },[dispatch]);

    /*
    useEffect(() => {
        dispatch(setPlaylists(playlistsDB));
    }, [dispatch]);
    */

    return (
        <ThemeContext.Provider value={themes.light}>
            <>
                <Router>
                    <Switch>
                        <Route path="/" exact component={Login}/>
                        <Route path="/home" component={Home}/>
                    </Switch>
                </Router>
            </>
        </ThemeContext.Provider>
    );
}

export default App;
