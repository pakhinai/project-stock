import { combineReducers } from "redux";
import loginReducer from "./login.reducer";
import adminReducer from "./admin.reducer"
import registerReducer from "./register.reducer";
import nikeReducer from "./nike.reducer"
import adidasReducer from "./adidas.reducer"
import pumaReducer from "./puma.reducer"
import reeboxReducer from "./reebox.reducer"
import underArmourReducer from "./underArmour.reducer"

export default combineReducers({
    loginReducer,
    adminReducer,
    registerReducer,
    nikeReducer,
    adidasReducer,
    pumaReducer,
    reeboxReducer,
    underArmourReducer
})