import { Grid, TextField } from "@mui/material"
import { Editor } from "@src/Editor"
import React from "react"

export default ({ shape }: { shape: Editor.IShapes["rectangle"] }) => {

    function updateProperty(prop: keyof Editor.IShapes["rectangle"], value: string) {

        switch (prop) {
            case "w":
            case "h":
                let num = parseInt(value);
                num = num > 0 ? num : 0;
                shape[prop] = num;
                break;
        }
        Editor.get().update();
    }

    return <React.Fragment>
        <Grid item xs={6}>
            <TextField
                onChange={ev => updateProperty("w", ev.target.value)}
                value={shape.w}
                label="w"
                type="number" />
        </Grid>
        <Grid item xs={6}>
            <TextField
                onChange={ev => updateProperty("h", ev.target.value)}
                value={shape.h}
                label="h"
                type="number" />
        </Grid>
    </React.Fragment>
}