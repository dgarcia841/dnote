import { Grid, TextField } from "@mui/material"
import { Editor } from "@src/Editor"
import React from "react"

export default ({ shape }: { shape: Editor.IShape }) => {

    function updateProperty(prop: keyof Editor.IShape, value: string) {

        switch (prop) {
            case "x":
            case "y":
                let num = parseInt(value);
                num = num > 0 ? num : 0;
                shape[prop] = num;
                break;
            case "fill":
            case "stroke":
                shape[prop] = value;
                break;
        }
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
        <Grid item xs={6}>
            <TextField
                onChange={ev => updateProperty("fill", ev.target.value)}
                value={shape.fill}
                label="fill"
                type="color"
                sx={{width:"100%"}}
            />
        </Grid>
        <Grid item xs={6}>
            <TextField
                onChange={ev => updateProperty("stroke", ev.target.value)}
                value={shape.stroke}
                label="stroke"
                type="color"
                sx={{width:"100%"}}
            />
        </Grid>
    </React.Fragment>
}