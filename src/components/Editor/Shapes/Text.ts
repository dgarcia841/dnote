import { Editor } from "@src/Editor"

/**
 * Renderer de un rectángulo
 */
export const Text: Editor.IShapeRenderer<Editor.IShapes["text"]> = (shape, _, div) => {

    div.innerText = shape.text;
    div.style.backgroundColor = shape.fill;
    div.style.border = "2px solid " + shape.stroke;
    div.style.color = shape.fontColor;
    div.style.fontSize = shape.fontSize + "px";
    div.style.width = shape.w + "px";
    div.style.pointerEvents = "initial";

    return {
        x: shape.x,
        y: shape.y,
        onMouseMoving() {
            const [mouseX] = Editor.get().getMouse();
            shape.w = Math.max(0, mouseX - shape.x);
            div.style.width = shape.w + "px";
        }
    }
}