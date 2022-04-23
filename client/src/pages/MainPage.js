import React, { useContext, useEffect } from "react"; 
import { useDispatch, useSelector } from "react-redux";
import { Ask } from "../components/Ask";
import { List } from "../components/List";
import AuthContext from "../context/AuthContext";
import { formatDate } from "../function";
import useHttp from "../hooks/http.hook";
import useLoad from "../hooks/load.hook";
import {setActions} from "../redux/actions";

export default function MainPage() {
    const {token, isAuthenticated} = useContext(AuthContext);
    const {isLoad, load} = useLoad();
    const {request} = useHttp();
    const dispatch = useDispatch();

    const list = useSelector((state) => state.list.actions);

    useEffect(() => {
        if(isAuthenticated) {
          if(isLoad === false) {
            try {
              const now = new Date();
              request('/api/action/load', 'POST', {time: now.getTime(), interval: 1000 * 60 * 60 * 1000}, {
                Authorization: `Bearer ${token}`
              }).then((data) => {
                load();

                const actions = data.actions.reverse().map((action) => {
                    const date = formatDate(new Date(action.time));

                    return {
                        title: action.title,
                        description: action.description,
                        categories: [],
                        id: action._id,
                        time: date
                    };
                });
                
                dispatch(setActions(actions));
              });
            } catch (e) {}
          }
        }
    }, [isAuthenticated, isLoad, load, request, token, dispatch]);
    
    return (
        <div className="wrap">
            <Ask />
            <List list={list}/>
        </div>        
    );
}