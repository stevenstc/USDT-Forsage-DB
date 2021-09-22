"use strict";

module.exports = function(sequelize, DataTypes) {
    let entity = sequelize.define("faq", {
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
        title: {
            field: 'title',
            type: DataTypes.STRING,
            allowNull: false
        },
        content: {
            field: 'content',
            type: DataTypes.STRING,
            allowNull: false
        }
    },{
        schema: '',
        tableName: "faq",
        timestamps: false,
        freezeTableName: true
    });
    
    return entity;
};