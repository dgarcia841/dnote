import { Editor as E } from "."
import ShapeCreate from "./ShapeCreate";
export class Editor {

    private static editor: Editor;
    public static get(): Editor {
        if (!this.editor) {
            this.editor = new Editor();
        }
        return this.editor;
    }


    private shapes: E.IAnyShape[] = [
        ShapeCreate({
            type: "rectangle",
            shape: {
                x: 32,
                y: 64,
                w: 128,
                h: 64
            }
        }),
        ShapeCreate({
            type: "circle",
            shape: {
                x: 64,
                y: 64,
                r: 64
            }
        })
    ];
    private updater?: () => void;
    protected constructor() { };

    public getShapes() {
        return Object.freeze([...this.shapes]);
    }

    public update(): void {
        this.updater?.();
    }
    public setUpdater(updater: () => void) {
        if (!this.updater) {
            this.updater = updater;
        }
    }

    public set<Type extends E.IShape>(shape: Type) {
        type IProps = { [k in keyof Type]?: Type[k] };
        return {
            values(props: IProps) {
                shape; props;
                console.log("owo");
            }
        };
    }
}