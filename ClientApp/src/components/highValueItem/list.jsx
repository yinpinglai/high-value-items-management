import React from 'react';
import Numeral from 'react-numeral';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import {
    Spinner,
    Button,
    Card,
    CardHeader,
    CardBody,
    CardText,
    CardFooter,
    ListGroup,
    ListGroupItem,
} from 'reactstrap';
import { actionCreators as settingsActionCreators } from '../../store/settingsStore';
import { actionCreators as highValueItemsActionCreators } from '../../store/highValueItemsStore';

function generateKey (id, name) {
    return `${id}__${name}`;
}

function renderAmount(amount) {
    return <span>${amount != 0 ? <Numeral value={amount} format={"0,0"} /> : '0'}</span>
}

function TotalAmount() {
    const highValuesTotalAmount = useSelector(state => state.highValueItems.total);
    return <CardFooter>TOTAL: {renderAmount(highValuesTotalAmount)}</CardFooter>
}

export default function HighValuesItemList() {
    const dispatch = useDispatch()
    const isInit = useSelector(state => state.settings.isInit) && useSelector(state => state.highValueItems.isInit);
    const isSettingsLoading = useSelector(state => state.settings.isLoading);
    const categoriesFromSettings = useSelector(state => state.settings.config.highValuesCategories);
    const isHighValuesItemsLoading = useSelector(state => state.highValueItems.isLoading);
    const categoryItemsMapper = useSelector(state => state.highValueItems.categoryItemMapper);
    const highValuesCategories = useSelector(state => state.highValueItems.categories);

    // TODO: wait for testing
    // if (isInit) {
    //     dispatch(settingsActionCreators.retrieveSettings());
    //     dispatch(highValueItemsActionCreators.retrieveItems());
    // }

    if (isSettingsLoading || isHighValuesItemsLoading)
        return <Spinner>Loading...</Spinner>

    const renderItemList = (category) => {
        const items = categoryItemsMapper[category.name];

        if (!items || (Array.isArray(items) && items.length == 0))
            return <CardBody><CardText>No records</CardText></CardBody>;

        return <div>
            <ListGroup flush>
                {items.map((item, index) =>
                    <ListGroupItem key={generateKey(item.id, item.name)}>
                        <div className='container'>
                            <div className='row justify-content-between align-items-center'>
                                <div className='col-9'>{index + 1}. {item.name}</div>
                                <div className='col-2'>{renderAmount(item.value)}</div>
                                <div className='col-1'>
                                    <Button
                                        color="danger"
                                        onClick={() => dispatch(highValueItemsActionCreators.removeItem(item))}
                                    >
                                        <FontAwesomeIcon icon={faTrash} />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </ListGroupItem>)}
            </ListGroup>
        </div>;
    };

    const renderSubTotalAmount = (category) => {
        const highValuesCategory = highValuesCategories.filter(item => item.name == category.name);

        if (highValuesCategory.length == 0)
            return <span>0</span>;
        
        return <strong>{renderAmount(highValuesCategory[0].subTotal)}</strong>
    };


    return <div className='container'>
        {categoriesFromSettings.map(item => (
            <Card key={generateKey(item.id, item.name)}>
                <CardHeader>
                    <div className='container'>
                        <div className='row justify-content-between align-items-center'>
                            <div className='col-8'>{item.name}</div>
                            <div className='col-4'>{renderSubTotalAmount(item)}</div>
                        </div>
                    </div>
                </CardHeader>
                {renderItemList(item)}
            </Card>
        ))}
        <TotalAmount />
    </div>
};
