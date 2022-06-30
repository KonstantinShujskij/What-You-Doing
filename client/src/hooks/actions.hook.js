import { useContext, useState } from "react"; 
import AuthContext from "../context/AuthContext";
import { isNextDay } from "../function";
import useHttp from "./http.hook";


export default function useActions() {
    const [loading, setLoading] = useState(false)
    const { request } = useHttp();
    const {token, isAuthenticated} = useContext(AuthContext);

    const loadActions = async (skip=0, limit=10) => {
        if(!isAuthenticated) { return null }

        try {              
            setLoading(true)
            const data = await request('/api/action/load', 'POST', {skip, limit}, {
              Authorization: `Bearer ${token}`
            })           

            let backDate = new Date()

            const actions = data.actions.map((action) => {
                let date = new Date(action.time)
                let isNext = isNextDay(date, backDate)           
                backDate = date

                return {
                    title: action.title,
                    description: action.description,
                    feel: action.feel,
                    status: action.status,
                    id: action._id,
                    time: action.time,
                    next: isNext
                };
            });
            
            setLoading(false)
            return actions

          } catch (e) { }
    }    

    return { loadActions, loading } 
}