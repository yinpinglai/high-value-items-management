import { createSlice } from '@reduxjs/toolkit';
import HighValueItemService from '../services/highValueItemService';

export const slice = createSlice({
    name: 'highValueItems',
    initialState: {
        isInit: true,
        isLoading: false,
        items: [],
        categoryItemMapper: {},
        total: 0.0,
    },
    reducers: {
        setInitializing: (state, action) => {
            state.isInit = action.payload;
        },
        setRequesting: (state, action) => {
            state.isLoading = action.payload;
        },
        setCategories: (state, action) => {
            state.categories = action.payload;
        },
        setItems: (state, action) => {
            state.items = action.payload;
        },
        addItem: (state, action) => {
            state.items = [...state.items, action.payload];
            state.categoryItemMapper[action.payload.category].subTotal += action.payload.value;
            state.total += action.payload.value;
        },
        removeItem: (state, action) => {
            state.items = state.items.filter(item => item.Id !== action.payload.Id);
            state.categoryItemMapper[action.payload.category].subTotal -= action.payload.value;
            state.total -= action.payload.value;
        },
        setCategoryItemMapper: (state, action) => {
            state.categoryItemMapper = action.payload;
        },
        setTotal: (state, action) => {
            state.total = action.payload;
        },
        setErrors: (state, action) => {
            state.errors = action.payload;
        },
        refreshCategoryItemMapper: (state, _) => {
            state.categoryItemMapper = state.items.reduce(
                (accumulator, current) => {
                    if (current.category && !accumulator[current.category])
                        accumulator[current.category] = {
                            'subTotal': 0,
                            'items': [],
                        };

                    accumulator[current.category].subTotal += current.value;
                    accumulator[current.category].items.push(current);
                    return accumulator;
                },
                {},
            );
        },
        recalculateTotalAmount: (state, _) => {
            state.total = state.items.reduce(
                (accumulator, current) => accumulator += current.value,
                0,
            );
        },
    },
});

export const actionCreators = {
    // Restore all precious item records at the beginning
    retrieveItems: () => async (dispatch) => {
        dispatch(slice.actions.setRequesting(true));
        
        const service = new HighValueItemService();

        // Fetching data from the API server
        const result = await service.retrieveItems();

        if (!result.hasErrors) {
            // When the request is accepted by the backend server
            dispatch(slice.actions.setItems(result.value));
            dispatch(slice.actions.refreshCategoryItemMapper());
            dispatch(slice.actions.recalculateTotalAmount());
        }
        
        dispatch(slice.actions.setRequesting(false));
    },
    addItem: (item) => async (dispatch) => {
        dispatch(slice.actions.setRequesting(true));

        const service = new HighValueItemService();
        const result = await service.addItem(item);

        if (!result.hasErrors) {
            // When the request is accepted by the backend server
            dispatch(slice.actions.addItem(result.value));
            dispatch(slice.actions.refreshCategoryItemMapper());
        }

        dispatch(slice.actions.setRequesting(false));
    },
    removeItem: (item) => async (dispatch) => {
        dispatch(slice.actions.setRequesting(true));

        const service = new HighValueItemService();
        const result = await service.removeItem(item.Id);
            
        if (!result.hasErrors) {
            // When the request is accepted by the backend server
            dispatch(slice.actions.removeItem(item));
            dispatch(slice.actions.refreshCategoryItemMapper());
        }

        dispatch(slice.actions.setRequesting(false));
    },
};

export default slice;
