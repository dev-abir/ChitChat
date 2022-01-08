import React, { useState, useEffect, useRef } from "react";
// import PropTypes from 'prop-types'

import Messages from "./Messages";
import MessageEntryBox from "./MessageEntryBox";

function MessageArea(props) {
    // the standard way of using websockets
    // (keep object in memory with rerenders...) (TODO: unsure...?, see warnings)
    const ws = useRef(null);

    const [messages, setMessages] = useState([]);

    const addMessage = (messageData) => {
        // interesting way of mutating...
        setMessages([
            ...messages,
            {
                from: messageData.from,
                fromSelf: messageData.from === props.username,
                messageText: messageData.message,
                time: "17:34 08/03/2020",
            },
        ]);
    };

    const sendMessage = (message) => ws.current.send(JSON.stringify({ message: message }));

    // TODO: the standard way of using websockets?
    // (no reconnects with rerenders...)
    useEffect(() => {
        ws.current = new WebSocket(
            `ws://${props.host}:${props.port}/ws/chat/${props.username}/${props.selectedRoom.name}`
        );

        ws.current.onopen = () => console.log("ws opened");
        ws.current.onclose = () => console.log("ws closed");
        ws.current.onmessage = (e) => addMessage(JSON.parse(e.data));

        return () => ws.current.close();
    }, [props.host, props.port, props.username, props.selectedRoom, addMessage]);

    return (
        <div className="flex flex-col w-full h-full">
            <Messages
                messages={messages}
                selectedRoom={props.selectedRoom}
                username={props.username}
                host={props.host}
                port={props.port}
            />

            <MessageEntryBox sendMessageFunc={(message) => sendMessage(message)} />
        </div>
    );
}

// MessageArea.propTypes = {

// }

export default MessageArea;
