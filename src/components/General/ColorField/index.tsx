import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material"
import React, { useEffect, useState } from "react"
import { ChromePicker } from "react-color";


interface IProps {
    value: string,
    label?: string,
    onChange?: (newValue: string) => void
}

function parse(rgba: string): {values: number[], alpha: number} {
    rgba = rgba.replace(/[^0-9.,]/ig, "");
    const values = rgba.split(',').map(x => parseFloat(x));
    const alpha = values.pop() ?? 1;
    return {alpha, values};
}


export default ({value, label, onChange}: IProps) => {

    const [open, setOpen] = useState(false);
    const [color, setColor] = useState(value);
    const [hex, setHex] = useState("");

    useEffect(() => {
        setColor(value);

        const rgba = parse(value);
        const [r, g, b] = rgba?.values ?? [0, 0, 0];
        const a = rgba?.alpha ?? 0;

        const blend = (x: number) => Math.round(a * x + (1 - a) * 255);
        const RR = blend(r);
        const GG = blend(g);
        const BB = blend(b);

        function fill(string: string, charfill = "0", charcount = 2) {
            const left = Math.max(0, charcount - string.length);
            return charfill.repeat(left) + string;
        }
        const hex = fill(RR.toString(16)) + fill(GG.toString(16)) + fill(BB.toString(16));
        setHex("#" + hex);
    }, [value]);

    return <React.Fragment>
        <TextField
            fullWidth
            type="color"
            value={hex}
            label={label}
            onClick={ev => {
                ev.preventDefault();
                setOpen(true);
            }}
            InputLabelProps={{
                shrink: true
            }}
        />
        
        <Dialog open={open} onClose={() => setOpen(false)}>
            <DialogTitle>Escoger color</DialogTitle>
            <DialogContent>
                <ChromePicker color={color} onChange={result => {
                    const { r, g, b, a } = result.rgb;
                    setColor(`rgba(${r}, ${g}, ${b}, ${a})`);
                }}/>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={() => {
                        setOpen(false);
                        onChange?.(color);
                    }}
                    variant="outlined">Aceptar</Button>
                <Button onClick={() => setOpen(false)} variant="contained">Cancelar</Button>
            </DialogActions>
        </Dialog>
    </React.Fragment>
}