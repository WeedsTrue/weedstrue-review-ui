import React from 'react';
import {
  Card,
  Divider,
  Group,
  NavLink,
  Stack,
  Table,
  Text,
  Title
} from '@mantine/core';
import PropTypes from 'prop-types';
import { ChevronRight } from 'tabler-icons-react';
import ProductListItem from './ProductListItem';
import { LINK_SOURCE_TYPE } from '../../../config/constants';

const ProductSidebarInfo = ({ product, showReport, isLoading }) => {
  return (
    <>
      <ProductListItem product={product} showReport={showReport} />
      {product && (
        <>
          <Card style={{ padding: 0 }}>
            <Group sx={{ padding: '10px 20px' }}>
              <Title order={4}>Links</Title>
            </Group>
            <Divider />
            <Stack sx={{ padding: 20, gap: 10 }}>
              {product.links.map(link => (
                <NavLink
                  component="a"
                  href={link.value}
                  key={link.fkLinkSourceType}
                  label={
                    <Text weight={500}>
                      {LINK_SOURCE_TYPE[link.fkLinkSourceType - 1]?.label}
                    </Text>
                  }
                  rightSection={<ChevronRight />}
                  sx={{ border: 'solid 1px lightgrey' }}
                  target="_blank"
                  variant="subtle"
                />
              ))}
              <NavLink
                component="a"
                href={`https://www.reddit.com/r/TheOCS/search/?q=${encodeURIComponent(
                  `${product.brand.name} ${product.name}`
                )}`}
                label={<Text weight={500}>Reddit</Text>}
                rightSection={<ChevronRight />}
                sx={{ border: 'solid 1px lightgrey' }}
                target="_blank"
                variant="subtle"
              />
            </Stack>
          </Card>
          {product.attributes.length > 0 && (
            <Card style={{ padding: 0 }}>
              <Group sx={{ padding: '10px 20px' }}>
                <Title order={4}>Properties</Title>
              </Group>
              <Divider />
              <Stack sx={{ padding: 20, gap: 10 }}>
                <Table highlightOnHover striped withBorder withColumnBorders>
                  <tbody>
                    {product.attributes.map(attribute => (
                      <tr key={attribute.fkProductAttributeType}>
                        <td>
                          <Text size={14} weight={500}>
                            {attribute.attributeType}
                          </Text>
                        </td>
                        <td>
                          <Text size={14}>{attribute.value}</Text>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Stack>
            </Card>
          )}
        </>
      )}
    </>
  );
};

ProductSidebarInfo.propTypes = {
  isLoading: PropTypes.bool,
  product: PropTypes.object,
  showReport: PropTypes.bool
};

export default ProductSidebarInfo;
