import { Editor } from "@src/Editor";
import React, { useReducer } from "react"
import Shape from "./Shape";
import style from "./style.module.css";

const editor = Editor.get();

export default () => {
    const [, update] = useReducer(x => (x + 1) % 7, 0);
    editor.setUpdater(update);

    return <div className={style.editor}>
        {editor.getShapes().map((s, i) => <Shape key={i} shape={s} />)}
    </div>;
}