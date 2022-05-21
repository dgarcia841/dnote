import Container from "@mui/material/Container";
import React, { useMemo, useReducer } from "react";
import Grid from "@mui/material/Grid";
import AddProject from "./AddProject";
import { Storage } from "@src/storage";
import ProjectIndex from "./ProjectIndex";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export function Homepage() {

    const [reduced, update] = useReducer(x => (x + 1) % 7, 0);
    const projects = useMemo(() => Storage.getList(), [reduced]);

    return <Container>
        <Box m={2}>
            <Typography textAlign="center" variant="h2">
                Proyectos
            </Typography>
            <Box mt={1}>
                <Grid container spacing={1}>
                    <Grid item md={3} sm={6} xs={12}>
                        <AddProject />
                    </Grid>
                    {projects.map((proj, i) => <Grid
                        sx={{ height: "100%" }}
                        key={i}
                        item
                        md={3}
                        sm={6}
                        xs={12}>
                        <ProjectIndex
                            onRemove={() => update()}
                            project={proj} />
                    </Grid>)}
                </Grid>
            </Box>
        </Box>
    </Container>
}