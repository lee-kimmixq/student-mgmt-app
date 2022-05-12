module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('contracts', [{
      teacher_id: 1,
      parent_id: 2,
      status: 'accepted',
      student_name: 'Beethoven',
      lesson_rate: 35.00,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      teacher_id: 1,
      parent_id: 3,
      status: 'requested',
      student_name: 'Schubert',
      lesson_rate: 40.00,
      created_at: new Date(),
      updated_at: new Date(),
    },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('contracts', null);
  },
};
