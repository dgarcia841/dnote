import { Editor } from "@src/Editor";
import rectangle from "@assets/rectangle.svg";
import ellipse from "@assets/ellipse.svg";
import text from "@assets/text.svg";

const shapes: {
    img: string,
    type: Editor.IShapeTypes
}[] = [
    {
        type: "rectangle",
        img: String(rectangle)
    },
    {
        type: "ellipse",
        img: String(ellipse)
    },
    {
        type: "text",
        img: String(text)
    }
];

export default shapes;