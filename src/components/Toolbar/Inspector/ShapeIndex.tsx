import { ListItemButton, Chip } from "@mui/material";
import { Editor } from "@src/Editor";
import React from "react";

export default ({shape}: {shape: Editor.IAnyShape}) => {
    return <ListItemButton
        selected={Editor.get().isSelected(shape.shape)}
        onClick={() => {
            Editor.get().select(shape.shape);
            Editor.get().update();
        }}
    >
        <Chip variant="outlined" label={shape.type} />
    </ListItemButton>
}