import axios from '../../../utils/axiosConfig';
import { toast } from 'react-toastify';
import {
    GET_PRODUCT_FILTERS_PENDING,
    GET_PRODUCT_FILTERS_FULFILLED,
    GET_PRODUCT_FILTERS_REJECTED,
} from './searchTypes';

const getFiltersPending = () => ({
    type: GET_PRODUCT_FILTERS_PENDING,
});

const getFiltersFulfilled = (filters) => ({
    type: GET_PRODUCT_FILTERS_FULFILLED,
    payload: filters,
});

const getFiltersRejected = (error) => ({
    type: GET_PRODUCT_FILTERS_REJECTED,
    error: error,
});

export const getFilters = (query) => async (dispatch) => {
    dispatch(getFiltersPending());
    try {
        const response = await axios.get(`/api/filters?query=${query}`);
        setTimeout(() => {
            dispatch(getFiltersFulfilled(response.data));
        }, 3000);
    } catch (error) {
        dispatch(getFiltersRejected(error));
        console.log('Failed to fetch filters', error);
        toast.error('Failed to fetch filters');
    }
};