import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import utils from "../../utils/utils.js";
import consts from "../../utils/constants.js";

import "./style_prev_names.css";

function PrevNames()
{
    const location = useLocation();

    const navigate = useNavigate();

    const [selectedNames, setSelectedNames] = useState([]);

    const [prevNames, setPrevNames] = useState(utils.GetFromLocalStorage(consts.lclStrgKeyPrevNames));

    const handleChange = (aName) =>
    {
        setSelectedNames(
            (prev) =>
            {
                const lDeepCopy = JSON.parse(JSON.stringify(prev));

                if (lDeepCopy.includes(aName))
                {
                    return lDeepCopy.filter((name) => name !== aName);
                }
                else
                {
                    if (lDeepCopy.length < location.state.numPlayers)
                    {
                        lDeepCopy.push(aName);
                    }

                    return lDeepCopy;
                }
            }
        );
    }

    const handleRemove = (aName) =>
    {
        setPrevNames(
            (prev) =>
            {
                let lDeepCopy = JSON.parse(JSON.stringify(prev));

                // If the name is selected, remove it from selectedNames.
                if (selectedNames.includes(aName))
                {
                    setSelectedNames(
                        (prev) =>
                        {
                            const lDeepCopy = JSON.parse(JSON.stringify(prev));

                            return lDeepCopy.filter((name) => name !== aName);
                        }
                    );
                }

                // Remove the name.
                lDeepCopy = lDeepCopy.filter((name) => name !== aName);

                utils.SetInLocalStorage(consts.lclStrgKeyPrevNames, lDeepCopy);

                return lDeepCopy;
            }
        );
    }

    const handlePress = () =>
    {
        if (selectedNames.length === location.state.numPlayers)
        {
            navigate("/game", { state: { playerNames: selectedNames, numBalls: location.state.numBalls } });
        }
        else
        {
            navigate("/names", { state: { returningPlayers: selectedNames, numPlayers: location.state.numPlayers, numBalls: location.state.numBalls } });
        }

    }

    return (
        <div id = "conPrevNames">
            <h1 className = "pageHeading">Returning Players</h1>
            <p id = "pageInstructs">Select any returning players from below.</p>

            {
                prevNames.map(
                    (name, index) =>
                    {
                        const lId = `chk${name}`;

                        return (
                            <div className = "conPrevPlayer">
                                <label for = {lId} key = {`${name}-${index}`}>
                                    {name}
                                    <input 
                                        type = "checkbox" 
                                        id = {lId} 
                                        onChange = { () => handleChange(name) }
                                        checked = { selectedNames.includes(name) }
                                    />
                                </label>
                                <button className = "btnRemove" onClick = { () => handleRemove(name) }>&mdash;</button>
                            </div>
                        );
                    }
                )
            }

            <button id = "btnNext" className = "btnBig" onClick = {handlePress}>Next</button>
        </div>
    );
}

export default PrevNames;