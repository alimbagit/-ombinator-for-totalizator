import React from 'react';
import { TextField } from '@material-ui/core';

/**Принимает в качестве аргумента текстовый формат ставок и отоброжает его */
const TextTotoViewer = () => {

    const [value, setValue] = React.useState("");
    
    return (

        <TextField value={value} />
    )
}

export default TextTotoViewer