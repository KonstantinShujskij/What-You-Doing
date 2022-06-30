import React, { useRef } from "react"; 
import { useDispatch, useSelector } from "react-redux";
import { Ask } from "../components/Ask";
import { List } from "../components/List";
import useActions from "../hooks/actions.hook";
import useScroll from "../hooks/scroll.hook";
import { concatActions } from "../redux/actions";
import Loader from "../components/Loader"

export default function MainPage() {
    const { loadActions, loading } = useActions()
    const dispatch = useDispatch();

    const list = useSelector((state) => state.list.actions);

    const parentRef = useRef();
    const childrenRef = useRef();
    const { on } = useScroll(parentRef, childrenRef, () => load());

    const load = () => {
      const skip = list.length
      const limit = 3

      loadActions(skip, limit).then((actions) => {
        if(actions.length === 0) { return }

        dispatch(concatActions(actions))
        on()
      })
    }
    
    return (
        <div className="wrap" ref={parentRef}>
            <Ask />
            <List list={list}/>
            {(loading && <Loader /> )}
            <div ref={childrenRef} style={{height: 20, background: '#00000000'}} />
        </div>        
    );
}