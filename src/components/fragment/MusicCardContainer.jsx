import React, { useState } from "react"
import '../assets/scss/MusicCardContainer.scss';
import MusicCard from "./MusicCard";
import {useSelector} from "react-redux";
import Container from "./Container";

function MusicCardContainer() {
    const {playlists} = useSelector(state => state.musicReducer);
    
    const [activeMetadataId, setActiveMetadataId] = useState(null);

    const toggleMetadata = (id) => {
        setActiveMetadataId(prevId => prevId === id ? null : id);
    };

    return (
        <Container>
            <div className={"music-card-container"}>
                {
                    playlists.map(item => (
                        <MusicCard key={item.id} music={item} showMetadata={activeMetadataId === item.id} toggleMetadata={toggleMetadata}/>
                    ))
                }
            </div>
        </Container>
    );
}

export default MusicCardContainer;
