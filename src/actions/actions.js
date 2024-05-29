export const setPlaylist = (playlist) => {
    return {
        type:"SET_PLAYLIST",
        payload: playlist
    };
};
export const setCurrentPlaying = (curr_music) => {
    return {
        type: "SET_CURR_PLAYING",
        payload: curr_music
    };
};
export const setBannerOpen = (isOpen) => {
    return {
        type:"SET_BANNER_OPEN",
        payload:isOpen
    };
};

export const increaseTimesPlayed = (id) => {
    return {
        type:"INC_TIMES_PLAYED",
        payload: id
    };
};

export const setSearch = (searchQuery) => {
    return {
        type:"SET_SEARCH_QUERY",
        payload: searchQuery
    };
};

export const setPlayingStatus = (isPlaying) => {
    return {
        type:"SET_PLAY_PAUSE_CLICKED",
        payload: isPlaying
    };
}

//login
export const login = () => {
    return {
        type: "USER_LOGIN"
    };
};