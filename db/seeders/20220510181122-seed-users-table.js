// import getHash from '../../utils/getHash.mjs';
// import not working, so manually inputting hashed passwords

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('users', [{
      username: 'salieri',
      password: 'aaf8914eaa15dc707191db58f0dfaf7b9712cc15187bbda6ff9bd4c0b4644d70737b1be6c58303c13ebd464fccd70a976019055988ac848052084e8741fcfa5c',
      display_name: 'Mr Salieri',
      account_type: 'teacher',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      username: 'johannbeethoven',
      password: '18775397c85aa5a1a80d7f85e7977a5fc5e2d5fd91e651fcc8e401446795bccfa4572b95ca093b5596f6574b272db2a08ebfbe10978fe0a1e07f7c253437e5b4',
      display_name: 'Johann van Beethoven',
      account_type: 'parent',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      username: 'theodorschubert',
      password: '39728a939fd867fda7cc3a5b74ac1a6d785684f52e189ed3dd625a4d2355874ebc48ed815f71c193492dc2ae11da459c0e155a580b1f14ca94654658a407bf93',
      display_name: 'Theodor Schubert',
      account_type: 'parent',
      created_at: new Date(),
      updated_at: new Date(),
    },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('users', null);
  },
};
