import { Editor } from "@src/Editor"
import ShapeWrapper from "@src/Editor/ShapeWrapper";
/**
 * Renderer de un círculo
 */
export const  Circle: Editor.IShapeRenderer<Editor.IShapes["circle"]> = (shape, two) => {
    two.width = shape.r * 2 + 2;
    two.height = shape.r * 2 + 2;
    const c = ShapeWrapper(two.makeCircle(shape.r + 1, shape.r + 1, shape.r));
    c.stroke = "red";
    c.fill = "transparent";
    two.update();

    return {
        x: shape.x - shape.r,
        y: shape.y - shape.r,
        shape: c
    }
}