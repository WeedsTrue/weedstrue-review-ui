const PRODUCTION = false;

const PRODUCT_TYPE = {
  DRY_FLOWER: {
    value: 1,
    label: 'Dry Flower'
  }
};

const USER_POST_TYPE = {
  REVIEW: {
    value: 1,
    label: 'Review'
  },
  NEWS: {
    value: 2,
    label: 'News'
  },
  QUESTION: {
    value: 3,
    label: 'Question'
  },
  DISCUSSION: {
    value: 4,
    label: 'Discussion'
  },
  IMAGES: {
    value: 5,
    label: 'Images'
  }
};

const USER_POST_ATTRIBUTE_TYPE = [
  {
    value: 1,
    inputValue: 'thc',
    label: 'THC %',
    type: 'product-review'
  },
  {
    value: 2,
    inputValue: 'cbd',
    label: 'CBD %',
    type: 'product-review'
  },
  {
    value: 3,
    inputValue: 'terps',
    label: 'TERPS %',
    type: 'product-review'
  },
  {
    value: 4,
    inputValue: 'packagedDate',
    label: 'Packaged Date',
    type: 'product-review'
  }
];

const LINK_SOURCE_TYPE = {
  OCS: {
    value: 1,
    label: 'OCS'
  }
};

export {
  PRODUCTION,
  PRODUCT_TYPE,
  USER_POST_TYPE,
  USER_POST_ATTRIBUTE_TYPE,
  LINK_SOURCE_TYPE
};
