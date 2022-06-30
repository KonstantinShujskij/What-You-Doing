import React from "react";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { solid, regular, brands } from '@fortawesome/fontawesome-svg-core/import.macro' // <-- import styles to be used

// import { faFaceSmile } from '@fortawesome/free-solid-svg-icons'

export function Category({category, action}) {
    return (
        <div className="category" onClick={() => action(category)}>
            {category.title}
            {/* <FontAwesomeIcon icon={faFaceSmile} /> */}
        </div>
    )
}