import React from "react";
import { Categories } from "./Categories";

export function Action({day}) {
    return (
        <div className="action">
            <div className="action__line">
                <div className="line"></div>
                <div className="action__time-wrap">
                    <div className="action__time">
                        <span>-</span>
                    </div>
                </div>
            </div>
            <div className="action__body">
                <div className="action__title">{day}</div>
            </div>
        </div>
    )
}