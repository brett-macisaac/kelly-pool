import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import globalProps, { utilsGlobalStyles } from "../../styles.js";
import utils from '../../utils/utils.js';
import consts from '../../utils/constants.js';

import optionsHeaderButtons from '../../components/options_header_buttons.js';
import PageContainer from '../../components/page_container/PageContainer.js';
import PrevPlayerLabel from '../../components/prev_player_label/PrevPlayerLabel.js';
import TextStandard from '../../components/text_standard/TextStandard.js';

function PrevNames() 
{
    const navigate = useNavigate();

    const location = useLocation();

    const [selectedNames, setSelectedNames] = useState([]);

    const [prevNames, setPrevNames] = useState([]);

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

                // Update the names in the device's internal storage.
                utils.SetInLocalStorage(consts.lclStrgKeyPrevNames, lDeepCopy);

                return lDeepCopy;
            }
        );
    }

    const handlePress = () =>
    {
        if (selectedNames.length === location.state.numPlayers)
        {
            utils.RandomiseArray(selectedNames);

            navigate(
                "/game", 
                {
                    state: 
                    { 
                        ...location.state,
                        playerNames: selectedNames,
                    }
                }
            );
        }
        else
        {
            navigate(
                "/playerNames", 
                {
                    state: 
                    { 
                        ...location.state,
                        prevPlayers: selectedNames, 
                    }
                }
            );
        }

    }

    useEffect(
        () =>
        {
            const getAndSetPrevNames = async function() 
            {
                const lPrevNames = await utils.GetFromLocalStorage(consts.lclStrgKeyPrevNames, [])

                setPrevNames(lPrevNames);
            };

            getAndSetPrevNames();
        },
        []
    );

    return ( 
        <PageContainer
            navigate = { navigate }
            buttonNavBarText = { selectedNames.length === location.state.numPlayers ? "Start" : "Next" }
            buttonNavBarHandler = { handlePress }
            optionsLeftHeaderButtons = { [ optionsHeaderButtons.back ] }
            optionsRightHeaderButtons = { [ optionsHeaderButtons.settings ] }
            style = { styles.container }
        >
            <TextStandard 
                text = { "Select any returning players"} 
                size = { 1 }
                isBold
                isItalic
                style = { styles.titlePlayer }  
            />

            {
                prevNames.map(
                    (name, index) =>
                    {
                        return (
                            <PrevPlayerLabel 
                                key = { index }
                                name = { name }
                                isSelected = { selectedNames.includes(name) }
                                onSelect = { () => handleChange(name) }
                                onRemove = { () => handleRemove(name) }
                            />
                        );
                    }
                )
            }

        </PageContainer>
    );
}

const styles =
{
    container:
    {
        rowGap: utilsGlobalStyles.spacingVertN(),
    },
};

export default PrevNames;
