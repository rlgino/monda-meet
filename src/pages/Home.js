import React, { useState } from 'react'
import * as Chance from 'chance'
import Button from '@material-ui/core/Button';
import { TextField, Container, Grid } from '@material-ui/core';
import VideoCallIcon from '@material-ui/icons/VideoCall';

const chance = new Chance();

function Home({ history }) {
    const [roomId, setRoomId] = useState('')

    const navigateToRoom = (e) => {
        if (!roomId) {
            alert("No hay Room ID!!")
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
