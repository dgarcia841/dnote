import React from "react";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";

export default function Shapebar() {
    return <Drawer
        open={true}
        variant="persistent"
        anchor="left"
        PaperProps={{
            sx: {
                width: "240px"
            }
        }}
    >
        <Box height="100%" display="flex" flexDirection="column" justifyContent="space-between">
            test
        </Box>
    </Drawer>
}