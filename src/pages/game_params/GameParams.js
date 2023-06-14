import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import globalProps, { styles as globalStyles, utilsGlobalStyles } from "../../styles.js";
import consts from '../../utils/constants.js';
import utils from '../../utils/utils.js';

import GridPoolBall from '../../components/grid_pool_ball/GridPoolBall.js';
import CountLabel from '../../components/count_label/CountLabel.js';
import TextStandard from '../../components/text_standard/TextStandard.js';
import CountContainer from '../../components/count_container/CountContainer.js';
import CheckBox from '../../components/check_box/CheckBox.js';
import PageContainer from '../../components/page_container/PageContainer.js';
import Container from '../../components/container/Container.js';
import optionsHeaderButtons from '../../components/options_header_buttons.js';
import TextInputStandard from '../../components/text_input_standard/TextInputStandard.js';

function GameParameters() 
{
    const navigate = useNavigate();

    const [numPlayers, setNumPlayers] = useState(2);

    const [numBalls, setNumBalls] = useState(0);

    const [showCounts, setShowCounts] = useState(true);

    const [optionsPopUpMsg, setOptionsPopUpMsg] = useState(undefined);

    const selectNumPlayers = (aNum) =>
    {
        setNumPlayers(aNum);
    };

    const selectNumBalls = (aNum) =>
    {
        setNumBalls(aNum);
    };

    const toggleShowCounts = () =>
    {
        setShowCounts(
            (prev) =>
            {
                return !prev;
            }
        );
    }

    const handleNext = () =>
    {
        if (numPlayers <= 0 || numBalls <= 0)
        {
            setOptionsPopUpMsg(
                {
                    title: "No balls selected!",
                    message: "You must select the number of balls per player to continue.",
                    buttons: [
                        { text: "OK" }
                    ],
                }
            );
            //Alert.alert("No balls selected!", "You must select the number of balls per player to continue.", undefined, { cancelable: true });
            return;
        }

        const lPrevNames = utils.GetFromLocalStorage(consts.lclStrgKeyPrevNames);

        const lGoToPrevNamesPages = lPrevNames instanceof Array && lPrevNames.length > 0;

        /*
        * If previous names have been recorded, go to the page that allows the user to select them; otherwise, go
          directly to the names page.
        */
        if (lGoToPrevNamesPages)
        {
            //console.log("Go to prevNames");
            navigate("/prevNames", { state: { numPlayers: numPlayers, numBalls: numBalls, showCounts: showCounts } });
        }
        else
        {
            //console.log("Go to playerNames");
            navigate("/playerNames", { state: { numPlayers: numPlayers, numBalls: numBalls, showCounts: showCounts } });
        }
    };

    const maxNumBalls = () =>
    {
        return Math.floor(consts.numPoolBalls / numPlayers);
    }

    useEffect(
        () =>
        {
            const lMaxBallsPerPlayer = maxNumBalls();

            console.log("Max balls per player: " + lMaxBallsPerPlayer);
            console.log("Balls per player: " + numBalls);

            if (lMaxBallsPerPlayer < numBalls || lMaxBallsPerPlayer === 1)
            {
                setNumBalls(lMaxBallsPerPlayer);
            }
        },
        [numPlayers]
    );

    return ( 
        <PageContainer
            navigate = { navigate }
            buttonNavBarText = "NEXT"
            buttonNavBarHandler = { handleNext }
            optionsLeftHeaderButtons = { [ optionsHeaderButtons.back ] }
            optionsRightHeaderButtons = { [ optionsHeaderButtons.settings ] }
            optionsPopUpMsg = { optionsPopUpMsg }
            style = { styles.container }
        >

            <CountContainer 
                title = "Players" count = { numPlayers } size = { 1 }
                style = {{ ...styles.conBalls }}
            >
                <div style = { styles.conPrompt }>
                    <TextStandard text = "Select the number of players" isItalic  style = { styles.prompt } />
                </div>

                <GridPoolBall 
                    columns = { 4 }
                    clickBall = { selectNumPlayers }
                    balls = { 
                        Array.from({ length: 14 }, (el, index) => index + 2).map(
                            (aNum) =>
                            {
                                return { number: aNum, in: false, selected: aNum === numPlayers };
                            }
                        ) 
                    }
                    width = { globalProps.widthGridPoolBall }
                    showBorders
                />
            </CountContainer>

            <CountContainer 
                title = "Balls" count = { numBalls } size = { 1 }
                styleInner = {{ ...styles.conBalls }}
            >
                <div style = { styles.conPrompt }>
                    <TextStandard text = "Select the number of balls per player" isItalic style = { styles.prompt } />
                </div>

                <GridPoolBall 
                    columns = { 4 }
                    clickBall = { selectNumBalls }
                    balls = { 
                        Array.from({ length: maxNumBalls() }, (el, index) => index + 1).map(
                            (aNum) =>
                            {
                                return { number: aNum, in: false, selected: aNum === numBalls };
                            }
                        ) 
                    }
                    width = { globalProps.widthGridPoolBall }
                    showBorders
                />
            </CountContainer>

            <Container style = { styles.conCheckBox }>

                <div style = { styles.conPrompt }>
                    <TextStandard text = "Want to hide the number of balls each player has remaining? Uncheck this checkbox." isItalic />
                </div>

                <CheckBox 
                    text = "Show Players' Ball Counts:" 
                    isChecked = { showCounts } 
                    onPress = { toggleShowCounts } 
                    // style = {{ width: globalStyles.conGeneral.width }} 
                />
            </Container>

        </PageContainer>
    );
}

const styles =
{
    container:
    {
        flexDirection: "row",
        flexWrap: "wrap",
        columnGap: utilsGlobalStyles.spacingVertN(1),
        rowGap: utilsGlobalStyles.spacingVertN(0),
        justifyContent: "center",
        alignItems: "flex-start"
    },
    conBalls: 
    {
        alignItems: "center"
    },
    conPrompt:
    {
        //justifyContent: "center", 
        marginBottom: utilsGlobalStyles.spacingVertN(-2)
    },
    prompt: 
    {
        textAlign: "center"
    },
    conCheckBox:
    {
        flexDirection: "column"
    }
};

export default GameParameters;