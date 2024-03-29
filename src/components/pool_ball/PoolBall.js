import React from 'react';
import PropTypes from 'prop-types';

import "./style_pool_ball.css";

import gColoursBalls from '../../utils/colours_pool_balls.js';

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
        lColorTertiary = gColourTertiarySelected;
    
    const lColourFont = props.selected ? gColourFontSelected : gColourFont;

    const lStyleBall = { 
        backgroundColor: lColourSecondary,
        width: `${props.sizeBall}px`,
        height: `${props.sizeBall}px`,
        padding: `${props.sizeBall * 1 / 6}px 0px`,
    };

    const lStyleStripe = {
        backgroundColor: lColourPrimary,
        width: props.sizeBall,
        height: `${props.sizeBall * 2 / 3}px`,
        padding: `${props.sizeBall * 1 / 12}px 0px`
    };

    const lStyleNumber = {
        backgroundColor: lColorTertiary,
        color: lColourFont,
        width: `${props.sizeBall * 1 / 2}px`,
        height: `${props.sizeBall * 1 / 2}px`,
        fontSize: `${props.sizeBall * 27 / 100}px`
    };

    return (
        <div className = "poolBall" style = { lStyleBall }>
            <div className = "poolBallStripe" style = { lStyleStripe }>
                <div className = "poolBallNumber unselectable" style = { lStyleNumber } >
                    { props.number }
                </div>
            </div>
        </div>
    );
}

PoolBall.propTypes =
{
    number: PropTypes.number.isRequired,
    potted: PropTypes.bool.isRequired,
    selected: PropTypes.bool,
    sizeBall: PropTypes.number,
};

PoolBall.defaultProps =
{
    number: 11,
    potted: false,
    selected: false,
    sizeBall: PropTypes.number
}

export default PoolBall;
