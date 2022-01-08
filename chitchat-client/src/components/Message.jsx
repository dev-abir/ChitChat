import React from "react";
// import PropTypes from 'prop-types'

function Message(props) {
    return (
        <div
            className={
                "m-3 rounded-md p-3 shadow-xl w-3/4 " +
                (props.message.fromSelf
                    ? "shadow-lime-300/50 bg-lime-500 ml-auto"
                    : "shadow-sky-300/50 bg-sky-500")
            }
        >
            <p className="font-bold truncate">
                {props.message.fromSelf ? "You" : props.message.from} [{props.message.time}]
            </p>

            <p>{props.message.messageText}</p>
        </div>
    );
}

// Message.propTypes = {

// }

export default Message;
