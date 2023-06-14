import React from "react";
import PropTypes from 'prop-types';

import "./style_grid_btn_num.css";

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

    // An array of integers from 1 to props.size.
    const lNumbers = Array.from({ length: Math.abs(Math.floor(props.size)) }, (element, index) => index + lMin);
    //console.log(lNumbers);

    return (
        <div className = "gridBtnNum clearFix">
            { 
                lNumbers.map(
                    (num, index) => 
                    {
                        return (
                            <button 
                                key = {num} 
                                onClick = {() => props.selectNum(num)}
                                style = { (index) % props.columns === 0 ? { clear: "left" } : {} }
                                className = { (num === props.selected || 
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
  selected: PropTypes.number.isRequired
};

export default GridBtnNum;