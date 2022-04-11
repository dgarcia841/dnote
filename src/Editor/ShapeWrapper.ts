import { Shape } from "two.js/src/shape"

type IWrappedShape<S extends Shape> = {
    _renderer: { elem: SVGElement }
} & Omit<S, "_renderer">;

/**
 * Añade declaraciones de tipos a la propiedad _renderer.elem de la figura
 */
export default function ShapeWrapper<S extends Shape>(shape: S): IWrappedShape<S>  {
    return shape as unknown as IWrappedShape<S>;
}