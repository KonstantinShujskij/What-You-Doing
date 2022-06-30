import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faShieldHalved, faLock } from '@fortawesome/free-solid-svg-icons'

export default function Status({value, callback}) {
    return (
        <div className={`status status_${value.toLowerCase()}`}>
            <div className="status__item status__public" onClick={() => callback('PUBLIC') }>
                <FontAwesomeIcon icon={faEye} />
            </div>
            <div className="status__item status__protected">
                <FontAwesomeIcon icon={faShieldHalved} onClick={() => callback('PROTECTED') } />
            </div>
            <div className="status__item status__private">
                <FontAwesomeIcon icon={faLock} onClick={() => callback('PRIVATE') } />
            </div>
        </div>
    )
}