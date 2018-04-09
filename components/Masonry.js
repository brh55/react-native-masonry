import { View, ListView, Image, Text, Dimensions } from 'react-native';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Task from 'data.task';
import isEqual from 'lodash.isequal';
import differenceBy from 'lodash.differenceby';

import { resolveImage } from './model';
import Column from './Column';
import styles from '../styles/main';

// assignObjectColumn :: Number -> [Objects] -> [Objects]
export const assignObjectColumn = (nColumns, index, targetObject) => ({...targetObject, ...{ column: index % nColumns }});

// assignObjectIndex :: (Number, Object) -> Object
// Assigns an `index` property` from bricks={data}` for later sorting.
export const assignObjectIndex = (index, targetObject) => ({...targetObject, ...{ index }});

// containMatchingUris :: ([brick], [brick]) -> Bool
const containMatchingUris = (r1, r2) => isEqual(r1.map(brick => brick.uri), r2.map(brick => brick.uri));

// generateColumnsHeight :: Number -> Array [...0]
const generateColumnHeights = num => Array(num).fill(0);

export default class Masonry extends Component {
	static propTypes = {
		bricks: PropTypes.array,
		columns: PropTypes.number,
		sorted: PropTypes.bool,
		imageContainerStyle: PropTypes.object,
		customImageComponent: PropTypes.func,
		customImageProps: PropTypes.object,
		spacing: PropTypes.number,
		priority: PropTypes.string
	};

	static defaultProps = {
		bricks: [],
		columns: 2,
		sorted: false,
		imageContainerStyle: {},
		spacing: 1,
		priority: 'order'
	};

	constructor(props) {
		super(props);
		// Assuming users don't want duplicated images, if this is not the case we can always change the diff check
		this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => !containMatchingUris(r1, r2) });
		// This creates an array of [1..n] with values of 0, each index represent a column within the masonry
		const columnHeights = generateColumnHeights(props.columns);
		this.state = {
			dataSource: this.ds.cloneWithRows([]),
			dimensions: {},
			initialOrientation: true,
			_sortedData: [],
			_resolvedData: [],
			_columnHeights: columnHeights
		};
		// Assuming that rotation is binary (vertical|landscape)
		Dimensions.addEventListener('change', (window) => this.setState(state => ({ initialOrientation: !state.initialOrientation })));
	}

	componentDidMount() {
		this.resolveBricks(this.props);
	}

	componentWillReceiveProps(nextProps) {
		const differentColumns = this.props.columns !== nextProps.columns;
		const differentPriority = this.props.priority !== nextProps.priority;
		// We use the difference in the passed in bricks to determine if user is appending or not
		const brickDiff = differenceBy(nextProps.bricks, this.props.bricks, 'uri');
		const appendedData = brickDiff.length !== nextProps.bricks.length;

		// These intents would entail a complete re-render of the listview
		if (differentColumns || differentPriority || !appendedData) {
			this.setState(state => ({
				_sortedData: [],
				_resolvedData: [],
				_columnHeights: generateColumnHeights(nextProps.columns)
			}), this.resolveBricks(nextProps));
		}

		// We use the existing data and only resolve what is needed
		if (appendedData) {
			this.resolveBricks({...nextProps, bricks: brickDiff});
			return;
		}
	}

	resolveBricks({ bricks, columns }) {
		if (bricks.length === 0) {
			// clear and re-render
			this.setState(state => ({
				dataSource: state.dataSource.cloneWithRows([])
			}));
		}

		// Sort bricks and place them into their respectable columns
		// Issues arrise if state changes occur in the midst of a resolve
		bricks
			.map((brick, index) => assignObjectColumn(columns, index, brick))
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
						};
					});
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

	_insertIntoColumn = (resolvedBrick, dataSet) => {
		let dataCopy = dataSet.slice();
		const priority = this.props.priority;
		let columnIndex;

		switch (priority) {
		// Best effort to balance but sometimes state changes may have delays when performing calculation
		case 'balance':
			columnIndex = this.state._columnHeights
				.reduce((shortest, cValue, cIndex, cArray) => (cValue < cArray[shortest]) ? cIndex : shortest, 0);
			const heightsCopy = this.state._columnHeights.slice();
			const newColumnHeights = heightsCopy[columnIndex] + resolvedBrick.dimensions.height;
			heightsCopy[columnIndex] = newColumnHeights;
			this.setState({
				_columnHeights: heightsCopy
			});
			break;
		case 'order':
		default:
			columnIndex = resolvedBrick.column;
			break;
		}

		const column = dataSet[columnIndex];
		const sorted = this.props.sorted;

		if (column) {
			// Append to existing "row"/"column"
			const bricks = [...column, resolvedBrick];
			if (sorted) {
				// Sort bricks according to the index of their original array position
				bricks = bricks.sort((a, b) => (a.index < b.index) ? -1 : 1);
			}
			dataCopy[columnIndex] = bricks;
		} else {
			// Pass it as a new "row" for the data source
			dataCopy = [...dataCopy, [resolvedBrick]];
		}

		return dataCopy;
	};


	render() {
		return (
			<View style={{flex: 1}} onLayout={(event) => this._setParentDimensions(event)}>
			  <ListView
				contentContainerStyle={styles.masonry__container}
				dataSource={this.state.dataSource}
				enableEmptySections
				scrollRenderAheadDistance={100}
				removeClippedSubviews={false}
				renderRow={(data, sectionId, rowID) =>
						   <Column
								 data={data}
								 columns={this.props.columns}
								 parentDimensions={this.state.dimensions}
								 imageContainerStyle={this.props.imageContainerStyle}
								 customImageComponent={this.props.customImageComponent}
								 customImageProps={this.props.customImageProps}
								 spacing={this.props.spacing}
								 key={`RN-MASONRY-COLUMN-${rowID}`} />
						   }
			 />
			</View>
		);
	}
};
