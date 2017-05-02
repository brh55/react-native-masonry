import { View, ListView, Image, Text, Dimensions } from 'react-native';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Task from 'data.task';
// import isEqual from 'lodash.isequal';

import { resolveImage } from './model';
import Column from './Column';
import styles from '../styles/main';

// assignObjectColumns :: Number -> [Objects] -> [Objects]
const assignObjectColumns = (nColumns, index, targetObject) => ({ ...{ column: index % nColumns }, ...targetObject});

// containMatchingUris :: ([brick], [brick]) -> Bool
// const containMatchingUris = (r1, r2) => isEqual(r1.map(brick => brick.uri), r2.map(brick => brick.uri));

export default class Masonry extends Component {
  static propTypes = {
    bricks: PropTypes.array,
    columns: PropTypes.number
  };

  static defaultProps = {
    bricks: [],
    columns: 2
  };

  constructor(props) {
    super(props);
    // @TODO: Fix BUG: r1 === r2, despite clone changes,
    // Once resolve, replace with !containMatchingUris
    // Assuming users don't want duplicated images, if this is not the case we can always change the diff check
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => true});
    this.state = {
      dataSource: this.ds,
      dimensions: Dimensions.get('window'),
      initialOrientation: true
    };
    this._data = [];
    // Assuming that rotation is binary (vertical|landscape)
    Dimensions.addEventListener('change', (window) => this.setState(state => ({ initialOrientation: !state.initialOrientation })))
  }

  componentWillReceiveProps(nextProps) {
    nextProps.bricks
      .map((brick, index) => assignObjectColumns(this.props.columns, index, brick))
      .map(brick => resolveImage(brick))
      .map(resolveTask => resolveTask.fork(
	(err) => console.warn('Image failed to load'),
	(resolveBrick) => {
	  const columnIndex = resolveBrick.column;
	  const column = this._data[columnIndex];
	  if (column) {
	    // Append to existing "row"/"column"
	    this._data[columnIndex] = [...column, resolveBrick];
	  } else {
	    // Pass it as a new "row" for the data source
	    this._data = [...this._data, [resolveBrick]];
	  }

	  this.setState(state => ({
	    dataSource: state.dataSource.cloneWithRows(this._data)
	  }));
	}));
  }

  render() {
    return (
  	<View>
 	  <ListView
             contentContainerStyle={styles.masonry__container}
             dataSource={this.state.dataSource}
             renderRow={(data) => <Column data={data} columns={this.props.columns} /> }
           />
  	</View>
    )    
  }   
}

