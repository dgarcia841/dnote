import React from "react";
import style from "./style.module.css";
import classNames from "classnames"
interface IProps {
    x: number,
    y: number,
    innerRef?: React.Ref<HTMLDivElement>,
    selected?: boolean
}

/**
 * Una caja con posición absoluta que se puede ubicar en 
 * cualquier posición y tiene una Ref de React incluida
 */
export default (props: IProps) => {
    return <div
        className={classNames(style.container, props.selected ? style.selected : null)}
        style={{ left: props.x, top: props.y }}
        ref={props.innerRef}/>
}