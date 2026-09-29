import * as usersService from './users.service.js';
import {
  successResponse,
} from '../../common/utils/response.js';


const getMyProfile = async (req, res, next) => {
  try {
    const user = await usersService.getUserById(req.user.id);

    return successResponse(res, {
      message: 'User profile retrieved successfully.',
      data: {
        user,
      },
    });
  } catch (error) {
    next(error);
  }
};

const updateMyProfile = async (req, res, next) => {
  try {
    const user = await usersService.updateUser(
      req.user.id,
      req.body,
    );

    return successResponse(res, {

      message: 'User updated successfully.',
      data: {
        user: user,
      },
    });
  } catch (error) {
    next(error);
  }
};

const deleteMyAccount = async (req, res, next) => {
  try {
    await usersService.deleteUser(req.user.id);

    return successResponse(res, {

      message: 'User account deleted successfully.',
    });
  } catch (error) {
    next(error);
  }
};

const changeMyPassword = async (req, res, next) => {
  try {
    const {
      currentPassword,
      newPassword,
    } = req.body;

    await usersService.changePassword(
      req.user.id,
      currentPassword,
      newPassword,
    );

    return successResponse(res, {
      message: 'Password changed successfully.',
    });
  } catch (error) {
    next(error);
  }
};

export {
  getMyProfile,
  updateMyProfile,
  deleteMyAccount,
  changeMyPassword,
};