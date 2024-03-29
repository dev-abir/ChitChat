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
    const [isFriendTyping, setIsFriendTyping] = useState(false);

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
            `${props.protocol}://${props.host}${props.port ? ":" + props.port : ""}/ws/chat/${
                props.username
            }/${props.selectedRoom.name}`
        );

        ws.current.onopen = () => {
            console.log(`ws opened ${props.selectedRoom.name}`);
            ws.current.send(JSON.stringify({ type: "chat_history" }));
        };
        ws.current.onclose = () => console.log(`ws closed ${props.selectedRoom.name}`);

        return () => ws.current.close();
    }, [props.host, props.port, props.username, props.selectedRoom]);

    /* This useEffect should not cause infinite rendering problem,
        as we are not "DIRECTLY" calling setMessages() within useEffect().
        (we are just declaring funcs, which will call setMessages())) */
    useEffect(() => {
        const addMessage = (messageData) => {
            if (messageData.type === "typing_status" && messageData.from !== props.username) {
                setIsFriendTyping(messageData.value);
            } else if (messageData.type === "chat_history") {
                setMessages(messageData.messages);
            } else {
                // if there's a new message from friend, then
                // probably typing has end...
                // FIXME: not working sometimes
                // if (!messageData.fromSelf) setIsFriendTyping(false);

                // interesting way of mutating
                setMessages([...messages, messageData]);
            }
        };

        ws.current.onmessage = (e) => addMessage(JSON.parse(e.data));
    }, [props.selectedRoom.name, messages, props.username]);

    return (
        <div className="flex flex-col w-full h-full">
            <Messages
                messages={messages.filter((m) => m.room === props.selectedRoom.name)}
                selectedRoom={props.selectedRoom}
                username={props.username}
                host={props.host}
                port={props.port}
                showTyping={isFriendTyping}
            />

            <MessageEntryBox sendMessageFunc={(data) => sendMessage(data)} />
        </div>
    );
}

// MessageArea.propTypes = {

// }

export default MessageArea;
