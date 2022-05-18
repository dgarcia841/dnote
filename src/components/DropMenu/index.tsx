import React from "react"
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import UploadIcon from '@mui/icons-material/Upload';
import { SpeedDial, SpeedDialAction } from "@mui/material";
import { downloadFile } from "@src/functions/downloadFile";
import { Editor } from "@src/Editor";

const actions = [
    {
        icon: <UploadIcon />, name: 'Cargar',
        action() {

        }
    },
    {
        icon: <FileDownloadIcon />, name: 'Descargar',
        action() {
            downloadFile("figure.json", JSON.stringify(Editor.get().getShapes()))
        }
    },
];

export default () => {
    return <SpeedDial
        ariaLabel="Menú de acciones"
        sx={{ 
            position: 'absolute', 
            bottom: 16, left: 16,
            zIndex: theme => theme.zIndex.drawer + 1
        }}
        icon={<SpeedDialIcon />}
    >
        {actions.map((action) => (
            <SpeedDialAction
                key={action.name}
                icon={action.icon}
                tooltipTitle={action.name}
                onClick={action.action}
            />
        ))}
    </SpeedDial>
}