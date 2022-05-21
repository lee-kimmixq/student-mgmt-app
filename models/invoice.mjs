export default function initInvoiceModel(sequelize, DataTypes) {
  return sequelize.define(
    'invoice',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      contractId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'contracts',
          key: 'id',
        },
      },
      amountDue: {
        type: DataTypes.DECIMAL(10, 2),
      },
      hasParentPaid: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      hasTeacherConfirmed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      underscored: true,
    },
  );
}
