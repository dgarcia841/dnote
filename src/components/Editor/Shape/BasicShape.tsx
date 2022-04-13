import { Editor } from "@src/Editor";
import useTwo from "@src/Editor/useTwo";
import React, { useEffect, useMemo, useReducer, useRef, useState } from "react";
import ShapeContainer from "../ShapeContainer"

/**
 * Contenedor para una figura genérica.
 */
export default class BasicShape<S extends Editor.IShape> extends React.Component<{
    /**
     * Figura a renderizar
     */
    shape: S,
    /**
     * Función que contiene la lógica de renderizado.
     * @returns Las coordenadas absolutas de la caja contenedora
     */
    control: Editor.IShapeRenderer<S>
}> {
    render(): React.ReactNode {
        /**
         * El contenedor actualizable
         */
        const Component = ({ shape, control }: typeof this.props) => {
            
            const [__, update] = useReducer(x => (x + 1) % 7, 0);
            const ref = useRef<HTMLDivElement>(null);
            const two = useTwo(ref);

            // Estado con las posiciones de la figura
            const [x, setX] = useState(0);
            const [y, setY] = useState(0);

            // Desplazamiento del contenedor relativo  al mouse
            const [boxOffset, setBoxOffset] = useState<[x: number, y: number]>([0, 0]);
            // Desplazamiento de la figura relativo  al mouse
            const [shapeOffset, setShapeOffset] = useState<[x: number, y: number]>([0, 0]);

            // ¿La figura se está moviendo o no?
            const [moving, setMoving] = useState(false);

            const [dragFunction, setDragFunction] = useState<undefined | {
                onMouseMoving?: () => void,
                afterMouseMoving?: () => void
            }>({ onMouseMoving: () => 0 });
            const [dragging, setDragging] = useState(false);

            // Movimiento de la figura con el mouse
            const move = useMemo(() => () => {
                if (!ref.current) return;
                const [x, y] = Editor.get().getMouse();;
                ref.current.style.left = (x - boxOffset[0]) + "px";
                ref.current.style.top = (y - boxOffset[1]) + "px";
                shape.x = x - shapeOffset[0];
                shape.y = y - shapeOffset[1];

            }, [ref, boxOffset]);

            // Apagar o encender función de movimiento
            useEffect(() => {
                if (!ref.current) return;
                if (moving) {
                    window.addEventListener("mousemove", move);
                }
                else {
                    window.removeEventListener("mousemove", move);
                }
            }, [moving, ref]);
            
            useEffect(() => {
                if (!two || !ref.current) return;
                const div = ref.current;
                const {x, y, shape: s, onMouseMoving, afterMouseMoving } = control(shape, two, update);
                setX(x); setY(y);

                if(onMouseMoving)
                    setDragFunction({onMouseMoving, afterMouseMoving});

                // Una vez renderizado el SVG, añadir evento click para iniciar arrastre
                s._renderer.elem.onmousedown = () => {
                    const box = div.getBoundingClientRect();
                    const [mouseX, mouseY] = Editor.get().getMouse()
                    setBoxOffset([
                        mouseX - box.x,
                        mouseY - box.y
                    ]);
                    setShapeOffset([
                        mouseX - shape.x,
                        mouseY - shape.y
                    ]);
                    Editor.get().select(this.props.shape);
                    setMoving(true);
                }

                // Al pulsar control, iniciar redimensionado de la figura con el mouse
                Editor.get().addDisposableEvent("keydown", ev => {
                    if (Editor.get().isSelected(shape) && ev.key == 'Control') {
                        setDragging(true);
                    }
                });
        
            }, [two, shape, __]);

            useEffect(() => {

                if (dragging) {
                    if(dragFunction?.onMouseMoving)
                        window.addEventListener("mousemove", dragFunction.onMouseMoving);
                    Editor.get().addDisposableEvent("keyup", ev => {
                        if (ev.key == 'Control') {
                            if(dragFunction?.onMouseMoving)
                                window.removeEventListener("mousemove", dragFunction.onMouseMoving);
                            dragFunction?.afterMouseMoving?.();
                            setDragging(false);
                            Editor.get().update();
                        }
                    });
                }

            }, [dragging, dragFunction]);

            useEffect(() => {
                if (moving) {
                    // Al soltar el mouse, detener arrastre
                    Editor.get().addDisposableEvent("mouseup", () => {
                        setMoving(false);
                        Editor.get().update();
                    });
                }
            }, [moving]);

            return <ShapeContainer
                selected={Editor.get().isSelected(this.props.shape)}
                x={x}
                y={y}
                innerRef={ref}
                element={ref.current}
            />;
        };

        return <Component shape={this.props.shape} control={this.props.control} />;
    }
}