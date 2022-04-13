import { Grid, TextField } from "@mui/material"
import { Editor } from "@src/Editor"
import React from "react"

export default ({ shape }: { shape: Editor.IShapes["circle"] }) => {

    function updateProperty(prop: keyof Editor.IShapes["circle"], value: string) {

        switch (prop) {
            case "r":
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
                onChange={ev => updateProperty("r", ev.target.value)}
                value={shape.r}
                label="r"
                type="number" />
        </Grid>
    </React.Fragment>
}