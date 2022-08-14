import { configureStore } from '@reduxjs/toolkit';
import highValueItemsStore from './highValueItemsStore';
import settingsStore from './settingsStore';

export const reducers = {
    highValueItems: highValueItemsStore.reducer,
    settings: settingsStore.reducer,
};

export default configureStore({
  reducer: reducers,
});
