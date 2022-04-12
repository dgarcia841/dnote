import { Editor } from "@src/Editor";
import useTwo from "@src/Editor/useTwo";
import React, { useEffect, useReducer, useRef, useState } from "react";
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

            const [x, setX] = useState(0);
            const [y, setY] = useState(0);
            
            useEffect(() => {
                if (!two || !ref.current) return;
        
                const {x, y, shape: s } = control(shape, two, update);
                setX(x); setY(y);

                s._renderer.elem.onclick = () => {
                    console.log("CLICKED Shape: ", shape);
                }
        
            }, [two, shape, __]);

            return <ShapeContainer selected={true} x={x} y={y} innerRef={ref} />;
        };

        return <Component shape={this.props.shape} control={this.props.control} />;
    }
}