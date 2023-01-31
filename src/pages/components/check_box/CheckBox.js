import React from 'react';

import "./style_check_box.css";

function CheckBox({ id, name, onChange, checked })
{
    return (
        <label for = {id}>
            {name}
            <input 
                type = "checkbox" 
                id = {id} 
                onChange = { onChange }
                checked = { checked }
            />
        </label>
    );
}

export default CheckBox;