import React from 'react';
import { Carousel } from '@mantine/carousel';
import { Image, Stack, Text } from '@mantine/core';
import PropTypes from 'prop-types';
import { ArrowLeft, ArrowRight } from 'tabler-icons-react';

const UserPostImageCarousel = ({ userPostImages, height, imageDisabled }) => {
  return (
    <Carousel
      nextControlIcon={
        <ArrowRight onClick={e => e.preventDefault()} size={16} />
      }
      previousControlIcon={
        <ArrowLeft onClick={e => e.preventDefault()} size={16} />
      }
      styles={{
        control: {
          '&[data-inactive]': {
            opacity: 0,
            cursor: 'default'
          }
        }
      }}
    >
      {userPostImages
        .sort((a, b) => a.index - b.index)
        .map(i => (
          <Carousel.Slide key={i.pkUserPostImage}>
            <Stack
              sx={{
                flex: 1,
                maxHeight: height ?? 600
              }}
            >
              <Image
                fit="contain"
                height={height ?? 600}
                onClick={() =>
                  !imageDisabled && window.open(i.src, '_blank').focus()
                }
                src={i.src}
                sx={{ cursor: 'pointer' }}
                width={'100%'}
              />
            </Stack>
            {i.description && (
              <Stack
                sx={{
                  backgroundColor: 'lightgrey',
                  padding: '5px 10px'
                }}
              >
                <Text color="dark" size={12}>
                  {i.description}
                </Text>
              </Stack>
            )}
          </Carousel.Slide>
        ))}
    </Carousel>
  );
};

UserPostImageCarousel.propTypes = {
  height: PropTypes.number,
  imageDisabled: PropTypes.bool,
  userPostImages: PropTypes.array
};

export default UserPostImageCarousel;
