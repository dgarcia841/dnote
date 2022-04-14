import { Editor as E } from "."


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
        {
            "type": "text",
            "shape": {
                "x": 552,
                "y": 161,
                "stroke": "rgba(0, 0, 0, 0.47)",
                "fill": "rgba(255, 255, 255, 0.3)",
                "w": 398,
                "fontSize": 13,
                "fontColor": "black",
                "textAlign": "justify",
                "text": "## Texto de ejemplo\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sed aliquam tellus. Duis quis sodales eros. Sed elementum tellus id augue dignissim viverra. Vestibulum eget augue bibendum, laoreet augue ac, consectetur nisi. In tempus, quam in dictum scelerisque, massa massa volutpat dolor, vitae cursus ligula mauris at felis. Suspendisse fermentum quis lectus a vestibulum. Integer sagittis vitae quam vel pretium. Vivamus magna lectus, porta id cursus nec, laoreet vestibulum enim. Donec suscipit leo et tellus vestibulum, sit amet accumsan est scelerisque. Maecenas interdum elementum pharetra. Aenean ultrices eget enim non facilisis. Pellentesque porta dictum orci a commodo. Mauris tincidunt ornare blandit. Ut nec metus pharetra, placerat metus quis, auctor leo. Nulla et cursus sapien. Aenean nisi dui, accumsan id ultrices sed, dictum et augue."
            }
        },
        {
            "type": "ellipse",
            "shape": {
                "x": 932,
                "y": 441,
                "stroke": "#0000FF",
                "fill": "rgba(53, 154, 215, 1)",
                "rx": 86,
                "ry": 87
            }
        },
        {
            "type": "rectangle",
            "shape": {
                "x": 511,
                "y": 143,
                "stroke": "rgba(71, 155, 236, 1)",
                "fill": "rgba(134, 205, 244, 1)",
                "w": 469,
                "h": 344
            }
        }
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