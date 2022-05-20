import { ReactConfirmProps, createConfirmation, confirmable } from "react-confirm";
import Dialog from "@mui/material/Dialog";
import React, { useState } from "react";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

const PromptDialog: React.FC<ReactConfirmProps> = ({show, proceed, confirmation}) => {

    const [text, setText] = useState("");

    return <Dialog open={show}>
        <DialogTitle>
            {confirmation}
        </DialogTitle>
        <DialogContent>
            <TextField autoFocus fullWidth value={text} onChange={ev => setText(ev.target.value)} />
        </DialogContent>
        <DialogActions>
            <Button variant="contained" onClick={() => proceed(text)}>Aceptar</Button>
            <Button variant="outlined" onClick={() => proceed("")}>Cancelar</Button>
        </DialogActions>
    </Dialog>
}

export default createConfirmation(confirmable(PromptDialog));