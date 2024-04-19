import React from "react";
import { useContext } from "react";
import { Calendar } from ".";
import { CalendarContext } from "./Context";

const Button = ({children, onClick}: {children: React.ReactNode, onClick?: React.MouseEventHandler<HTMLButtonElement>}) => {
    const { 
        style, 
    } = useContext(CalendarContext);
    const { primaryColor, backgroundColor} = style;
    return (
        <button style={{backgroundColor: backgroundColor, color: primaryColor}} onClick={onClick}>{children}</button>
    )
}

export default Button;