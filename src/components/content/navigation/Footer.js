import React from 'react';
import { Footer as MantineFooter } from '@mantine/core';

const Footer = () => {
  return (
    <MantineFooter
      fixed
      height={60}
      sx={{ flex: 1, display: 'flex', padding: 5 }}
    ></MantineFooter>
  );
};

Footer.propTypes = {};

export default Footer;
