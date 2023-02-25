import facepaint from 'facepaint';

const breakPoints = [500, 800, 1120, 1920];

const colors = {};

const colorScheme = 'light';

export const mq = facepaint(breakPoints.map(b => `@media(min-width: ${b}px)`));
export const theme = {
  breakPoints,
  colors,
  colorScheme
};
