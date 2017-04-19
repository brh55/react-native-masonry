import { View, ListView, Image, Dimensions } from 'react-native';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Row from './Row';
import styles from '../styles/main';

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
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    this.state = {
      dataSource: this.ds,
      dimensions: Dimensions.get('window')
    };

    // Once the images are resolved and the dimensions are resolved,
    // save as a dataSource
    Promise.all(__getImages(props.bricks))
      .then(fetchedImages => {
        this.setState({
	  ...this.state,
	  dataSource: this.ds.cloneWithRows(fetchedImages)
        });
      })
      .catch(console.warn);
  }


  __updateImageSizing () {
    const currentDims = Dimensions.get('window');
    const rotation = this.state.dimensions.width !== currentDims.width || this.state.dimensions.height !== currentDims.height;
    if (rotation) {
      this.setState({
	...this.state,
	dimensions: currentDims
      });
    }
  }
    

  componentWillReceiveProps(nextProps) {
    Promise.all(__getImages(nextProps.data))
      .then(fetchedImages => {
	const images = __splitIntoColumns(fetchedImages, nextProps.columns);
	this.setState({
	  ...this.state,
          dataSource: this.state.dataSource.cloneWithRows([...images])
	});
      })
      .catch(console.warn);
  }

  render() {
    return (
	<View
          onLayout={this.__updateImageSizing.bind(this)}>
   	<ListView
         contentContainerStyle={ styles.masonry__container }
         dataSource={ this.state.dataSource }
         renderRow={ (data) => (<Row data={data} columns={this.props.columns} dims={this.state.dimensions} />) } />
	</View>
    )
  }
}

// A -> A
export function __getImages(images) {
  return images.map((image) => pGetImageSize(image.uri).then((dimensions) => {
    return {
      ...image,
      dimensions: {
        width: dimensions[0],
        height: dimensions[1]
      }
    };
  }));
}

// A, B -> A
export function __splitIntoColumns(data, nColumns = 2) {
  const dataSet = [];
  for (let i = 0; i < data.length; i++) {
    const index = i % nColumns;
    if (dataSet[index]) {
      dataSet[index].push(data[i]);
    } else {
      dataSet.push([data[i]]);
    }
  }
  return dataSet;
}

// A -> Promise -> A
function pGetImageSize(uri) {
  return new Promise((resolve, reject) => {
    Image.getSize(uri, (width, height) => resolve([width, height]), (err) => reject(err));
  });
}
