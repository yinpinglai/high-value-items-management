import React, { Component } from 'react';
import { connect } from 'react-redux';
import HighValuesItemList from '../components/highValueItem/list';
import CreationFormForHighValueItem from '../components/highValueItem/form';
import { actionCreators as settingsActionCreators } from '../store/settingsStore';
import { actionCreators as highValueItemsActionCreators } from '../store/highValueItemsStore';

class Home extends Component {
  static displayName = Home.name;

  componentDidMount() {
    this.props.loadAppSettings();
    this.props.restoreData();
  }

  render() {
    return (
      <div>
        <HighValuesItemList />
        <CreationFormForHighValueItem />
      </div>
    );
  }
};

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
  loadAppSettings: () => dispatch(settingsActionCreators.retrieveSettings()),
  restoreData: () => dispatch(highValueItemsActionCreators.retrieveItems()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
