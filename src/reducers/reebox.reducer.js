import { REEBOX_FETCHING, REEBOX_SUCCESS, REEBOX_FAILED } from "../Constants";

const initialState = {
    reeboxResult: null,
    reeboxFetching: false,
    reeboxError: false,
}

export default (state = initialState, { type, payload }) => {
    switch (type) {

    case REEBOX_FETCHING:
        return { ...state, reeboxResult: null, reeboxFetching: true, reeboxError: false }
    case REEBOX_SUCCESS:
        return {...state, reeboxResult: payload, reeboxFetching: false, reeboxError: false}
    case REEBOX_FAILED:
        return {...state, reeboxResult: null, reeboxFetching: false, reeboxError: true}
    default:
        return state
    }
}
