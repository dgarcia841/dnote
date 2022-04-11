import { Editor } from "@src/Editor";
import React from "react";
import Circle from "../Circle";
import Rectangle from "../Rectangle";

/**
 * Renderiza cualquier figura
 */
export default class Shape extends React.Component<{ shape: Editor.IAnyShape }> {
    
    private shape<Subtype extends Editor.IShapeTypes>(type: Subtype): Editor.IShapes[Subtype] {
        type;
        return this.props.shape.shape as Editor.IShapes[Subtype];
    }

    render() {
        switch (this.props.shape.type) {
            case "rectangle":
                return <Rectangle shape={this.shape("rectangle")} />;
            case "circle":
                return <Circle shape={this.shape("circle")} />;
            default:
                return <div>no shape</div>;
        }   
    }
}