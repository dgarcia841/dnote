import { Box, Chip, Divider, Grid, Typography } from "@mui/material";
import { Editor } from "@src/Editor";
import React from "react";
import Basic from "./Basic";
import Circle from "./Circle";
import Rectangle from "./Rectangle";

export default () => {

    const selected = Editor.get().getSelected();
    if (!selected) return null;
    return <Box>

        <Box m={1} flexDirection="row" justifyContent="space-between" alignItems="center" display="flex">
            <Typography variant="h4">
                Propiedades
            </Typography>
        </Box>
        <Divider />
        <Box m={1}>
            <Chip variant="outlined" label={selected.type} />
        </Box>

        <Box m={1}>
            <Grid container spacing={1}>
                <Basic shape={selected.shape} />
                {selected.type == "rectangle" ? <Rectangle shape={selected.shape as Editor.IShapes["rectangle"]} /> : null}
                {selected.type == "circle" ? <Circle shape={selected.shape as Editor.IShapes["circle"]} /> : null}
            </Grid>
        </Box>
    </Box>
}