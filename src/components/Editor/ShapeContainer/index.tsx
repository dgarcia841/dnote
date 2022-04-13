import classNames from "classnames";
import React from "react";
import style from "./style.module.css";
interface IProps {
    x: number,
    y: number,
    innerRef?: React.Ref<HTMLDivElement>,
    selected?: boolean,
    element?: HTMLDivElement | undefined | null
}

/**
 * Una caja con posición absoluta que se puede ubicar en 
 * cualquier posición y tiene una Ref de React incluida
 */
export default (props: IProps) => {

    let selected = false;
    let w = 0, h = 0;
    if (props.selected && props.element) {

        const svg = props.element.getElementsByTagName("svg")[0];
        if (svg) {
            selected = true;
            const rect = svg.getBoundingClientRect();
            w = rect.width;
            h = rect.height;
        }

    }

    return <React.Fragment>
        <div
        className={style.container}
        style={{ left: props.x, top: props.y }}
            ref={props.innerRef} />
        {selected ? <div
            style={{ left: props.x, top: props.y, width: w, height: h }}
            className={classNames(style.container, style.selected)} /> : null}
    </React.Fragment>
}