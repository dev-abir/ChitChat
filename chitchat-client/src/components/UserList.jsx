import React, { useState } from "react";
import UserListItem from "./UserListItem";

import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";

import "./bounce.css";
// import PropTypes from "prop-types";

function UserList(props) {
    // const [showBounceAnim, setShowBounceAnim] = useState(false);

    // const handleScroll = (e) => {
    //     if (e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight) {
    //         setShowBounceAnim(true);
    //     } else if (e.target.scrollTop === 0) {
    //         setShowBounceAnim(true);
    //     }
    // };

    const [sidebarVisible, setSidebarVisible] = useState(true);

    const tailwindLime = "#84cc16";

    return (
        <div
            // onScroll={handleScroll}
            // onAnimationEnd={() => setShowBounceAnim(false)}
            className={`
            ${sidebarVisible ? "basis-full" : "basis-24"}
            sm:basis-80 shrink-0 overflow-y-scroll transition-all duration-150 ease-in-out`}
        >
            {sidebarVisible ? (
                <IoClose
                    className="m-auto sm:hidden cursor-pointer"
                    color={tailwindLime}
                    size="2rem"
                    onClick={() => setSidebarVisible(false)}
                />
            ) : (
                <GiHamburgerMenu
                    className="m-auto sm:hidden cursor-pointer"
                    color={tailwindLime}
                    size="2rem"
                    onClick={() => setSidebarVisible(true)}
                />
            )}
            {props.users && props.users.length > 0 ? (
                props.users.map((value, index) => (
                    <div
                        key={index}
                        onClick={(e) => {
                            setSidebarVisible(false);
                            props.setSelectedRoomProp(value);
                        }}
                    >
                        <UserListItem room={value} selected={props.selectedRoom === value} />
                    </div>
                ))
            ) : (
                <p className="p-2">Seems soo empty, invite your friends :)</p>
            )}
        </div>
    );
}

// UserList.propTypes = {

// }

export default UserList;
