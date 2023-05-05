import React, { useCallback, useEffect, useState } from 'react';
import update from 'immutability-helper';
import PropTypes from 'prop-types';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import CreatePostImageListItem from './CreatePostImageListItem';

const CreatePostImageList = ({ postImages, onAction, onOrderChange }) => {
  const [dragImages, setDragImages] = useState(postImages);

  useEffect(() => {
    setDragImages(postImages);
  }, [postImages]);

  const moveImage = useCallback((dragIndex, hoverIndex) => {
    setDragImages(prevCards =>
      update(prevCards, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevCards[dragIndex]]
        ]
      })
    );
  }, []);

  useEffect(() => {
    const hasChanges = dragImages.some((i, index) => i.index !== index);
    if (hasChanges) {
      onOrderChange(dragImages);
    }
  }, [dragImages]);

  return (
    <DndProvider backend={HTML5Backend}>
      {dragImages.map(image => (
        <CreatePostImageListItem
          image={image}
          key={image.pkUserPostImage}
          moveDisabled={dragImages.length === 1}
          moveImage={moveImage}
          onAction={action => onAction(action, image)}
        />
      ))}
    </DndProvider>
  );
};

CreatePostImageList.propTypes = {
  postImages: PropTypes.array,
  onAction: PropTypes.func,
  onOrderChange: PropTypes.func
};

export default CreatePostImageList;
