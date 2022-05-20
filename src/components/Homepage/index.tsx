import Container from "@mui/material/Container";
import React, { useMemo } from "react";
import Grid from "@mui/material/Grid";
import AddProject from "./AddProject";
import { Storage } from "@src/storage";

export function Homepage() {

    const projects = useMemo(() => Storage.getList(), []);

    return <Container>
        <Grid container spacing={1}>
            <Grid item md={3} sm={6} xs={12}>
                <AddProject />
            </Grid>
            {projects.map(proj => <Grid item md={3} sm={6} xs={12}>
                {proj.title}
            </Grid>)}
        </Grid>
    </Container>
}