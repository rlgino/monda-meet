import React, { useEffect } from 'react';
import { Grid, Typography } from '@material-ui/core';


function Test(props) {

    useEffect(() => {
        var v = document.getElementsByTagName("video")[0];
        v.play();
        return () => { }
    }, [])

    return (
        <Grid container direction="row" justify="space-around" wrap="wrap" spacing={2} style={{ marginTop: ".5em" }} >
            <Grid item xs={6} sm={3}>
                <div style={{ display: 'flex', flexDirection: 'column', border: "black 1px solid", maxHeight: 300, maxWidth: 300, boxShadow: "10px 5px 5px black" }} >
                    <video src="http://v2v.cc/~j/theora_testsuite/320x240.ogg">
                        Tu navegador no implementa el elemento <code>video</code>.
                    </video>
                    <Grid container style={{ width: "100%", padding: ".3em" }} justify="center">
                        <Typography color="primary" variant="h5">Yo (Gino Luraschi)</Typography>
                    </Grid>
                </div>
            </Grid>
            <Grid item xs={6} sm={3}>
                <div style={{ display: 'flex', flexDirection: 'column', border: "black 1px solid", maxHeight: 300, maxWidth: 300 }} >
                    <video src="http://v2v.cc/~j/theora_testsuite/320x240.ogg">
                        Tu navegador no implementa el elemento <code>video</code>.
                    </video>
                    <Grid container style={{ width: "100%", padding: ".3em" }} justify="center">
                        <Typography color="primary" variant="h5">Persona 1</Typography>
                    </Grid>
                </div>
            </Grid>
            <Grid item xs={6} sm={3}>
                <div style={{ display: 'flex', flexDirection: 'column', border: "black 1px solid", maxHeight: 300, maxWidth: 300 }} >
                    <video src="http://v2v.cc/~j/theora_testsuite/320x240.ogg">
                        Tu navegador no implementa el elemento <code>video</code>.
                    </video>
                    <Grid container style={{ width: "100%", padding: ".3em" }} justify="center">
                        <Typography color="primary" variant="h5">Persona 2</Typography>
                    </Grid>
                </div>
            </Grid>
            <Grid item xs={6} sm={3}>
                <div style={{ display: 'flex', flexDirection: 'column', border: "black 1px solid", maxHeight: 300, maxWidth: 300 }} >
                    <video src="http://v2v.cc/~j/theora_testsuite/320x240.ogg">
                        Tu navegador no implementa el elemento <code>video</code>.
                    </video>
                    <Grid container style={{ width: "100%", padding: ".3em" }} justify="center">
                        <Typography color="primary" variant="h5">Persona 3</Typography>
                    </Grid>
                </div>
            </Grid>
            <Grid item xs={6} sm={3}>
                <div style={{ display: 'flex', flexDirection: 'column', border: "black 1px solid", maxHeight: 300, maxWidth: 300 }} >
                    <video src="http://v2v.cc/~j/theora_testsuite/320x240.ogg">
                        Tu navegador no implementa el elemento <code>video</code>.
                    </video>
                    <Grid container style={{ width: "100%", padding: ".3em" }} justify="center">
                        <Typography color="primary" variant="h5">Persona 4</Typography>
                    </Grid>
                </div>
            </Grid>
            <Grid item xs={6} sm={3}>
                <div style={{ display: 'flex', flexDirection: 'column', border: "black 1px solid", maxHeight: 300, maxWidth: 300 }} >
                    <video src="http://v2v.cc/~j/theora_testsuite/320x240.ogg">
                        Tu navegador no implementa el elemento <code>video</code>.
                    </video>
                    <Grid container style={{ width: "100%", padding: ".3em" }} justify="center">
                        <Typography color="primary" variant="h5">Persona 5</Typography>
                    </Grid>
                </div>
            </Grid>
        </Grid >
    )
}

export default Test