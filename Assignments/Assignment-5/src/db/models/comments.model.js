import { Model, DataTypes } from "sequelize";
import { sequelize } from "../connection.js";
class Comment extends Model {}

Comment.init(

  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: "c_id",
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: "c_content",
    },
  },
  {
    sequelize,
    modelName: "Comment",
    timestamps: true,
  },
);

export default Comment;
