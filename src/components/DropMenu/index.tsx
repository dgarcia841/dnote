import React, { useState } from "react"
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import UploadIcon from '@mui/icons-material/Upload';
import SpeedDial from "@mui/material/SpeedDial";
import Menu from "@mui/material/Menu"
import { downloadFile } from "@src/functions/downloadFile";
import { Editor } from "@src/Editor";
import ListItemButton from "@mui/material/ListItemButton";
import List from "@mui/material/List";
import IconButton from "@mui/material/IconButton";
import { ListItemText } from "@mui/material";
import { loadFile } from "@src/functions/loadFile";
import { useNavigate, NavigateFunction } from "react-router-dom";
import FileOpenIcon from '@mui/icons-material/FileOpen';
import SaveIcon from '@mui/icons-material/Save';
import PromptDialog from "@src/dialog/PromptDialog";
import { Storage } from "@src/storage/Storage";

const getActions = (navigate: NavigateFunction) => [
    {
        icon: <FileOpenIcon />,
        name: "Abrir proyecto",
        async action() {
            navigate("/");            
        }
    },
    {
        icon: <SaveIcon />,
        name: "Guardar proyecto",
        async action() {
            const title = await PromptDialog({
                confirmation: "Título del proyecto"
            });
            Storage.save({
                title,
                shapes: Editor.get().getShapes()
            });
        }
    },
    {
        icon: <UploadIcon />,
        name: "Cargar proyecto",
        async action() {
            const file = await loadFile(".json");
            if (!file) return;
            Editor.get().load(JSON.parse(file));
        }
    },
    {
        icon: <FileDownloadIcon />,
        name: "Descargar proyecto",
        action() {
            downloadFile("figure.json", JSON.stringify(Editor.get().getShapes()))
        }
    },
];

export default () => {
    const [button, setButton] = useState<HTMLElement | undefined>(undefined);

    const navigate = useNavigate();

    return <>
        <SpeedDial
            ariaLabel="Menú de acciones"
            onClick={(e) => setButton(e.currentTarget)}
            sx={{
                position: 'fixed',
                top: 16,
                left: 256,
                zIndex: theme => theme.zIndex.drawer + 1
            }}
            icon={<SpeedDialIcon />}
        />
        <Menu open={!!button} anchorEl={button} onClose={() => setButton(undefined)}>
            <List disablePadding>
                {getActions(navigate).map(({ icon, action, name }, i) => <ListItemButton key={i} onClick={action}>
                    <IconButton>
                        {icon}
                    </IconButton>
                    <ListItemText>
                        {name}
                    </ListItemText>
                </ListItemButton>)}
            </List>
        </Menu>
    </>
}