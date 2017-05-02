import React, { Component } from 'react';
import { Dimensions, View, Image, Text, TouchableHighlight } from 'react-native';
import styles from '../styles/main';

// Takes props and returns a masonry column
export default class Column extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: _resizeImages(this.props.data, this.props.columns),
    };
  }

  componentWillReceiveProps(nextProps) {
     this.setState({
	images: _resizeImages(nextProps.data, nextProps.columns)
      });
  }

  render() {
    return (
	<View
          style={styles.masonry__column}>
	  {_renderBricks(this.state.images)}  
        </View>
    )
  }
}

// Transforms an array of images with dimensions scaled according to the
// column it is within
// _resizeImages :: Data, nColumns -> ResizedImage
export function _resizeImages (data, nColumns) {
  return Object.keys(data).map((key) => {
    const image = data[key];
      const imageSizedForColumn = _resizeByColumns(data[key].dimensions, nColumns);
      // Return a image object that width will be equivilent to
      // the column dimension, while retaining original image properties
      return {
	...image,
	...imageSizedForColumn
      };
    });
}
// Resize image while maintain aspect ratio
// _resizeByColumns :: ImgDimensions , nColumns -> AdjustedDimensions
export function _resizeByColumns (imgDimensions, nColumns=2) {
  const { height, width } = Dimensions.get('window');

  const gutterBase = width / 100; // 1% = X px
  const gutterSize = gutterBase * 1;

  const columnWidths = (width / nColumns) - gutterSize;
  const divider = imgDimensions.width / columnWidths;

  const newWidth = imgDimensions.width / divider;
  const newHeight = imgDimensions.height / divider;

  return { width: newWidth, height: newHeight, gutter: gutterSize };
}

// Renders the "bricks" within the columns
// _renderBricks :: [images] -> [TouchableTag || ImageTag...]
export function _renderBricks (images) {
  return images.map((image, index) => {
    // Avoid margins for first element
    const gutter = (index === 0) ? 0 : image.gutter;
    const brick = (image.onPress) ? _getTouchableUnit(image, gutter) : _getImageTag(image, gutter);
    return brick;
  });
}           

// _getImageTag :: Image, Gutter -> ImageTag
export function _getImageTag (image, gutter) {
  return (
      <Image
        key={image.uri}
        source={{ uri: image.uri }}
        resizeMethod='auto'
        style={{ width: image.width, height: image.height, marginTop: gutter }} />
  );
}

// _getTouchableUnit :: Image, Gutter -> TouchableTag
export function _getTouchableUnit (image, gutter) {
  return (
      <TouchableHighlight
         onPress={() => image.onPress(image)}>
            { _getImageTag(image, gutter) }
      </TouchableHighlight>
  );
}

