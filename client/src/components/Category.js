import React from "react";

export function Category({category, action}) {
    return (
        <div className="category" onClick={() => action(category.title)}>{category.title}</div>
    )
}