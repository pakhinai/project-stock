import { combineReducers } from "redux";
import loginReducer from "./login.reducer";
import adminReducer from "./admin.reducer"
import registerReducer from "./register.reducer";
import nikeReducer from "./nike.reducer"

export default combineReducers({
    loginReducer,
    adminReducer,
    registerReducer,
    nikeReducer
})