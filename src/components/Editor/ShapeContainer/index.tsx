import classNames from "classnames";
import React, { useMemo, useRef } from "react";
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

    const selectedRef = useRef<HTMLDivElement>(null);

    useMemo(() => {
        if (selectedRef.current &&props.selected && props.element) {
            const sel = selectedRef.current;
            const svg = props.element.getElementsByTagName("svg")[0];
            const update = function update() {
                const rect = svg.getBoundingClientRect();
                sel.style.left = rect.left + "px";
                sel.style.top = rect.top + "px";
                sel.style.width = rect.width + "px";
                sel.style.height = rect.height + "px";
            }
            const obs = new MutationObserver(() => {
                update();
            });

            obs.observe(svg, { attributes: true });
            obs.observe(props.element, { attributes: true });
        }
    }, [props]);

    return <React.Fragment>
        <div
        className={style.container}
        style={{ left: props.x, top: props.y }}
            ref={props.innerRef} />
        {props.selected ? <div
            ref={selectedRef}
            className={classNames(style.container, style.selected)} /> : null}
    </React.Fragment>
}