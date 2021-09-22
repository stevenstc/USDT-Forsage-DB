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
        }
    },{
        schema: '',
        tableName: "profit",
        timestamps: false,
        freezeTableName: true
    });
    
    return entity;
};