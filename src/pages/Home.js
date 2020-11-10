import React, { useState } from 'react'
import * as Chance from 'chance'

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
        <div style={{ marginTop: 10, marginLeft: 10 }}>
            <input type="text" value={roomId} onChange={e => setRoomId(e.target.value)} />
            <input type="button" value="Unirse!" onClick={e => navigateToRoom(e)} />
            <input type="button" value="Crear reu" onClick={e => createRoom(e)} />
        </div>
    )
}

export default Home
