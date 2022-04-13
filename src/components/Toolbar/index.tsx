import { Box, Drawer } from "@mui/material"
import React from "react"
import Inspector from "./Inspector";
import Properties from "./Properties";

export default () => {
    return <Drawer
        PaperProps={{
            sx: { width: "320px" },
        }}
        variant="persistent"
        open={true}
        anchor="right"
    >
        <Box height="100%" display="flex" flexDirection="column" justifyContent="space-between">
            <Properties />
            <div />
            <Inspector /> 
        </Box>
    </Drawer>
}