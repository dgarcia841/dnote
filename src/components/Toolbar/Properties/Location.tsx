import { Grid, TextField } from "@mui/material"
import { Editor } from "@src/Editor"
import React from "react"

export default ({ shape }: { shape: Editor.IShape }) => {

    function updateProperty(prop: "x" | "y", value: string) {
        let num = parseInt(value);
        num = num > 0 ? num : 0;
        shape[prop] = num;
        Editor.get().update();
    }

    return <React.Fragment>
        <Grid item xs={6}>
            <TextField
                onChange={ev => updateProperty("x", ev.target.value)}
                value={shape.x}
                label="x"
                type="number" />
        </Grid>
        <Grid item xs={6}>
            <TextField
                onChange={ev => updateProperty("y", ev.target.value)}
                value={shape.y}
                label="y"
                type="number" />
        </Grid>
    </React.Fragment>
}