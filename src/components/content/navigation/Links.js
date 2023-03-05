import React from 'react';
import { Archive } from 'tabler-icons-react';

const links = {
  public: [
    {
      label: 'Community',
      to: '/',
      isGuestView: true,
      icon: <Archive size={20} />,
      isSelected: pathname => pathname === '/'
    },
    {
      label: 'Brands',
      to: '/brands',
      isGuestView: true,
      icon: <Archive size={20} />,
      isSelected: pathname => pathname.startsWith('/brands')
    },
    {
      label: 'Products',
      to: '/products',
      icon: <Archive size={20} />,
      isSelected: pathname => pathname.startsWith('/products')
    }
  ],
  auth: [
    {
      label: 'Login',
      to: '/login',
      icon: null
    }
  ]
};

export { links };
