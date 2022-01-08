import React, { useState } from "react";
// import PropTypes from 'prop-types'

import "./UsernameBox.css";

function UsernameBox(props) {
    const [username, setUsername] = useState("");
    const [showVibrateAnim, setShowVibrateAnim] = useState(false);

    // true, so that it is not red immediately
    const [privacyChecked, setPrivacyChecked] = useState(true);

    const checkUname = (uname) => /^[a-z0-9]{3,10}$/i.test(uname);

    return (
        <form className="flex flex-col gap-3 items-center justify-around">
            <div className="w-full">
                <h1 className="text-lg font-bold">Username</h1>
                <hr className="border-2" />
            </div>

            <input
                autoFocus
                value={username}
                onInput={(e) => {
                    setUsername(e.target.value);
                    if (!checkUname(e.target.value)) setShowVibrateAnim(true);
                    else setShowVibrateAnim(false);
                }}
                placeholder="Enter a username"
                id="inp-uname"
                type="text"
                className="w-full shadow-md shadow-lime-300 outline-none p-2 rounded-md border-2 border-lime-300 bg-inherit transition-colors duration-300"
            />

            <p className={`${showVibrateAnim && "vibrate-1"} text-red-500`}>
                username should be alphanumeric, with minimum 3 to max 10 characters
            </p>

            <div>
                <input
                    type="checkbox"
                    id="check-privacy"
                    checked={privacyChecked}
                    onChange={() => setPrivacyChecked(!privacyChecked)}
                    className=""
                />
                <label
                    htmlFor="check-privacy"
                    className={`${!privacyChecked && "text-red-500"} italic m-3`}
                >
                    I know that privacy is a myth
                </label>
            </div>

            <button
                onClick={(e) => {
                    e.preventDefault();
                    checkUname(username)
                        ? props.setUsernameFunc(username)
                        : setShowVibrateAnim(true);
                    if (!privacyChecked) setPrivacyChecked(false);
                }}
                className="text-white bg-lime-500 w-max px-5 py-3 shadow-lg shadow-lime-500/80 rounded-md focus:ring-2 focus:ring-offset-2 focus:ring-lime-500 hover:bg-lime-600 transition-all duration-300"
            >
                Done
            </button>
        </form>
    );
}

// UsernameBox.propTypes = {

// }

export default UsernameBox;
