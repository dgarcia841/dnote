import { CssBaseline } from "@mui/material"
import React from "react"
import Editor from "../Editor"
import Toolbar from "../Toolbar"

export default () => {
    return <React.Fragment>
        <CssBaseline />
        <Editor />
        <Toolbar/>
    </React.Fragment>
}