import { CssBaseline } from "@mui/material"
import React from "react"
import Editor from "../Editor"
import "./style.module.css";

export default () => {
    return <React.Fragment>
        <CssBaseline />
        <Editor />
    </React.Fragment>
}