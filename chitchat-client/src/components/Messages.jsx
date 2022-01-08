import React, { useEffect, useRef } from "react";
// import PropTypes from "prop-types";

import Message from "./Message";

function Messages(props) {
    // TODO: userId is public ? entering any arbitrary userId will.... ? Entering own userId ?
    // const params = useParams();

    // just to scroll to bottom
    const bottomDiv = useRef();

    useEffect(() => {
        bottomDiv.current?.scrollIntoView({ behavior: "smooth" });
    }, [props.messages]);

    useEffect(() => {
        const ws = new WebSocket(
            `ws://${props.host}:${props.port}/ws/chat/${props.username}/${props.selectedRoom.name}`
        );

        ws.onopen = () => console.log("ws opened");
        ws.onclose = () => console.log("ws closed");
        ws.onmessage = (e) => console.log(JSON.parse(e.data));

        return () => ws.close();
    }, [props.host, props.port, props.username, props.selectedRoom]);

    return (
        <div className="flex flex-col overflow-y-scroll h-full w-full">
            {props.messages.map((value, key) => (
                <Message key={key} message={value} />
            ))}

            <div ref={bottomDiv} />
        </div>
    );
}

// Messages.propTypes = {
// messages: PropTypes.arrayOf(PropTypes.)
// }

export default Messages;
