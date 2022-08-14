import { createSlice } from '@reduxjs/toolkit';
import HighValueItemService from '../services/highValueItemService';

export const slice = createSlice({
    name: 'highValueItems',
    initialState: {
        isInit: true,
        isLoading: false,
        categories: [
            {
                "id": "1",
                "name": "Electronic",
                "subTotal": 3600.0,
            },
            {
                "id": "2",
                "name": "Clothing",
                "subTotal": 2200.0,
            },
            {
                "id": "3",
                "name": "Kitchen",
                "subTotal": 600.0,
            },
        ],
        items: [
            {"id": "1", "category": "Electronic", "name": "TV", "value": 2000.0},
            {"id": "2", "category": "Electronic", "name": "Stereo", "value": 1600.0},
            {"id": "3", "category": "Clothing", "name": "Shirts", "value": 1100.0},
            {"id": "4", "category": "Clothing", "name": "Jeans", "value": 1100.0},
            {"id": "5", "category": "Kitchen", "name": "Pots and Pans", "value": 500.0},
            {"id": "6", "category": "Kitchen", "name": "Misc", "value": 100.0},
        ],
        categoryItemMapper: {
            "Electronic": [
                {"id": "1", "category": "Electronic", "name": "TV", "value": 2000.0},
                {"id": "2", "category": "Electronic", "name": "Stereo", "value": 1600.0},
            ],
            "Clothing": [
                {"id": "3", "category": "Clothing", "name": "Shirts", "value": 1100.0},
                {"id": "4", "category": "Clothing", "name": "Jeans", "value": 1100.0},
            ],
            "Kitchen": [
                {"id": "5", "category": "Kitchen", "name": "Pots and Pans", "value": 500.0},
                {"id": "6", "category": "Kitchen", "name": "Misc", "value": 100.0},
            ],
        },
        total: 6400.0,
        errors: undefined,
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
            state.categories = state.categories.map(category => {
                if (category.name == action.payload.category)
                    category.subTotal += action.payload.value;
                return category;
            });
            state.total += action.payload.value;
        },
        removeItem: (state, action) => {
            state.items = state.items.filter(item => item.id != action.payload.id);
            state.categories = state.categories.map(category => {
                if (category.name == action.payload.category)
                    category.subTotal -= action.payload.value;
                return category;
            });
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
                        accumulator[current.category] = [];

                    accumulator[current.category].push(current);
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
        
        try {
            // Fetching data from the API server
            const result = await service.retrieveItems();

            if (!result.hasErrors) {
                // When the request is accepted by the backend server
                dispatch(slice.actions.setItems(result));
                dispatch(slice.actions.refreshCategoryItemMapper());
                dispatch(slice.actions.recalculateTotalAmount());
            } else {
                // When the request is rejected by the backend server
                // Displays the error messages
                dispatch(slice.actions.setErrors(result.errors));
            }
        } catch (e) {
            dispatch(slice.actions.setErrors(e));
        } finally {
            dispatch(slice.actions.setRequesting(false));
        }
    },
    addItem: (item) => async (dispatch) => {
        dispatch(slice.actions.setRequesting(true));

        const service = new HighValueItemService();

        try {
            const result = await service.addItem(item);
            
            if (!result.hasErrors) {
                // When the request is accepted by the backend server
                dispatch(slice.actions.addItem(result.value));
                dispatch(slice.actions.refreshCategoryItemMapper());
            } else {
                // When the request is rejected by the backend server
                // Displays the error messages
                dispatch(slice.actions.setErrors(result.errors));
            }
        } catch (e) {
            dispatch(slice.actions.setErrors(e));
        } finally {
            dispatch(slice.actions.setRequesting(false));
        }
    },
    removeItem: (item) => async (dispatch) => {
        dispatch(slice.actions.setRequesting(true));

        const service = new HighValueItemService();

        try {
            const result = await service.removeItem(item);
            
            if (!result.hasErrors) {
                // When the request is accepted by the backend server
                dispatch(slice.actions.removeItem(result.value));
                dispatch(slice.actions.refreshCategoryItemMapper());
            } else {
                // When the request is rejected by the backend server
                // Displays the error messages
                dispatch(slice.actions.setErrors(result.errors));
            }
        } catch (e) {
            dispatch(slice.actions.setErrors(e));
        } finally {
            dispatch(slice.actions.setRequesting(false));
        }
    },
};

export default slice;
