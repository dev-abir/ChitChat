import React, { useState } from "react";
// import PropTypes from 'prop-types'

import { IoIosSend } from "react-icons/io";

function MessageEntryBox(props) {
    const [message, setMessage] = useState("");

    return (
        <div className="w-full flex flex-row justify-between gap-2">
            <input
                autoFocus
                className="w-full shadow-md shadow-lime-300 outline-none p-2 rounded-md border-2 border-lime-300 bg-inherit transition-colors duration-300"
                placeholder="Type your message here"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />

            <button>
                <IoIosSend size="2rem" />
            </button>
        </div>
    );
}

// MessegeEntryBox.propTypes = {

// }

export default MessageEntryBox;
