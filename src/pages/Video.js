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
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <video autoPlay ref={videoRef} playsInline />
            <span>{name}</span>
        </div>
    )
}

export default Video
