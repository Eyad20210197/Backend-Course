import { User } from "../../db/models/users.model.js";
export const createUser = async (inputs) => {

    const { name, email, password, role } = inputs;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
        throw new Error("Email already exists", { cause: { status: 409 } });
    }

    const user = User.build({
        name: name,
        email: email,
        password: password,
        role: role,
    });

    await user.save();
    const data = user.toJSON();
    delete data.password;
    return data;

};

export const createOrUpdateUser = async (inputs) => {

    const { id, name, email, password, role } = inputs;

    const data = {};

    if (name !== undefined) data.name = name;
    if (email !== undefined) data.email = email;
    if (password !== undefined) data.password = password;
    if (role !== undefined) data.role = role;

    const existingUser = await User.findByPk(id);
    const values = existingUser
        ? { ...existingUser.toJSON(), id, ...data }
        : { id, ...data };

    const [, created] = await User.upsert(values, { validate: false });
    const user = await User.findByPk(id, {
        attributes: { exclude: ["password"] },
    });

    return [user, created];

};

export const getUserByEmail = async (inputs) => {

    const { email } = inputs;

    const user = await User.findOne({
        where: { email: email },
        attributes: { exclude: ["password"] },
    });

    if (user) {
        return user;
    } else {
        throw new Error("email not exist", { cause: { status: 404 } });
    }
};

export const getUserById = async (inputs) => {

    const { id } = inputs;

    const user = await User.findByPk(id, {
        attributes: {
            exclude: ["role", "password"],
        },
    });

    if (user) {
        return user;
    } else {
        throw new Error("user not exist", { cause: { status: 404 } });
    }

};
