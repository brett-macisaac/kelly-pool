import React, { useState, useEffect } from 'react';
import {Link, useNavigate} from 'react-router-dom';

import GridBtnNum from './components/GridBtnNum';

import consts from '../utils/constants.js';

function GameMenu()
{
    const [numPlayers, setNumPlayers] = useState(2);

    const [numBalls, setNumBalls] = useState(0);

    const navigate = useNavigate();

    const selectNumPlayers = (aNum) =>
    {
        console.log(`Players: ${aNum}`);

        setNumPlayers(aNum);

        // Can't do this, because setNumPlayers is asynchronous.
        // a useEffect must instead be used (see below).
        // if (maxNumBalls() === 1)
        // {
        //     console.log("Autoset balls to 1");
        //     setNumBalls(1);
        // }
    };

    const selectNumBalls = (aNum) =>
    {
        console.log(`Balls: ${aNum}`);

        setNumBalls(aNum);
    };

    const handlePlay = () =>
    {
        navigate("/names", { state: { players: numPlayers, balls: numBalls } });
    };

    const maxNumBalls = () =>
    {
        return Math.floor(consts.numPoolBalls / numPlayers);
    }

    useEffect(
        () =>
        {
            if (maxNumBalls() === 1)
            {
                console.log("Autoset balls to 1");
                setNumBalls(1);
            }
        },
        [numPlayers]
    );

    return (
        <div id = "conGameMenu">

            <h1 className = "pageHeading">Game Parameters</h1>

            <h2>Number of Players</h2>
            <div id = "conNumPlayers" className = "numSelector">
                <GridBtnNum size = {14} columns = {4} minNum = {2} selectNum = {selectNumPlayers} initialSelect = {2} />
            </div>

            <h2 id = "titleNumBalls" >Balls Per Player</h2>
            <div id = "conNumBalls" className = "numSelector">
                <GridBtnNum size = {maxNumBalls()} columns = {4} selectNum = {selectNumBalls} />
            </div>

            <button id = "btnNext" onClick = {handlePlay}>Next</button>

        </div>
    );
}

export default GameMenu;