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
        shape: rect,
        onMouseMoving: () => {
            const [mouseX, mouseY] = Editor.get().getMouse();

            shape.w = Math.max(0, mouseX - shape.x);
            shape.h = Math.max(0, mouseY - shape.y);

            rect.position.x = shape.w / 2 + 1;
            rect.position.y = shape.h / 2 + 1;
            rect.width = shape.w;
            rect.height = shape.h;
            two.width = shape.w + 2;
            two.height = shape.h + 2;
            two.update();
        }
    }
}