import { Editor } from "@src/Editor";
import React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import Box from "@mui/material/Box";

export default function ShapeSelector({ type, img }: { type: Editor.IShapeTypes, img: string }) {
    return <ListItemButton onClick={() => Editor.get().insert(type)}>
        <Box display="flex" width="100%" justifyContent="center">
            <img
                draggable={false}
                src={img}
            />
        </Box>
    </ListItemButton>
}