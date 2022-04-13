import { ListItemButton, Chip, Box, IconButton, Tooltip, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@mui/material";
import { Editor } from "@src/Editor";
import React, { useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';

export default ({ shape }: { shape: Editor.IAnyShape }) => {

    const [open, setOpen] = useState(false);

    return <ListItemButton
        selected={Editor.get().isSelected(shape.shape)}
        onClick={() => {
            Editor.get().select(shape.shape);
            Editor.get().update();
        }}
    >
        <Box flexDirection="row" width="100%" justifyContent="space-between" alignItems="center" display="flex">
            <Box>
                <Chip variant="outlined" label={shape.type} />
            </Box>

            <Box>
                <Tooltip title="Borrar figura">
                    <IconButton onClick={() => setOpen(true)}>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            </Box>
        </Box>

        <Dialog open={open} onClose={() => setOpen(false)}>
            <DialogTitle>¿Borrar figura?</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    ¿Está seguro de que desea borrar esta figura? Esta acción no se puede deshacer.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={() => {
                        Editor.get().delete(shape);
                        setOpen(false);
                        Editor.get().update();
                    }}
                    variant="outlined">Aceptar</Button>
                <Button onClick={() => setOpen(false)} variant="contained">Cancelar</Button>
            </DialogActions>
        </Dialog>
    </ListItemButton>
}