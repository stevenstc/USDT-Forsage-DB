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
        user_id: {
            field: 'user_id',
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isInt: true
            }
        },
        value: {
            field: 'value',
            type: DataTypes.INTEGER,
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