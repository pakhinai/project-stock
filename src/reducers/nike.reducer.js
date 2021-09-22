import { NIKE_FETCHING, NIKE_SUCCESS, NIKE_FAILED } from "../Constants";

const initialState = {
    NikeResult: null,
    NikeFetching: false,
    NikeError: false,
}

export default (state = initialState, { type, payload }) => {
    switch (type) {

    case NIKE_FETCHING:
        return { ...state, NikeResult: null, NikeFetching: true, NikeError: false }
    case NIKE_SUCCESS:
        return {...state, NikeResult: payload, NikeFetching: false, NikeError: false}
    case NIKE_FAILED:
        return {...state, NikeResult: null, NikeFetching: false, NikeError: true}
    default:
        return state
    }
}
