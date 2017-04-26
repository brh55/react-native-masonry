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

// buildImageTask :: [Sources] -> [Task]
// const buildImageTask = map(source => _resolveImage(source));

// fetchImages :: [Sources] -> [Task]
// export default const fetchImage = compose(map(task => task.fork(imageFail, pass)), buildImageTask, assignObjectColumns(props.columns));
// const fetchImage = compose(

