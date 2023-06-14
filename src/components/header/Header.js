
import PropTypes from 'prop-types';
import React, { useContext, useState, useEffect } from "react";
//import { useIsFocused } from "@react-navigate/native"; 

import ThemeContext from "../../contexts/ThemeContext.js";
import globalProps from '../../styles';
import HeaderButton from "../header_button/HeaderButton.js";
import ButtonStandard from "../button_standard/ButtonStandard.js";
import PoolBall from "../pool_ball/PoolBall";
import consts from "../../utils/constants.js";
import utils from "../../utils/utils.js";
import "./Header.css";

/*
* An AsyncStorage key whose value is the number of the pool ball that's displayed in the header.
*/
const lclStrgKeyBallNum = "HeaderBallNum";

/*
* The custom header component that's used by the PageContainer component.

* Props:
    > navigate: the object that allows for navigate to pages in the app.
    > optionsLeftButtons: an array of options for each of the header buttons placed on the left. Each element is an 
      object that has three properties: icon, onPress, and left. The icon is a function that takes a parameter list of 
      (size, colour) and returns a vector icon (such as from Ionicons) that uses the size and colour arguments for its 
      corresponding props. The onPress prop is a function that's called when the icon is clicked.
    > optionsRightButtons: same as optionsLeftButtons but for the buttons on the right.
    > setOptionsPopUpMsg: a function that's used to have a pop-up message appear. This may be desirable to warn the user
      when they click a button in the header, such as an 'exit' button that might cause them to lose progress.
*/
const Header = ({ navigate, optionsLeftButtons, optionsRightButtons, setOptionsPopUpMsg }) => 
{
    // Acquire global theme.
    const { themeName } = useContext(ThemeContext);
    let theme = globalProps.themes[themeName];

    const [ ballNumber, setBallNumber ] = useState(8);

    /*
    * Set the ball number to the one stored locally on the user's device.
    */
    useEffect(
        () =>
        {
            const lBallNumber = utils.GetFromLocalStorage(lclStrgKeyBallNum, 8);

            console.log("Ball Get: " + lBallNumber);

            setBallNumber(lBallNumber);
        },
        []
    );

    const incrementBallNumber = () => 
    {
        let ballNumberNext = (ballNumber + 1) % (consts.numPoolBalls + 1);

        setBallNumber(ballNumberNext);

        utils.SetInLocalStorage(lclStrgKeyBallNum, ballNumberNext);
    };
  
    return (
        <div 
            style = {{ 
                ...styles.container, backgroundColor: theme.header, borderBottom: `1px solid ${theme.borders}`, //zIndex: 1
            }}
        >

            <div style = { { ...styles.sideContainer, ...styles.leftContainer } }>
                {
                    optionsLeftButtons && optionsLeftButtons.map(
                        (options, index) =>
                        {
                            return (
                                <HeaderButton 
                                    key = { index }
                                    icon = { options.icon }
                                    onPress = { 
                                        () => { options.onPress(navigate, setOptionsPopUpMsg) } 
                                    }
                                />
                            )
                        }
                    )
                }
            </div>

            <ButtonStandard
                onPress = { incrementBallNumber }
                activeOpacity = { 1 }
                style = {{ 
                    ...styles.btnBall, borderColor: theme.selected
                }}
            >
                <PoolBall 
                    number = { ballNumber } 
                    potted = { false } 
                    selected = { false }
                    sizeBall = { 46 }
                />
            </ButtonStandard>

            <div style = { { ...styles.sideContainer, ...styles.rightContainer } }>
                {
                    optionsRightButtons && optionsRightButtons.map(
                        (options, index) =>
                        {
                            return (
                                <HeaderButton 
                                    key = { index }
                                    icon = { options.icon }
                                    onPress = { 
                                        () => { options.onPress(navigate, setOptionsPopUpMsg) } 
                                    }
                                />
                            )
                        }
                    )
                }
            </div>

        </div>
    );
};

Header.propTypes =
{
    navigate: PropTypes.func.isRequired,
    optionsLeftButtons: PropTypes.arrayOf(
        PropTypes.shape(
            {
                icon: PropTypes.func.isRequired,
                onPress: PropTypes.func.isRequired
            }
        )
    ),
    optionsRightButtons: PropTypes.arrayOf(
        PropTypes.shape(
            {
                icon: PropTypes.func.isRequired,
                onPress: PropTypes.func.isRequired
            }
        )
    ),
    setOptionsPopUpMsg: PropTypes.func
};

Header.defaultProps =
{
}

const styles =
{
    container: 
    {
        //flex: 1,
        //width: "100%",
        flexDirection: "row",
        alignItems: "center",
        height: globalProps.heightHeader,
        width: "100%"
    },
    sideContainer: 
    {
        width: 1,
        flexGrow: 1,
        flexDirection: "row"
    },
    leftContainer:
    {
        justifyContent: "flex-start",
    },
    rightContainer:
    {
        justifyContent: "flex-end",
    },
    btnBall:
    {
        backgroundColor: 'transparent', 
        width: 48, 
        height: 48, 
        borderRadius: 24,
        borderWidth: 2,
        borderStyle: "solid"
    }
};

export default Header;