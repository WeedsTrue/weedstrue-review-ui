import React, { useRef } from 'react';
import { ActionIcon, Group, Image, Stack, Text } from '@mantine/core';
import PropTypes from 'prop-types';
import { useDrag, useDrop } from 'react-dnd';
import { Edit, Menu2, X } from 'tabler-icons-react';

const CreatePostImageListItem = ({
  image,
  onAction,
  moveImage,
  moveDisabled
}) => {
  const ref = useRef(null);

  const [{ handlerId }, drop] = useDrop({
    accept: 'card',

    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId()
      };
    },
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = image.index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      moveImage(dragIndex, hoverIndex);
      item.index = hoverIndex;
    }
  });

  const [{ isDragging }, drag] = useDrag({
    previewOptions: {
      style: { opacity: 1, backgroundColor: 'blue' }
    },
    type: 'card',
    canDrag: !moveDisabled,
    item: () => {
      return { id: image.pkUserPostImage, index: image.index };
    },
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  });
  drag(drop(ref));

  const imageUrl = image.isLinkExternal
    ? image.externalUrl ?? image.src
    : image.previewImage ?? image.src;

  return (
    <>
      <div
        data-handler-id={handlerId}
        ref={ref}
        style={{
          border: 'solid 1px lightgrey',
          padding: 10,
          backgroundColor: 'white',
          cursor: !moveDisabled ? 'move' : 'normal',
          opacity: isDragging ? 0 : 1
        }}
      >
        <Group noWrap>
          <Image
            fit="contain"
            height={50}
            onClick={() => window.open(imageUrl, '_blank').focus()}
            src={imageUrl}
            sx={{ cursor: 'pointer' }}
            width={50}
          />
          <Group noWrap sx={{ gap: 5, flex: 1 }}>
            <Stack style={{ flex: 1 }}>
              <Text color="grey" size={12}>
                {image.description}
              </Text>
            </Stack>

            <Group>
              <ActionIcon color="red" onClick={() => onAction('REMOVE')}>
                <X />
              </ActionIcon>
              <ActionIcon color="dark" onClick={() => onAction('EDIT')}>
                <Edit />
              </ActionIcon>
              {!moveDisabled && <Menu2 />}
            </Group>
          </Group>
        </Group>
      </div>
    </>
  );
};

CreatePostImageListItem.propTypes = {
  image: PropTypes.object,
  moveDisabled: PropTypes.bool,
  moveImage: PropTypes.func,
  onAction: PropTypes.func
};

export default CreatePostImageListItem;
