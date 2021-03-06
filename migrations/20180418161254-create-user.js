module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },

      firstName: {
        type: Sequelize.STRING
      },

      lastName: {
        type: Sequelize.STRING
      },

      email: {
        type: Sequelize.STRING
      },

      username: {
        type: Sequelize.STRING
      },

      bio: {
        type: Sequelize.TEXT
      },

      isAdmin: {
        type: Sequelize.BOOLEAN
      },

      password: {
        type: Sequelize.STRING
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },

      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  down(queryInterface) {
    return queryInterface.dropTable('Users');
  }
};
