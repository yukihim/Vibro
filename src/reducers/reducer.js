import {combineReducers} from "redux";
import musicReducer from "./musicReducer";
import userReducer from "./userReducer";

const reducers = combineReducers({
    //musicReducer,
    music: musicReducer,
    user: userReducer,
});

export default reducers;
