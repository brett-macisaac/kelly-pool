import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import GridPoolBall from "../components/grid_pool_ball/GridPoolBall.js";
import consts from '../../utils/constants.js';
import utils from "../../utils/utils.js";
import "./style_game.css";

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
                    balls: Array(location.state.numBalls).fill({ number: 0, in: false })
                    // balls: Array(location.state.numBalls).fill(0).map(
                    //     (value) =>
                    //     {
                    //         return {
                    //             number: value,
                    //             in: false
                    //         }
                    //     }
                    // )
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

    const EliminatePlayer = (aIndex) =>
    {
        alert(`${players[aIndex].name} has been eliminated!`);

        if (aIndex === indexSelected)
        {
            // Toggle the highlight on their balls.
            highlightPlayersBalls(indexSelected);
            setIndexSelected(-1);
        }
    }

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

                // Reset the players' 'balls' arrays.
                // Players can now add and remove balls mid-game, meaning that their arrays might not be the correct
                // size at the end of a game.
                for (let i = 0; i < lDeepCopy.length; ++i)
                {
                    lDeepCopy[i].balls = Array(location.state.numBalls).fill({ value: 0, in: false });
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
                        if (lDeepCopy[i].balls[j].number !== aBallNumber)
                            continue;

                        // If the ball has been potted (i.e. wasn't in but now is).
                        const lBallPotted = !lDeepCopy[i].balls[j].in;

                        lDeepCopy[i].balls[j].in = !(lDeepCopy[i].balls[j].in);

                        let lNumBalls = lDeepCopy[i].balls.filter(el => el.in === false).length;

                        if (lNumBalls === 0)
                        {
                            // alert(`${lDeepCopy[i].name} has been eliminated!`);

                            // if (i === indexSelected)
                            // {
                            //     highlightPlayersBalls(indexSelected);
                            //     setIndexSelected(-1);
                            // }

                            EliminatePlayer(i);
                        }
                        else if (location.state.showCounts && lBallPotted)
                        {
                            alert(`${lDeepCopy[i].name} has lost a ball!`);
                        }

                        lBallFound = true;

                        break;
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

                // Deselect any currently selected balls and record them in lBallNumsDeselected.
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

                return lDeepCopy;
            }

        );
    };

    /* Returns an array of the balls that are unassigned and not yet potted. */
    const availableBalls = () =>
    {
        return balls.filter(
            (ball) =>
            {
                // If the ball is already potted, don't include this ball (irrespetive of whether it's assigned).
                if (ball.in)
                    return false;

                let lIsBallAssigned = false;

                for (const player of players)
                {
                    for (const b of player.balls)
                    {
                        if (b.number === ball.number)
                        {
                            lIsBallAssigned = true;
                            break;
                        }
                    }

                    if (lIsBallAssigned)
                        break;
                }

                return !lIsBallAssigned;
            }
        );
    }

    const handleAddBall = () =>
    {
        // If there's balls remaining that have yet to be assigned to a player, pick a random one and assign it to the 
        // selected player.

        // Balls that haven't been potted and are not assigned to a player.
        const lBallsAvailable = availableBalls();

        console.log("Available balls: ");
        console.log(lBallsAvailable);

        if (lBallsAvailable.length === 0)
            return;

        // A random ball from lBallsAvailable.
        const lBallRandom = lBallsAvailable[utils.GetRandom(0, lBallsAvailable.length - 1)];

        setPlayers(
            (prev) =>
            {
                const lDeepCopy = JSON.parse(JSON.stringify(prev));

                lDeepCopy[indexSelected].balls.push({ number: lBallRandom.number, in: false })

                return lDeepCopy;
            }
        );

        setBalls(
            (prev) =>
            {
                const lDeepCopy = JSON.parse(JSON.stringify(prev));

                return lDeepCopy.map(
                    (ball) =>
                    {
                        if (ball.number === lBallRandom.number)
                            ball.selected = true;

                        return ball;
                    }
                );
            }
        );

    }

    const handleRemoveBall = () =>
    {
        let lBallRemoved = 0;

        setPlayers(
            (prev) =>
            {
                const lDeepCopy = JSON.parse(JSON.stringify(prev));

                // The selected player's balls.
                let lBalls = lDeepCopy[indexSelected].balls;

                // The indexes of the player's balls that haven't been potted.
                let lIndexesUnpotted = [];

                // Populate lIndexesUnpotted.
                lBalls.forEach(
                    (ball, index) => 
                    { 
                        if (!ball.in)
                        {
                            lIndexesUnpotted.push(index);
                        }
                    }
                );

                // A random value of lIndexesUnpotted.
                let lIndexRandom = lIndexesUnpotted[utils.GetRandom(0, lIndexesUnpotted.length - 1)];

                // Record the ball that will be removed.
                lBallRemoved = lBalls[lIndexRandom].number;

                // Remove the card at the random index.
                lDeepCopy[indexSelected].balls = lBalls.filter((ball, index) => index !== lIndexRandom);

                // Eliminate the player if they have no unpotted balls left.
                if (lDeepCopy[indexSelected].balls.length === 0 || 
                    lDeepCopy[indexSelected].balls.filter(ball => ball.in === false).length === 0)
                {
                    EliminatePlayer(indexSelected);
                }

                // Unselect the ball.
                setBalls(
                    (prev) =>
                    {
                        const lDeepCopy = JSON.parse(JSON.stringify(prev));
        
                        return lDeepCopy.map(
                            (ball) =>
                            {
                                if (ball.number === lBallRemoved)
                                    ball.selected = false;
        
                                return ball;
                            }
                        );
                    }
                );

                return lDeepCopy;
            }
        );

    }

    const handleReplay = () =>
    {
        // Balls and the players' order should be randomised.

        // Given that players have the option to add/remove balls, their 'balls' arrays should be reset.

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

    // The number of players' balls that are not yet potted.
    let lCountPlayersBalls = 0;

    return (
        <div id = "conGame" className = "pageContainer">

            <h1 className = "pageHeading">Game</h1>

            <div id = "conGameInner" className = "clearFix">

                <div id = "conPlayerList" className = "clearFix"> 
                    <h2>Players { `(${lNumPlayersIn})` }</h2>
                    {
                        players.map(
                            (player, index) => 
                            {
                                let lNumBalls = player.balls.filter(el => el.in === false).length;

                                if (lNumBalls === 0)
                                    return;

                                lCountPlayersBalls += lNumBalls;

                                // Specify whether a player is out (maybe change background colour).
                                return (
                                    <div 
                                        key = {index}
                                        className = {index === indexSelected ? "conPlayer conPlayerSelected" : "conPlayer"}
                                        onClick = { () => highlightPlayersBalls(index) }
                                    >
                                        { player.name } { location.state.showCounts ? `(${lNumBalls})` : "" }
                                    </div>
                                );
                            }
                        )
                    }

                    {
                        (location.state.showCounts && lNumPlayersIn > 1) && (
                            <div id = "conTotalPlayersBalls">
                                <div 
                                    className = "conPlayer"
                                >
                                    <b>Total</b>: { lCountPlayersBalls }
                                </div>
                            </div>
                        )
                    }

                    {
                        lNumPlayersIn <= 1 && (
                            <button id = "btnReplay" className = "btnBig" onClick = {handleReplay}>Replay</button>
                        )
                    }
                    
                    {
                        lNumPlayersIn <= 1 && (
                            <button id = "btnQuit" className = "btnBig" onClick = {handleQuit}>Quit</button>
                        )
                    }
                </div>
                
                <div id = "conBalls">
                    <h2>Balls { `(${balls.filter((ball) => !ball.in).length})` }</h2>
                    <GridPoolBall 
                        columns = {3} 
                        clickBall = {clickBall}
                        balls = {balls}
                    />

                    {
                        (indexSelected >= 0 && (availableBalls()).length > 0) && (
                            <button id = "btnAddBall" className = "btnBig" onClick = {handleAddBall}>Add Ball</button>
                        )
                    }

                    {
                        indexSelected >= 0 && (
                            <button id = "btnRemoveBall" className = "btnBig" onClick = {handleRemoveBall}>Remove Ball</button>
                        )
                    }
                </div>

            </div>

        </div>
    );
}

export default Game;