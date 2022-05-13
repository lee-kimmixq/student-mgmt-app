module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('lessons', [{
      contract_id: 1,
      details: 'Testing Lesson 1',
      lesson_date: '2022-05-12 04:40:23.256+09',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      contract_id: 1,
      details: 'Testing Lesson 2',
      lesson_date: '2022-05-13 04:40:23.256+09',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      contract_id: 1,
      details: 'Testing Lesson 3',
      lesson_date: '2022-05-14 04:40:23.256+09',
      created_at: new Date(),
      updated_at: new Date(),
    },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('lessons', null);
  },
};
