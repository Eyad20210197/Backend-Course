import { DataTypes } from "sequelize";
import { sequelize } from "../connection.js";

export const User = sequelize.define(
    "User",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            field: "u_id",
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            field: "u_name",
            validate: {
                notEmpty: { msg: "enter the name please" },
            },
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            field: "u_email",
            validate: {
                isEmail: { msg: "enter a valid email format example@gmail.com" },
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            field: "u_password",
            validate: {
                notEmpty: { msg: "enter the name please" },
                checkPasswordLength(value) {
                    if (value.length <= 6) {
                        throw new Error("password must be greater than 6 characters");
                    }
                },
            },
        },
        role: {
            type: DataTypes.ENUM("user", "admin"),
            allowNull: false,
            defaultValue: "user",
            field: "u_role",
        },
    },
    {
        hooks: {
            beforeCreate: function checkNameLength(user) {
                if (user.name.length <= 2) {
                    const error = new Error("name must be greater than 2 characters");
                    error.statusCode = 400;
                    throw error;
                }
            }
        },
        timestamps: true,
    },
);
