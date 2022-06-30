import React, { useContext } from "react";
import { Categories } from "./Categories";
import { formatDate, formatDateMonth } from "../function"
import Status from "./Status";
import useHttp from "../hooks/http.hook";
import AuthContext from "../context/AuthContext";
import { useDispatch } from "react-redux";
import { editActionStatus } from "../redux/actions";

export function Action({action}) {
    const { request } = useHttp();
    const {token, isAuthenticated} = useContext(AuthContext);
    const dispatch = useDispatch();

    const setStatus = async (status) => {
        if(!isAuthenticated) { return }
        if(status === action.status) { return }

        dispatch(editActionStatus(status, action.id))

        request('/api/action/set-status', 'POST', 
            {status, id: action.id}, 
            {Authorization: `Bearer ${token}`}
        ).then(data => {
            if(data && data.status) {
                if(data.setStatus !== status) { dispatch(editActionStatus(data.status, action.id)) }
            }
        })
    
    }

    return (
        <>
        {(action.next && 
            <div className="action month">
                <div className="action__line">
                    <div className="line"></div>
                    <div className="action__time-wrap">
                        <div className="action__time">
                            <span>{ formatDateMonth(new Date(action.time)) }</span>
                        </div>
                    </div>
                </div>
                <div className="action__body">
                    <div className="action__title">{}</div>
                </div>
            </div>
        )}
        <div className="action">
            <div className="action__line">
                <div className="line"></div>
                <div className="action__time-wrap">
                    <div className="action__time">
                        <span>{ formatDate(new Date(action.time)) }</span>
                    </div>
                    
                </div>
            </div>
            <div className="action__body">
                <div className="action__title">{action.title} {action.feel}</div>
                {(action.description && <div className="action__description">{action.description}</div> )}
                {(action.categories && <Categories list={action.categories} /> )}                
            </div>
            <Status value={action.status} callback={setStatus} />
        </div>
        </>
    )
}