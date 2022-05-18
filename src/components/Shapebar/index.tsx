import React from "react";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import shapes from "./shapes";
import ListItemButton from "@mui/material/ListItemButton";
import { Editor } from "@src/Editor";

export default function Shapebar() {
    return <Drawer
        open={true}
        variant="persistent"
        anchor="left"
        PaperProps={{
            sx: {
                width: "240px"
            }
        }}
    >
        <Box height="100%">
            <List disablePadding>
                {shapes.map(s => <ListItemButton onClick={() => Editor.get().insert(s.type)}>
                    <Box display="flex" width="100%" justifyContent="center">
                        <img src={s.img} />
                    </Box>
                </ListItemButton>
                )}
            </List>
        </Box>
    </Drawer>
}