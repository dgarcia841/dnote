import { Editor } from ".";
/**
 * Asigna tipado según el tipo de la figura que se esté creando
 * @param shape El contenedor de figura
 * @returns El mismo contenedor de figura
 */
export default function ShapeCreate<Type extends Editor.IShapeTypes>(shape: Editor.IAnyShape<Type>) {
    return shape;
}