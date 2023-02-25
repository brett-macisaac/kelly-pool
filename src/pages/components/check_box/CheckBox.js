import React from 'react';

import "./style_check_box.css";

function CheckBox({ id, name, onChange, checked })
{
    return (
        <label htmlFor = {id}>
            <pre>{name}</pre>
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