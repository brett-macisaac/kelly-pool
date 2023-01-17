import React, { useState } from 'react';
import PropTypes from 'prop-types';

import PoolBall from "./subcomponents/PoolBall.js";

function GridPoolBalls(props)
{
    return (
        <div id = "gridPoolBalls" className = "clearFix">
            {
                props.balls.map(
                    (ball, aIndex) =>
                    {
                        const lStyle = { };

                        if (aIndex % props.columns === 0)
                        {
                            lStyle.clear = "left";
                        }

                        if (ball.selected)
                        {
                            lStyle.borderColor = "white";
                        }

                        return (
                            <div
                                className = "conPoolBall"
                                key = {ball.number}
                                style = { lStyle }
                                onClick = { () => props.clickBall(ball.number) }
                            >
                                <PoolBall number = {ball.number} potted = {ball.in} selected = {ball.selected} />
                            </div>
                        );
                    }
                )
            }
        </div>
    );
}

GridPoolBalls.propTypes =
{
    columns: PropTypes.number.isRequired,
    balls: PropTypes.array,
    clickBall: PropTypes.func
};

export default GridPoolBalls;