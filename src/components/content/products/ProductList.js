import React, { useContext, useEffect, useState } from 'react';
import { Card, Grid, Stack, Text, Title } from '@mantine/core';
import PropTypes from 'prop-types';
import ProductListFilter from './ProductListFilter';
import ProductListItem from './ProductListItem';
import { mq } from '../../../config/theme';
import { Context as ReviewsContext } from '../../../providers/ReviewsProvider';

const ProductList = ({ isLoading, searchOnRender }) => {
  const { state, fetchProducts } = useContext(ReviewsContext);
  const [filterState, setFilterState] = useState({
    sortAction: 'trending',
    sortBy: 'trending',
    fkUserPostType: null,
    lastUserPost: null,
    totalCount: 0,
    isLoading: false
  });

  useEffect(() => {
    if (searchOnRender) {
      fetchProducts({});
    }
  }, [searchOnRender]);

  const onFilterChange = (name, value) => {
    const newState = {
      ...filterState,
      [name]: value,
      isLoading: true
    };
    setFilterState(newState);
    fetchProducts({ ...newState }, totalCount =>
      setFilterState({
        ...newState,
        totalCount
      })
    );
  };

  return (
    <Stack sx={mq({ gap: 0 })}>
      <Stack sx={mq({ gap: [5, 10, 15], margin: [0, '0px 10px'] })}>
        <Card sx={mq({ textAlign: 'center' })}>
          <Title sx={{ margin: 'auto' }}>Products</Title>
        </Card>

        <ProductListFilter
          filterState={filterState}
          onFilterChange={onFilterChange}
        />
      </Stack>
      <Stack sx={mq({ gap: [5, 10], marginTop: [0, 0, 5] })}>
        {isLoading ? (
          <Grid gutter="xl" sx={{ margin: 0 }}>
            <Grid.Col
              lg={3}
              md={3}
              sm={4}
              sx={mq({
                padding: ['5px 0px', 10],
                paddingBottom: [0, 0, 10]
              })}
              xl={3}
              xs={12}
            >
              <ProductListItem />
            </Grid.Col>
            <Grid.Col
              lg={3}
              md={3}
              sm={4}
              sx={mq({
                padding: ['5px 0px', 10],
                paddingBottom: [0, 0, 10]
              })}
              xl={3}
              xs={12}
            >
              <ProductListItem />
            </Grid.Col>
            <Grid.Col
              lg={3}
              md={3}
              sm={4}
              sx={mq({
                padding: ['5px 0px', 10],
                paddingBottom: [0, 0, 10]
              })}
              xl={3}
              xs={12}
            >
              <ProductListItem />
            </Grid.Col>
            <Grid.Col
              lg={3}
              md={3}
              sm={4}
              sx={mq({
                padding: ['5px 0px', 10],
                paddingBottom: [0, 0, 10]
              })}
              xl={3}
              xs={12}
            >
              <ProductListItem />
            </Grid.Col>
          </Grid>
        ) : state.products.value.length === 0 ? (
          <Card
            sx={mq({
              textAlign: 'center',
              margin: [0, 10],
              marginTop: [5, 10]
            })}
          >
            <Stack sx={{ padding: '60px 20px' }}>
              <Text weight={500}>No products available</Text>
            </Stack>
          </Card>
        ) : (
          <Grid gutter="xl" sx={{ margin: 0 }}>
            {state.products.value.map(p => (
              <Grid.Col
                key={p.pkProduct}
                lg={3}
                md={4}
                sm={6}
                sx={mq({
                  padding: ['5px 0px', 10],
                  paddingBottom: [0, 0, 10]
                })}
                to={`/products/${p.uuid}`}
                xl={3}
                xs={12}
              >
                <ProductListItem product={p} />
              </Grid.Col>
            ))}
          </Grid>
        )}
      </Stack>
    </Stack>
  );
};

ProductList.propTypes = {
  isLoading: PropTypes.bool,
  searchOnRender: PropTypes.bool
};

export default ProductList;
