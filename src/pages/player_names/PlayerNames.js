import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import utils from "../../utils/utils.js";
import consts from "../../utils/constants.js";

import "./style_player_names.css";

function PlayerNames()
{
    const location = useLocation();

    const navigate = useNavigate();

    const [names, setNames] = useState(

        location.state.returningPlayers 
            ? 
                Object.assign(new Array(location.state.numPlayers).fill(""), location.state.returningPlayers) 
            :
                Array(location.state.numPlayers).fill("")

    );

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

        // If the localStorage array of player names doesn't yet exist, create it.
        if (!localStorage.hasOwnProperty(consts.lclStrgKeyPrevNames))
        {
            utils.SetInLocalStorage(consts.lclStrgKeyPrevNames, []);
        }

        // An array of all the previous names that have been entered.
        const lPrevNames = utils.GetFromLocalStorage(consts.lclStrgKeyPrevNames);

        // Store any new names in the localStorage array.
        for (const name of names)
        {
            // Skip any pre-recorded names.
            if (lPrevNames.includes(name))
                continue;

            lPrevNames.push(name);
        }

        // Store the updated names into localStorage.
        utils.SetInLocalStorage(consts.lclStrgKeyPrevNames, lPrevNames);

        utils.RandomiseArray(names);

        navigate("/game", { state: { playerNames: names, numBalls: location.state.numBalls} });
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
            <button id = "btnStart" className = "btnBig" onClick = {handlePress}>Start</button>
        </div>
    );
}

export default PlayerNames;