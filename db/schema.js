const { Sequelize, DataTypes } = require("sequelize");

module.exports = function (sequelize) {
    const Employee = sequelize.define(
        "Employee",
        {
            department: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            role: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            employee: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },

            },
            {
                timestamps: false
            }
        );
        return Employee;
        
        };
