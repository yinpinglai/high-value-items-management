import React, { Component } from 'react';
import HighValuesItemList from '../components/highValueItem/list';
import CreationFormForHighValueItem from '../components/highValueItem/form';

export class Home extends Component {
  static displayName = Home.name;

  render() {
    return (
      <div>
        <HighValuesItemList />
        <CreationFormForHighValueItem />
      </div>
    );
  }
}
