import React from "react";
// import PropTypes from 'prop-types'

function MessageContainer(props) {
    // HACK: probably tailwind isn't producing (do a chrome inspect element)
    // justify-end, justify-start classes so just add styles...
    return (
        <div
            className={`flex flex-row w-full`}
            style={{ justifyContent: `flex-${props.flexJustify}` }}
        >
            {props.children}
        </div>
    );
}

// MessageContainer.propTypes = {

// }

export default MessageContainer;
