import { Button, Dialog, Grid, TextField, ToggleButton, ToggleButtonGroup } from "@mui/material"
import ColorField from "@src/components/General/ColorField";
import { Editor } from "@src/Editor"
import React, { useEffect, useState } from "react"
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';

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

    const [edit, setEdit] = useState(false);

    const [text, setText] = useState("");
    useEffect(() => setText(shape.text), [shape]);

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
        <Grid item xs={3}>
            <TextField
                onChange={ev => updateProperty("fontSize", ev.target.value)}
                value={shape.fontSize}
                label="fontSize"
                type="number" />
        </Grid>
        <Grid item xs={9}>
            <ToggleButtonGroup
                value={shape.textAlign}
                onChange={(_, newValue) => {
                    shape.textAlign = newValue;
                    Editor.get().update();
                }}
                exclusive
            >
                <ToggleButton value="left">
                    <FormatAlignLeftIcon />
                </ToggleButton>
                <ToggleButton value="center">
                    <FormatAlignCenterIcon />
                </ToggleButton>
                <ToggleButton value="right">
                    <FormatAlignRightIcon />
                </ToggleButton>
                <ToggleButton value="justify">
                    <FormatAlignJustifyIcon />
                </ToggleButton>
            </ToggleButtonGroup>
        </Grid>
        <Grid item xs={12}>
            <Button onClick={() => {
                Editor.get().unselect();
                setEdit(true);
            }} variant="outlined" fullWidth>Editar texto</Button>
        </Grid>

        <Dialog open={edit} onClose={() => {
            shape.text = text;
            setEdit(false);
            Editor.get().update();
        }}>
            <TextField sx={{ width: "480px" }} value={text} onChange={ev => setText(ev.target.value)} multiline />
        </Dialog>
    </React.Fragment>
}