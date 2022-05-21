module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('invoices', [{
      contract_id: 1,
      amount_due: 123.00,
      has_parent_paid: false,
      has_teacher_confirmed: false,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      contract_id: 2,
      amount_due: 456.00,
      has_parent_paid: false,
      has_teacher_confirmed: false,
      created_at: new Date(),
      updated_at: new Date(),
    },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('invoices', null);
  },
};
