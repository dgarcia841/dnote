import { ThemeProvider } from "@emotion/react";
import { createTheme, CssBaseline } from "@mui/material"
import React from "react"
import DropMenu from "../DropMenu";
import Editor from "../Editor"
import "./style.module.css";

export default () => {

    const theme = createTheme({
        palette: {
            mode: "dark"
        }
    });


    return <ThemeProvider theme={theme}>
        <CssBaseline />
        <Editor />
        <DropMenu />
    </ThemeProvider>
}