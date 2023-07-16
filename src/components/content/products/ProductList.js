import React, { useContext, useEffect, useRef, useState } from 'react';
import { Button, Card, Grid, Stack, Text, Title } from '@mantine/core';
import PropTypes from 'prop-types';
import ProductListFilter from './ProductListFilter';
import ProductListItem from './ProductListItem';
import { mq } from '../../../config/theme';
import { Context as ReviewsContext } from '../../../providers/ReviewsProvider';

const ProductList = ({ fkBrand, searchOnRender }) => {
  const hasFetched = useRef(false);
  const { state, fetchProducts } = useContext(ReviewsContext);
  const [filterState, setFilterState] = useState({
    sortBy: 'trending',
    fkProductType: null,
    skip: null,
    totalCount: 0,
    isLoading: false,
    showMoreLoading: false
  });

  useEffect(() => {
    if (searchOnRender) {
      setFilterState({
        ...filterState,
        isLoading: true
      });
      fetchProducts({ ...filterState, fkBrand }, totalCount =>
        setFilterState({
          ...filterState,
          totalCount,
          isLoading: false,
          skip: null,
          showMoreLoading: false
        })
      );
      hasFetched.current = true;
    }
  }, [searchOnRender]);

  const onFilterChange = (name, value) => {
    const newState = {
      ...filterState,
      [name]: value,
      isLoading: true
    };
    newState.showMoreLoading = !!newState.skip;
    setFilterState(newState);
    fetchProducts({ ...newState, fkBrand }, totalCount =>
      setFilterState({
        ...newState,
        totalCount,
        isLoading: false,
        skip: null,
        showMoreLoading: false
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
        {!hasFetched.current || state.products.loading ? (
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
          <>
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
            {filterState.totalCount > state.products.value.length && (
              <Button
                color="blue"
                loading={filterState.showMoreLoading}
                onClick={() =>
                  onFilterChange('skip', state.products.value.length)
                }
                sx={{ margin: 'auto', marginTop: 10 }}
                variant="outline"
              >
                Show More
              </Button>
            )}
          </>
        )}
      </Stack>
    </Stack>
  );
};

ProductList.propTypes = {
  fkBrand: PropTypes.number,
  searchOnRender: PropTypes.bool
};

export default ProductList;
