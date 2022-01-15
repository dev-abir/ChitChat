import React from "react";
import MessageContainer from "./MessageContainer";
// import PropTypes from 'prop-types'

function MessageAreaInfo(props) {
    return (
        <MessageContainer justify="center">
            <p className="m-3 rounded-full p-1 shadow-xl w-1/3 italic text-white bg-slate-500 text-center transition-all duration-500">
                [{props.messageData.message}]
            </p>
        </MessageContainer>
    );
}

// MessageAreaInfo.propTypes = {

// }

export default MessageAreaInfo;
