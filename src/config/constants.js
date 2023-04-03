import React from 'react';
import Auth from '@aws-amplify/auth';
import {
  BrandInstagram,
  BrandReddit,
  BrandTiktok,
  BrandTwitch,
  BrandTwitter,
  BrandYoutube,
  Link
} from 'tabler-icons-react';

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

const USER_POST_TYPE_LIST = [
  {
    value: 1,
    label: 'Review',
    color: 'blue'
  },
  {
    value: 2,
    label: 'News',
    color: 'orange'
  },
  {
    value: 3,
    label: 'Question',
    color: 'yellow'
  },
  {
    value: 4,
    label: 'Discussion',
    color: 'green'
  },
  {
    value: 5,
    label: 'Images',
    color: 'red'
  }
];

const PRODUCT_ATTRIBUTE_TYPE = [
  {
    value: 1,
    inputValue: 'thc',
    label: 'THC %',
    displayType: 'percentage',
    displayLabel: 'THC',
    userPostType: 'product-review'
  },
  {
    value: 2,
    inputValue: 'cbd',
    label: 'CBD %',
    displayType: 'percentage',
    displayLabel: 'CBD',
    userPostType: 'product-review'
  },
  {
    value: 3,
    inputValue: 'terps',
    label: 'TERPS %',
    displayType: 'percentage',
    displayLabel: 'TERPS',
    userPostType: 'product-review'
  },
  {
    value: 4,
    inputValue: 'packagedDate',
    label: 'Packaged Date',
    displayType: 'date',
    displayLabel: 'Packaged',
    userPostType: 'product-review'
  }
];

const LINK_SOURCE_TYPE = [
  {
    value: 1,
    label: 'OCS'
  }
];

const PRODUCT_TYPES = [
  {
    value: 2,
    label: 'Rosin'
  },
  {
    value: 3,
    label: 'Seeds'
  },
  {
    value: 4,
    label: 'Pre-rolls'
  },
  {
    value: 5,
    label: 'Accessories'
  },
  {
    value: 6,
    label: 'Dried Flower'
  },
  {
    value: 7,
    label: '510 Thread Cartridges'
  },
  {
    value: 8,
    label: 'Pax Pods'
  },
  {
    value: 9,
    label: 'Soft Chews'
  },
  {
    value: 10,
    label: 'Chocolates'
  },
  {
    value: 11,
    label: 'Baked Goods'
  }
];

const USER_SOCIAL_LINK_TYPES = [
  {
    value: 1,
    label: 'Custom',
    hasCustomLabel: true,
    placeholder: 'https://www.website.com',
    icon: <Link />
  },
  {
    value: 2,
    label: 'Reddit',
    hasCustomLabel: false,
    placeholder: 'u/user',
    website: 'https://www.reddit.com/',
    icon: <BrandReddit />
  },
  {
    value: 3,
    label: 'Instagram',
    hasCustomLabel: false,
    placeholder: '@username',
    website: 'https://www.instagram.com/',
    icon: <BrandInstagram />
  },
  {
    value: 4,
    label: 'Twitter',
    hasCustomLabel: false,
    placeholder: '@username',
    website: 'https://www.twitter.com/',
    icon: <BrandTwitter />
  },
  {
    value: 5,
    label: 'TikTok',
    hasCustomLabel: false,
    placeholder: '@username',
    website: 'https://www.tiktok.com/@',
    icon: <BrandTiktok />
  },
  {
    value: 6,
    label: 'Twitch',
    hasCustomLabel: false,
    placeholder: '@username',
    website: 'https://www.twitch.com/',
    icon: <BrandTwitch />
  },
  {
    value: 7,
    label: 'YouTube',
    hasCustomLabel: true,
    placeholder: 'https://www.youtube.com',
    icon: <BrandYoutube />
  }
];

export {
  PRODUCTION,
  AWS_COGNITO_SETTINGS,
  PRODUCT_TYPES,
  USER_POST_TYPE,
  USER_POST_TYPE_LIST,
  USER_SOCIAL_LINK_TYPES,
  PRODUCT_ATTRIBUTE_TYPE,
  LINK_SOURCE_TYPE
};
