import * as usersRepository from './users.repository.js';

const createUser = async (userData) => {
  const email = userData.email.trim().toLowerCase();

  const existingUser = await usersRepository.existsByEmail(email);

  if (existingUser) {
    const error = new Error('Email is already registered.');
    error.statusCode = 409;
    error.code = 'EMAIL_ALREADY_EXISTS';

    throw error;
  }

  const user = await usersRepository.create({
    ...userData,
    email,
  });

  return user;
};

const getUserById = async (userId) => {
  const user = await usersRepository.findById(userId);

  if (!user) {
    const error = new Error('User not found.');
    error.statusCode = 404;
    error.code = 'USER_NOT_FOUND';

    throw error;
  }

  return user;
};

const getUserByEmail = async (email, options = {}) => {
  return usersRepository.findByEmail(
    email.trim().toLowerCase(),
    options,
  );
};

const updateUser = async (userId, updateData) => {
  const user = await usersRepository.updateById(
    userId,
    updateData,
  );

  if (!user) {
    const error = new Error('User not found.');
    error.statusCode = 404;
    error.code = 'USER_NOT_FOUND';

    throw error;
  }

  return user;
};

const deleteUser = async (userId) => {
  const user = await usersRepository.softDeleteById(userId);

  if (!user) {
    const error = new Error('User not found.');
    error.statusCode = 404;
    error.code = 'USER_NOT_FOUND';

    throw error;
  }

  return user;
};

const restoreUser = async (userId) => {
  const user = await usersRepository.restoreById(userId);

  if (!user) {
    const error = new Error('User not found.');
    error.statusCode = 404;
    error.code = 'USER_NOT_FOUND';

    throw error;
  }

  return user;
};

export {
  createUser,
  getUserById,
  getUserByEmail,
  updateUser,
  deleteUser,
  restoreUser,
};