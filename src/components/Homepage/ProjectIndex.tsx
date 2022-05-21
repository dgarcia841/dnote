import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import { useNavigate } from "react-router-dom";
import React from "react";
import { Storage } from "@src/storage";
import CardHeader from "@mui/material/CardHeader";
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from "@mui/material/IconButton";
import Skeleton from "@mui/material/Skeleton";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import { Editor } from "@src/Editor";
import ConfirmDialog from "@src/dialog/ConfirmDialog";

export default function ProjectIndex({ project, onRemove }: { 
    project: Storage.IProject ,
    onRemove?: () => void
}) {
    const navigate = useNavigate();


    function open() {
        Editor.get().load(project.shapes);
        navigate("/editor");
    }

    async function remove() {
        const confirm = await ConfirmDialog({
            confirmation: "¿Está seguro de que desea eliminar este proyecto'"
        });
        if(!confirm) return;

        Storage.remove(project.title);
        onRemove?.();
    }


    return <Card>
        <CardHeader
            sx={{ backgroundColor: "primary.main" }}
            title={project.title.substring(0, 16) + (project.title.length > 16 ? "...": '')} 
            action={
                <IconButton onClick={remove}>
                    <DeleteIcon />
                </IconButton>
            }
        />
        <CardContent>
            <Skeleton variant="rectangular" width="100%" height="128px" />
        </CardContent>
        <CardActions>
            <Button onClick={open} variant="contained">
                Abrir
            </Button>
        </CardActions>
    </Card>
}