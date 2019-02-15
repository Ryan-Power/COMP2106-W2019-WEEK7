module.exports = [
  {
    path: '/',
    name: 'Index',
    controller: require('../routes/index')
  },
  {
    path: '/users',
    name: 'Users',
    controller: require('../routes/users')
  },
  {
    path: '/classes',
    name: 'Classes',
    controller: require('../routes/classes')
  }
];
