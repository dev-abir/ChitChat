import React, { useEffect, useRef, useState } from "react";
// import PropTypes from 'prop-types'

import { IoIosSend } from "react-icons/io";

function MessageEntryBox(props) {
    const [message, setMessage] = useState("");

    // TODO: should use useRef ?
    const CHECK_TYPING_TIMEOUT = 1000; // milliseconds
    const tailwindLime = "#84cc16";

    let timeout = useRef();
    let isTypingSent = useRef(false);

    const handleType = () => {
        if (!isTypingSent.current) {
            props.sendMessageFunc({ type: "typing_status", value: true });
            isTypingSent.current = true;
        }

        // clear previous timeout
        clearTimeout(timeout.current);

        timeout.current = setTimeout(() => {
            props.sendMessageFunc({ type: "typing_status", value: false });
            isTypingSent.current = false;
        }, CHECK_TYPING_TIMEOUT);
    };

    useEffect(() => () => clearTimeout(timeout.current), []);

    return (
        <form className="w-full flex flex-row items-center gap-2">
            <input
                autoFocus
                className="w-full shadow-md shadow-lime-300 outline-none p-2 rounded-md border-2 border-lime-300 bg-inherit transition-colors duration-300"
                placeholder="Type your message here"
                value={message}
                onChange={(e) => {
                    setMessage(e.target.value);
                    handleType();
                }}
            />

            <button
                type="submit"
                onClick={(e) => {
                    e.preventDefault();
                    props.sendMessageFunc({ type: "chat_message", message: message });
                    setMessage("");
                }}
            >
                <IoIosSend size="2rem" color={tailwindLime} />
            </button>
        </form>
    );
}

// MessegeEntryBox.propTypes = {

// }

export default MessageEntryBox;
