import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    FormGroup,
    Form,
    Row,
    Col,
    Label,
    Input,
    Button,
    Spinner,
    CardBody,
} from 'reactstrap';
import { actionCreators as highValueItemsActionCreators } from '../../store/highValueItemsStore';

function generateKey (id, name) {
    return `${id}__${name}`;
}

export default function CreationFormForHighValueItem() {
    const dispatch = useDispatch()
    const isLoading = useSelector(state => state.highValueItems.isLoading);
    const categoriesFromSettings = useSelector(state => state.settings.config.highValuesCategories);
    if (isLoading) return <Spinner>Loading...</Spinner>

    const handleCreationFormSubmit = (e) => {
        e.preventDefault();
        let name = e.target.name.value;
        let value = parseFloat(e.target.value.value);
        let category = e.target.categories[e.target.categories.selectedIndex].value;

        if (!name || !value || !category)
            return;
        
        const item = {name, value, category};
        dispatch(highValueItemsActionCreators.addItem(item));
    };

    return (<CardBody>
        <Form onSubmit={handleCreationFormSubmit}>
        <Row className='justify-content-between align-items-center'>
          <Col md={3}>
            <FormGroup>
              <Label for="name">Item Name</Label>
              <Input id="name" name="name" />
            </FormGroup>
          </Col>
          <Col md={3}>
            <FormGroup>
                <Label for="value">Value</Label>
                <Input id="value" name="number" placeholder="$1000" type="number" />
            </FormGroup>
          </Col>
          <Col md={3}>
            <FormGroup>
              <Label for="category">
                Category
              </Label>
              <Input id="categories" name="category" type="select">
                {categoriesFromSettings.map(
                    category => <option
                        key={generateKey(category.id, category.name)}
                        value={category.name}>
                            {category.name}
                        </option>)}
                </Input>
            </FormGroup>
          </Col>
          <Col md={2}>
            <Button type='submit'>Add</Button>
          </Col>
        </Row>
      </Form>
    </CardBody>);
};
