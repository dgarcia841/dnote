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
                stroke: "#FF0000",
                fill: "#FFEEEE",
                w: 128,
                h: 64,
            }
        }),
        ShapeCreate({
            type: "ellipse",
            shape: {
                x: 64,
                y: 64,
                stroke: "#0000FF",
                fill: "#EEEEFF",
                rx: 64,
                ry: 64
            }
        }),
        ShapeCreate({
            type: "text",
            shape: {
                x: 256,
                y: 64,
                stroke: "#FF00FF",
                fill: "#00ff00",
                w: 128,
                fontSize: 13,
                fontColor: "black",
                textAlign: "left",
                text: "hola probando sonido uwu ".repeat(32)
            }
        })
    ];

    private selected?: E.IAnyShape = undefined;
    /**
     * Función a llamar cuando es necesaria una actualización completa
     */
    private updater?: () => void;

    /**
     * Coordenadas del cursor
     */
    private mouse: [x: number, y: number] = [0, 0];

    private eventListeners: {
        event: keyof WindowEventMap,
        callback: (ev: WindowEventMap[keyof WindowEventMap]) => void
    }[] = [];

    private events: {
        event: keyof WindowEventMap,
        callback: (ev: any) => void
    }[] = [];

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
        return this.shapes;
    }

    /**
     * Mover figura seleccionada hacia arriba
     */
     public moveUp() {
        if (!this.selected) return;
        const index = this.shapes.indexOf(this.selected);
        if (index <= 0) return;

        const prev = this.shapes[index - 1];
        this.shapes[index - 1] = this.selected;
        this.shapes[index] = prev;
    }
    /**
     * Mover figura seleccionada hacia abajo
     */
    public moveDown() {
        if (!this.selected) return;
        const index = this.shapes.indexOf(this.selected);
        if (index == -1 || index >= this.shapes.length - 1) return;

        const prev = this.shapes[index + 1];
        this.shapes[index + 1] = this.selected;
        this.shapes[index] = prev;
    }
    /**
     * Comprueba si la figura seleccionada es la primera en lista
     */
    public isFirst() {
        if (!this.selected) return false;
        const index = this.shapes.indexOf(this.selected);
        return index == 0;
    }
    /**
     * Comprueba si la figura seleccionada es la última en lista
     */
    public isLast() {
        if (!this.selected) return false;
        const index = this.shapes.indexOf(this.selected);
        return index == this.shapes.length - 1;
    }
    /**
     * Mapea la lista de figuras en reversa
     */
    public mapShapesReverse<T>(ev: (shape: E.IAnyShape, index: number) => T): T[] {
        const result: T[] = [];
        for (let i = this.shapes.length - 1; i >= 0; i--) {
            result.push(ev(this.shapes[i], i));
        }
        return result;
    }

    /**
     * Obtener la figura seleccionada
     */
    public getSelected() {
        return this.selected;
    }

    /**
     * Comprueba si la figura proporcionada está seleccionada
     */
    public isSelected(shape: E.IShape) {
        return this.selected?.shape == shape;
    }

    /**
     * Selecciona una figura
     */
    public select(shape: E.IShape) {
        const find = this.shapes.find(x => x.shape == shape);
        if (!find) return false;
        this.selected = find;
        return true;
    }

    /**
     * Deselecciona la figura 
     */
    public unselect() {
        this.selected = undefined;
    }

    /**
     * Borra una figura
     */
    public delete(shape: E.IAnyShape) {
        const index = this.shapes.indexOf(shape);
        if (index == -1) return false;
        this.shapes.splice(index, 1);
        return true;
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
     * Añade un evento "onmousedown" global (en window) de un solo uso.
     * Es decir, una vez activado el evento, se elimina el listener.
     */
    public addDisposableEvent<Ev extends keyof WindowEventMap>(event: Ev, callback: (ev: WindowEventMap[Ev]) => void) {
        // Buscar el lístener que activa los eventos
        let listener = this.eventListeners.find(x => x.event == event);
        // Si no existe, crearlo
        if (!listener) {
            listener = {
                event,
                callback: (ev) => {
                    const events = this.events.filter(x => x.event == event);
                    events.forEach(x => {
                        const index = this.events.indexOf(x);
                        if (index == -1) return;
                        x.callback(ev);
                        this.events.splice(index, 1);
                    });
                }
            }
            window.addEventListener(event, listener.callback);
            this.eventListeners.push(listener);
        }

        this.events.push({
            event,
            callback
        });
    }
}