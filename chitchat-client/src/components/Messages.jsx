import React, { useRef, useEffect } from "react";
// import PropTypes from "prop-types";

import MessageAreaInfo from "./MessageAreaInfo";
import MessageTypingIndicator from "./MessageTypingIndicator";
import TextMessage from "./TextMessage";

function getMessageObject(messageData, key) {
    switch (messageData.type) {
        case "chat_message":
            return <TextMessage key={key} messageData={messageData} />;
        case "info":
            return <MessageAreaInfo key={key} messageData={messageData} />;
        // TODO: typing status...
        // case "typing_status":
        //     return <MessageTypingIndicator key={key} messageData={messageData} />;
    }
}

function Messages(props) {
    // TODO: userId is public ? entering any arbitrary userId will.... ? Entering own userId ?
    // const params = useParams();

    // just to scroll to bottom
    const bottomDiv = useRef();

    useEffect(() => {
        bottomDiv.current?.scrollIntoView({ behavior: "smooth" });
    }, [props.messages]);

    return (
        <div className="flex flex-col overflow-y-scroll h-full w-full">
            {props.messages && props.messages.map((value, key) => getMessageObject(value, key))}

            <div ref={bottomDiv} />
        </div>
    );
}

// Messages.propTypes = {
// messages: PropTypes.arrayOf(PropTypes.)
// }

export default Messages;
