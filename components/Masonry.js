import { View, ListView, Image, Text, Dimensions } from 'react-native';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Task from 'data.task';
import isEqual from 'lodash.isequal';

import { resolveImage } from './model';
import Column from './Column';
import styles from '../styles/main';

// assignObjectColumns :: Number -> [Objects] -> [Objects]
const assignObjectColumns = (nColumns, index, targetObject) => ({...targetObject, ...{ column: index % nColumns }});

// assignObjectIndex :: (Number, Object) -> Object
// Assigns an `index` property` from bricks={data}` for later sorting.
const assignObjectIndex = (index, targetObject) => ({...targetObject, ...{ index }});

// containMatchingUris :: ([brick], [brick]) -> Bool
const containMatchingUris = (r1, r2) => isEqual(r1.map(brick => brick.uri), r2.map(brick => brick.uri));

export default class Masonry extends Component {
  static propTypes = {
    bricks: PropTypes.array,
    columns: PropTypes.number,
    sorted: PropTypes.bool,
  };

  static defaultProps = {
    bricks: [],
    columns: 2,
    sorted: false,
  };

  constructor(props) {
    super(props);
    // Assuming users don't want duplicated images, if this is not the case we can always change the diff check
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => !containMatchingUris(r1, r2) });
    this.state = {
      dataSource: this.ds.cloneWithRows([]),
      dimensions: {},
      initialOrientation: true,
      _sortedData: [],
      _resolvedData: []
    };
    // Assuming that rotation is binary (vertical|landscape)
    Dimensions.addEventListener('change', (window) => this.setState(state => ({ initialOrientation: !state.initialOrientation })))
  }

  componentDidMount() {
    this.resolveBricks(this.props);
  }

  componentWillReceiveProps(nextProps) {
    const sameData = containMatchingUris(this.props.bricks, nextProps.bricks);
    if (sameData) {
      const differentColumns = this.props.columns !== nextProps.columns;

      if (differentColumns) {
        const newColumnCount = nextProps.columns;
        // Re-sort existing data instead of attempting to re-resolved
        const resortedData = this.state._resolvedData
          .map((brick, index) => assignObjectColumns(newColumnCount, index, brick))
          .reduce((sortDataAcc, resolvedBrick) => this._insertIntoColumn(resolvedBrick, sortDataAcc), []);

      	this.setState({
      	  dataSource: this.state.dataSource.cloneWithRows(resortedData)
      	});
      }
    } else {
      this.resolveBricks(nextProps);
    }
  }

  resolveBricks({ bricks, columns }) {
    bricks
      .map((brick, index) => assignObjectColumns(columns, index, brick))
      .map((brick, index) => assignObjectIndex(index, brick))
      .map(brick => resolveImage(brick))
      .map(resolveTask => resolveTask.fork(
      	(err) => console.warn('Image failed to load'),
      	(resolvedBrick) => {
      	  this.setState(state => {
      	    const sortedData = this._insertIntoColumn(resolvedBrick, state._sortedData);

      	    return {
      	      dataSource: state.dataSource.cloneWithRows(sortedData),
      	      _sortedData: sortedData,
      	      _resolvedData: [...state._resolvedData, resolvedBrick]
      	    }
      	  });;
      	}));
  }

  _setParentDimensions(event) {
    // Currently height isn't being utilized, but will pass through for future features
    const {width, height} = event.nativeEvent.layout;
    this.setState({
      dimensions: {
        width,
        height
      }
    });
  }

  // Returns a copy of the dataSet with resolvedBrick in correct place
  // (resolvedBrick, dataSetA) -> dataSetB
  _insertIntoColumn (resolvedBrick, dataSet) {
    let dataCopy = dataSet.slice();
    const columnIndex = resolvedBrick.column;
    const column = dataSet[columnIndex];

    if (column) {
      // Append to existing "row"/"column"
      const bricks = [...column, resolvedBrick]
      if(this.props.sorted) {
        // Sort bricks according to the index of their original array position
        bricks = bricks.sort((a, b) => { return (a.index < b.index) ? -1 : 1; });
      }
      dataCopy[columnIndex] = bricks
    } else {
      // Pass it as a new "row" for the data source
      dataCopy = [...dataCopy, [resolvedBrick]];
    }

    return dataCopy;
  };

  render() {
    return (
  	<View onLayout={(event) => this._setParentDimensions(event)}>
 	    <ListView
         contentContainerStyle={styles.masonry__container}
         dataSource={this.state.dataSource}
         enableEmptySections
         renderRow={(data, sectionId, rowID) =>
           <Column
             data={data}
             columns={this.props.columns}
             parentDimensions={this.state.dimensions}
             key={`RN-MASONRY-COLUMN-${rowID}`}/> }
       />
  	</View>
    )
  }
};
