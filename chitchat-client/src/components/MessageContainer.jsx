import React from "react";
// import PropTypes from 'prop-types'

function MessageContainer(props) {
    // FIXME: flex justify flex-end not working
    return (
        <div className={`flex flex-row justify-${props.flexJustify} w-full`}>{props.children}</div>
    );
}

// MessageContainer.propTypes = {

// }

export default MessageContainer;
