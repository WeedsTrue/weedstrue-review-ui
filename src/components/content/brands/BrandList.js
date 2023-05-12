import React from 'react';
import { Grid, Group, Stack, Text, Title } from '@mantine/core';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { mq } from '../../../config/theme';

const BrandList = ({ brands, isLoading }) => {
  const sortedBrands = Object.values(
    brands
      ?.sort((a, b) => a.name.localeCompare(b.name))
      .reduce((result, current) => {
        const firstLetter =
          current.name[0].toLowerCase() !== current.name[0].toUpperCase()
            ? current.name[0].toLocaleUpperCase()
            : '#';
        if (!result[firstLetter]) {
          result[firstLetter] = { title: firstLetter, data: [current] };
        } else {
          result[firstLetter].data.push(current);
        }
        return result;
      }, {}) ?? []
  );

  return (
    <Stack sx={mq({ gap: [20, 20, 40] })}>
      <Title sx={{ margin: 'auto' }}>Brands</Title>

      <Group sx={{ justifyContent: 'center' }}>
        {sortedBrands.map(b => (
          <Text
            color="dodgerblue"
            component="a"
            href={`#${b.title}`}
            key={b.title}
            weight={500}
          >
            {b.title}
          </Text>
        ))}
      </Group>

      <Grid gutter="xl" justify="center" sx={{ margin: 'auto', maxWidth: 765 }}>
        {sortedBrands.map(s => (
          <Grid.Col
            key={s.title}
            lg={4}
            md={4}
            sm={6}
            sx={mq({ paddingLeft: 40 })}
            xl={4}
            xs={12}
          >
            <Stack sx={{ gap: 20 }}>
              <Text id={s.title} weight={700}>
                {s.title}
              </Text>
              {s.data.map(brand => (
                <Text
                  component={Link}
                  key={brand.pkBrand}
                  sx={{
                    color: '#3f3f3f',
                    cursor: 'pointer',
                    '&:hover': {
                      fontWeight: 500
                    }
                  }}
                  to={`/brands/${brand.uuid}`}
                >
                  {brand.name}
                </Text>
              ))}
            </Stack>
          </Grid.Col>
        ))}
      </Grid>
    </Stack>
  );
};

BrandList.propTypes = {
  brands: PropTypes.array,
  isLoading: PropTypes.bool
};

export default BrandList;
