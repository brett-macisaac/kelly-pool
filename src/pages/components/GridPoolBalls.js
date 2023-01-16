import React, { useState } from 'react';
import PropTypes from 'prop-types';

import PoolBall from "./subcomponents/PoolBall.js";

function GridPoolBalls(props)
{
    // const [balls, setBalls] = useState(

    //     Array.from({ length: consts.numPoolBalls }, (element, index) => index + 1).map(
    //         (aNumber) =>
    //         {
    //             return { number: aNumber, in: false };
    //         }
    //     )

    // );

    const handleClick = (aBallNumber) =>
    {

        // setBalls(

        //     (prev) => 
        //     {
        //         const lDeepCopy = JSON.parse(JSON.stringify(prev));

        //         return lDeepCopy.map(

        //             (ball) => 
        //             {
        //                 if (ball.number === aBallNumber)
        //                 {
        //                     ball.in = !ball.in;
        //                 }

        //                 return ball;
        //             }

        //         )
        //     }

        // );

        props.potBall(aBallNumber);
    };

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
                                onClick = { () => handleClick(ball.number) }
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
    potBall: PropTypes.func
};

export default GridPoolBalls;