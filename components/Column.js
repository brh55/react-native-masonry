import React, { Component } from 'react';
import { View, Image, TouchableHighlight } from 'react-native';
import styles from '../styles/main';

// Takes props and returns a masonry column
export default class Column extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: _resizeImages(this.props.data, this.props.parentDimensions, this.props.columns)
    };
  }

  componentWillReceiveProps(nextProps) {
     this.setState({
	      images: _resizeImages(nextProps.data, nextProps.parentDimensions, nextProps.columns)
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
// _resizeImages :: Data, nColumns, parentDimensions -> ResizedImage
export function _resizeImages (data, parentDimensions, nColumns) {
  return Object.keys(data).map((key) => {
    const image = data[key];
      const imageSizedForColumn =
        _resizeByColumns(data[key].dimensions, parentDimensions, nColumns);
      // Return a image object that width will be equivilent to
      // the column dimension, while retaining original image properties
      return {
	       ...image,
	       ...imageSizedForColumn
      };
    });
}
// Resize image while maintain aspect ratio
// _resizeByColumns :: ImgDimensions , parentDimensions, nColumns  -> AdjustedDimensions
export function _resizeByColumns (imgDimensions, parentDimensions, nColumns=2) {
  const { height, width } = parentDimensions;

  // The gutter is 1% of the available view width
  const gutterBase = width / 100;
  const gutterSize = gutterBase * 1;

  // Column gutters are shared between right and left image
  const columnWidths = (width / nColumns) - (gutterSize / 2);
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
export function _getImageTag (image, gutter = 0) {
  return (
      <Image
        key={image.uri}
        source={{ uri: image.uri }}
        resizeMethod='auto'
        style={{ width: image.width, height: image.height, marginTop: gutter }} />
  );
}

// _getTouchableUnit :: Image, Number -> TouchableTag
export function _getTouchableUnit (image, gutter = 0) {
  return (
      <TouchableHighlight
         key={image.uri}
         onPress={() => image.onPress(image)}>
            { _getImageTag(image, gutter) }
      </TouchableHighlight>
  );
}
