import { Editor } from "@src/Editor";
import React, { useEffect, useReducer, useRef } from "react"
import Shape from "./Shape";

const editor = Editor.get();

export default () => {
    const [, update] = useReducer(x => (x + 1) % 7, 0);
    editor.setUpdater(update);

    const divRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const div = divRef.current;
        if (!div) return;

    }, []);

    return <div ref={divRef}>
        {editor.getShapes().map((s, i) => <Shape key={i} shape={s} />)}
    </div>;
}