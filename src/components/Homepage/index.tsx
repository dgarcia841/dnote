import Container from "@mui/material/Container";
import React, { useMemo } from "react";
import Grid from "@mui/material/Grid";
import AddProject from "./AddProject";
import { Storage } from "@src/storage";
import ProjectIndex from "./ProjectIndex";
import Box from "@mui/material/Box";

export function Homepage() {

    const projects = useMemo(() => Storage.getList(), []);

    return <Container>
        <Box m={2}>
            <Grid container spacing={1}>
                <Grid item md={3} sm={6} xs={12}>
                    <AddProject />
                </Grid>
                {projects.map((proj, i) => <Grid
                    sx={{height: "100%"}}
                    key={i}
                    item
                    md={3}
                    sm={6}
                    xs={12}>
                    <ProjectIndex project={proj} />
                </Grid>)}
            </Grid>

        </Box>
    </Container>
}