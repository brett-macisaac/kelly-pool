import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import GridPoolBalls from "./components/GridPoolBalls.js";

import consts from '../utils/constants.js';
import utils from "../utils/utils.js";

function Game()
{
    const navigate = useNavigate();

    const location = useLocation();
    //console.log(location.state);

    const [players, setPlayers] = useState(
        
        location.state.playerNames.map(

            (aName) =>
            {
                return {
                    name: aName,
                    in: true,
                    balls: Array(location.state.numBalls).fill(0).map(
                        (value) =>
                        {
                            return {
                                number: value,
                                in: false
                            }
                        }
                    )
                }
            }

        )

    );

    const [balls, setBalls] = useState(

        Array.from({ length: consts.numPoolBalls }, (element, index) => index + 1).map(
            (aNumber) =>
            {
                return { number: aNumber, in: false, selected: false };
            }
        )

    );

    const [indexSelected, setIndexSelected] = useState(-1);

    const RandomisePlayers = () =>
    {
        // Randomise the players.
        setPlayers(

            (prev) =>
            {
                // A list of the players' names.
                const lNames = prev.map(player => player.name);

                // Randomise the names.
                utils.RandomiseArray(lNames);
                
                // A (deep) copy of the players' array.
                const lDeepCopy = JSON.parse(JSON.stringify(prev));

                let lIndexNames = 0;

                // Assign the randomised names to the players' objects.
                for (let i = 0; i < lDeepCopy.length; ++i)
                {
                    lDeepCopy[i].name = lNames[lIndexNames++];
                }

                return lDeepCopy;
            }
        );
    };

    const RandomiseBalls = () =>
    {
        setBalls(

            (prev) =>
            {
                // A (deep) copy of the balls.
                const lDeepCopy = JSON.parse(JSON.stringify(prev));

                for (let i = 0; i < lDeepCopy.length; ++i)
                {
                    lDeepCopy[i].in = false;
                    lDeepCopy[i].selected = false;
                }

                return lDeepCopy;
            }

        );

        setPlayers(

            (prev) =>
            {
                const lBalls = Array.from({ length: consts.numPoolBalls }, (element, index) => index + 1);
                utils.RandomiseArray(lBalls);
        
                let lIndexBalls = 0;

                // A (deep) copy of the players' array.
                const lDeepCopy = JSON.parse(JSON.stringify(prev));

                for (let i = 0; i < lDeepCopy.length; ++i)
                {
                    lDeepCopy[i].in = true;

                    for (let j = 0; j < lDeepCopy[i].balls.length; ++j)
                    {
                        lDeepCopy[i].balls[j].number = lBalls[lIndexBalls++];
                        lDeepCopy[i].balls[j].in = false;
                    }
                }

                return lDeepCopy;
            }

        );
    };

    

    // Initial randomisation of balls.
    useEffect(
        () =>
        {
            RandomiseBalls();
        },
        []
    );

    const clickBall = (aBallNumber) =>
    {
        setPlayers(

            (prev) =>
            {
                const lDeepCopy = JSON.parse(JSON.stringify(prev));

                let lBallFound = false;

                for (let i = 0; i < lDeepCopy.length; ++i)
                {
                    for (let j = 0; j < lDeepCopy[i].balls.length; ++j)
                    {
                        if (lDeepCopy[i].balls[j].number === aBallNumber)
                        {
                            lDeepCopy[i].balls[j].in = !(lDeepCopy[i].balls[j].in);

                            let lNumBalls = lDeepCopy[i].balls.filter(el => el.in === false).length;

                            if (lNumBalls === 0)
                            {
                                alert(`${lDeepCopy[i].name} has been eliminated!`);
                            }

                            lBallFound = true;

                            break;
                        }
                    }

                    if (lBallFound)
                    {
                        break;
                    }
                }

                return lDeepCopy;
            }

        );

        setBalls(

            (prev) => 
            {
                const lDeepCopy = JSON.parse(JSON.stringify(prev));

                lDeepCopy[aBallNumber - 1].in = !(lDeepCopy[aBallNumber - 1].in);

                return lDeepCopy;
            }

        );

    };

    useEffect(
        () =>
        {
            RandomiseBalls();
        },
        []
    );

    const highlightPlayersBalls = (aIndex) =>
    {
        aIndex === indexSelected ? setIndexSelected(-1) : setIndexSelected(aIndex);

        setBalls(

            (prev) =>
            {
                const lDeepCopy = JSON.parse(JSON.stringify(prev));

                // An array of the balls that were deselected. These balls are unavailable for selection.
                const lBallNumsDeselected = [];

                // Deselect any currently selected balls.
                for (let i = 0; i < lDeepCopy.length; ++i)
                {
                    if (lDeepCopy[i].selected)
                    {
                        lBallNumsDeselected.push(lDeepCopy[i].number);
                    }

                    lDeepCopy[i].selected = false;
                }

                console.log("Deselected Balls:");
                console.log(lBallNumsDeselected);

                const lPlayer = players[aIndex];

                for (let i = 0; i < lPlayer.balls.length; ++i)
                {
                    const lNumBall = lPlayer.balls[i].number;

                    if (lBallNumsDeselected.includes(lNumBall))
                        continue;

                    lDeepCopy[lNumBall - 1].selected = true;
                }

                console.log("Deep Copy of Balls:");
                console.log(lDeepCopy);

                return lDeepCopy;
            }

        );
    };

    const handleReplay = () =>
    {
        // Balls and the players' order should be randomised.

        RandomisePlayers();

        RandomiseBalls();
    }

    const handleQuit = () =>
    {
        navigate("/");
    }

    const lNumPlayersIn = players.filter(

        (player) =>
        {
            const lAtLeastOneBallIn = player.balls.filter(ball => !ball.in).length > 0;

            return lAtLeastOneBallIn;
        }

    ).length;

    return (
        <div id = "conGame">

            <h1 className = "pageHeading">Game</h1>

            <h2>Players</h2>
            <div id = "conPlayerList">
                {
                    players.map(
                        (player, index) => 
                        {
                            let lNumBalls = player.balls.filter(el => el.in === false).length;

                            if (lNumBalls === 0)
                            {
                                return;
                            }

                            // Specify whether a player is out (maybe change background colour).
                            return (
                                <div 
                                    key = {index}
                                    className = {index === indexSelected ? "conPlayer conPlayerSelected" : "conPlayer"}
                                    onClick = { () => highlightPlayersBalls(index) }
                                >
                                    { player.name } { `(${lNumBalls})` }
                                </div>
                            );
                        }
                    )
                }
            </div>
            
            <h2>Balls</h2>
            <div id = "conBalls">
                <GridPoolBalls 
                    columns = {3} 
                    clickBall = {clickBall}
                    balls = {balls}
                />

                {
                    lNumPlayersIn <= 1 && (
                        <button id = "btnReplay" onClick = {handleReplay}>Replay</button>
                    )
                    // If but one player has balls left, spawn buttons that allows the user to start again (simply make all
                    // the balls in again). Pass the data down to the GridPoolBalls object, instead of it having its own
                    // copy of which balls are in which are out.
                }
                {
                    lNumPlayersIn <= 1 && (
                        <button id = "btnQuit" onClick = {handleQuit}>Quit</button>
                    )
                }
            </div>
        </div>
    );
}

export default Game;