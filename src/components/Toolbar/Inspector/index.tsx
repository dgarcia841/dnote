import { List, Box, Typography, IconButton, Tooltip, Divider } from "@mui/material"
import { Editor } from "@src/Editor"
import React from "react"
import ShapeIndex from "./ShapeIndex";
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';

export default () => {
    return <Box bottom={0} height="50%">
        <Box m={1} flexDirection="row" justifyContent="space-between" alignItems="center" display="flex">
            <Typography variant="h4">
                Inspector
            </Typography>
            <Box>
                <Tooltip title="Mover figura hacia arriba">
                    <span>
                        <IconButton disabled={!Editor.get().getSelected() || Editor.get().isFirst()} onClick={() => {
                            Editor.get().moveUp();
                            Editor.get().update();
                        }}>
                            <ArrowCircleUpIcon />
                        </IconButton>
                    </span>
                </Tooltip>
                <Tooltip title="Mover figura hacia abajo">
                    <span>
                        <IconButton disabled={!Editor.get().getSelected() || Editor.get().isLast()} onClick={() => {
                            Editor.get().moveDown();
                            Editor.get().update();
                        }}>
                            <ArrowCircleDownIcon />
                        </IconButton>
                    </span>
                </Tooltip>
            </Box>
        </Box>

        <Divider />

        <Box m={1}>
            <List>
                {Editor.get().getShapes().map((shape, i) => <ShapeIndex key={i} shape={shape} />)}
            </List>
        </Box>
    </Box>
}