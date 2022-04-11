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
}