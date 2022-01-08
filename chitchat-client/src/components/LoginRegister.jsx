import React, { useState } from "react";
// import PropTypes from 'prop-types'

function LoginRegister(props) {
    const [isRegister, setIsRegister] = useState(props.isRegister);

    return (
        <form className="flex flex-col gap-3 items-center justify-around">
            <div className="w-full">
                <h1 className="text-lg font-bold">{isRegister ? "Register" : "Login"}</h1>
                <hr className="border-2" />
            </div>

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "min-content auto",
                    alignItems: "center",
                    gap: "0.5rem 0.5rem",
                    width: "100%",
                }}
            >
                <label htmlFor="inp-uname">Username:</label>
                <input
                    autoFocus
                    id="inp-uname"
                    type="text"
                    className="w-full shadow-md shadow-lime-300 outline-none p-2 rounded-md border-2 border-lime-300 bg-inherit transition-colors duration-300"
                />

                <label htmlFor="inp-pass">Password:</label>
                <input
                    id="inp-pass"
                    type="password"
                    className="w-full shadow-md shadow-lime-300 outline-none p-2 rounded-md border-2 border-lime-300 bg-inherit transition-colors duration-300"
                />

                {/* Better way (to avoid checking 2 times...) */}
                {isRegister && <label htmlFor="inp-conf-pass">Confirm Password:</label>}
                {isRegister && (
                    <input
                        id="inp-conf-pass"
                        type="conf-password"
                        className="w-full shadow-md shadow-lime-300 outline-none p-2 rounded-md border-2 border-lime-300 bg-inherit transition-colors duration-300"
                    />
                )}
            </div>

            <button
                onClick={(e) => {
                    e.preventDefault();
                }}
                className="text-white bg-lime-500 w-max px-5 py-3 shadow-lg shadow-lime-500/80 rounded-md focus:ring-2 focus:ring-offset-2 focus:ring-lime-500 hover:bg-lime-600 transition-all duration-300"
            >
                {isRegister ? "Register" : "Login"}
            </button>

            <h2
                className="text-md font-bold cursor-pointer"
                onClick={() => {
                    setIsRegister(!isRegister);
                }}
            >
                {isRegister ? "Goto Login" : "Don't have an account? Register"}
            </h2>
        </form>
    );
}

// login.propTypes = {

// }

export default LoginRegister;
