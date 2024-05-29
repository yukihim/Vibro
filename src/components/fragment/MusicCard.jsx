import React, {useEffect, useState} from 'react';
import '../assets/scss/MusicCard.scss';
import PlayCircleFilledWhiteIcon from "@material-ui/icons/PlayCircleFilledWhite";
import {useDispatch} from "react-redux";
//import {useDispatch, useSelector} from "react-redux";
import {increaseTimesPlayed, setCurrentPlaying, setPlayingStatus} from "../../actions/actions";
import Name from "./Name";
import {Skeleton} from "@material-ui/lab";
import Box from "@material-ui/core/Box";
import musicDB from "../../db/music";

function MusicCard({ music, showMetadata, toggleMetadata }) {
    const {name, img, author_name, id} = music;

    const [isHovered, setHovered] = useState(false);

    //const [showMetadata, setShowMetadata] = useState(false);

    function handleResponse() {
        setHovered(!isHovered);
    }

    const dispatch = useDispatch();

    //const isPlaying = useSelector(state => state.isPlaying);

    function handlePlay() {
        try {
            dispatch(setCurrentPlaying(music));
            dispatch(increaseTimesPlayed(music.id));

            // Check if the current music is already playing
            dispatch(setPlayingStatus(true));
        } catch (error) {
            console.error("Error playing music: ", error);
        }
    }

    const [loaded,setLoaded] = useState(false);

    useEffect(()=>{
        setLoaded(true)
    },[]);

    const musicItem = musicDB.find(music => music.id === id);

    return (
        <div className={"music-card"}>
            {
                !loaded ?
                <div className={"Skeleton-top"}>
                    <Skeleton variant="rect" width={210} height={210} />
                    <Box pt={0.5}>
                        <Skeleton />
                        <Skeleton width="60%" />
                    </Box>
                </div>
                    :
                    <>
                        <div onClick={handlePlay}  className={"music-card-cover"} onMouseOver={handleResponse}>
                            <img src={require("../assets/img/" + img || "../assets/img/Music/" + img)} alt={name}/>
                            <div className="play-circle">
                                <PlayCircleFilledWhiteIcon/>
                            </div>
                        </div>
                        <React.Fragment>
                            <Name name={name} className={"song-name"} length={name.length}/>

                            {/*<Name name={author_name} className={"author-name"} length={author_name.length}/>*/}
                            {author_name.map((author, index) => (
                                <React.Fragment key={index}>
                                    <Name name={author} className={"author-name"} length={author.length}/>
                                    {index < author_name.length - 1 && <span className="author-name">, </span>}
                                </React.Fragment>
                            ))}

                            {/*Print timesplayed*/}
                            <br/>
                            {/*<button 
                                style={{
                                    backgroundColor: '#4CAF50',
                                    border: 'none',
                                    color: 'white !important',
                                    padding: '5px 10px', // Reduced padding
                                    textAlign: 'center',
                                    textDecoration: 'none',
                                    display: 'inline-block',
                                    fontSize: '12px', // Reduced font size
                                    margin: '4px 2px',
                                    cursor: 'pointer',
                                    borderRadius: '8px' // Reduced border radius
                                }}
                                onClick={() => toggleMetadata(id)}
                            >
                                More
                            </button>
                            */}
                            <button 
                                id="more-button"
                                style={{
                                    color: 'white !important',
                                }}
                                onClick={() => toggleMetadata(id)}
                            >
                                More
                            </button>
                            {showMetadata && <div className={"metadata"}>
                                <p>Times Played: {musicItem.timesPlayed}</p>
                                <p>Type: {musicItem.type}</p>
                                <p>Duration: {musicItem.duration}</p>
                                {musicItem.attribution.download ?
                                    <a href={musicItem.attribution.download} target="_blank" rel="noopener noreferrer" style={{wordBreak: 'break-all'}} title={musicItem.attribution.download}>
                                        Download
                                    </a>
                                    :
                                    "Download: Unknown"
                                }
                                <br/>
                                {musicItem.attribution.stream ?
                                    <a href={musicItem.attribution.stream} target="_blank" rel="noopener noreferrer" style={{wordBreak: 'break-all'}} title={musicItem.attribution.stream}>
                                        Stream
                                    </a>
                                    :
                                    "Stream: Unknown"
                                }
                                <br/>
                            </div>}
                        </React.Fragment>
                    </>
            }


        </div>
    );
}

export default MusicCard;
