import { Drawer, List, ListItem, ListItemText } from "@mui/material"
import { Editor } from "@src/Editor"
import React from "react"

export default () => {
    return <Drawer
        PaperProps={{
        sx: { width: "320px" },
        }}
        variant="persistent"
        open={true}
        anchor="right"
    >
        <List>
            {Editor.get().getShapes().map((item, i) => <ListItem key={i}>
                <ListItemText>
                    {item.type}: {item.shape.x}, {item.shape.y}
                </ListItemText>
            </ListItem>)}
        </List>
    </Drawer>
}