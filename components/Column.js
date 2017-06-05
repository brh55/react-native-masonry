import React, { Component } from 'react';
import { View, Image, TouchableHighlight } from 'react-native';
import styles from '../styles/main';
import PropTypes from 'prop-types';
import Brick from './Brick';

// Takes props and returns a masonry column
export default class Column extends Component {
  static propTypes = {
    data: PropTypes.array,
    columns: PropTypes.number,
    parentDimensions: PropTypes.object,
    columnKey: PropTypes.string
  };

  constructor(props) {
    super(props);
    this.state = {
      images: [],
      columnWidth: 0
    };
  }

  componentWillMount() {
    this.setState({
      images: this._resizeImages(this.props.data, this.props.parentDimensions, this.props.columns),
    });
  }

  componentWillReceiveProps(nextProps) {
     this.setState({
	      images: this._resizeImages(nextProps.data, nextProps.parentDimensions, nextProps.columns)
      });
  }

  // Transforms an array of images with dimensions scaled according to the
  // column it is within
  // _resizeImages :: Data, nColumns, parentDimensions -> ResizedImage
  _resizeImages (data, parentDimensions, nColumns) {
    return Object.keys(data).map((key) => {
      const image = data[key];
        const imageSizedForColumn =
          this._resizeByColumns(data[key].dimensions, parentDimensions, nColumns);
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
  _resizeByColumns (imgDimensions, parentDimensions, nColumns=2) {
    const { height, width } = parentDimensions;

    // The gutter is 1% of the available view width
    const gutterBase = width / 100;
    const gutterSize = gutterBase * 1;

    // Column gutters are shared between right and left image
    const columnWidth = (width / nColumns) - (gutterSize / 2);

    if (this.state.columnWidth !== columnWidth) {
      this.setState({
        columnWidth
      });
    }

    const divider = imgDimensions.width / columnWidth;

    const newWidth = imgDimensions.width / divider;
    const newHeight = imgDimensions.height / divider;

    return { width: newWidth, height: newHeight, gutter: gutterSize };
  }

  // Renders the "bricks" within the columns
  // _renderBricks :: [images] -> [TouchableTag || ImageTag...]
  _renderBricks (bricks) {
    return bricks.map((brick, index) => {
      const gutter = (index === 0) ? 0 : brick.gutter;
      const key = `RN-MASONRY-BRICK-${brick.column}-${index}`;
      const updateBrick = { ...brick, gutter, key };

      return (
        <Brick
          {...updateBrick} />
      );
    });
  }

  render() {
    return (
      <View
        key={this.props.columnKey}
        style={[{ width: this.state.columnWidth }, styles.masonry__column ]} >
          {this._renderBricks(this.state.images)}
      </View>
    )
  }
}
