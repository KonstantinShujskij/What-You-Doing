import React, { useContext, useState } from "react"
import { useDispatch } from "react-redux"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import AuthContext from "../context/AuthContext"
import useHttp from "../hooks/http.hook"
import useInput from "../hooks/input.hook"
import { createAction } from "../redux/actions"
import { formatDate } from "../function"


export function Ask() {
    const dispatch = useDispatch()
    const {request} = useHttp()
    const {token} = useContext(AuthContext)
    
    const [isTitle, setIsTitle] = useState(false)
    const title = useInput('', (val) => true)
    const description = useInput('', (val) => true)

    const titleHandler = () => { setIsTitle(true) }

    const createHandler = async () => {
        try {
            const {action} = await request('/api/action/create', 'POST', 
                {title: title.value, description: description.value, labels: []}, 
                {Authorization: `Bearer ${token}`}
            );

            if(action) {
                const date = formatDate(new Date(action.time))

                dispatch(createAction({
                    title: action.title,
                    description: action.description,
                    categories: [],
                    id: action._id,
                    time: date
                }));

                title.changeValue('');
                description.changeValue('');
                setIsTitle(false);
            }   
        } catch(e) {}     
    }

    return (
        <div className="action ask">
            <div className="action__line">
                <div className="line"></div>
                <div className="action__time-wrap">
                    <div className="action__time">
                        <span>?</span>
                    </div>
                </div>
            </div>
            <div className="action__body">
                {(!isTitle && 
                <>
                <div className="action__title">What You Doing?</div>    
                <div className="input-wrap">
                    <input className="validate input" name="title" {...title.bind} />
                    <button className="input-btn" 
                        onClick={titleHandler}><FontAwesomeIcon icon={faCheck} /></button>
                </div>
                </>
                )}
                {(isTitle &&
                    <div className="action__title">{title.value}</div>    
                )}

                {(isTitle && 
                    <>
                    <div className="ask-label">Description</div> 
                    <div className="input-wrap description-wrap">
                        <textarea className="materialize-textarea input" name="description" {...description.bind} />
                        
                        <button 
                            className="input-btn"
                            onClick={createHandler}><FontAwesomeIcon icon={faCheck} /></button>               
                    </div>
                    </> 
                )}                               
                      
            </div>
        </div>
    )
}