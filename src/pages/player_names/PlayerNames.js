import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import globalProps, { utilsGlobalStyles } from "../../styles.js";
import TextInputStandard from '../../components/text_input_standard/TextInputStandard.js';
import TextStandard from '../../components/text_standard/TextStandard.js';
import PageContainer from '../../components/page_container/PageContainer.js';
import utils from '../../utils/utils.js';
import consts from '../../utils/constants.js';
import { PopUpOk } from '../../components/pop_up_standard/PopUpStandard.js'
import optionsHeaderButtons from '../../components/options_header_buttons.js';

function PlayerNames() 
{
    const navigate = useNavigate();

    const location = useLocation();

    const [names, setNames] = useState(

        location.state.prevPlayers 
            ? 
                Object.assign(new Array(location.state.numPlayers).fill(""), location.state.prevPlayers) 
            :
                Array(location.state.numPlayers).fill("")

    );

    const [optionsPopUpMsg, setOptionsPopUpMsg] = useState(undefined);

    const handleTextInput = (aNewText, aIndex) =>
    {
        setNames(
            (prev) =>
            {
                return prev.map(
                    (name, index) =>
                    {
                        if (index === aIndex)
                        {
                            return aNewText;
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

    const handleStart = () => 
    {
        const lAreNamesSet = names.every((name) => name !== "");

        if (!lAreNamesSet)
        {
            setOptionsPopUpMsg(PopUpOk("Not enough names!", "You must give each player a name before you can start."));
            return;
        }

        let lPrevNames = utils.GetFromLocalStorage(consts.lclStrgKeyPrevNames);

        // If player names haven't been stored before, create an empty array in internal storage.
        if (!(lPrevNames instanceof Array))
        {
            utils.SetInLocalStorage(consts.lclStrgKeyPrevNames, []);

            lPrevNames = [];
        }

        // Store any new names in the array.
        for (const name of names)
        {
            // Skip any pre-recorded names.
            if (lPrevNames.includes(name))
                continue;

            lPrevNames.push(name);
        }

        // Store the updated names in internal storage.
        utils.SetInLocalStorage(consts.lclStrgKeyPrevNames, lPrevNames);

        utils.RandomiseArray(names);

        navigate("/game", { state: { ...location.state, playerNames: JSON.parse(JSON.stringify(names)) } });
    }

    return ( 
        <PageContainer
            navigate = { navigate }
            buttonNavBarText = "START"
            buttonNavBarHandler = { handleStart }
            optionsLeftHeaderButtons = { [ optionsHeaderButtons.back ] }
            //optionsRightHeaderButtons = { [ optionsHeaderButtons.settings ] } // State isn't saved with react-router-dom.
            optionsPopUpMsg = { optionsPopUpMsg }
            style = { styles.container }
        >
            <TextStandard 
                text = { "Enter the players' names below."} 
                size = { 1 }
                isBold
                isItalic
                style = { styles.titlePlayer }  
            />

            {
                names.map(
                    (name, index) =>
                    {
                        return (
                            <div key = { index } style = { styles.conInputPlayerName }>
                                <TextStandard 
                                    text = { `Player ${index + 1}` } 
                                    size = { 1 }
                                    isBold
                                    isItalic
                                    style = { styles.titlePlayer }  
                                />
                                <TextInputStandard 
                                    placeholder = "Name"
                                    text = { name } 
                                    onChangeText = { (newText) => handleTextInput(newText, index) }
                                    maxLength = { 12 }
                                    style = { styles.txtName }
                                />
                            </div>
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
        //justifyContent: "center", // Issue when content overflows, scroll doesn't go to top.
        alignItems: "center",
        paddingLeft: utilsGlobalStyles.spacingVertN(-2),
        paddingRight: utilsGlobalStyles.spacingVertN(-2),
    },
    conInputPlayerName:
    {
        flexDirection: "column",
        width: "65%",
        maxWidth: 500
    },
    txtName: 
    {
        // backgroundColor: "#000",
        alignItems: 'center',
        justifyContent: 'center',
        //width: "80%",
        maxWidth: 500,
        textAlign: 'center',
        padding: 5,
        // color: "#FFF"
    },
    titlePlayer: 
    {
        textAlign: "center",
        marginBottom: utilsGlobalStyles.spacingVertN(-3)
    }
};

export default PlayerNames;