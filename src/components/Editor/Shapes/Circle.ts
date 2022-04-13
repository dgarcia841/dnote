import { Editor } from "@src/Editor"
import ShapeWrapper from "@src/Editor/ShapeWrapper";
/**
 * Renderer de un círculo
 */
export const  Circle: Editor.IShapeRenderer<Editor.IShapes["circle"]> = (shape, two) => {
    two.width = shape.r * 2 + 2;
    two.height = shape.r * 2 + 2;
    const c = ShapeWrapper(two.makeCircle(shape.r + 1, shape.r + 1, shape.r));
    c.stroke = shape.stroke;
    c.fill = shape.fill;
    two.update();

    const [xx, yy] = [shape.x - shape.r, shape.y - shape.r];
    const rr = shape.r;

    return {
        x: shape.x - shape.r,
        y: shape.y - shape.r,
        shape: c,
        onMouseMoving: () => {
            const [mouseX, mouseY] = Editor.get().getMouse();


            const distance = Math.max(0, Math.round(Math.min(mouseX - xx, mouseY - yy) / 2));
            shape.r = distance;
            c.radius = shape.r;
            c.position.x = shape.r + 1;
            c.position.y = shape.r + 1;
            two.width = shape.r * 2 + 2;
            two.height = shape.r * 2 + 2;
            two.update();
        },
        afterMouseMoving: () => {
            shape.x -= rr - shape.r;
            shape.y -= rr - shape.r;
        }
    }
}