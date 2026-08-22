import { User } from "./users.model.js";
import Post from "./posts.model.js";
import Comment from "./comments.model.js";

Post.belongsTo(User, {
    as: "user",
    foreignKey: { name: "userId", allowNull: false },
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});

User.hasMany(Post, {
    as: "posts",
    foreignKey: { name: "userId", allowNull: false },
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});

Comment.belongsTo(Post, {
    as: "post",
    foreignKey: { name: "postId", allowNull: false },
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});

Post.hasMany(Comment, {
    as: "comments",
    foreignKey: { name: "postId", allowNull: false },
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});

Comment.belongsTo(User, {
    as: "user",
    foreignKey: { name: "userId", allowNull: false },
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});

User.hasMany(Comment, {
    as: "comments",
    foreignKey: { name: "userId", allowNull: false },
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});

export { User, Post, Comment };
