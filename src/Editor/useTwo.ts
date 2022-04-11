import React, { useEffect, useState } from "react"
import Two from "two.js"

/**
 * Crea una instancia de Two creada sobre un componente HTML
 * @param ref La referencia del componente HTML en donde crear la instancia de Two
 * @returns La instancia de Two creada
 */
export default function useTwo(ref: React.RefObject<HTMLDivElement>) {
    const [two, setTwo] = useState<Two | undefined>(undefined);
    useEffect(() => {
        if (ref.current) {
            const two = new Two().appendTo(ref.current);
            setTwo(two);
        }
    }, []);
    return two;
}