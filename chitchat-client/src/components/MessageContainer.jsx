import React from "react";
// import PropTypes from 'prop-types'

function MessageContainer(props) {
    // HACK: probably tailwind isn't producing (do a chrome inspect element)
    // justify-end, justify-start classes in output css so just add styles...
    return (
        <div className="flex flex-row w-full break-all" style={{ justifyContent: props.justify }}>
            {props.children}
        </div>
    );
}

// MessageContainer.propTypes = {

// }

export default MessageContainer;
