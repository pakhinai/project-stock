import { ADIDAS_FETCHING, ADIDAS_SUCCESS, ADIDAS_FAILED } from "../Constants";

const initialState = {
    AdidasResult: null,
    AdidasFetching: false,
    AdidasError: false,
}

export default (state = initialState, { type, payload }) => {
    switch (type) {

    case ADIDAS_FETCHING:
        return { ...state, AdidasResult: null, AdidasFetching: true, AdidasError: false }
    case ADIDAS_SUCCESS:
        return {...state, AdidasResult: payload, AdidasFetching: false, AdidasError: false}
    case ADIDAS_FAILED:
        return {...state, AdidasResult: null, AdidasFetching: false, AdidasError: true}
    default:
        return state
    }
}
