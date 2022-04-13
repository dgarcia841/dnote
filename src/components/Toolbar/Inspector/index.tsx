import { List, Box, Typography } from "@mui/material"
import { Editor } from "@src/Editor"
import SearchIcon from '@mui/icons-material/Search';
import React from "react"
import ShapeIndex from "./ShapeIndex";

export default () => {
    return <Box bottom={0} height="50%">
        <Box m={1} mb={0} flexDirection="row" justifyContent="space-between" alignItems="center" display="flex">
            <Typography variant="h4">
                Inspector
            </Typography>
            <SearchIcon />
        </Box>

        <Box m={1}>
            <List>
                {Editor.get().mapShapesReverse((shape) => <ShapeIndex shape={shape} />)}
            </List>
        </Box>
    </Box>
}