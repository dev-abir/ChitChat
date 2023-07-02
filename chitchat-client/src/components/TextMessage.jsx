import React from "react";
// import PropTypes from 'prop-types'

import MessageContainer from "./MessageContainer";

function TextMessage(props) {
    return (
        <MessageContainer justify={`${props.fromSelf ? "end" : "start"}`}>
            <div
                className={
                    "m-3 rounded-md p-3 shadow-xl w-3/4 " +
                    (props.fromSelf
                        ? "shadow-lime-300/50 bg-lime-500"
                        : "shadow-sky-300/50 bg-sky-500")
                }
            >
                <p className="font-bold truncate">
                    {props.fromSelf ? "You" : props.messageData.from} [
                    {props.messageData.time}]
                </p>

                <p>{props.messageData.message}</p>
            </div>
        </MessageContainer>
    );
}

// Message.propTypes = {

// }

export default TextMessage;
