import React from 'react';
import PropTypes from 'prop-types';

// Variable with the colour mapping of all the balls (array )
const lColoursBalls = 
[
    { primary: "#101010", secondary: "#101010" }, // Colours for when the ball has been potted (maybe just grey).

    { primary: "#ffff00", secondary: "#ffff00" }, // 1; solid; yellow.
    { primary: "#0000ff", secondary: "#0000ff" }, // 2; solid; light blue.
    { primary: "#dd1111", secondary: "#dd1111" }, // 3; solid; light red.
    { primary: "#020246", secondary: "#020246" }, // 4; solid; dark blue.
    { primary: "#ffae00", secondary: "#ffae00" }, // 5; solid; orange.
    { primary: "#025302", secondary: "#025302" }, // 6; solid; green.
    { primary: "#8b0000", secondary: "#8b0000" }, // 7; solid; dark red.

    { primary: "#000000", secondary: "#000000" }, // 8; solid; black.

    { primary: "#ffff00", secondary: "#ffffff" }, // 9; stripes; yellow.
    { primary: "#0000ff", secondary: "#ffffff" }, // 10; stripes; light blue.
    { primary: "#dd1111", secondary: "#ffffff" }, // 11; stripes; light red.
    { primary: "#020246", secondary: "#ffffff" }, // 12; stripes; dark blue.
    { primary: "#ffae00", secondary: "#ffffff" }, // 13; stripes; orange.
    { primary: "#025302", secondary: "#ffffff" }, // 14; stripes; green.
    { primary: "#8b0000", secondary: "#ffffff" }, // 15; stripes; dark red.
];

function PoolBall(props)
{
    let lColourPrimary = props.potted ? lColoursBalls[0].primary : lColoursBalls[props.number].primary;
    let lColourSecondary = props.potted ? lColoursBalls[0].secondary : lColoursBalls[props.number].secondary;
    let lColorTertiary = props.potted ? "#606060" : "#ffffff";

    return (
        <div className = "poolBall" style = { { backgroundColor: lColourSecondary } }>
            <div className = "poolBallStripe" style = { { backgroundColor: lColourPrimary } }>
                <div className = "poolBallNumber" style = { { backgroundColor: lColorTertiary } } >
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
};

export default PoolBall;
