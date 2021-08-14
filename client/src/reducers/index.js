
import { combineReducers } from "redux";
import userReducer from "./useReducer";


export const rootReducer=combineReducers({
    user:userReducer,

});

export default rootReducer 