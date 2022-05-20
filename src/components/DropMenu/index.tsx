import React, { useState } from "react"
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDial from "@mui/material/SpeedDial";
import Menu from "@mui/material/Menu"
import ListItemButton from "@mui/material/ListItemButton";
import List from "@mui/material/List";
import IconButton from "@mui/material/IconButton";
import { ListItemText } from "@mui/material";
import { useNavigate } from "react-router-dom";
import getActions from "./getActions";



export default () => {
    const [button, setButton] = useState<HTMLElement | undefined>(undefined);

    const navigate = useNavigate();

    return <>
        <SpeedDial
            ariaLabel="Menú de acciones"
            onClick={(e) => setButton(e.currentTarget)}
            sx={{
                position: 'fixed',
                top: 16,
                left: 256,
                zIndex: theme => theme.zIndex.drawer + 1
            }}
            icon={<SpeedDialIcon />}
        />
        <Menu open={!!button} anchorEl={button} onClose={() => setButton(undefined)}>
            <List disablePadding>
                {getActions(navigate).map(({ icon, action, name }, i) => <ListItemButton key={i} onClick={action}>
                    <IconButton>
                        {icon}
                    </IconButton>
                    <ListItemText>
                        {name}
                    </ListItemText>
                </ListItemButton>)}
            </List>
        </Menu>
    </>
}