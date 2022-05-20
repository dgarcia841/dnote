
import FileOpenIcon from '@mui/icons-material/FileOpen';
import SaveIcon from '@mui/icons-material/Save';
import PromptDialog from "@src/dialog/PromptDialog";
import { Storage } from "@src/storage";
import { loadFile } from "@src/functions/loadFile";
import { NavigateFunction } from "react-router-dom";
import { downloadFile } from "@src/functions/downloadFile";
import { Editor } from "@src/Editor";
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import UploadIcon from '@mui/icons-material/Upload';
import React from "react";

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
            // disable empty titles
            if(title.match(/^\s*$/i)) return;
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
export default getActions;