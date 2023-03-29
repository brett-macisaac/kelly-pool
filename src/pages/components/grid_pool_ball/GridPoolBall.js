import React from 'react';
import PropTypes from 'prop-types';

// import consts from '../../../utils/constants.js';
import PoolBall from "../sub_components/pool_ball/PoolBall.js";
import "./style_grid_pool_ball.css";

function GridPoolBall(props)
{
    // Determine width of balls and the gap/margin between them.
    // margin = widthBall * 35/100.
    // width = columns * widthBall + (columns - 1) * withBall * marginProportion
    //       = (columns * widthBall) + (columns * withBall * marginProportion) - (withBall * marginProportion).
    //       = widthBall * ( columns + columns * marginProportion - marginProportion )
    // widthBall = width / (columns + columns * marginProportion - marginProportion)

    const lMarginProportion = 35/100;
    let lWidthBall = props.width / (props.columns + props.columns * lMarginProportion - lMarginProportion);
    let lMarginBall = lWidthBall * lMarginProportion;

    // Reduce the margin slightly to eliminate the rows being a bit too wide due to floating-point precision.
    lMarginBall *= 0.999;

    const lNumRows = Math.floor(props.balls.length / props.columns) + (props.balls.length % props.columns > 0 ? 1 : 0);

    return (
        <div className = "gridPoolBall" style = { { width: lNumRows > 1 ? props.width : 'fit-content' } }>
            {
                props.balls.map(
                    (ball, aIndex) =>
                    {
                        const lStyleContainer = { };

                        // Flags which determine which margins are applied to the ball (order: top, right, bottom, left).
                        // The balls' margins should be between the balls, not between the grid and whatever is around it.
                        // i.e. the margins should only be internal.
                        const lMargins = Array(4).fill(false);

                        const lIsInLastColumn = (aIndex + 1) % props.columns === 0;
                        const lIsInLastRow = aIndex >= (lNumRows * props.columns) - props.columns;

                        /* Margin order: top | right | bottom | left */

                        if (!lIsInLastRow)
                            lMargins[2] = true;

                        if (!lIsInLastColumn)
                        {
                            lMargins[1] = true;
                        }

                        if (aIndex === props.balls.length - 1)
                            lMargins[1] = false;

                        return (
                            <div
                                className = "conPoolBall"
                                key = {ball.number}
                                style = { lStyleContainer }
                                onClick = { () => props.clickBall(ball.number) }
                            >
                                <PoolBall 
                                    number = {ball.number} 
                                    potted = {ball.in} 
                                    selected = {ball.selected}
                                    margins = {lMargins}
                                    marginSize = {lMarginBall}
                                    sizeBall = { lWidthBall }
                                />
                            </div>
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
    balls: PropTypes.array.isRequired,
    clickBall: PropTypes.func
};

export default GridPoolBall;