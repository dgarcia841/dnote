import { ReactConfirmProps, createConfirmation, confirmable } from "react-confirm";
import Dialog from "@mui/material/Dialog";
import React from "react";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

const PromptDialog: React.FC<ReactConfirmProps> = ({show, proceed, confirmation}) => {
    return <Dialog open={show}>
        <DialogTitle>
            Confirmar
        </DialogTitle>
        <DialogContent>
            {confirmation}
        </DialogContent>
        <DialogActions>
            <Button variant="contained" onClick={() => proceed("true")}>Aceptar</Button>
            <Button variant="outlined" onClick={() => proceed("false")}>Cancelar</Button>
        </DialogActions>
    </Dialog>
}

const dialog = createConfirmation(confirmable(PromptDialog));
export default async (props: any) => {
    const result = await dialog(props);
    return result === "true" ? true: false;
}