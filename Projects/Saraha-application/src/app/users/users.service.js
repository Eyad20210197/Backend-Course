import bcrypt from 'bcrypt';
import AppError from '../../common/errors/AppError.js';
import * as usersRepository from './users.repository.js';

const createUser = async (userData) => {
  const email = userData.email.trim().toLowerCase();

  const existingUser = await usersRepository.existsByEmail(email);

  if (existingUser) {
    throw new AppError(
      'Email is already registered.',
      409,
      'EMAIL_ALREADY_EXISTS'
    );
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
    throw new AppError(
      'User not found.',
      404,
      'USER_NOT_FOUND'
    );
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
    throw new AppError(
      'User not found.',
      404,
      'USER_NOT_FOUND'
    );
  }

  return user;
};

const deleteUser = async (userId) => {
  const user = await usersRepository.softDeleteById(userId);

  if (!user) {
    throw new AppError(
      'User not found.',
      404,
      'USER_NOT_FOUND'
    );
  }

  return user;
};

const restoreUser = async (userId) => {
  const user = await usersRepository.restoreById(userId);

  if (!user) {
    throw new AppError(
      'User not found.',
      404,
      'USER_NOT_FOUND'
    );
  }

  return user;
};

const verifyEmail = async (userId) => {
  const user = await usersRepository.verifyEmailById(userId);

  if (!user) {
    throw new AppError(
      'User not found.',
      404,
      'USER_NOT_FOUND'
    );
  }
  
  return user;
};

const changePassword = async (
  userId,
  currentPassword,
  newPassword,
) => {
  const user = await usersRepository.findByIdWithPassword(userId);

  if (!user) {
    throw new AppError(
      'User not found.',
      404,
      'USER_NOT_FOUND',
    );
  }

  const passwordMatches = await bcrypt.compare(
    currentPassword,
    user.password,
  );

  if (!passwordMatches) {
    throw new AppError(
      'Current password is incorrect.',
      400,
      'INVALID_CURRENT_PASSWORD',
    );
  }

  const hashedPassword = await bcrypt.hash(
    newPassword,
    12,
  );

  await usersRepository.updateById(
    userId,
    {
      password: hashedPassword,
    },
  );
};

export {
  createUser,
  getUserById,
  getUserByEmail,
  updateUser,
  deleteUser,
  restoreUser,
  verifyEmail,
  changePassword,
};