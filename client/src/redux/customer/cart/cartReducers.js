import {
    GET_CART_PENDING,
    GET_CART_FULFILLED,
    GET_CART_REJECTED,
    ADD_TO_CART_PENDING,
    ADD_TO_CART_FULFILLED,
    ADD_TO_CART_REJECTED,
    UPDATE_CART_PENDING,
    UPDATE_CART_FULFILLED,
    UPDATE_CART_REJECTED,
    REMOVE_FROM_CART_PENDING,
    REMOVE_FROM_CART_FULFILLED,
    REMOVE_FROM_CART_REJECTED,
} from './cartTypes';

const initialState = {
    cart: [],
    loading: false,
    error: null,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_CART_PENDING:
            return { ...state, loading: true };
        case GET_CART_FULFILLED:
            return { ...state, loading: false, cart: action.payload };
        case GET_CART_REJECTED:
            return { ...state, loading: false, error: action.payload };
        case ADD_TO_CART_PENDING:
            return { ...state, loading: true };
        case ADD_TO_CART_FULFILLED:
            return { ...state, loading: false, cart: action.payload };
        case ADD_TO_CART_REJECTED:
            return { ...state, loading: false, error: action.payload };
        case UPDATE_CART_PENDING:
            return { ...state, loading: true };
        case UPDATE_CART_FULFILLED:
            return { ...state, loading: false, cart: action.payload };
        case UPDATE_CART_REJECTED:
            return { ...state, loading: false, error: action.payload };
        case REMOVE_FROM_CART_PENDING:
            return { ...state, loading: true };
        case REMOVE_FROM_CART_FULFILLED:
            return { ...state, loading: false, cart: action.payload };
        case REMOVE_FROM_CART_REJECTED:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};