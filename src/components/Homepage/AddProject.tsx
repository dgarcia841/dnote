import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom";
import React from "react";

export default function AddProject() {
    const navigate = useNavigate();
    return <Card>
        <CardContent>
            <IconButton onClick={() => navigate("/editor")}>
                <AddCircleIcon sx={{ width: '100%', height: 'auto' }} />
            </IconButton>
        </CardContent>
    </Card>
}