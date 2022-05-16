export const SPONSOR_MENU_ITEMS = {
  title: 'Sponsors',
  icon: 'tv-outline',
  children: [
    {
      title: 'My Sponsorships',
      link: '/sponsors/self',
      icon: 'tv-outline'
    },
    {
      title: 'Create Sponsor',
      icon: 'plus-outline',
      link: '/sponsors/create'
    }
  ]
};

export const EXPLORER_MENU_ITEMS = [
  {
    title: 'Profile',
    icon: 'person-outline',
    link: '/profile'
  },
  {
    title: 'Logout',
    icon: 'log-out-outline'
  }
];

export const MANAGER_MENU_ITEMS = [
  {
    title: 'Trips',
    icon: 'briefcase-outline',
    children: [
      {
        title: 'My Trips',
        icon: 'briefcase-outline',
        link: '/trips/self'
      },
      {
        title: 'Create trip',
        icon: 'plus-outline',
        link: '/trips/create'
      }
    ]
  }
];

export const ADMIN_MENU_ITEMS = [
  {
    title: 'Dashboard',
    icon: 'keypad-outline',
    children: [
      {
        title: 'Home',
        icon: 'home-outline',
        link: '/admin/home'
      },
      {
        title: 'Analytics',
        icon: 'activity-outline',
        link: '/admin/analytics'
      }
    ]
  },
  {
    title: 'Manage Users',
    icon: 'shield-outline',
    children: [
      {
        title: 'All Users',
        icon: 'people-outline',
        link: '/users'
      },
      {
        title: 'Create User',
        icon: 'person-add-outline',
        link: '/users/create'
      }
    ]
  },
  ...MANAGER_MENU_ITEMS,
  SPONSOR_MENU_ITEMS,
  {
    title: 'Configurations',
    icon: 'settings-outline',
    children: [
      {
        title: 'FlatRates',
        icon: 'hash-outline',
        link: '/configurations/flat-rate'
      }
    ]
  },
  ...EXPLORER_MENU_ITEMS
];
