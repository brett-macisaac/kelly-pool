import React from "react";
import PropTypes from 'prop-types';
import { useState } from 'react';

function GridBtnNum(props)
{
    let lMin = 1;

    if (props.minNum)
    {
        if (props.minNum >= 0)
        {
            lMin = props.minNum;
        }
    }

    let lSelected = -1;

    if (props.initialSelect)
    {
        if (props.initialSelect >= lMin && props.initialSelect <= lMin + props.size - 1)
        {
            lSelected = props.initialSelect;
        }
    }

    const [selected, setSelected] = useState(lSelected);


    // An array of integers from 1 to props.size.
    const lNumbers = Array.from({ length: Math.abs(Math.floor(props.size)) }, (element, index) => index + lMin);
    //console.log(lNumbers);

    // Float the element left unless its index indicates that it's at the last column.

    // * * * *
    // * * * *
    // *

    const handleClick = (event, num) =>
    {
        setSelected(num);

        props.selectNum(num);
    }

    return (
        <div className = "gridBtnNum clearFix">
            { 
                lNumbers.map(
                    (num, index) => 
                    {
                        return (
                            <button 
                                key = {num} 
                                onClick = {(event) => handleClick(event, num)}
                                style = { (index) % props.columns === 0 ? { clear: "left" } : {} }
                                className = { (num === selected || 
                                               lNumbers.length === 1) ? "btnNum btnNumSelected" : "btnNum" }
                            >
                                {num}
                            </button>
                        );
                    }
                ) 
            }
        </div>
    );
}

/*
* size: the number of buttons in the grid.
* columns: the (maximum) number of columns in the grid (if size is less than columns, there will be just one row of 
           'size' columns).
* onClick: a function that will act as an event handler for each of the buttons, into which the button's value will 
           be passed.
*/
GridBtnNum.propTypes =
{
  size: PropTypes.number.isRequired,
  columns: PropTypes.number.isRequired,
  minNum: PropTypes.number,
  selectNum: PropTypes.func.isRequired,
  initialSelect: PropTypes.number
};

export default GridBtnNum;