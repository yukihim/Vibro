import React, {useEffect, useState} from 'react';
import './css/Search.scss';
import Container from "../fragment/Container";
import {useSelector} from "react-redux";
import MusicCard from "../fragment/MusicCard";
import SearchMusic from "../assets/img/searchMusic.svg";
import SearchMusicMp3 from "../assets/img/searchMusicMp3.svg";
import SearchMusicDisc from "../assets/img/searchMusicDisc.svg";
import ArrowUp from '../assets/img/left.svg';

import notFoundImage from '../assets/img/Search/not-found.jpg'; // replace 'not-found.png' with your image name

const Search = () => {
    const {playlists, search} = useSelector(state => state.musicReducer);
    const [searchResult, setSearchResult] = useState([]);
    
    /*
    useEffect(() => {
        setSearchResult(playlists.filter((i) => (
            (i.name.toLowerCase().startsWith(search))
            ||
            //(i.author_name.toLowerCase().startsWith(search))
            (i.author_name.some(author => author.toLowerCase().startsWith(search)))
            ||
            (i.musicName.toLowerCase().startsWith(search))
            ||
            (i.lang && i.lang.toLowerCase().startsWith(search))
        )));
    }, [search, playlists]);
    */

    useEffect(() => {
        //const searchWords = search.split(' ');
        const searchWords = search.split(/[\s,]+/);
    
        setSearchResult(playlists.filter((i) => (
            searchWords.every(word => i.name.toLowerCase().includes(word))
            ||
            i.author_name.some(author => searchWords.every(word => author.toLowerCase().includes(word)))
            ||
            searchWords.every(word => i.musicName.toLowerCase().includes(word))
            ||
            (i.lang && searchWords.every(word => i.lang.toLowerCase().includes(word)))
        )));
    }, [search, playlists]);

    const [activeMetadataId, setActiveMetadataId] = useState(null);

    const toggleMetadata = (id) => {
        setActiveMetadataId(prevId => prevId === id ? null : id);
    };

    return (
        <Container>
            {
                (search === "" || search === null)
                    ?
                    <div className={"Search"}>
                        <div className="Search-img">
                            <img className={"Rotate-img"} src={SearchMusicDisc} alt="search-music-icon"/>
                            <img src={SearchMusicMp3} alt="search-music-icon"/>
                            <img src={SearchMusic} alt="search-music-icon"/>
                            <img className={"Arrow"} src={ArrowUp} alt=""/>
                        </div>
                    </div>
                    :
                    <div className={"Search-result"}>
                        {
                            searchResult.length === 0
                                ?
                                <div className={"Search-fallback"} style={{textAlign: 'center', color: '#000', fontSize: '1.2em', marginTop: '50px', paddingLeft: '250px'}}>
                                    <h2 style={{fontSize: '2em', marginBottom: '20px'}}>Oops!</h2>
                                    <p style={{textAlign: 'center', lineHeight: '1.6'}}>We couldn't find any results for your search. Please try again with different keywords.</p>
                                    <img src={notFoundImage} alt="Not found" style={{marginTop: '20px'}}/>
                                </div>
                                :
                                searchResult.map((item) => (
                                    <MusicCard key={item.id} music={item} showMetadata={activeMetadataId === item.id} toggleMetadata={toggleMetadata}/>
                                ))
                        }
                    </div>
            }
        </Container>
    );
}

export default Search;