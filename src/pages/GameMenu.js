import React, { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';

import GridBtnNum from './components/GridBtnNum';

import consts from '../utils/constants.js';

function GameMenu()
{
    const [numPlayers, setNumPlayers] = useState(2);

    const [numBalls, setNumBalls] = useState(0);

    const navigate = useNavigate();

    const selectNumPlayers = (aNum) =>
    {
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
        setNumBalls(aNum);
    };

    const handlePlay = () =>
    {
        if (numPlayers <= 0 || numBalls <= 0)
        {
            return;
        }

        navigate("/names", { state: { players: numPlayers, balls: numBalls } });
    };

    const maxNumBalls = () =>
    {
        return Math.floor(consts.numPoolBalls / numPlayers);
    }

    useEffect(
        () =>
        {
            const lMaxBallsPerPlayer = maxNumBalls();

            console.log("Max balls per player: " + lMaxBallsPerPlayer);
            console.log("Balls per player: " + numBalls);

            if (lMaxBallsPerPlayer === 1)
            {
                setNumBalls(1);
            }
            else if (lMaxBallsPerPlayer < numBalls)
            {
                console.log(`The max balls per player ${lMaxBallsPerPlayer} exceeds the current setting of ${numBalls}.`);
                setNumBalls(lMaxBallsPerPlayer);
            }
        },
        [numPlayers]
    );

    return (
        <div id = "conGameMenu">

            <h1 className = "pageHeading">Game Parameters</h1>

            <h2>Number of Players</h2>
            <div id = "conNumPlayers" className = "numSelector">
                <GridBtnNum size = {14} columns = {4} minNum = {2} selectNum = {selectNumPlayers} selected = {numPlayers} />
            </div>

            <h2 id = "titleNumBalls" >Balls Per Player</h2>
            <div id = "conNumBalls" className = "numSelector">
                <GridBtnNum size = {maxNumBalls()} columns = {4} selectNum = {selectNumBalls} selected = {numBalls} />
            </div>

            <button id = "btnNext" onClick = {handlePlay}>Next</button>

        </div>
    );
}

export default GameMenu;