import React from "react";
// import PropTypes from "prop-types";

function UserListItem(props) {
    return (
        <div
            className={`${
                props.selected ? "bg-lime-500" : ""
            } shadow-lg shadow-lime-500/50 rounded-2xl border-2 border-lime-500 flex flex-row space-x-6 p-3 m-3 items-center hover:shadow-lime-500 transition-all duration-300 hover:cursor-pointer`}
        >
            <img
                src={`${process.env.PUBLIC_URL}/testdata/imgs/${props.room.image}`}
                className="w-12 rounded-full ring ring-lime-500 ring-offset-2 shrink-0"
                alt={props.room.name}
            />
            <div className="flex flex-col overflow-hidden">
                <div className="text-lg truncate">{props.room.name}</div>
                <div className="text-gray-900 dark:text-gray-300 text-sm truncate">{props.room.lastMessage}</div>
            </div>
        </div>
    );
}

// UserListItem.propTypes = {

// }

export default UserListItem;
