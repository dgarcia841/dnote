import { Editor } from "@src/Editor";
import ShapeCreate from "@src/Editor/ShapeCreate";
import React, { useEffect, useRef } from "react"
import Shape from "./Shape";
export default () => {

    const divRef = useRef<HTMLDivElement>(null);
    const shapes: Editor.IAnyShape[] = [
        ShapeCreate({
            type: "rectangle",
            shape: {
                x: 32,
                y: 64,
                w: 128,
                h: 64
            }
        }),
        ShapeCreate({
            type: "circle",
            shape: {
                x: 256,
                y: 32,
                r: 32
            }
        })
    ];

    useEffect(() => {
        const div = divRef.current;
        if (!div) return;

    }, []);

    return <div ref={divRef}>
        {shapes.map((s, i) => <Shape key={i} shape={s} />)}
    </div>;
}