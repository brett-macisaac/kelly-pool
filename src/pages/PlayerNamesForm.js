import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'
import utils from "../utils/utils.js";

function PlayerNamesForm()
{
    const location = useLocation();

    const navigate = useNavigate();

    const [names, setNames] = useState(Array(location.state.players).fill(""));

    const handleChange = (event, aIndex) =>
    {
        setNames(
            (prev) =>
            {
                return prev.map(
                    (name, index) =>
                    {
                        if (index === aIndex)
                        {
                            return event.target.value;
                        }
                        else
                        {
                            return name;
                        }
                    }
                );
            }
        );

    };

    const handlePress = () =>
    {
        const lAreNamesSet = names.every((name) => name !== "");

        if (!lAreNamesSet)
        {
            console.log("Please set all names.");
            return;
        }

        utils.RandomiseArray(names);

        navigate("/game", { state: { playerNames: names, numBalls: location.state.balls} });
        //navigate("/game", { state: { players: lPlayers } });
    };

    return (
        <div id = "conPlayerNames">
            <h1 className = "pageHeading">Player Names</h1>
            {
                names.map(
                    (name, index) =>
                    {
                        return (
                            <div className = "conPlayerName" key = {index}>
                                <h2>Player {index + 1}</h2>
                                <input 
                                    type = "text" 
                                    placeholder = "Name" 
                                    value = {name} 
                                    onChange = { (event) => handleChange(event, index) }
                                    maxLength = "20"
                                />
                            </div>
                        );
                    }
                )
            }
            <button id = "btnStart" onClick = {handlePress}>Start</button>
        </div>
    );
}

export default PlayerNamesForm;