import React, { useContext, useState } from "react"
import { useDispatch } from "react-redux"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import AuthContext from "../context/AuthContext"
import useHttp from "../hooks/http.hook"
import useInput from "../hooks/input.hook"
import { createAction } from "../redux/actions"
import { Categories } from "./Categories"


export function Ask() {
    const dispatch = useDispatch()
    const {request} = useHttp()
    const {token} = useContext(AuthContext)
    
    const [isTitle, setIsTitle] = useState(false)
    const [isDescription, setIsDescription] = useState(false)

    const title = useInput('', (val) => true)
    const description = useInput('', (val) => true)

    const titleCatHandler = (cat) => { 
        title.changeValue(cat.title)
        setIsTitle(true)
    }
    
    const feelsHandler = (feel) => {
        createHandler(feel.title)
    }

    const createHandler = async (feel) => {
        try {
            const {action} = await request('/api/action/create', 'POST', 
                {title: title.value, description: description.value, feel}, 
                {Authorization: `Bearer ${token}`}
            );

            if(action) {
                const date = new Date(action.time)

                dispatch(createAction({
                    title: action.title,
                    description: action.description,
                    feel: action.feel,
                    status: action.status,
                    id: action._id,
                    time: date.getTime()
                }));

                title.changeValue('');
                description.changeValue('');
                setIsTitle(false);
                setIsDescription(false);
            }   
        } catch(e) {}     
    }

    let cats = [
        {id: 1, title: "Work"},
        {id: 2, title: "Lern"}
    ]

    let feels = [
        {id: 1, title: "Happy"},
        {id: 2, title: "Bore"},
        {id: 3, title: "Sad"}
    ]

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
                        <button className="input-btn" onClick={() => { setIsTitle(true) }}>
                            <FontAwesomeIcon icon={faCheck} />
                        </button>
                    </div>
                    <Categories list={cats} action={titleCatHandler} />
                    </>
                )}
                {(isTitle &&
                    <div className="action__title">{title.value}</div>    
                )}

                {(isTitle && !isDescription &&
                    <>
                    <div className="ask-label">Description</div> 
                    <div className="input-wrap description-wrap">
                        <textarea className="materialize-textarea input" name="description" {...description.bind} />
                        
                        <button className="input-btn" onClick={() => { setIsDescription(true) }}>
                            <FontAwesomeIcon icon={faCheck} />
                        </button>               
                    </div>
                    </> 
                )}
                {(isDescription &&
                    <div className="action__description">{description.value}</div>
                )}

                {(isDescription && 
                    <>
                    <div className="ask-label">What You Fils?</div> 
                    <Categories list={feels} action={feelsHandler} />
                    </>
                )}
                      
            </div>
        </div>
    )
}