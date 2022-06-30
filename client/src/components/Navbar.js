import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { useDispatch } from "react-redux";
import { clearActions } from "../redux/actions";

export default function Navbar() {
    const dispatch = useDispatch();
    const {logout} = useContext(AuthContext);
    
    return (
        <div className="header">
            <div className="logout-btn" onClick={() => {
                dispatch(clearActions());
                logout();
            }}><FontAwesomeIcon icon={faXmark} /></div>
        </div>
    )
}