import { Editor } from "@src/Editor"
import ShapeWrapper from "@src/Editor/ShapeWrapper";
import useTwo from "@src/Editor/useTwo";
import React, { useEffect, useRef } from "react"
import ShapeContainer from "../ShapeContainer";

/**
 * Renderer de un rectángulo
 */
export default ({ shape }: { shape: Editor.IShapes["rectangle"] }) => {

    const ref = useRef<HTMLDivElement>(null);
    const two = useTwo(ref);
    useEffect(() => {
        if (!two || !ref.current) return;

        two.width = shape.w + 2;
        two.height = shape.h + 2;
        ShapeWrapper(two.makeRectangle(shape.w/2 + 1, shape.h/2 + 1, shape.w, shape.h));
        two.update();

    }, [two]);

    return <ShapeContainer selected={true} x={shape.x} y={shape.y} innerRef={ref} />;
}