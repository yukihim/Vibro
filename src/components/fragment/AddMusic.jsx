import React, {useContext, useEffect, useRef, useState} from 'react';
import '../assets/scss/AddMusic.scss';
import {Add, Image, MusicNoteTwoTone} from "@material-ui/icons";
import {Button} from "@material-ui/core";
import {ThemeContext} from "../../api/Theme";
//import musicDB from "../../db/music";
import initialMusicDB from "../../db/music";

function AddMusic() {
    const useStyle = useContext(ThemeContext);
    const imgRef = useRef();
    const musicRef = useRef();
    const [selectedImg, setSelectedImg] = useState(null);
    const [selectedMusic, setSelectedMusic] = useState(null);
    const [language, setLanguage] = useState('Select Language (Any)');
    const [songName, setSongName] = useState('');
    const [artistName, setArtistName] = useState('');
    const [musicDB, setMusicDB] = useState(initialMusicDB);

    const selectImg = () => {
        imgRef.current.click();
    }

    const selectMusic = () => {
        musicRef.current.click();
    }

    useEffect(() => {
        imgRef.current.onchange = (e) => {
            setSelectedImg(e.target.files[0].name);
            e.target.value = null;
        }
        musicRef.current.onchange = (e) => {
            setSelectedMusic(e.target.files[0].name);
            e.target.value = null;
        }
    }, [])

    const addMusic = (event) => {
        event.preventDefault();

        if (!selectedMusic || !songName || !artistName) {
            alert('Please select a music file, enter a song name, and enter an artist name.');
            return;
        }

        let id = musicDB.length > 0 ? musicDB[musicDB.length-1].id + 1 : 1;
        const newMusic = {
            id,
            songName,
            artistName,
            language,
            selectedImg,
            selectedMusic
        };

        //setMusicDB([...musicDB, newMusic]);
        setMusicDB(prevMusicDB => {
            const updatedMusicDB = [...prevMusicDB, newMusic];
            console.log(updatedMusicDB);
            return updatedMusicDB;
        });

        // Clear all the fields
        setSelectedImg(null);
        setSelectedMusic(null);
        setLanguage('Select Language (Any)');
        setSongName('');
        setArtistName('');
    };

    let id = musicDB.length > 0 ? musicDB[musicDB.length-1].id + 1 : 1;

    return (
        <form style={useStyle.component} className={"AddMusic"}>
            <div className="add-music-sub-container">
                <div className="d1">
                    <Button onClick={selectImg} style={{backgroundColor: useStyle.subTheme,width:"200px",height:"200px"}} variant={"contained"}>
                        <Image titleAccess={"Select a music cover"} style={{color:"#f0f0f0",width:"150px",height:"150px"}}/>
                    </Button>
                    <input ref={imgRef} accept="image/*" type="file" hidden id={"music-img"}/>
                    <p>Cover Image: {selectedImg ? selectedImg : 'Image not selected'}</p>
                    <br/>

                    <Button onClick={selectMusic} style={{backgroundColor: useStyle.subTheme,width:"200px",height:"200px"}} variant={"contained"}>
                        <MusicNoteTwoTone titleAccess={"Select a music"} style={{color:"#f0f0f0",width:"150px",height:"150px"}}/>
                    </Button>
                    <input ref={musicRef} accept="audio/*" type="file" hidden/>
                    <p>Music File Name: {selectedMusic? selectedMusic : 'File not selected'}</p>
                    <br/>

                    <select onChange={(e) => setLanguage(e.target.value)}>
                        <option value="0">Select Language (Any)</option>
                        <option value="1">English</option>
                    </select>
                </div>
                <div className="d2">
                    <div>
                        <input type="text" value={"ID: "+id} disabled/>
                        <input type="text" value={songName} placeholder={"Song Name"} id={"name"} onChange={(e) => setSongName(e.target.value)}/>
                        <input type="text" value={artistName} placeholder={"Singer Name"} id={"artist"} onChange={(e) => setArtistName(e.target.value)}/>

                        <Button onClick={(event) => addMusic(event)} style={{backgroundColor: useStyle.theme}} variant={"contained"} endIcon={<Add/>}>
                            Add
                        </Button>
                    </div>
                    <div className={"preview"}>
                        <h3>Preview</h3>
                        <p>Music Cover: {selectedImg}</p>
                        <p>File Name: {selectedMusic}</p>
                        <p>Music Name: {songName}</p>
                        <p>Author Name: {artistName}</p>

                        {/* eslint-disable-next-line eqeqeq */}
                        <p>Language: {language == "0" ? "Any" : language == "1" ? "English" : language}</p>
                    </div>
                </div>
            </div>
        </form>
    );
}

export default AddMusic;
