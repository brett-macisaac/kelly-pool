import React from 'react';
import PropTypes from 'prop-types';

import "./style_pool_ball.css";

import gColoursBalls from '../../../../utils/colours_pool_balls.js';

const gColourTertiary = "#ffffff";
const gColourTertiaryPotted = "#606060";
const gColourTertiarySelected = "#7c6a04";
const gColourFont = "#000000";
const gColourFontSelected = "#ffffff";

function PoolBall(props)
{
    let lColourPrimary = props.potted ? gColoursBalls[0].primary : gColoursBalls[props.number].primary;
    let lColourSecondary = props.potted ? gColoursBalls[0].secondary : gColoursBalls[props.number].secondary;
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
