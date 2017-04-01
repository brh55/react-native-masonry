'use strict';

import { ListView, Image } from 'react-native';
import React, { Component } from 'react';
import Row from './Row';
import styles from '../styles/main';

export default class Masonry extends Component {
  static propTypes = {
    images: React.PropTypes.array,
  };

  static defaultProps = {
    images: []
  };

  constructor(props) {
    super(props);

    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    this.state = {
      dataSource: this.ds
    };

    Promise.all(__getImages(props.data))
      .then(fetchedImages => {
        this.state = {
          dataSource: this.ds.cloneWithRows(fetchedImages)
        };
      })
      .catch(console.log);

  }

  componentWillReceiveProps(nextProps) {
    Promise.all(__getImages(nextProps.data))
      .then(fetchedImages => {
        const images = __splitIntoColumns(fetchedImages);
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows([...images])
        });
      })
      .catch(console.log);
  }

  render() {
    return (
       <ListView
        contentContainerStyle={ styles.masonry__container }
        dataSource={ this.state.dataSource }
        renderRow={ (data) => <Row {...data} /> }
      />
    )
  }
}


export function __getImages(images) {
  return images.map((image) => pGetImageSize(image.uri).then((dimensions) => {
    return {
      uri: image.uri,
      dimensions: {
        width: dimensions[0],
        height: dimensions[1]
      }
    };
  }));
}

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

function pGetImageSize(uri) {
  return new Promise((resolve, reject) => {
      Image.getSize(uri, (width, height) => resolve([width, height]), (err) => reject(err));
  });
}
