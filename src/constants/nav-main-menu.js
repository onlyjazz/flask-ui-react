
export default [{
        divider: true,
        name: 'Main menu',
    }, {
        link: true,
        name: 'Sites',
        icon: 'fa-list-alt',
        pathname: '/app/sites',
        matcher: 'sites',
    }, {
        link: true,
        name: 'Users',
        icon: 'fa-users',
        pathname: '/app/users',
        matcher: 'users',
    }, {
        link: true,
        name: 'Studies',
        icon: 'fa-graduation-cap',
        pathname: '/app/studies',
        matcher: /studies/gi,
    }, {
        link: true,
        name: 'Measures',
        icon: 'fa-line-chart',
        pathname: '/app/measures',
        matcher: /measures/gi,
    }, {
        link: true,
        name: 'Monitoring',
        icon: 'fa-eye',
        pathname: '/app/monitoring',
        matcher: /monitoring/gi,
    },
];
