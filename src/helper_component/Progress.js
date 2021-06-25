import React from 'react'

const Progress = (props) => {
    const {bgColor, completed} = props;
    const containerStyles = {
        height: 30,
        width: '80%',
        backgroundColor: "#e0e0de",
        borderRadius: 50,
        margin: 50
    }
    const fillerStyles = {
        height: '100',
        width: `${completed}%`,
        backgroundColor: bgColor,
        borderRadius: 'inherit',
        textAlign: 'right',
        transition: 'width 1s ease-in-out',
    }
    const labelStyles = {
        padding: 5,
        color: 'white',
        fontWeight: 'bold'
    }
    return (
        <>
        <div style = {containerStyles}>
            <div style = {fillerStyles}>
                <span style = {labelStyles}>
                    {`${completed}%`}
                </span>
            </div>
        </div>
        
        </>
    )
}

export default Progress
