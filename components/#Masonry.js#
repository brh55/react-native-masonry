'use strict';
import { ListView, Image } from 'react-native';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Row from './Row';
import styles from '../styles/main';

export default class Masonry extends Component {
  static propTypes = {
    images: PropTypes.array,
  };

  static defaultProps = {
      images: [],
      columns: 2
  };

  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    this.state = {
      dataSource: this.ds
    };

    // Once the images are resolved and the dimensions are resolved,
    // save as a dataSource
    Promise.all(__getImages(props.data))
      .then(fetchedImages => {
        this.state = {
          dataSource: this.ds.cloneWithRows(fetchedImages)
        };
      })
      .catch(console.warn);
  }

  componentWillReceiveProps(nextProps) {
    Promise.all(__getImages(nextProps.data))
      .then(fetchedImages => {
	const images = __splitIntoColumns(fetchedImages, nextProps.columns);
	this.setState({
          dataSource: this.state.dataSource.cloneWithRows([...images])
	});
      })
      .catch(console.warn);
  }

  render() {
    return (
	<ListView
         contentContainerStyle={ styles.masonry__container }
         dataSource={ this.state.dataSource }
         renderRow={ (data) => (<Row data={data} columns={this.props.columns} />) }
      />
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
