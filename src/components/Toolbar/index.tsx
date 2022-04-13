import { Drawer, Box, Typography } from "@mui/material"
import SettingsIcon from '@mui/icons-material/Settings';
import React from "react"
import ToolbarBox from "./ToolbarBox";

export default () => {
    return <Drawer
        PaperProps={{
            sx: { width: "320px" },
        }}
        variant="persistent"
        open={true}
        anchor="right"
    >

        <Box m={1} mb={0} flexDirection="row" justifyContent="space-between" alignItems="center" display="flex">
            <Typography variant="h4">
                Propiedades
            </Typography>
            <SettingsIcon />
        </Box>
        <ToolbarBox />
    </Drawer>
}