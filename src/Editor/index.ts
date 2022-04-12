import { Editor as E } from "./Editor"
import Two from "two.js"
import { Shape } from "two.js/src/shape"
import { IWrappedShape } from "./ShapeWrapper"
/**
 * Declaraciones generales para el editor
 */
export namespace Editor {
    /**
     * Una figura editable
     */
    export interface IShape {
        x: number,
        y: number
    }
    /**
     * Figuras editables particulares
     */
    export interface IShapes {
        rectangle: IShape & {
            w: number,
            h: number
        },
        circle: IShape & {
            r: number
        }
    }
    /**
     * Nombre de las figuras editables particulares
     */
    export type IShapeTypes = keyof IShapes;
    /**
     * Contenedor de una figura y su tipo
     */
    export interface IAnyShape<Type extends IShapeTypes = IShapeTypes> {
        shape: IShapes[Type],
        type: Type
    }

    /**
     * Función que renderiza una figura
     */
    export type IShapeRenderer<S extends Editor.IShape> = (shape: S, two: Two, update: () => void) => {
        x: number,
        y: number,
        shape: IWrappedShape<Shape>
    };
}

export class Editor extends E { };