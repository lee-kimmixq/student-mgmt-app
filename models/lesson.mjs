export default function initLessonModel(sequelize, DataTypes) {
  return sequelize.define(
    'lesson',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      contractId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'contracts',
          key: 'id',
        },
      },
      details: {
        type: DataTypes.TEXT,
      },
      lessonDate: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      invoiceId: {
        type: DataTypes.INTEGER,
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
