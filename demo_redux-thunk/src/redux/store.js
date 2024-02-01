import thunk from "redux-thunk";
import {applyMiddleware, createStore} from "redux";
import {rootReducer} from "./reducer";

const initialStore={}
const middleWare=[thunk]
const store=createStore(
    rootReducer,
    initialStore,
    applyMiddleware(...middleWare)
)
export default store;