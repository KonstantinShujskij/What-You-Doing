import React from "react";
import { Action } from "./Action";

export function List({list}) {
    return (
        <>
        {list && list.map((action) => <Action action={action} key={action.id} />)}
        </>        
    );
}