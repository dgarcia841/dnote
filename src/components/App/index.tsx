import { ThemeProvider } from "@emotion/react";
import { createTheme, CssBaseline } from "@mui/material"
import React from "react"
import Editor from "../Editor"
import "./style.module.css";
import { HashRouter, Routes, Route } from "react-router-dom";

export default () => {

    const theme = createTheme({
        palette: {
            mode: "dark"
        }
    });


    return <ThemeProvider theme={theme}>
        <CssBaseline />
        <HashRouter>
            <Routes>
                <Route path="/" element={<div>homepage</div>} />
                <Route path="/editor" element={<Editor />} />
            </Routes>
        </HashRouter>
    </ThemeProvider>
}