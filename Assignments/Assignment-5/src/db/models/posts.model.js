import { Model, DataTypes } from "sequelize";
import { sequelize } from "../connection.js";
class Post extends Model { }

Post.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            field: "p_id",
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            field: "p_title",
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
            field: "p_content",
        },
    },
    {
        sequelize,
        paranoid: true,
        modelName: "Post",
        timestamps: true,
    },
);

export default Post;
