import Auth from '@aws-amplify/auth';

const PRODUCTION = false;

const AWS_COGNITO_SETTINGS = {
  Auth: {
    identityPoolId: 'us-east-1:074c2f3e-8539-49e4-9c3b-fec7d63d7bc4',
    region: 'us-east-1',
    userPoolId: 'us-east-1_7qZzoWH6v',
    userPoolWebClientId: '3sjhbgb9k4m0b54j3k7vqivq9j',
    mandatorySignIn: true
  }
};

Auth.configure(AWS_COGNITO_SETTINGS);

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

const PRODUCT_ATTRIBUTE_TYPE = [
  {
    value: 1,
    inputValue: 'thc',
    label: 'THC %',
    userPostType: 'product-review'
  },
  {
    value: 2,
    inputValue: 'cbd',
    label: 'CBD %',
    userPostType: 'product-review'
  },
  {
    value: 3,
    inputValue: 'TERPENES',
    label: 'TERPS %',
    userPostType: 'product-review'
  },
  {
    value: 4,
    inputValue: 'packagedDate',
    label: 'Packaged Date',
    userPostType: 'product-review'
  }
];

const LINK_SOURCE_TYPE = [
  {
    value: 1,
    label: 'OCS'
  }
];

export {
  PRODUCTION,
  AWS_COGNITO_SETTINGS,
  PRODUCT_TYPE,
  USER_POST_TYPE,
  PRODUCT_ATTRIBUTE_TYPE,
  LINK_SOURCE_TYPE
};
