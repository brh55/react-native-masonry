import { Image } from 'react-native';
import Task from 'data.task';

// resolveImage :: String -> Task(Error, Image)
export const resolveImage = (data) => {
  return new Task((reject, resolve) => Image.getSize(data.uri, (width, height) => resolve({
    ...data,
    dimensions: {
      width,
      height
    }
  }), (err) => reject(err)));
};
