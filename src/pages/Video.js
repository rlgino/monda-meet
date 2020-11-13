import { Grid, Typography } from '@material-ui/core'
import React, { useRef, useEffect } from 'react'

function Video({ peer, name }) {
    const videoRef = useRef(null)

    useEffect(() => {
        if (peer) {
            peer.on('stream', (stream) => {
                videoRef.current.srcObject = stream
            })
        }
        return () => { }
    }, [peer])

    return (
        <div style={{ display: 'flex', flexDirection: 'column', border: "black 1px solid", maxHeight: 500, maxWidth: 300 }}>
            <video autoPlay ref={videoRef} playsInline style={{ maxHeight: 300, maxWidth: 300 }} />
            <Grid container style={{ width: "100%", padding: ".3em" }} justify="center">
                <Typography color="primary" variant="h5">{name}</Typography>
            </Grid>
        </div>
    )
}

export default Video
