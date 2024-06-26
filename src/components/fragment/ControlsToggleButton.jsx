/*
import React, {useState} from 'react';
import '../assets/scss/ControlsToggleButton.scss';
import Button from "@material-ui/core/Button";

function ControlsToggleButton(props) {
    let ButtonOne = props.defaultIcon;
    let ButtonTwo = props.changeIcon;

    const [buttonType, setButton] = useState(false);

    function handleChange() {
        if (props.type === "prev" || props.type === "next") {
            setButton(true);
            props.onClicked(props.type, true);
        }else{
            setButton(!buttonType);
            props.onClicked(props.type, !buttonType);
        }
    }

    return (
        <Button
            style={props.style}
            onClick={handleChange}
            className={props.type}>
            {
                !buttonType ?
                    ButtonOne :
                    ButtonTwo
            }
        </Button>
    );
}

export default ControlsToggleButton;
*/

import React from 'react';
import '../assets/scss/ControlsToggleButton.scss';
import Button from "@material-ui/core/Button";

function ControlsToggleButton(props) {
    let ButtonOne = props.defaultIcon;
    let ButtonTwo = props.changeIcon;

    function handleChange() {
        //props.onClicked(props.type, !props.isPlaying);
        if (props.type === 'repeat') {
            props.onClicked(props.type, !props.isRepeatClicked);
        } else {
            props.onClicked(props.type, !props.isPlaying);
        }
    }

    return (
        <Button
            style={props.style}
            onClick={handleChange}
            className={props.type}>
            {
                //props.isPlaying ? ButtonTwo : ButtonOne
                props.type === 'repeat' ? (props.isRepeatClicked ? ButtonTwo : ButtonOne) : (props.isPlaying ? ButtonTwo : ButtonOne)
            }
        </Button>
    );
}

export default ControlsToggleButton;
