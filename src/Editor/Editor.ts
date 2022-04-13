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
        return Object.freeze([...this.shapes]);
    }

    /**
     * Obtener la figura seleccionada
     */
    public getSelected() {
        return this.selected;
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