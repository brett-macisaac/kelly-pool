import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import utils from "../../utils/utils.js";
import consts from "../../utils/constants.js";

import "./style_prev_names.css";

function PrevNames()
{
    const location = useLocation();

    const navigate = useNavigate();

    const lPrevNames = utils.GetFromLocalStorage(consts.lclStrgKeyPrevNames);

    const [selectedNames, setSelectedNames] = useState([]);

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

    const handlePress = () =>
    {
        navigate("/names", { state: { returningPlayers: selectedNames, numPlayers: location.state.numPlayers, numBalls: location.state.numBalls } });
    }

    return (
        <div id = "conPrevNames">
            <h1 className = "pageHeading">Returning Players</h1>
            <p id = "pageInstructs">Select any returning players from below.</p>

            {
                lPrevNames.map(
                    (name, index) =>
                    {
                        const lId = `chk${name}`;

                        return (
                            <label for = {lId} key = {`${name}-${index}`}>
                                {name}
                                <input 
                                    type = "checkbox" 
                                    id = {lId} 
                                    onChange = { () => handleChange(name) }
                                    checked = { selectedNames.includes(name) }
                                />
                            </label>
                        );
                    }
                )
            }

            <button id = "btnNext" className = "btnBig" onClick = {handlePress}>Next</button>
        </div>
    );
}

export default PrevNames;