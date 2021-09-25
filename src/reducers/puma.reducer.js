import { PUMA_FETCHING, PUMA_SUCCESS, PUMA_FAILED } from "../Constants";

const initialState = {
    pumaResult: null,
    pumaFetching: false,
    pumaError: false,
}

export default (state = initialState, { type, payload }) => {
    switch (type) {

    case PUMA_FETCHING:
        return { ...state, pumaResult: null, pumaFetching: true, pumaError: false }
    case PUMA_SUCCESS:
        return {...state, pumaResult: payload, pumaFetching: false, pumaError: false}
    case PUMA_FAILED:
        return {...state, pumaResult: null, pumaFetching: false, pumaError: true}
    default:
        return state
    }
}
