import { Editor } from "@src/Editor";
import React from "react";
import Basic from "./Basic";
import Circle from "./Circle";
import Rectangle from "./Rectangle";

export default ({ shape }: { shape: Editor.IAnyShape }) => {
    return <React.Fragment>
        <Basic shape={shape.shape} />
        {shape.type == "rectangle" ? <Rectangle shape={shape.shape as Editor.IShapes["rectangle"]} />: null}
        {shape.type == "circle" ? <Circle shape={shape.shape as Editor.IShapes["circle"]} />: null}
    </React.Fragment>
}