import React, { useRef, useEffect } from "react";
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

    return (
        <div className="flex flex-col overflow-y-scroll h-full w-full">
            {props.messages &&
                props.messages.map((value, key) => <Message key={key} message={value} />)}

            <div ref={bottomDiv} />
        </div>
    );
}

// Messages.propTypes = {
// messages: PropTypes.arrayOf(PropTypes.)
// }

export default Messages;
