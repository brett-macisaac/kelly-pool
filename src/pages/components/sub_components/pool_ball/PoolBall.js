import React from 'react';
import PropTypes from 'prop-types';

import "./style_pool_ball.css";

// Variable with the colour mapping of all the balls (array )
const lColoursBalls = 
[
    { primary: "#101010", secondary: "#101010" }, // Colours for when the ball has been potted (maybe just grey).

    { primary: "#e2e202", secondary: "#e2e202" }, // 1; solid; yellow.
    { primary: "#0000ff", secondary: "#0000ff" }, // 2; solid; light blue.
    { primary: "#dd1111", secondary: "#dd1111" }, // 3; solid; light red.
    { primary: "#6d056d", secondary: "#6d056d" }, // 4; solid; purple.
    { primary: "#ffae00", secondary: "#ffae00" }, // 5; solid; orange.
    { primary: "#025302", secondary: "#025302" }, // 6; solid; green.
    { primary: "#8b0000", secondary: "#8b0000" }, // 7; solid; dark red.

    { primary: "#000000", secondary: "#000000" }, // 8; solid; black.

    { primary: "#e2e201", secondary: "#ffffff" }, // 9; stripes; yellow.
    { primary: "#0000ff", secondary: "#ffffff" }, // 10; stripes; light blue.
    { primary: "#dd1111", secondary: "#ffffff" }, // 11; stripes; light red.
    { primary: "#6d056d", secondary: "#ffffff" }, // 12; stripes; purple.
    { primary: "#ffae00", secondary: "#ffffff" }, // 13; stripes; orange.
    { primary: "#025302", secondary: "#ffffff" }, // 14; stripes; green.
    { primary: "#8b0000", secondary: "#ffffff" }, // 15; stripes; dark red.
];

const gColourTertiary = "#ffffff";
const gColourTertiaryPotted = "#606060";
const gColourTertiarySelected = "#7c6a04";
const gColourFont = "#000000";
const gColourFontSelected = "#ffffff";

function PoolBall(props)
{
    let lColourPrimary = props.potted ? lColoursBalls[0].primary : lColoursBalls[props.number].primary;
    let lColourSecondary = props.potted ? lColoursBalls[0].secondary : lColoursBalls[props.number].secondary;
    let lColorTertiary = props.potted ? gColourTertiaryPotted : gColourTertiary;

    if (props.selected)
    {
        lColorTertiary = gColourTertiarySelected;
    }

    let lColourFont = props.selected ? gColourFontSelected : gColourFont;

    let lStyleBall = { backgroundColor: lColourSecondary };

    if (!props.margins[0])
    {
        lStyleBall.marginTop = "0";
    }

    if (!props.margins[1])
    {
        lStyleBall.marginRight = "0";
    }

    if (!props.margins[2])
    {
        lStyleBall.marginBottom = "0";
    }

    if (!props.margins[3])
    {
        lStyleBall.marginLeft = "0";
    }

    return (
        <div className = "poolBall" style = { lStyleBall }>
            <div className = "poolBallStripe" style = { { backgroundColor: lColourPrimary } }>
                <div className = "poolBallNumber" style = { { backgroundColor: lColorTertiary, color: lColourFont } } >
                    {props.number}
                </div>
            </div>
        </div>
    );
}

PoolBall.propTypes =
{
    number: PropTypes.number.isRequired,
    potted: PropTypes.bool.isRequired,
    margins: PropTypes.array.isRequired,
    selected: PropTypes.bool
};

export default PoolBall;
