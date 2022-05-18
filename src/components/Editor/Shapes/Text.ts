import { Editor } from "@src/Editor"
import classNames from "classnames";
import MarkdownIt from "markdown-it";
import style from "./text.module.css";

const md = new MarkdownIt();
md.disable("image");

/**
 * Renderer de un texto
 */
export const Text: Editor.IShapeRenderer<Editor.IShapes["text"]> = (shape, _, div) => {

    div.className = classNames(style.Text, div.className);
    div.innerHTML = "<div style=\"pointer-events: none; user-select: none\">" + md.render(shape.text) + "</div>";
    div.style.backgroundColor = shape.fill;
    div.style.border = "2px solid " + shape.stroke;
    div.style.color = shape.fontColor;
    div.style.fontSize = shape.fontSize + "px";
    div.style.width = shape.w + "px";
    div.style.pointerEvents = "initial";
    div.style.textAlign = shape.textAlign;

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