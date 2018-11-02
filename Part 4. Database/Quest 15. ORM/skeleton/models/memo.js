const Sequelize = require('sequelize');

module.exports = function (sequelize) {
    const memo = sequelize.define('Memo', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        owner: {
            type: Sequelize.STRING,
            allowNull: false
        },
        title: {
            type: Sequelize.STRING,
            allowNull: false
        },
        content: {
            type: Sequelize.STRING,
            allowNull: false
        },
        cursorStart: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        cursorEnd: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    }, {
        freezeTableName: true,
        tableName: 'memo'
    });

    return memo;
};