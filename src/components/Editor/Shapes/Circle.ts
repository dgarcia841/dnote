import { Editor } from "@src/Editor"
import ShapeWrapper from "@src/Editor/ShapeWrapper";
/**
 * Renderer de un círculo
 */
export const Ellipse: Editor.IShapeRenderer<Editor.IShapes["ellipse"]> = (shape, two) => {
    two.width = shape.rx * 2 + 2;
    two.height = shape.ry * 2 + 2;
    const c = ShapeWrapper(two.makeEllipse(shape.rx + 1, shape.ry + 1, shape.rx, shape.ry));
    c.stroke = shape.stroke;
    c.fill = shape.fill;
    two.update();

    const [xx, yy] = [shape.x - shape.rx, shape.y - shape.ry];
    const [rx, ry] = [shape.rx, shape.ry];

    return {
        x: shape.x - shape.rx,
        y: shape.y - shape.ry,
        shape: c,
        onMouseMoving: () => {
            const [mouseX, mouseY] = Editor.get().getMouse();


            const dx = Math.max(0, Math.round((mouseX - xx) / 2));
            const dy = Math.max(0, Math.round((mouseY - yy) / 2));

            shape.rx = dx;
            shape.ry = dy;
            c.width = dx * 2;
            c.height = dy * 2;
            c.position.x = shape.rx + 1;
            c.position.y = shape.ry + 1;
            two.width = shape.rx * 2 + 2;
            two.height = shape.ry * 2 + 2;
            two.update();
        },
        afterMouseMoving: () => {
            shape.x -= rx - shape.rx;
            shape.y -= ry - shape.ry;
        }
    }
}