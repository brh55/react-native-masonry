import { View, ListView, Image, Text, Dimensions } from 'react-native';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Task from 'data.task';
import { curry, compose } from 'ramda';

import { resolveImage } from './model';
import Column from './Column';
import styles from '../styles/main';

// addIndex :: Number -> Object -> Object
// const addColumx = curry((index, targetObject) => ({ index, ...targetObject }))
// assignObjectColumns :: Number -> [Objects] -> [Objects]
const assignObjectColumns = (nColumns, index, targetObject) => ({ ...{ column: index % nColumns }, ...targetObject});

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
    console.log(props)
    console.log('Loading');
    super(props);
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      dataSource: this.ds,
      dimensions: Dimensions.get('window')
    };
    this._data = [];
  }

  componentDidMount() {
    console.log(this.props)
    this.props.bricks
      .map((brick, index) => assignObjectColumns(this.props.columns, index, brick))
      .map(brick => resolveImage(brick))
      .map(task => task.fork(
	(err) => console.log('Image failed'),
	(resolveBrick) => {
	  const columnIndex = resolveBrick.column;
	  const column = this._data[columnIndex];
	  if (column) {
	    this._data[columnIndex] = [...column, resolveBrick];
	  } else {
	    this._data = [...this._data, [resolveBrick]];
	  }

	  this.setState({
	    dataSource: this.state.dataSource.cloneWithRows(this._data)
	  });
	}));
  }
    //    fetchImages(errorHandler, successHandler, props.bricks);
//    Promise.all(__getImages(props.bricks))
//      .then(fetchedImages => {
//        this.setState({
//	  ...this.state,
//	  dataSource: this.ds.cloneWithRows(fetchedImages)
  //      });
    //  })
    //      .catch(console.warn); 

  render() {
    return (
  	<View>
   	<ListView
      contentContainerStyle={ styles.masonry__container }
      dataSource={ this.state.dataSource }
      renderRow={ (data) => <Column data={data} columns={this.props.columns} dims={this.state.dimensions} /> } />
  	</View>
    )    
  }

  // __updateImageSizing
  // __updateImageSizing () {
  //   const currentDims = Dimensions.get('window');
  //   const rotation = this.state.dimensions.width !== currentDims.width || this.state.dimensions.height !== currentDims.height;
  //   if (rotation) {
  //     this.setState({
  // 	...this.state,
  // 	dimensions: currentDims
  //     });
  //   }
  // }
    
  // componentWillReceiveProps(nextProps) {
  //   Promise.all(__getImages(nextProps.data))
  //     .then(fetchedImages => {
  // 	// fetchAndSplitImages :: 
  // 	const fetchAndSplitImages = _.compose(_splitSet(nextProps.columns), fetchImages);
  // 	this.setState({
  // 	  ...this.state,
  //         dataSource: this.state.dataSource.cloneWithRows([...images])
  // 	});
  //     })
  //     .catch(console.warn);
  // }
}

// _updateState :: Component -> Data -> Component
//export const _updateState = _.curry((component, data) => console.log(data));

// _splitSets :: Number -> [B] -> [B]
// export const _splitSet = _.curry((data, nSets) => {
//   const splittedSet = [];

//   for (let i = 0; i < data.length; i++) {
//     const index = i % nColumns;
//     if (dataSet[index]) {
//       dataSet[index].push(data[i]);
//     } else {
//       dataSet.push([data[i]]);
//     }
//   }
//   return dataSet;
// });

