const Sequelize = require('sequelize');
// const sequelize = new Sequelize();

module.exports = function (sequelize) {
    const member = sequelize.define('Member', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nickname: {
            type: Sequelize.STRING,
            allowNull: false
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false
        },
        pwd: {
            type: Sequelize.STRING,
            allowNull: false
        }
    }, {
        freezeTableName: true,
        tableName: 'member'
    });

    return member;
};