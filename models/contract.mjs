export default function initContractModel(sequelize, DataTypes) {
  return sequelize.define(
    'contract',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      teacherId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      parentId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      status: {
        allowNull: false,
        type: DataTypes.ENUM('requested', 'accepted', 'rejected'),
        defaultValue: 'requested',
      },
      studentName: {
        type: DataTypes.STRING,
      },
      lessonRate: {
        type: DataTypes.DECIMAL(10, 2),
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
