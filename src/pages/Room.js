import React, { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';
import Peer from 'simple-peer';
import Video from './Video'

import * as Chance from 'chance';
import { serverURL } from '../config';
import { Button, Grid, Typography } from '@material-ui/core';
import { Mic, MicOff, Videocam, VideocamOff } from '@material-ui/icons';
import { UsePreferences } from '../context/preferences';

const chance = new Chance();

function Room(props) {
    const [userDetails, setUserDetails] = useState({
        id: chance.guid(),
        name: chance.name(),
    });
    const [peers, setPeers] = useState([]);

    const { name, enabledVideo, setEnabledVideo, enabledAudio, setEnabledAudio } = UsePreferences()

    const socketRef = useRef();
    const refVideo = useRef();
    const peersRef = useRef([]);

    const roomId = props.match.params.roomId;

    useEffect(() => {
        userDetails.name = name
        setUserDetails(userDetails)

        navigator.mediaDevices
            .getUserMedia({ video: enabledVideo, audio: enabledAudio })
            .then((stream) => {
                refVideo.current.srcObject = stream;

                socketRef.current = io.connect(serverURL);

                // sending the user details and roomid to join in the room
                socketRef.current.emit('join-room', roomId, userDetails);

                socketRef.current.on('users-present-in-room', (users) => {
                    const peers = [];

                    // To all users who are already in the room initiating a peer connection
                    users.forEach((user) => {
                        const peer = createPeer(
                            user.socketId,
                            socketRef.current.id,
                            stream
                        );

                        peersRef.current.push({
                            peerId: user.socketId,
                            peer,
                            name: user.name,
                        });

                        peers.push({
                            peerId: user.socketId,
                            peerObj: peer,
                        });
                    });

                    setPeers(peers);
                });

                // once the users initiate signal we will call add peer
                // to acknowledge the signal and send the stream
                socketRef.current.on('user-joined', (payload) => {
                    console.log("User connected");
                    const peer = addPeer(payload.signal, payload.callerId, stream);
                    peersRef.current.push({
                        peerId: payload.callerId,
                        peer,
                        name: payload.name,
                    });

                    setPeers((users) => [
                        ...users,
                        { peerId: payload.callerId, peerObj: peer },
                    ]);
                });

                // once the signal is accepted calling the signal with signal
                // from other user so that stream can flow between peers
                socketRef.current.on('signal-accepted', (payload) => {
                    const item = peersRef.current.find((p) => p.peerId === payload.id);
                    item.peer.signal(payload.signal);
                });

                // if some user is disconnected removing his references.
                socketRef.current.on('user-disconnected', (payload) => {
                    const item = peersRef.current.find((p) => p.peerId === payload);
                    if (item) {
                        item.peer.destroy();
                        peersRef.current = peersRef.current.filter(
                            (p) => p.peerId !== payload
                        );
                    }
                    setPeers((users) => users.filter((p) => p.peerId !== payload));
                });
            });
        return () => {
            console.log("Disconnect");
        }
    }, []);

    const changeVideoSettings = () => {
        setEnabledVideo(!enabledVideo)
    }

    const changeAudioSettings = () => {
        setEnabledAudio(enabledAudio)
    }

    function createPeer(userToSignal, callerId, stream) {
        const peer = new Peer({
            initiator: true,
            trickle: false,
            stream,
        });

        peer.on('signal', (signal) => {
            socketRef.current.emit('initiate-signal', {
                userToSignal,
                callerId,
                signal,
            });
        });

        return peer;
    }

    function addPeer(incomingSignal, callerId, stream) {
        const peer = new Peer({
            initiator: false,
            trickle: false,
            stream,
        });

        peer.on('signal', (signal) => {
            socketRef.current.emit('ack-signal', { signal, callerId });
        });

        peer.signal(incomingSignal);

        return peer;
    }

    return (
        <Grid container direction="row" justify="space-around" wrap="wrap" spacing={2} style={{ marginTop: ".5em" }} >
            <Grid item xs={6} sm={3}>
                <div style={{ display: 'flex', flexDirection: 'column', border: "black 1px solid", maxHeight: 300, maxWidth: 300, boxShadow: "10px 5px 5px black" }} >
                    <video muted ref={refVideo} autoPlay playsInline style={{ maxHeight: 300, maxWidth: 300 }} />
                    <Grid container style={{ width: "100%", padding: ".3em" }} justify="center">
                        <Typography color="primary" variant="h5">Yo ({userDetails.name})</Typography>
                        <Button color="primary" onClick={e => changeVideoSettings()}>
                            {
                                enabledVideo ? <VideocamOff /> : <Videocam />
                            }
                        </Button>
                        <Button color="secondary" onClick={e => changeAudioSettings()}>
                            {
                                enabledAudio ? <MicOff /> : <Mic />
                            }
                        </Button>
                    </Grid>
                </div>
            </Grid>
            {
                peers.map((peer, index) => {
                    return (
                        <Grid item xs={6} sm={3}>
                            <Video key={peersRef.current[index].peerId}
                                peer={peer.peerObj}
                                name={peersRef.current[index].name} />
                        </Grid>
                    )
                })
            }
        </Grid >
    )
}

export default Room
