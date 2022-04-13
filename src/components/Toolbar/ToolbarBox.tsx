import { Box, Chip, Grid } from "@mui/material"
import { Editor } from "@src/Editor";
import React from "react"
import Properties from "./Properties";

export default () => {
    const selected = Editor.get().getSelected();
    if (!selected) return null;
    return <React.Fragment>

        <Box m={1}>
            <Chip variant="outlined" label={selected.type} />
        </Box>

        <Box m={1}>
            <Grid container spacing={1}>
                <Properties shape={selected} />
            </Grid>
        </Box>
    </React.Fragment>
}