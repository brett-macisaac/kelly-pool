import React, { useState } from 'react';
import PropTypes from 'prop-types';

import consts from '../../../utils/constants.js';
import PoolBall from "../sub_components/pool_ball/PoolBall.js";
import "./style_grid_pool_ball.css";

function GridPoolBall(props)
{
    return (
        <div id = "gridPoolBall" className = "clearFix">
            {
                props.balls.map(
                    (ball, aIndex) =>
                    {
                        const lStyleContainer = { };

                        if (aIndex % props.columns === 0)
                        {
                            lStyleContainer.clear = "left";
                        }

                        const lStyleInner = { };

                        if (ball.selected)
                        {
                            lStyleInner.borderColor = "white";
                        }

                        // Flags which determine which margins are applied to the ball (order: top, right, bottom, left).
                        // The balls' margins should be between the balls, not between the grid and whatever is around it.
                        // i.e. the margins should only be internal.
                        const lMargins = Array(4).fill(false);

                        const lIsInLastColumn = (aIndex + 1) % props.columns === 0;
                        const lIsInLastRow = consts.numPoolBalls - ball.number < props.columns;

                        if (lIsInLastColumn && lIsInLastRow)
                        {
                            lMargins.fill(false);
                        }
                        else if (lIsInLastColumn)
                        {
                            /* Margin order: top | right | bottom | left */
                            lMargins[2] = true;
                        }
                        else if (lIsInLastRow)
                        {
                            lMargins[1] = true;
                        }
                        else
                        {
                            lMargins[1] = true;
                            lMargins[2] = true;
                        }

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
                                    sizeBall = { props.sizeBall }
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
    balls: PropTypes.array,
    clickBall: PropTypes.func
};

export default GridPoolBall;