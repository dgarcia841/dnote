import { Editor } from "@src/Editor";
import React from "react";
import { Circle } from "../Shapes/Circle";
import { Rectangle } from "../Shapes/Rectangle";
import BasicShape from "./BasicShape";

/**
 * Renderiza cualquier figura
 */
export default class Shape extends React.Component<{ shape: Editor.IAnyShape }> {

    /**
     * Formatea la figura con el tipo adecuado (círculo, rectángulo,etc.);
     * @param type El nombre del tipo con el cual formatear
     */
    private shape<Subtype extends Editor.IShapeTypes>(type: Subtype): Editor.IShapes[Subtype] {
        type;
        return this.props.shape.shape as Editor.IShapes[Subtype];
    }

    render() {
        switch (this.props.shape.type) {
            case "rectangle":
                return <BasicShape
                    control={Rectangle}
                    shape={this.shape("rectangle")} />
            case "circle":
                return <BasicShape
                    control={Circle}
                    shape={this.shape("circle")} />
            default:
                return <div>no shape</div>;
        }
    }
}