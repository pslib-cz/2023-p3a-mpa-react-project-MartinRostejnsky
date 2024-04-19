import React from "react";
import { useContext } from "react";
import { CalendarContext } from "./Context";
import styles from './Calendar.module.css';

const Button = ({children, onClick}: {children: React.ReactNode, onClick?: React.MouseEventHandler<HTMLButtonElement>}) => {
    const { 
        style, 
    } = useContext(CalendarContext);
    const { primaryColor, backgroundColor} = style;
    return (
        <button style={{backgroundColor: backgroundColor, color: primaryColor}} onClick={onClick}>{children}</button>
    )
}

const ButtonGroup = ({children} : {children: React.ReactNode}) => {
    const { 
        style, 
    } = useContext(CalendarContext);
    const { primaryColor} = style;
    return (
        <div className={styles.buttongroup} style={{borderColor: primaryColor}}>
            {children}
        </div>
    )
};



export { Button, ButtonGroup};