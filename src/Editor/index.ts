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
        y: number,
        stroke: string,
        fill: string
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
     * Propiedades disponibles en todas las figuras
     */
    export type IShapePropertyObject = {
        [s in keyof IShapes]: keyof IShapes[s]
    }
    /**
     * Propiedades disponibles en todas las figuras
     */
    export type IShapeProperties = IShapePropertyObject[keyof IShapePropertyObject];
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
        shape: IWrappedShape<Shape>,
        onMouseMoving?: () => void,
        afterMouseMoving?: () => void
    };
}

export class Editor extends E { };