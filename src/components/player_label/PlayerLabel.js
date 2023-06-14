import PropTypes from 'prop-types';
import React, { useContext } from "react";

import ThemeContext from "../../contexts/ThemeContext.js";
import TextStandard from '../text_standard/TextStandard.js';
import gColoursBalls from '../../utils/colours_pool_balls.js';
import globalProps, { utilsGlobalStyles } from "../../styles.js";
import utils from '../../utils/utils.js';

const fontSize = Math.floor(utilsGlobalStyles.fontSizeN(1));

function PlayerLabel({ name, ballCount, place, isSelected, showCount, onClick, emboldenName })
{
    // Acquire global theme.
    const { themeName } = useContext(ThemeContext);
    let theme = globalProps.themes[themeName];

    const lStyleBallCount = { backgroundColor: gColoursBalls[ballCount].primary };

    if (!showCount)
        lStyleBallCount["opacity"] = 0;
   
    return (
        <div 
            style = { 
                isSelected ? { ...styles.conOuter, backgroundColor: theme.selected } : 
                             { ...styles.conOuter, backgroundColor: theme.header } 
            }
            onClick = { onClick }
            //activeOpacity = { 1.0 }
        >
            {
                place > 0 && (
                    <div style = { { ...styles.conCount, backgroundColor: gColoursBalls[place].primary } }>
                        <div style = { { ...styles.conCircle } }>
                            <TextStandard text = { `${place}${utils.OrdinalSuffix(place)}` } size = { -1 } isBold style = { styles.lblNumber } />
                        </div>
                    </div>
                )
            }

            <div className = "hideScrollBar" style = { { ...styles.conName, marginLeft: place > 0 ? 0 : fontSize } }>
                <TextStandard text = { name } isBold = { emboldenName } size = { 1 } />
            </div>

            <div style = {{ ...styles.conCount, ...lStyleBallCount }}>
                <div style = { styles.conCircle }>
                    <TextStandard text = { ballCount } size = { 1 } isBold style = { styles.lblNumber } />
                </div>
            </div>

        </div>
    );
}

const styles =
{
    conOuter:
    {
        flexDirection: "row",
        columnGap: fontSize * 0.5,
        alignItems: "stretch",
        justifyContent: "space-between",
        borderRadius: fontSize * 0.5,
        overflow: "hidden",
        width: "100%"
    },

    conName:
    {
        alignSelf: "center", // Overrides 'alignItems' property of parent.
        marginLeft: fontSize,
        overflowX: "scroll",
    },

    conCount:
    {
        alignItems: "center",
        justifyContent: "center",
        width: 3 * fontSize,
        paddingTop: 0.35 * fontSize,
        paddingBottom: 0.35 * fontSize,
        flexShrink: 0
    },
    conCircle:
    {
        alignItems: "center",
        justifyContent: "center",
        width: 1.75 * fontSize,
        height: 1.75 * fontSize,
        borderRadius: (1.75 * fontSize) / 2,
        backgroundColor: "#FFF"
    },

    conPlace:
    {
        width: 3.25 * fontSize
    },
    conCirclePlace:
    {
        width: 2.3 * fontSize,
        height: 2.3 * fontSize,
        borderRadius: (2.3 * fontSize) / 2
    },

    lblNumber:
    {
        color: "#000000"
    }

};

PlayerLabel.propTypes =
{
    name: PropTypes.string.isRequired,
    ballCount: PropTypes.number.isRequired,
    place: PropTypes.number,
    isSelected: PropTypes.bool,
    showCount: PropTypes.bool,
    onClick: PropTypes.func,
    emboldenName: PropTypes.bool,
};

PlayerLabel.defaultProps =
{
    place: -1,
    isSelected: false,
    showCount: true,
    onClick: undefined,
    emboldenName: false
}

export default PlayerLabel;