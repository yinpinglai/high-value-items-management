import { createSlice } from '@reduxjs/toolkit';
import SettingsService from '../services/settingsService';

export const initialState = {
    isInit: true,
    isLoading: false,
    config: {
        highValuesCategories: [],
    },
};

export const slice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        setInitializing: (state, action) => {
            state.isInit = action.payload;
        },
        setRequesting: (state, action) => {
            state.isLoading = action.payload;
        },
        setSettings: (state, action) => {
            state.config = action.payload;
        },
    },
});

export const { setInitializing, setRequesting, setSettings  } = slice.actions;

export const actionCreators = {
    retrieveSettings: () => async (dispatch) => {
        dispatch(slice.actions.setRequesting(true));
        
        const service = new SettingsService();

        // Fetching data from the API server
        const result = await service.retrieveSettings();

        if (!result.hasErrors) {
            // When the request is accepted by the backend server
            dispatch(slice.actions.setSettings(result.value));
        }

        dispatch(slice.actions.setRequesting(false));
    },
};

export default slice;
