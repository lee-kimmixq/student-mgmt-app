module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('comments', [{
      user_id: 1,
      lesson: 1,
      content: 'Testing Comment 1',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      contract_id: 1,
      lesson: 1,
      content: 'Testing Comment 2',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      contract_id: 1,
      lesson: 1,
      content: 'Testing Comment 3',
      created_at: new Date(),
      updated_at: new Date(),
    },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('comments', null);
  },
};
