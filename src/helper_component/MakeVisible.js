import React, { useEffect } from 'react'
import { useState } from 'react'

const MakeVisible = (props) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setVisible(true);
        }, props.delay);
    }, [props.delay]);
    return visible ? <div>{props.children}</div> : <div />;
};

export default MakeVisible
