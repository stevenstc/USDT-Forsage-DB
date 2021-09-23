"use strict";

module.exports = function(sequelize, DataTypes) {
    let entity = sequelize.define("user", {
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
        name: {
            field: 'name',
            type: DataTypes.STRING,
            allowNull: false
        },
        lastname: {
            field: 'lastname',
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
        tableName: "user",
        timestamps: true,
        freezeTableName: true
    });
    
    return entity;
};