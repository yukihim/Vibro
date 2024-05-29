import React, {useContext, useEffect, useRef, useState} from "react";
import '../assets/scss/FooterPlayer.scss';
import RepeatIcon from '@material-ui/icons/Repeat';
import RepeatOneIcon from '@material-ui/icons/RepeatOne';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import VolumeOffIcon from '@material-ui/icons/VolumeOff';
import Slider from "@material-ui/core/Slider";
import {Avatar} from "@material-ui/core";
import ControlsToggleButton from "./ControlsToggleButton";
import Name from "./Name";
import {ThemeContext} from "../../api/Theme";
import {useDispatch, useSelector} from "react-redux";
import {setBannerOpen, setCurrentPlaying, increaseTimesPlayed} from "../../actions/actions";
import Button from "@material-ui/core/Button";

// Import the mobile styles
import '../assets/scss/FooterPlayer.mobile.scss';

function FooterMusicPlayer({music}) {
    const [{id, name, author_name, img, musicName}, setCurrTrack] = useState(music);
    const [isRepeatClicked, setRepeatClick] = useState(false);
    const [isPrevClicked, setPrevClicked] = useState(false);
    const [isNextClicked, setNextClicked] = useState(false);
    const [isPlaying, setPlayPauseClicked] = useState(false);
    const [isVolumeClicked, setVolumeClicked] = useState(false);
    const [volume, setVolume] = useState(10);
    const [seekTime, setSeekTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [currTime, setCurrTime] = useState(0);
    const [bannerToggle,setBannerToggle] = useState(false);

    const audioElement = useRef();
    const dispatch = useDispatch();
    const {playlists} = useSelector(state => state.musicReducer);
    const useStyle = useContext(ThemeContext);
    const pointer = { cursor: "pointer",  color: useStyle.theme };

    // In the FooterMusicPlayer component
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    //
    const [hasBeenPlayed, setHasBeenPlayed] = useState(false);

    const handleSongEnded = () => {
        // Dispatch increaseTimesPlayed action for the next song
        let nextSongId = (id + 1) % playlists.length;
        dispatch(increaseTimesPlayed(nextSongId));
    };

    useEffect(() => {
        // Add event listener for 'ended' event
        audioElement.current.addEventListener('ended', handleSongEnded);

        // Clean up function
        return () => {
            // Remove event listener
            audioElement.current.removeEventListener('ended', handleSongEnded);
        };
    }, []);

    const handleToggle = (type, val) => {
        switch (type) {
            case "repeat":
                //setRepeatClick(val);
                if (audioElement.current.loop) {
                    audioElement.current.loop = false;
                    setRepeatClick(false);
                } else {
                    audioElement.current.loop = true;
                    setRepeatClick(true);
                }
                break;
                case "prev":
                    setPrevClicked(val);
                    if (isPlaying) {
                        let prevSongId = (id - 1) % playlists.length;
                        if ((id - 1) < 0)
                            prevSongId = playlists.length - 1;
                        dispatch(increaseTimesPlayed(prevSongId));
                    }
                    break;
                case "play-pause":
                    if (audioElement.current.paused) {
                        audioElement.current.play();
                        setPlayPauseClicked(true);
                        if (!hasBeenPlayed) {
                            dispatch(increaseTimesPlayed(id)); // Increase times played for the current song
                            setHasBeenPlayed(true); // Set hasBeenPlayed to true
                        }
                    } else {
                        audioElement.current.pause();
                        setPlayPauseClicked(false);
                    }
                    break;
                case "next":
                    setNextClicked(val);
                    if (isPlaying) {
                        let nextSongId = (id + 1) % playlists.length;
                        dispatch(increaseTimesPlayed(nextSongId));
                    }
                    break;
            case "volume":
                setVolumeClicked(!isVolumeClicked);
                break;
            default:
                break;
        }
    };
    const handleSeekChange = (event, newValue) => {
        audioElement.current.currentTime =(newValue*duration)/100;
        setSeekTime(newValue)
    };
    const handleVolumeChange = (event, newValue) => {
        setVolume(newValue);
    };
    const handleBannerToggle = ()=> {
        setBannerToggle(!bannerToggle);
    };


    useEffect(()=>{
        dispatch(setBannerOpen(bannerToggle));
    },[dispatch,bannerToggle]);


    useEffect(() => {
        isPlaying
            ? audioElement.current.play().then(()=>{}).catch((e)=>{audioElement.current.pause(); audioElement.current.currentTime=0;})
            : audioElement.current.pause();
        audioElement.current.loop = isRepeatClicked;
        audioElement.current.volume = volume / 100;
        audioElement.current.muted = isVolumeClicked;
        audioElement.current.onloadeddata = () => {
            if (audioElement.current != null)
                setDuration(audioElement.current.duration)
        };
        setInterval(() => {
            if (audioElement.current !== null)
                setCurrTime(audioElement.current.currentTime);
        })
    });

    useEffect(() => {
        setCurrTrack(music);
        // Check if the player is not paused
        if (isPlaying) {
            // Dispatch increaseTimesPlayed action when a song is manually selected and the player is not paused
            dispatch(increaseTimesPlayed(music.id));
        }
    }, [music, isPlaying]);

    useEffect(() => {
        setSeekTime((currTime) / (duration / 100))
    }, [currTime, duration]);

    useEffect(()=>{
        audioElement.current.onended = ()=> {
            setNextClicked(true);
        };
    })

    useEffect(()=>{
        if (isNextClicked) {
            if (isRepeatClicked) {
                // If repeat is on, don't change the current song but reset its progress
                audioElement.current.currentTime = 0;
                dispatch(setCurrentPlaying(playlists[id]));
            } else {
                let currTrackId = (id+1) % playlists.length;
                dispatch(setCurrentPlaying(playlists[currTrackId]));
            }
            setNextClicked(false);
        }
        if (isPrevClicked) {
            if (isRepeatClicked) {
                // If repeat is on, don't change the current song but reset its progress
                audioElement.current.currentTime = 0;
                dispatch(setCurrentPlaying(playlists[id]));
            } else {
                let currTrackId = (id-1) % playlists.length;
                if ((id-1)<0)
                    currTrackId = playlists.length - 1;
                
                dispatch(setCurrentPlaying(playlists[currTrackId]));
                dispatch(increaseTimesPlayed(currTrackId)); // Increase times played for the previous song
            }
            setPrevClicked(false);
        }
    },[dispatch, id, isNextClicked, isPrevClicked, playlists, isRepeatClicked, audioElement]);

    function formatTime(secs) {
        const t = new Date(1970, 0, 1);
        t.setSeconds(secs);
        let s = t.toTimeString().substr(0, 8);
        if (secs > 86399)
            s = Math.floor((t - Date.parse("1/1/70")) / 3600000) + s.substr(2);
        return s.substring(3);
    }

    // Resize for mobile
    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(()=>{
        if (isNextClicked) {
            if (isRepeatClicked) {
                // If repeat is on, don't change the current song but reset its progress
                audioElement.current.currentTime = 0;
                dispatch(setCurrentPlaying(playlists[id]));
            } else {
                let currTrackId = (id+1) % playlists.length;
                dispatch(setCurrentPlaying(playlists[currTrackId]));
            }
            setNextClicked(false);
        }
        if (isPrevClicked) {
            if (isRepeatClicked) {
                // If repeat is on, don't change the current song but reset its progress
                audioElement.current.currentTime = 0;
                dispatch(setCurrentPlaying(playlists[id]));
            } else {
                let currTrackId = (id-1) % playlists.length;
                if ((id-1)<0)
                    currTrackId = playlists.length - 1;
                
                dispatch(setCurrentPlaying(playlists[currTrackId]));
            }
            setPrevClicked(false);
        }
    },[dispatch, id, isNextClicked, isPrevClicked, playlists, isRepeatClicked, audioElement]);

    return (
        <div style={useStyle.component} className={`footer-player ${isMobile ? 'mobile' : ''}`}>
            <div className="playback">
                {
                    !isNaN(seekTime) &&
                    <Slider style={{color: useStyle.theme}}
                            className={"playback-completed"}
                            value={seekTime} onChange={handleSeekChange}/>
                }
            </div>
            
            <Button startIcon={<Avatar variant="square" src={require("../assets/img/" + img)} alt={name}/>} onClick={handleBannerToggle} className={`curr-music-container ${isMobile ? 'mobile' : ''}`}>
                <div className={`curr-music-details ${isMobile ? 'mobile' : ''}`}>
                    <Name name={name} className={`song-name ${isMobile ? 'mobile' : ''}`} length={name.length}/>
                    <Name name={author_name.join(', ')} className={`author-name ${isMobile ? 'mobile' : ''}`} length={author_name.join(', ').length}/>
                </div>
            </Button>
            <div className="playback-controls">

                <ControlsToggleButton style={pointer} type={"repeat"} isRepeatClicked={isRepeatClicked}
                                    defaultIcon={<RepeatIcon fontSize={"large"}/>}
                                    changeIcon={<RepeatOneIcon fontSize={"large"}/>}
                                    onClicked={handleToggle}/>

                <ControlsToggleButton style={pointer} type={"prev"}
                                    defaultIcon={<SkipPreviousIcon fontSize={"large"}/>}
                                    changeIcon={<SkipPreviousIcon fontSize={"large"}/>}
                                    onClicked={handleToggle}/>

                <audio ref={audioElement} src={require("../assets/music/" + musicName)} preload={"metadata"}/>

                <ControlsToggleButton style={pointer} type={"play-pause"} isPlaying={isPlaying}
                                    defaultIcon={<PlayArrowIcon fontSize={"large"}/>}
                                    changeIcon={<PauseIcon fontSize={"large"}/>}
                                    onClicked={handleToggle}/>


                <ControlsToggleButton style={pointer} type={"next"}
                                    defaultIcon={<SkipNextIcon fontSize={"large"}/>}
                                    changeIcon={<SkipNextIcon fontSize={"large"}/>}
                                    onClicked={handleToggle}/>
            </div>
            <div className="playback-widgets">
                <div className="timer">
                    <p>
                        <span>{formatTime(currTime)}</span>
                        /
                        <span>{formatTime(duration)}</span>
                    </p>
                </div>
                <div className={"slider"}>
                    <Slider style={{color: useStyle.theme}} value={volume} onChange={handleVolumeChange}/>
                </div>
                <ControlsToggleButton style={pointer} type={"volume"}
                                    defaultIcon={isVolumeClicked ? <VolumeOffIcon/> : <VolumeUpIcon/>}
                                    changeIcon={isVolumeClicked ? <VolumeUpIcon/> : <VolumeOffIcon/>}
                                    onClicked={handleToggle}/>
            </div>
        </div>

    );
}

export default FooterMusicPlayer;