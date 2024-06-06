import * as type from '../types';

const initialState = {
    img: "",
    loading: false,
    error: null,
}

export default function getImageData(state = initialState, action) {
    switch (action.type) {
        case type.GET_FETCH_REQUESTED:
            return {
                ...state,
                loading: true,
            }
        case type.GET_FETCH_SUCCESS:
            return {
                ...state,
                loading: false,
                img: action.data
            }
        case type.GET_FETCH_FAILED:
            return {
                ...state,
                loading: false,
                error: action.message,
            }
        default:
            return state
    }
}