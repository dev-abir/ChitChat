import { useState } from "react";
import { rooms } from "./testdata/data";

import UserList from "./components/UserList";
import Modal from "./components/Modal";
import UsernameBox from "./components/UsernameBox";

import { motion, AnimatePresence } from "framer-motion";

import { IoSunnyOutline, IoMoon } from "react-icons/io5";
import MessageArea from "./components/MessageArea";

// /**
//  * Returns a random integer between min (inclusive) and max (inclusive).
//  * The value is no lower than min (or the next integer greater than min
//  * if min isn't an integer) and no greater than max (or the next integer
//  * lower than max if max isn't an integer).
//  * Using Math.round() will give you a non-uniform distribution!
//  */
// const getRandomInt = (min, max) => {
//     min = Math.ceil(min);
//     max = Math.floor(max);
//     return Math.floor(Math.random() * (max - min + 1)) + min;
// };

function App() {
    // theming
    const [colorTheme, setColorTheme] = useState(
        window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
    );

    const [selectedRoom, setSelectedRoom] = useState();

    const host = "localhost";
    const port = "8000";
    // const [username, setUsername] = useState("user" + getRandomInt(1000000000, 9999999999));
    const [username, setUsername] = useState();

    return (
        <div id="app-theme-div" className={`${colorTheme} w-screen h-screen`}>
            <div
                id="app-div"
                className="h-screen flex flex-col dark:bg-gray-800 dark:text-white transition-all duration-500"
            >
                <div className="flex flex-row gap-2 p-2 shadow-md justify-between">
                    <p className="text-3xl font-bold font-sans">ChitChat</p>
                    <p className="text-3xl font-bold font-sans">{username}</p>
                    {colorTheme === "dark" ? (
                        <IoSunnyOutline
                            size="2rem"
                            className="cursor-pointer"
                            onClick={() => setColorTheme("light")}
                        />
                    ) : (
                        <IoMoon
                            size="2rem"
                            className="cursor-pointer"
                            onClick={() => setColorTheme("dark")}
                        />
                    )}
                </div>

                <AnimatePresence>
                    {username === undefined && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <Modal>
                                <UsernameBox setUsernameFunc={(uname) => setUsername(uname)} />
                            </Modal>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="flex flex-row gap-2 overflow-y-auto">
                    <UserList
                        users={rooms}
                        setSelectedRoomProp={(room) => setSelectedRoom(room)}
                        selectedRoom={selectedRoom}
                        username={username}
                    />

                    {username && selectedRoom ? (
                        <MessageArea
                            selectedRoom={selectedRoom}
                            username={username}
                            host={host}
                            port={port}
                        />
                    ) : (
                        <p className="text-3xl font-sans">Choose a room from the left...</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default App;
