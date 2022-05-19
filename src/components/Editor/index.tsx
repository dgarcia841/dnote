import { Box } from "@mui/material";
import { Editor } from "@src/Editor";
import React, { useReducer } from "react"
import Toolbar from "../Toolbar";
import Shape from "./Shape";
import Shapebar from "../Shapebar";
import DropMenu from "../DropMenu";

const editor = Editor.get();

export default () => {
    const [, update] = useReducer(x => (x + 1) % 7, 0);
    editor.setUpdater(update);

    return <React.Fragment>
        <Shapebar />
        <Box
            position="absolute"
            width="100%"
            height="100%" onClick={() => {
                Editor.get().unselect();
                Editor.get().update();
            }}>
            {editor.mapShapesReverse((s, i) => <Shape key={i} shape={s} />)}
        </Box>
        <Toolbar />
        <DropMenu />
    </React.Fragment>
}