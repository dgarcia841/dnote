import React, { useEffect, useRef } from "react"
import { Editor } from "@src/Editor"
import ShapeContainer from "../ShapeContainer";
import useTwo from "@src/Editor/useTwo";

/**
 * Renderer de un círculo
 */
export default ({ shape }: { shape: Editor.IShapes["circle"]}) => {

    const ref = useRef<HTMLDivElement>(null);
    const two = useTwo(ref);

    useEffect(() => {
        if (!two) return;

        two.width = shape.r*2 + 2;
        two.height = shape.r * 2 + 2;
        const c = two.makeCircle(shape.r + 1, shape.r + 1, shape.r);
        c.stroke = "red";
        two.update();

    }, [two]);

    return <ShapeContainer x={shape.x - shape.r} y={shape.y - shape.r} innerRef={ref} />;
}