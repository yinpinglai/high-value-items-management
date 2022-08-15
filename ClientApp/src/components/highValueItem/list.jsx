import React from 'react';
import Numeral from 'react-numeral';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import {
    Spinner,
    Container,
    Row,
    Col,
    Button,
    Card,
    CardHeader,
    CardBody,
    CardText,
    CardFooter,
    ListGroup,
    ListGroupItem,
} from 'reactstrap';
import { actionCreators as highValueItemsActionCreators } from '../../store/highValueItemsStore';

function generateKey (id, name) {
    return `${id}__${name}`;
}

function renderAmount(amount) {
    return <span>${amount !== 0 ? <Numeral value={amount} format={"0,0"} /> : '0'}</span>
}

function TotalAmount() {
    const highValuesTotalAmount = useSelector(state => state.highValueItems.total);
    return <CardFooter>TOTAL: {renderAmount(highValuesTotalAmount)}</CardFooter>
}

export default function HighValuesItemList() {
    const dispatch = useDispatch()
    const isSettingsLoading = useSelector(state => state.settings.isLoading);
    const categoriesFromSettings = useSelector(state => state.settings.config.highValuesCategories);
    const isHighValuesItemsLoading = useSelector(state => state.highValueItems.isLoading);
    const categoryItemsMapper = useSelector(state => state.highValueItems.categoryItemMapper);

    if (isSettingsLoading || isHighValuesItemsLoading)
        return <Spinner>Loading...</Spinner>

    const renderItemList = (category) => {
        const categoryItems = categoryItemsMapper[category.name];

        if (!categoryItems || !categoryItems.items || (Array.isArray(categoryItems.items) && categoryItems.items.length === 0))
            return <CardBody><CardText>No records</CardText></CardBody>;

        return <div>
            <ListGroup flush>
                {categoryItems.items.map((item, index) =>
                    <ListGroupItem key={generateKey(item.id, item.name)}>
                        <Container>
                            <Row className='justify-content-between align-items-center'>
                                <Col md={9}>{index + 1}. {item.name}</Col>
                                <Col md={2}>{renderAmount(item.value)}</Col>
                                <Col md={1}>
                                    <Button
                                        color="danger"
                                        onClick={() => dispatch(highValueItemsActionCreators.removeItem(item))}
                                    >
                                        <FontAwesomeIcon icon={faTrash} />
                                    </Button>
                                </Col>
                            </Row>
                        </Container>
                    </ListGroupItem>)}
            </ListGroup>
        </div>;
    };

    const renderSubTotalAmount = (category) => {
        const highValuesCategory = categoryItemsMapper[category.name];

        if (!highValuesCategory)
            return <span>0</span>;
        
        return <strong>{renderAmount(highValuesCategory.subTotal)}</strong>
    };


    return <Container>
        {categoriesFromSettings.map(item => (
            <Card key={generateKey(item.id, item.name)}>
                <CardHeader>
                    <Container>
                        <Row className='justify-content-between align-items-center'>
                            <Col md={8}>{item.name}</Col>
                            <Col md={4}>{renderSubTotalAmount(item)}</Col>
                        </Row>
                    </Container>
                </CardHeader>
                {renderItemList(item)}
            </Card>
        ))}
        <TotalAmount />
    </Container>
};
