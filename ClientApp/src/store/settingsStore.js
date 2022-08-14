import { createSlice } from '@reduxjs/toolkit';
import SettingsService from '../services/settingsService';

export const slice = createSlice({
    name: 'settings',
    initialState: {
        isInit: true,
        isLoading: false,
        config: {
            highValuesCategories: [
                {
                    "id": 1,
                    "name": "Electronic"
                },
                {
                    "id": 2,
                    "name": "Clothing"
                },
                {
                    "id": 3,
                    "name": "Kitchen"
                }
            ]
        },
        errors: undefined,
    },
    reducers: {
        setInitializing: (state, action) => {
            state.isInit = action.payload;
        },
        setRequesting: (state, action) => {
            state.isLoading = action.payload;
        },
        setSettings: (state, action) => {
            state.settings = action.payload;
        },
        setErrors: (state, action) => {
            state.errors = action.payload;
        },
    },
});

export const actionCreators = {
    retrieveSettings: () => async (dispatch) => {
        dispatch(slice.actions.setRequesting(true));
        
        const service = new SettingsService();
        
        try {
            // Fetching data from the API server
            const result = await service.retrieveSettings();

            if (!result.hasErrors) {
                // When the request is accepted by the backend server
                dispatch(slice.actions.setSettings(result));
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
