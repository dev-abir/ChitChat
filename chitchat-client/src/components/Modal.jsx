import React from "react";
import { useState } from "react";
// import PropTypes from 'prop-types'

import { motion } from "framer-motion";

import "./Modal.css";

function Modal(props) {
    const [showShake, setShowShake] = useState(false);

    const showShakeRemoveEntryAnim = (e) => {
        setShowShake(true);
    };

    return (
        <div className="fixed left-0 top-0 w-full h-full">
            <div
                className="fixed left-0 top-0 w-full h-full bg-black bg-opacity-80"
                onClick={(e) => showShakeRemoveEntryAnim(true)}
            ></div>
            <div className="flex flex-column items-center justify-center w-full h-full">
                <motion.div
                    initial={{ scale: 0.75, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.75, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`
                    ${showShake && "shake-vertical"}
                    p-5 w-3/4 sm:w-1/2 bg-white dark:bg-gray-800 dark:text-white shadow-md rounded-md z-50 overflow-y-auto`}
                    onAnimationEnd={() => setShowShake(false)}
                >
                    {/* so that this component can be used as: 
                     <Modal>
                        <Component></Component>
                     </Modal> */}
                    {props.children}
                </motion.div>
            </div>
        </div>
    );
}

// Modal.propTypes = {

// }

export default Modal;
