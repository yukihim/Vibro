import React, {useEffect, useState} from 'react';
import './css/Profile.scss';
import {Avatar} from "@material-ui/core";
import {useSelector} from "react-redux";
import MusicCard from "../fragment/MusicCard";
import Container from "../fragment/Container";
import Grade from 'grade-js';
import SideBarOptions from "../fragment/SideBarOptions";
import {PlaylistPlay} from "@material-ui/icons";

function Profile() {
    const {playlists} = useSelector(state => state.musicReducer);
    const [mostPlayed, setMostPlayed] = useState([]);

    const [playlistTypes, setPlaylistTypes] = useState([]);

    const [showMetadataId, setShowMetadataId] = useState(null);

    const toggleMetadata = (id) => {
        setShowMetadataId(showMetadataId === id ? null : id);
    }

    function sortByProperty(property) {
        return function (a, b) {
            if (a[property] > b[property])
                return -1;
            else if (a[property] < b[property])
                return 1;

            return 0;
        }
    }

    useEffect(() => {
        setMostPlayed(playlists.sort(sortByProperty("timesPlayed")));

        //
        const types = [...new Set(playlists.map(item => item.type.toLowerCase()))];
        setPlaylistTypes(types);
    }, [playlists]);

    useEffect(() => {
        Grade(document.querySelectorAll('.gradient-wrap'))
    });

    // Calculate total songs discovered
    const totalSongsDiscovered = playlists.reduce((total, playlist) => total + (playlist.timesPlayed >= 1 ? 1 : 0), 0);

    return (
        <Container>
            <div className={"Profile"}>
                <div className="top-profile">
                    <Avatar variant={"circle"} src={require("../assets/img/Profile/avatar.png")} style={{width: "150px", height: "150px"}}> VS </Avatar>
                    <div className="profile-detail">
                        <h3>Phạm Lê Quân</h3>

                        {/*Print times listened in total of all songs*/}
                        <p style={{display: "flex"}}>Total of song discovered: {totalSongsDiscovered}</p>

                        <br/>
                        <div style={{textAlign: "left"}}>
                            My playlist:
                        </div>
                        <div style={{display: "flex"}}>
                            {playlistTypes.map((type, index) => (
                                <SideBarOptions key={index} className={"lib-sub"} Icon={PlaylistPlay} href={`/home/playlist/${type.toLowerCase()}`}  title={type}/>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="bottom-profile">
                    <div>
                        <h3>Most Played</h3>
                        <div className="most-played">
                            {
                                mostPlayed.map((item, index) => (
                                    index <= 4 && <MusicCard key={item.id} music={item} toggleMetadata={toggleMetadata} showMetadata={showMetadataId === item.id}/>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
}

export default Profile;
