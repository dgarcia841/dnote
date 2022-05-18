import React from "react";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import shapes from "./shapes";
import ShapeSelector from "./shape";

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
                {shapes.map((s, i) => <ShapeSelector key={i} {...s} />)}
            </List>
        </Box>
    </Drawer>
}