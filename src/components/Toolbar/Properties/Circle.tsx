import { Grid, TextField } from "@mui/material"
import { Editor } from "@src/Editor"
import React from "react"

export default ({ shape }: { shape: Editor.IShapes["ellipse"] }) => {

    function updateProperty(prop: keyof Editor.IShapes["ellipse"], value: string) {

        switch (prop) {
            case "rx":
            case "ry":
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
                onChange={ev => updateProperty("rx", ev.target.value)}
                value={shape.rx}
                label="rx"
                type="number" />
        </Grid>
        <Grid item xs={6}>
            <TextField
                onChange={ev => updateProperty("ry", ev.target.value)}
                value={shape.ry}
                label="ry"
                type="number" />
        </Grid>
    </React.Fragment>
}