import React from 'react';
import { Dimensions, View, Image, TouchableHighlight } from 'react-native';
import styles from '../styles/main';

// Takes props and returns a masonry column
const Row = (props) => {
  const data = props.data;
  // Resize based on columns
  const images = Object.keys(data).map((key) => {
    const { width, height, gutter } = __resizeByColumns(data[key].dimensions, props.columns);
    return { uri: data[key].uri, width, height, gutter };
  });

  return (
    <View style={styles.masonry__column}>
      {__renderImages(images)}
    </View>
  )
}

// A, B -> A
export function __resizeByColumns (imgDimensions, nColumns=2) {
  const { height, width } = Dimensions.get('window');

  const gutterBase = width / 100; // 1% = X px
  const gutterSize = gutterBase * 1;

  const columnWidths = (width / nColumns) - gutterSize;
  const divider = imgDimensions.width / columnWidths;

  const newWidth = imgDimensions.width / divider;
  const newHeight = imgDimensions.height / divider;

  return { width: newWidth, height: newHeight, gutter: gutterSize };
}

// Renders the bricks within the columns
// A -> B
export function __renderBricks (images) {
  return images.map((image, index) => {
    // Avoid margins for first element
    const gutter = (index === 0) ? 0 : image.gutter;
    const brick = (image.onPress) ? __getTouchableUnit(image) : __getImageTag(image);
    return brick;
  });
}           

// A -> B
export function __getImageTag (image) {
  return (
      <Image
        key={image.uri}
        source={{ uri: image.uri }}
        resizeMethod='auto'
        style={{ width: image.width, height: image.height, marginTop: gutter }} />
  )
}

// A -> B
export function __getTouchableUnit (image) {
  return (
      <TouchableHighlight
        onPress={image.onPress}>
          { __getImageTag(image) }
      </TouchableHighlight>
  )
}

export default Row;
