import { Editor } from "@src/Editor";
import React, { useReducer } from "react"
import Toolbar from "../Toolbar";
import Shape from "./Shape";

const editor = Editor.get();

export default () => {
    const [, update] = useReducer(x => (x + 1) % 7, 0);
    editor.setUpdater(update);

    return <React.Fragment>
        <div>
            {editor.getShapes().map((s, i) => <Shape key={i} shape={s} />)}
        </div>;
        <Toolbar />
    </React.Fragment>
}