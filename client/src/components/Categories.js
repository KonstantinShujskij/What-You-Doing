import React from "react";
import { Category } from "./Category";

export function Categories({list, action}) {
    if (!action) { action = () => {} }
    return (
        <div className="categories"> 
            {list.map((item) => <Category category={item} action={action} key={item.id} />)}
        </div>
    )
}
