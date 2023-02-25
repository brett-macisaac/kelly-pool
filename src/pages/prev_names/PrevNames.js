import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import CheckBox from '../components/check_box/CheckBox.js';

import utils from "../../utils/utils.js";
import consts from "../../utils/constants.js";

import "./style_prev_names.css";

function GetPrevNames()
{
    const lPrevNames = utils.GetFromLocalStorage(consts.lclStrgKeyPrevNames);

    return lPrevNames ? lPrevNames : [];
}

function PrevNames()
{
    const location = useLocation();

    const navigate = useNavigate();

    const [selectedNames, setSelectedNames] = useState([]);

    const [prevNames, setPrevNames] = useState(GetPrevNames());

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
            navigate(
                "/game", 
                {
                    state: 
                    {
                        playerNames: selectedNames, 
                        numBalls: location.state.numBalls, 
                        showCounts: location.state.showCounts 
                    } 
                }
            );
        }
        else
        {
            navigate(
                "/names", 
                { 
                    state: 
                    { 
                        returningPlayers: selectedNames, 
                        numPlayers: location.state.numPlayers, 
                        numBalls: location.state.numBalls, 
                        showCounts: location.state.showCounts 
                    } 
                }
            );
        }

    }

    let lLengthLongestName = 0;

    for (const prevName of prevNames)
    {
        if (prevName.length > lLengthLongestName)
        {
            lLengthLongestName = prevName.length;
        }
    }

    return (
        <div id = "conPrevNames" className = "pageContainer">

            <h1 className = "pageHeading">Returning Players</h1>

            <div className = "content hideScrollBar">

                <p id = "pageInstructs">Select returning players from below</p>

                {
                    prevNames.map(
                        (name, index) =>
                        {
                            const lId = `chk${name}`;

                            return (
                                <div className = "conPrevPlayer" key = {`${name}-${index}`}>
                                    <CheckBox 
                                        id = {lId}
                                        name = { name.padEnd(lLengthLongestName, ' ') }
                                        onChange = { () => handleChange(name) }
                                        checked = { selectedNames.includes(name) }
                                    />
                                    <button className = "btnRemove" onClick = { () => handleRemove(name) }>&mdash;</button>
                                </div>
                            );
                        }
                    )
                }

            </div>

            <div className = "footer">

                <button id = "btnNext" className = "btnBig" onClick = { handlePress }>Next</button>

            </div>

        </div>
    );
}

export default PrevNames;