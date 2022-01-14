import React from "react";
// import PropTypes from 'prop-types'

import MessageContainer from "./MessageContainer";

const dot = () => {
    return <div className="w-5 h-5 rounded-full bg-gray-500 animate-pulse" />;
};

function MessageTypingIndicator(props) {
    return (
        <MessageContainer flexJustify={`${props.messageData.fromSelf ? "start" : "end"}`}>
            <div
                className={
                    "m-3 rounded-md p-3 shadow-xl w-3/4 " +
                    (props.messageData.fromSelf
                        ? "shadow-lime-300/50 bg-lime-500"
                        : "shadow-sky-300/50 bg-sky-500")
                }
            >
                <div className="flex flex-row gap-2">
                    {dot()} {dot()} {dot()}
                </div>
            </div>
        </MessageContainer>
    );
}

// MessageTypingIndicator.propTypes = {

// }

export default MessageTypingIndicator;
