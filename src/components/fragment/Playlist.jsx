import React, { useState } from 'react';
import '../assets/scss/Playlist.scss';
import {useSelector} from "react-redux";
import MusicCard from "./MusicCard";
import Container from "./Container";

const Playlist = () => {
    const typeOfPlaylist = window.location.pathname.substring(15);
    const {playlists} = useSelector(state=>state.musicReducer);

    const [activeMetadataId, setActiveMetadataId] = useState(null);

    const toggleMetadata = (id) => {
        setActiveMetadataId(prevId => prevId === id ? null : id);
    };

    const playlistCount = playlists.filter(item => item.type.toLowerCase() === typeOfPlaylist).length;

    return (
        <Container>
            <div className={"Playlist"}>
                <h3>Your {typeOfPlaylist} playlist: {playlistCount} tracks</h3>
                <div className="Playlist-container">
                    {
                        playlists.map((item)=>(
                            item.type.toLowerCase() === typeOfPlaylist &&
                            <MusicCard key={item.id} music={item} showMetadata={activeMetadataId === item.id} toggleMetadata={toggleMetadata}/>
                        ))
                    }
                </div>
            </div>
        </Container>
    );
}

export default Playlist;
