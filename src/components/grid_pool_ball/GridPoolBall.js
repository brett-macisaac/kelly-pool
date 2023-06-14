import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import globalProps, { utilsGlobalStyles } from "../../styles.js";
import PoolBall from "../pool_ball/PoolBall.js";
import ThemeContext from "../../contexts/ThemeContext.js";
import ButtonStandard from '../button_standard/ButtonStandard.js';
import "./style_grid_pool_ball.css";

function GridPoolBall({ columns, width, balls, clickBall, singleClickBall, doubleClick, showBorders })
{
    // Acquire global theme.
    const { themeName } = useContext(ThemeContext);
    let theme = globalProps.themes[themeName];

    // Determine width of balls and the gap/margin between them.
    // margin = widthBall * 35/100.
    // width = columns * widthBall + (columns - 1) * withBall * marginProportion
    //       = (columns * widthBall) + (columns * withBall * marginProportion) - (withBall * marginProportion).
    //       = widthBall * ( columns + columns * marginProportion - marginProportion )
    // widthBall = width / (columns + columns * marginProportion - marginProportion)

    const lMarginProportion = 35/100;
    let lWidthBall = width / (columns + columns * lMarginProportion - lMarginProportion);
    let lMarginBall = lWidthBall * lMarginProportion;

    // Reduce the margin slightly to eliminate the rows being a bit too wide due to floating-point precision.
    lMarginBall *= 0.999;

    const lNumRows = Math.floor(balls.length / columns) + (balls.length % columns > 0 ? 1 : 0);

    const lWidthBorder = 1;

    return (
        <div className = "gridPoolBall" style = {{ width: lNumRows > 1 ? width : 'fit-content', rowGap: lMarginBall, columnGap: lMarginBall }}>
            {
                balls.map(
                    (ball, aIndex) =>
                    {
                        return (
                            <ButtonStandard
                                key = { aIndex }
                                onPress = { () => { clickBall(ball.number, aIndex); } }
                                onSinglePress = { singleClickBall }
                                doubleClick = { doubleClick }
                                style = {{ backgroundColor: 'transparent', border: showBorders ? `${lWidthBorder}px solid ${theme.selected}` : '', borderRadius: "50%" }}
                            >
                                <PoolBall 
                                    number = { ball.number } 
                                    potted = { ball.in } 
                                    selected = { ball.selected }
                                    sizeBall = { !showBorders ? lWidthBall : lWidthBall - (2*lWidthBorder) }
                                />
                            </ButtonStandard>
                        );
                    }
                )
            }
        </div>
    );
}

GridPoolBall.propTypes =
{
    columns: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    balls: PropTypes.arrayOf(
        PropTypes.shape(
            {
                number: PropTypes.number.isRequired,
                in: PropTypes.bool.isRequired,
                selected: PropTypes.bool.isRequired
            }
        )
    ),
    clickBall: PropTypes.func.isRequired,
    singleClickBall: PropTypes.func,
    doubleClick: PropTypes.bool,
    showBorders: PropTypes.bool,
};

GridPoolBall.defaultProps = 
{
    doubleClick: false,
    showBorders: false
}

export default GridPoolBall;