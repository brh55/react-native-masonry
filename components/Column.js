import React, { Component } from 'react';
import { View, Image, TouchableHighlight, FlatList } from 'react-native';
import styles from '../styles/main';
import PropTypes from 'prop-types';
import Brick from './Brick';

// Takes props and returns a masonry column
export default class Column extends Component {
	static propTypes = {
		data: PropTypes.array,
		columns: PropTypes.number,
		parentDimensions: PropTypes.object,
		columnKey: PropTypes.string,
		imageContainerStyle: PropTypes.object,
		customImageComponent: PropTypes.func,
		customImageProps: PropTypes.object
	};

	static defaultProps = {
		imageContainerStyle: {},
		spacing: 1
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
			images: this._resizeImages(this.props.data, this.props.parentDimensions, this.props.columns)
		});
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			images: this._resizeImages(nextProps.data, nextProps.parentDimensions, nextProps.columns)
		});
	}

	// Transforms an array of images with dimensions scaled according to the
	// column it is within
	// _resizeImages :: Data, parentDimensions. nColumns -> ResizedImage
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
	_resizeByColumns (imgDimensions = { width: 0, height: 0 }, parentDimensions, nColumns=2) {
		const { height, width } = parentDimensions;

		// The gutter is 1% of the available view width
		const gutterBase = width / 100;
		const gutterSize = gutterBase * this.props.spacing;

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
	// _renderBrick :: images -> [TouchableTag || ImageTag...]
	_renderBrick = (data) => {
		// Example Data Structure
		// {
		//   "item": {
		//     "uri": "https://img.buzzfeed.com/buzzfeed-static/static/2016-01/14/20/campaign_images/webdr15/which-delicious-mexican-food-item-are-you-based-o-2-20324-1452822970-1_dblbig.jpg",
		//     "column": 0,
		//     "dimensions": {
		//       "width": 625,
		//       "height": 415
		//     },
		//     "width": 180.675,
		//     "height": 119.96820000000001,
		//     "gutter": 3.65
		//   },
		//   "index": 9
		// }
		const brick = data.item;
		const gutter = (data.index === 0) ? 0 : brick.gutter;
		const key = `RN-MASONRY-BRICK-${brick.column}-${data.index}`;
		const { imageContainerStyle, customImageComponent, customImageProps } = this.props;
		const props = { ...brick, gutter, key, imageContainerStyle, customImageComponent, customImageProps };

		return (
			<Brick
			  {...props} />
		);
	}

	// _keyExtractor :: item -> id
	_keyExtractor = (item) => ("IMAGE-KEY-" + item.uri + "---" + (item.key ? item.key : "0"));

	render() {
		return (
			<View
			  style={[
				  {
					  width: this.state.columnWidth,
					  overflow: 'hidden'
				  },
				  styles.masonry__column
			  ]}>
			  <FlatList
				key={this.props.columnKey}
				data={this.state.images}
				keyExtractor={this._keyExtractor}
				renderItem={this._renderBrick}
				/>
			</View>
		)
	}
}
