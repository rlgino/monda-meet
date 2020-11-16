import React, { useState } from 'react'
import * as Chance from 'chance'
import Button from '@material-ui/core/Button';
import { TextField, Container, Grid, Typography } from '@material-ui/core';
import { Mic, MicOff, Videocam, VideocamOff } from '@material-ui/icons';

const chance = new Chance();

function Home({ history }) {
    const [roomId, setRoomId] = useState('')
    const [name, setName] = useState("")
    const [enabledVideo, setEnabledVideo] = useState(true)
    const [enabledAudio, setEnabledAudio] = useState(true)

    const navigateToRoom = (e) => {
        if (!roomId) {
            alert("Debe ingresar un ID para la sala")
            return
        }
        history.push(`/room/${roomId}`)
    }

    const createRoom = (e) => {
        const id = chance.guid();
        history.push(`/room/${id}`)
    }

    return (
        <div>
            <Container maxWidth="sm" style={{ marginTop: 200 }} >
                <Grid container direction="column" justify="center" alignItems="center" >
                    <Grid item>
                        <TextField id="outlined-basic" label="ID de Reu" variant="outlined" value={roomId} onChange={e => setRoomId(e.target.value)} />
                    </Grid>
                    <br />
                    <Grid item>
                        <TextField id="outlined-basic" label="Nombre" variant="outlined" value={name} onChange={e => setName(e.target.value)} />
                    </Grid>
                    <Grid container style={{ width: "100%", padding: ".3em" }} justify="center">
                        <Button color="primary" onClick={e => setEnabledVideo(!enabledVideo)}>
                            {
                                enabledVideo ? <VideocamOff /> : <Videocam />
                            }
                        </Button>
                        <Button color="secondary" onClick={e => setEnabledAudio(!enabledAudio)}>
                            {
                                enabledAudio ? <MicOff /> : <Mic />
                            }
                        </Button>
                    </Grid>
                    <br />
                    <Grid container direction="row" justify="center" alignItems="center" spacing={1} >
                        <Grid item>
                            <Button variant="contained" color="primary" onClick={e => navigateToRoom(e)}>
                                Unirse a Meet
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button variant="contained" color="secondary" onClick={e => createRoom(e)}>
                                Crear reu!
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </div >
    )
}

export default Home
