import { Editor as E } from "."
import ShapeCreate from "./ShapeCreate";


/**
 * Central lógica del editor
 */
export class Editor {

    /**
     * Instancia de singleton
     */
    private static editor: Editor;
    /**
     * Obtener instancia del editor
     */
    public static get(): Editor {
        if (!this.editor) {
            this.editor = new Editor();
        }
        return this.editor;
    }

    /**
     * Lista de figuras en el espacio de trabajo
     */
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
    /**
     * Función a llamar cuando es necesaria una actualización completa
     */
    private updater?: () => void;

    /**
     * Coordenadas del cursor
     */
    private mouse: [x: number, y: number];

    protected constructor() { 
        window.addEventListener("mousemove", ev => {
            this.mouse = [
                ev.clientX,
                ev.clientY
            ];
        });
    };
    
    /**
     * Obtener coordenadas del mouse
     */
    public getMouse(): readonly [x: number, y: number] {
        return [...this.mouse];
    }
    /**
     * Obtener lista de figuras en el editor
     */
    public getShapes() {
        return Object.freeze([...this.shapes]);
    }
    /**
     * Llamar actualización completa
     */
    public update(): void {
        this.updater?.();
    }
    /**
     * Establece la función que hace actualización completa de la interfaz
     * @param updater Función actualizadora
     */
    public setUpdater(updater: () => void) {
        if (!this.updater) {
            this.updater = updater;
        }
    }
    /**
     * Genera un objeto que permite actualizar una o más propiedades de una figura en concreto
     * @param shape La figura a actualizar
     * @returns Un objeto con método `values()`
     */
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