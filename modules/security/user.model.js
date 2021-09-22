"use strict";

module.exports = function(sequelize, DataTypes) {
    let entity = sequelize.define("profit", {
        id: {
            field: 'id',
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            validate: {
                isInt: true
            }
        },
        username: {
            field: 'username',
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            field: 'password',
            type: DataTypes.STRING,
            allowNull: false
        },
        createAt: {
            field: 'create_at',
            type: DataTypes.DATE,
            allowNull: false
        },
        updateAt: {
            field: 'update_at',
            type: DataTypes.DATE,
            allowNull: false
        }
    },{
        schema: '',
        tableName: "profit",
        timestamps: true,
        freezeTableName: true
    });
    
    return entity;
};