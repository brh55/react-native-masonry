import { Image } from 'react-native';
import Task from 'data.task';

// resolveImage :: String -> Task(Error, Image)
export const resolveImage = (data) => {
	return new Task((reject, resolve) => Image.getSize(data.uri, (width, height) => resolve({
		...data,
		//@TODO: Consider consolidating data.uri with dimensions to a image object
		dimensions: {
			width,
			height
		}
	}), (err) => reject(err)));
};
