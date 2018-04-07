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

export default class Masonry extends Component {
	static propTypes = {
		bricks: PropTypes.array,
		columns: PropTypes.number,
		sorted: PropTypes.bool,
		imageContainerStyle: PropTypes.object,
		customImageComponent: PropTypes.func,
		customImageProps: PropTypes.object,
		spacing: PropTypes.number,
		refreshControl: PropTypes.element
	};

	static defaultProps = {
		bricks: [],
		columns: 2,
		sorted: false,
		imageContainerStyle: {},
		spacing: 1
	};

	constructor(props) {
		super(props);
		// Assuming users don't want duplicated images, if this is not the case we can always change the diff check
		this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => !containMatchingUris(r1, r2) });
		this.state = {
			dataSource: this.ds.cloneWithRows([]),
			dimensions: {},
			initialOrientation: true,
			_sortedData: [],
			_resolvedData: []
		};
		// Assuming that rotation is binary (vertical|landscape)
		Dimensions.addEventListener('change', (window) => this.setState(state => ({ initialOrientation: !state.initialOrientation })))
	}

	componentDidMount() {
		this.resolveBricks(this.props);
	}

	componentWillReceiveProps(nextProps) {
		// Check if it's array and contains more than 1 item
		if (!Array.isArray(nextProps.bricks) || nextProps.bricks.length === 0) {
			this.setState(state => ({
				dataSource: state.dataSource.cloneWithRows([])
			}));
		}

		const sameData = containMatchingUris(this.props.bricks, nextProps.bricks);
		const differentColumns = this.props.columns !== nextProps.columns;

		if (sameData && !differentColumns) {
			// Only re-render a portion of the bricks
			this.resolveBricks(nextProps, true);
		} else {
			this.resolveBricks(nextProps);
		}
	}

	resolveBricks({ bricks, columns }, partiallyCache = false) {
		// Sort bricks and place them into their respectable columns
		const sortedBricks = bricks
			  .map((brick, index) => assignObjectColumn(columns, index, brick))
			.map((brick, index) => assignObjectIndex(index, brick));

		// Do a difference check if these are new props
		// to only resolve what is needed
		const unresolvedBricks = (partiallyCache) ?
			differenceBy(sortedBricks, this.state._resolvedData, 'uri') :
			sortedBricks;

		unresolvedBricks
			.map(brick => resolveImage(brick))
			.map(resolveTask => resolveTask.fork(
				(err) => console.warn('Image failed to load'),
				(resolvedBrick) => {
					this.setState(state => {
						const sortedData = _insertIntoColumn(resolvedBrick, state._sortedData, this.props.sorted);

						return {
							dataSource: state.dataSource.cloneWithRows(sortedData),
							_sortedData: sortedData,
							_resolvedData: [...state._resolvedData, resolvedBrick]
						};
					});;
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

	render() {
		return (
			<View style={{flex: 1}} onLayout={(event) => this._setParentDimensions(event)}>
			  <ListView
				contentContainerStyle={styles.masonry__container}
				dataSource={this.state.dataSource}
				enableEmptySections
				renderRow={(data, sectionId, rowID) =>
						   <Column
								 data={data}
								 columns={this.props.columns}
								 parentDimensions={this.state.dimensions}
								 imageContainerStyle={this.props.imageContainerStyle}
								 customImageComponent={this.props.customImageComponent}
								 customImageProps={this.props.customImageProps}
								 spacing={this.props.spacing}
							 key={`RN-MASONRY-COLUMN-${rowID}`}/> }
				refreshControl={this.props.refreshControl}
				/>
			</View>
		)
	}
};

// Returns a copy of the dataSet with resolvedBrick in correct place
// (resolvedBrick, dataSetA, bool) -> dataSetB
export function _insertIntoColumn (resolvedBrick, dataSet, sorted) {
	let dataCopy = dataSet.slice();
	const columnIndex = resolvedBrick.column;
	const column = dataSet[columnIndex];

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
