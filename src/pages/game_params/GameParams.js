import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// import GridBtnNum from '../components/grid_btn_num/GridBtnNum.js';
import GridPoolBall from '../components/grid_pool_ball/GridPoolBall.js';
import CheckBox from '../components/check_box/CheckBox.js';
import consts from '../../utils/constants.js';
import "./style_game_params.css";

function GameParams()
{
    const [numPlayers, setNumPlayers] = useState(2);

    const [numBalls, setNumBalls] = useState(0);

    const [showCounts, setShowCounts] = useState(true);

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

    const toggleShowCounts = () =>
    {
        setShowCounts(
            (prev) =>
            {
                return !prev;
            }
        );
    }

    const handleNext = () =>
    {
        if (numPlayers <= 0 || numBalls <= 0)
        {
            return;
        }

        // If previous names have been recorded, go to the page that allows the user to select them; otherwise, go
        // directly to the names page.
        if (localStorage.hasOwnProperty(consts.lclStrgKeyPrevNames))
        {
            navigate("/prev-names", { state: { numPlayers: numPlayers, numBalls: numBalls, showCounts: showCounts } });
        }
        else
        {
            navigate("/names", { state: { numPlayers: numPlayers, numBalls: numBalls, showCounts: showCounts } });
        }
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

            if (lMaxBallsPerPlayer < numBalls || lMaxBallsPerPlayer === 1)
            {
                setNumBalls(lMaxBallsPerPlayer);
            }
        },
        [numPlayers]
    );

    return (
        <div id = "conGameParams" className = "pageContainer">

            <h1 className = "pageHeading">Game Parameters</h1>

            <div className = "content hideScrollBar">

                <h2>Number of Players</h2>
                {/* <div id = "conNumPlayers" className = "numSelector">
                    <GridBtnNum size = {14} columns = {4} minNum = {2} selectNum = {selectNumPlayers} selected = {numPlayers} />
                </div> */}
                <div id = "conNumPlayers" className = "numSelector">
                    <GridPoolBall 
                        columns = {4} 
                        clickBall = {selectNumPlayers}
                        balls = { 
                            Array.from({ length: 14 }, (el, index) => index + 2).map(
                                (aNum) =>
                                {
                                    return { number: aNum, in: aNum === numPlayers, selected: aNum === numPlayers };
                                }
                            ) 
                        }
                        width = { 300 }
                    />
                </div>

                <h2 id = "titleNumBalls" >Balls Per Player</h2>
                {/* <div id = "conNumBalls" className = "numSelector">
                    <GridBtnNum size = {maxNumBalls()} columns = {4} selectNum = {selectNumBalls} selected = {numBalls} />
                </div> */}
                <div id = "conNumBalls" className = "numSelector">
                    <GridPoolBall 
                        columns = {4} 
                        clickBall = { selectNumBalls }
                        balls = { 
                            Array.from({ length: maxNumBalls() }, (el, index) => index + 1).map(
                                (aNum) =>
                                {
                                    return { number: aNum, in: aNum === numBalls, selected: aNum === numBalls };
                                }
                            ) 
                        }
                        width = { 300 }
                    />
                </div>


                <div id = "conCheckBox">
                    <CheckBox 
                        id = "chkShowBallCounts"
                        name = "Show Players' Ball Counts"
                        onChange = { toggleShowCounts }
                        checked = { showCounts }
                    />
                </div>

            </div>

            <div className = "footer">

                <button id = "btnNext" className = "btnBig" onClick = { handleNext }>Next</button>

            </div>

        </div>
    );

}

export default GameParams;