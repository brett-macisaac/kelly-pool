import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import GridPoolBall from "../components/grid_pool_ball/GridPoolBall.js";
import consts from '../../utils/constants.js';
import utils from "../../utils/utils.js";
import "./style_game.css";

import gColoursPoolBalls from "../../utils/colours_pool_balls.js";

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
                    balls: Array(location.state.numBalls).fill({ number: 0, in: false }),
                    nthPlace: -1
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

    const NumPlayersIn = () =>
    {
        return players.filter(
            (player) =>
            {
                const lAtLeastOneBallIn = player.balls.filter(ball => !ball.in).length > 0;
    
                return lAtLeastOneBallIn;
            }
        ).length;
    }

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

    const ReturnPlayer = (aPlayers, aIndex) =>
    {
        // Adjust the nthPlace variable of other players (i.e. any players who have a lower place).
        for (const player of aPlayers)
        {
            if (player.nthPlace <= 0)
                continue;

            if (player.nthPlace < aPlayers[aIndex].nthPlace)
                player.nthPlace += 1;
        }

        if (aPlayers[aIndex].nthPlace !== 1)
            aPlayers[aIndex].nthPlace = -1;
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
                    for (let j = 0; j < lDeepCopy[i].balls.length; ++j)
                    {
                        lDeepCopy[i].balls[j].number = lBalls[lIndexBalls++];
                        lDeepCopy[i].balls[j].in = false;
                        lDeepCopy[i].balls[j].nthPlace = -1;
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
                            const lNumPlayers = NumPlayersIn();

                            lDeepCopy[i].nthPlace = lNumPlayers;
                            EliminatePlayer(i);

                            // If the player who just lost placed 2nd, that means there's only one player left.
                            if (lNumPlayers === 2)
                            {
                                // Set the place of the only remaining player to 1.
                                for (const player of lDeepCopy)
                                {
                                    if (player.balls.filter(el => !el.in).length === 0)
                                        continue;

                                    player.nthPlace = 1;
                                }
                            }
                        }
                        else if (location.state.showCounts && lBallPotted)
                        {
                            alert(`${lDeepCopy[i].name} has lost a ball!`);
                        }

                        // If the player returned to the game by 'resurrecting' one of their potted balls.
                        if (!lBallPotted && lNumBalls === 1)
                        {
                            ReturnPlayer(lDeepCopy, i);
                            // Adjust the nthPlace variable of other players (i.e. any players who have a lower place).
                            // for (const player of lDeepCopy)
                            // {
                            //     if (player.nthPlace < lDeepCopy[i].nthPlace)
                            //         player.nthPlace += 1;
                            // }

                            // lDeepCopy[i].nthPlace = -1;
                        }

                        lBallFound = true;

                        break;
                    }

                    if (lBallFound)
                        break;
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

                const lNumBalls = lDeepCopy[indexSelected].balls.filter(ball => !ball.in).length;

                if (lNumBalls === 0)
                    ReturnPlayer(lDeepCopy, indexSelected);

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

                // Remove the ball at the random index.
                lDeepCopy[indexSelected].balls = lBalls.filter((ball, index) => index !== lIndexRandom);

                // Eliminate the player if they have no unpotted balls left.
                if (lDeepCopy[indexSelected].balls.length === 0 || 
                    lDeepCopy[indexSelected].balls.filter(ball => ball.in === false).length === 0)
                {
                    const lNumPlayers = NumPlayersIn();

                    lDeepCopy[indexSelected].nthPlace = lNumPlayers;
                    
                    EliminatePlayer(indexSelected);

                    // If the player who just lost placed 2nd, that means there's only one player left.
                    if (lNumPlayers === 2)
                    {
                        // Set the place of the only remaining player to 1.
                        for (const player of lDeepCopy)
                        {
                            if (player.balls.filter(el => !el.in).length === 0)
                                continue;

                            player.nthPlace = 1;
                        }
                    }
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

    const lNumPlayersIn = NumPlayersIn();

    // The number of players' balls that are not yet potted.
    let lCountPlayersBalls = 0;

    // The length of the longest name (can be used to make all the names the same length).
    let lLengthLongestName = 0;
    for (const player of players)
    {
        if (player.name.length > lLengthLongestName)
        {
            lLengthLongestName = player.name.length;
        }
    }

    return (
        <div id = "conGame" className = "pageContainer">

            <h1 className = "pageHeading">Game</h1>

            <div id = "conGameInner" className = "clearFix">

                <div id = "conPlayerList" className = "clearFix">

                    <div 
                        id = "conTotalPlayers" className = "conPlayer"
                    >
                        <div className = "playerName" ><b>Players</b></div>
                        <div className = "numBallsCount">{ lNumPlayersIn }</div>
                    </div>

                    {
                        players.map(
                            (player, index) => 
                            {
                                let lNumBalls = player.balls.filter(el => !el.in).length;

                                // if (lNumBalls === 0)
                                //     return;

                                lCountPlayersBalls += lNumBalls;

                                const lStyleBallCount = { backgroundColor: gColoursPoolBalls[lNumBalls].primary };

                                if (!location.state.showCounts)
                                    lStyleBallCount["visibility"] = "hidden";

                                const lHasPlaced = player.nthPlace > 0 && !(lNumBalls > 0 && lNumPlayersIn > 1);

                                return (
                                    <div 
                                        key = {index}
                                        className = { index === indexSelected ? "conPlayer conPlayerSelected" : "conPlayer" }
                                        onClick = { () => highlightPlayersBalls(index) }
                                    >
                                        {
                                            lHasPlaced && (
                                                <div 
                                                    className = "playerPlace" 
                                                    style = { { backgroundColor: gColoursPoolBalls[player.nthPlace].primary } }
                                                >
                                                    <div className = "numCircle">
                                                        { player.nthPlace }
                                                        <sup>{utils.OrdinalSuffix(player.nthPlace)}</sup>
                                                    </div>
                                                </div>
                                            )
                                        }
                                        <div className = "playerName" style = { lHasPlaced ? { marginLeft: 0 } : {} }>
                                            { player.name.padEnd(lLengthLongestName) }
                                        </div>

                                        <div 
                                            className = { index === indexSelected ? "numBallsCount numBallsCountSelected" : "numBallsCount" }
                                            style = { lStyleBallCount }
                                        >
                                            <div className = "numCircle">
                                                { lNumBalls }
                                            </div>
                                        </div>
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
                                    <div className = "playerName" ><b>Total</b></div>
                                    <div className = "numBallsCount" style = { { backgroundColor: gColoursPoolBalls[lCountPlayersBalls].primary } }>
                                        <div className = "numCircle">
                                            { lCountPlayersBalls }
                                        </div>
                                    </div>
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

                    <div 
                        id = "conTotalBalls" className = "conPlayer"
                    >
                        <div className = "playerName" ><b>Balls</b></div>
                        <div className = "numBallsCount">{ balls.filter((ball) => !ball.in).length }</div>
                    </div>

                    <div id = "conGridPoolBall">
                        <GridPoolBall 
                            columns = {3} 
                            clickBall = {clickBall}
                            balls = {balls}
                            sizeBall = { 85 }
                        />
                    </div>

                    {
                        (indexSelected >= 0 && (availableBalls()).length > 0) && (
                            <button id = "btnAddBall" className = "btnBig" onClick = {handleAddBall}>Add Ball</button>
                        )
                    }

                    {
                        ((indexSelected >= 0) && players[indexSelected].balls.filter(ball => !ball.in).length > 0) && (
                            <button id = "btnRemoveBall" className = "btnBig" onClick = {handleRemoveBall}>Remove Ball</button>
                        )
                    }
                </div>

            </div>

        </div>
    );
}

export default Game;