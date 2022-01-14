import React, { useState, useEffect, useRef } from "react";
// import PropTypes from 'prop-types'

import Messages from "./Messages";
import MessageEntryBox from "./MessageEntryBox";

function MessageArea(props) {
    // standard way of using websockets
    // basically useRef is used, to make
    // ws similar to a class member... (if it was a class component)
    const ws = useRef(null);

    const [messages, setMessages] = useState([]);

    const sendMessage = (data) => ws.current.send(JSON.stringify(data));

    /* divide the whole problem into two parts:
        1) initialize the ws only once on mount, and destroy on unmount.
            (that's why we are using useEffect)

        2) setMessages on receiving new message from server...
            (don't use the previous useEffect, create a new one,
             so that ws isn't reinitialized, ws should be initialized only once
             moreover, ws is undefined outside a useEffect...
             so we have to use useEffect for this,
             and, addMessage should be declared only once, and persist throught calling
             this component again and again (which React does multiple times)
             so using useEffect makes most sense...
    */
    useEffect(() => {
        ws.current = new WebSocket(
            `ws://${props.host}:${props.port}/ws/chat/${props.username}/${props.selectedRoom.name}`
        );

        ws.current.onopen = () => console.log(`ws opened ${props.selectedRoom.name}`);
        ws.current.onclose = () => console.log(`ws closed ${props.selectedRoom.name}`);

        return () => ws.current.close();
    }, [props.host, props.port, props.username, props.selectedRoom]);

    /* This useEffect should not cause infinite rendering problem,
        as we are not "DIRECTLY" calling setMessages() within useEffect().
        (we are just declaring funcs, which will call setMessages())) */
    useEffect(() => {
        const addMessage = (messageData) => {
            console.log(messageData);
            // add extra info
            messageData.fromSelf = messageData.from === props.username;
            // interesting way of mutating...
            setMessages([...messages, messageData]);
        };

        ws.current.onmessage = (e) => addMessage(JSON.parse(e.data));
    }, [props.username, messages]);

    return (
        <div className="flex flex-col w-full h-full">
            <Messages
                messages={messages}
                selectedRoom={props.selectedRoom}
                username={props.username}
                host={props.host}
                port={props.port}
            />

            <MessageEntryBox sendMessageFunc={(data) => sendMessage(data)} />
        </div>
    );
}

// MessageArea.propTypes = {

// }

export default MessageArea;
