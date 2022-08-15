import
    settingsSlice,
    { initialState, setInitializing, setRequesting, setSettings }
from '../store/settingsStore';
import settingsJSON from './resources/settings.sample.json';

const reducer = settingsSlice.reducer;

test('should return the initial state', () => {
  expect(reducer(undefined, { type: undefined })).toEqual(
    {"config": {"highValuesCategories": []}, "isInit": true, "isLoading": false}
  )
});

test('should handle changing the initializing state', () => {
    const previousState = initialState;

    expect(reducer(previousState, setInitializing(false))).toEqual(
        {"config": {"highValuesCategories": []}, "isInit": false, "isLoading": false}
    );
});

test('should handle reloading the app settings from the API', () => {
    const previousState = {
        ...initialState,
        isInit: false,
    };

    expect(reducer(previousState, setSettings(settingsJSON))).toEqual(
        {"config": settingsJSON, "isInit": false, "isLoading": false}
    );
});

test('should handle changing the requesting state', () => {
    const previousState = {
        ...initialState,
        isInit: false,
        config: settingsJSON,
    };

    expect(reducer(previousState, setRequesting(true))).toEqual(
        {"config": settingsJSON, "isInit": false, "isLoading": true}
    );
});
