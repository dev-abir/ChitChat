import React, { useState } from "react";
// import PropTypes from 'prop-types'

import { IoIosSend } from "react-icons/io";

function MessageEntryBox(props) {
    const [message, setMessage] = useState("");

    const tailwindLime = "#84cc16";

    return (
        <div className="w-full flex flex-row items-center gap-2">
            <input
                autoFocus
                className="w-full shadow-md shadow-lime-300 outline-none p-2 rounded-md border-2 border-lime-300 bg-inherit transition-colors duration-300"
                placeholder="Type your message here"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />

            <IoIosSend
                size="2rem"
                color={tailwindLime}
                className="cursor-pointer"
                onClick={() => {
                    props.sendMessageFunc(message);
                    setMessage("");
                }}
            />
        </div>
    );
}

// MessegeEntryBox.propTypes = {

// }

export default MessageEntryBox;
