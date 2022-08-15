import
    highValueItemsSlice,
    {
        initialState,
        setInitializing,
        setRequesting,
        setItems,
        addItem,
        removeItem,
        setCategoryItemMapper,
        setTotal,
        refreshCategoryItemMapper,
        recalculateTotalAmount,
    }
from '../store/highValueItemsStore';
import highValueItemsJSON from './resources/highValueItems.sample.json';
import highValueItemsCategoryItemMapperJSON from './resources/highValueItemsCategoryItemMapper.samples.json';

const reducer = highValueItemsSlice.reducer;

test('should return the initial state', () => {
    expect(reducer(undefined, { type: undefined })).toEqual(
        {"items": [], "categoryItemMapper": {}, "total": 0.0, "isInit": true, "isLoading": false}
    )
});
  
test('should handle changing the initializing state', () => {
    const previousState = initialState;

    expect(reducer(previousState, setInitializing(false))).toEqual(
    {"items": [], "categoryItemMapper": {}, "total": 0.0, "isInit": false, "isLoading": false}
    );
});

test('should handle changing the requesting state', () => {
    const previousState = {
        ...initialState,
        isInit: false,
    };

    expect(reducer(previousState, setRequesting(true))).toEqual(
        {"items": [], "categoryItemMapper": {}, "total": 0.0, "isInit": false, "isLoading": true}
    );
});

test('should handle setting high-values items and refreshing the category item mapper', () => {
    let previousState = {
        ...initialState,
        isInit: false,
    };

    expect(reducer(previousState, setItems(highValueItemsJSON))).toEqual(
        {"items": highValueItemsJSON, "categoryItemMapper": {}, "total": 0.0, "isInit": false, "isLoading": false}
    );

    previousState = {
        ...previousState,
        items: highValueItemsJSON,
    }

    expect(reducer(previousState, refreshCategoryItemMapper())).toEqual(
        {"items": highValueItemsJSON, "categoryItemMapper": highValueItemsCategoryItemMapperJSON, "total": 0.0, "isInit": false, "isLoading": false}
    );

    previousState = {
        ...previousState,
        categoryItemMapper: highValueItemsCategoryItemMapperJSON,
    };

    expect(reducer(previousState, recalculateTotalAmount())).toEqual(
        {"items": highValueItemsJSON, "categoryItemMapper": highValueItemsCategoryItemMapperJSON, "total": 6400.0, "isInit": false, "isLoading": false}
    );
});

test('should handle adding new item to the store', () => {
    const previousState = {
        ...initialState,
        isInit: false,
        items: highValueItemsJSON,
        categoryItemMapper: highValueItemsCategoryItemMapperJSON,
        total: 6400.0,
    };

    const newItem = {
        "Id": "7",
        "category": "Electronic",
        "name": "PlayStation",
        "value": 400.0,
    };

    const expectedItems = [...highValueItemsJSON, newItem];
    const expectedHighValueItemsCategoryItemMapper = JSON.parse(JSON.stringify(highValueItemsCategoryItemMapperJSON));
    expectedHighValueItemsCategoryItemMapper.Electronic.subTotal += newItem.value;

    expect(reducer(previousState, addItem(newItem))).toEqual(
        {"items": expectedItems, "categoryItemMapper": expectedHighValueItemsCategoryItemMapper, "total": 6800.0, "isInit": false, "isLoading": false}
    );
});

test('should handle deleting an item from the store', () => {
    const targetItem = {
        "Id": "7",
        "category": "Electronic",
        "name": "PlayStation",
        "value": 400.0,
    };
    const previousHighValueItemsCategoryItemMapper = JSON.parse(JSON.stringify(highValueItemsCategoryItemMapperJSON));
    previousHighValueItemsCategoryItemMapper.Electronic.subTotal += targetItem.value;
    const previousState = {
        ...initialState,
        isInit: false,
        items: [...highValueItemsJSON, targetItem],
        categoryItemMapper: previousHighValueItemsCategoryItemMapper,
        total: 6800.0,
    };

    expect(reducer(previousState, removeItem(targetItem))).toEqual(
        {"items": highValueItemsJSON, "categoryItemMapper": highValueItemsCategoryItemMapperJSON, "total": 6400.0, "isInit": false, "isLoading": false}
    );
});

test('should handle setting category item mapper to the store', () => {
    const previousState = initialState;

    expect(reducer(previousState, setCategoryItemMapper(highValueItemsCategoryItemMapperJSON))).toEqual(
        {"items": [], "categoryItemMapper": highValueItemsCategoryItemMapperJSON, "total": 0.0, "isInit": true, "isLoading": false}
    );
});
 
test('should handle setting total amount to the store', () => {
    const previousState = initialState;

    expect(reducer(previousState, setTotal(800.0))).toEqual(
        {"items": [], "categoryItemMapper": {}, "total": 800.0, "isInit": true, "isLoading": false}
    );
});
