import { Grid, TextField } from "@mui/material"
import ColorField from "@src/components/General/ColorField";
import { Editor } from "@src/Editor"
import React from "react"

export default ({ shape }: { shape: Editor.IShapes["text"] }) => {

    function updateProperty(prop: keyof Editor.IShapes["text"], value: string) {

        switch (prop) {
            case "w":
            case "fontSize":
                let num = parseInt(value);
                num = num > 0 ? num : 0;
                shape[prop] = num;
                break;
            case "fontColor":
                shape[prop] = value;
                break;
        }
        Editor.get().update();
    }

    return <React.Fragment>
        <Grid item xs={6}>
            <ColorField
                onChange={val => updateProperty("fontColor", val)}
                value={shape.fontColor}
                label="fontColor"
            />
        </Grid>
        <Grid item xs={6}>
            <TextField
                onChange={ev => updateProperty("w", ev.target.value)}
                value={shape.w}
                label="w"
                type="number" />
        </Grid>
        <Grid item xs={6}>
            <TextField
                onChange={ev => updateProperty("fontSize", ev.target.value)}
                value={shape.fontSize}
                label="fontSize"
                type="number" />
        </Grid>
    </React.Fragment>
}