import React from "react";
import { Categories } from "./Categories";

export function Action({action}) {
    return (
        <div className="action">
            <div className="action__line">
                <div className="line"></div>
                <div className="action__time-wrap">
                    <div className="action__time">
                        <span>{action.time}</span>
                    </div>
                </div>
            </div>
            <div className="action__body">
                <div className="action__title">{action.title}</div>
                {(action.description && <div className="action__description">{action.description}</div> )}
                {(action.categories && <Categories list={action.categories} /> )}                
            </div>
        </div>
    )
}