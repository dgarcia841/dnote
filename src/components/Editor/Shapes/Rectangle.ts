import { Editor } from "@src/Editor"
import ShapeWrapper from "@src/Editor/ShapeWrapper";

/**
 * Renderer de un rectángulo
 */
export const Rectangle: Editor.IShapeRenderer<Editor.IShapes["rectangle"]> = (shape, two) => {
    two.width = shape.w + 2;
    two.height = shape.h + 2;
    const rect = ShapeWrapper(two.makeRectangle(shape.w / 2 + 1, shape.h / 2 + 1, shape.w, shape.h));
    rect.stroke = shape.stroke;
    rect.fill = shape.fill;
    two.update();

    return {
        x: shape.x,
        y: shape.y,
        shape: rect
    }
}