import { combineReducers } from "redux";
import appReducer from "./appReducer";
import listReducer from "./listReducer";


const rootReducer = combineReducers({
    app: appReducer,
    list: listReducer
});

export default rootReducer;