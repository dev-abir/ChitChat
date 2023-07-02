import React, { useRef, useEffect } from "react";
// import PropTypes from "prop-types";

import MessageAreaInfo from "./MessageAreaInfo";
import MessageTypingIndicator from "./MessageTypingIndicator";
import TextMessage from "./TextMessage";

function getMessageObject(messageData, key, ownUsername) {
    switch (messageData.type) {
        case "info":
            return (
                messageData.from !== ownUsername && (
                    <MessageAreaInfo key={key} messageData={messageData} />
                )
            );
        case "chat_message":
            return (
                <TextMessage
                    key={key}
                    messageData={messageData}
                    fromSelf={messageData.from === ownUsername}
                />
            );
        default:
        // we can just ignore the default case...
    }
}

function Messages(props) {
    // TODO: userId is public ? entering any arbitrary userId will.... ? Entering own userId ?

    // just to scroll to bottom
    const bottomDiv = useRef();

    useEffect(() => {
        // TODO: doesn't work, when typing animation disappears
        bottomDiv.current?.scrollIntoView({ behavior: "smooth" });
    }, [props.messages, props.showTyping]);

    return (
        <div className="flex flex-col overflow-y-auto h-full w-full">
            {props.messages &&
                props.messages.map((value, key) => getMessageObject(value, key, props.username))}

            {props.showTyping && <MessageTypingIndicator />}

            <div ref={bottomDiv} />
        </div>
    );
}

// Messages.propTypes = {
// messages: PropTypes.arrayOf(PropTypes.)
// }

export default Messages;
