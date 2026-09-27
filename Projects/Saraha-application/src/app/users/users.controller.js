import * as usersService from './users.service.js';

const getMyProfile = async (req, res, next) => {
  try {
    const user = await usersService.getUserById(req.user.id);

    return res.status(200).json({
      success: true,
      message: 'User retrieved successfully.',
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

    return res.status(200).json({
      success: true,
      message: 'User updated successfully.',
      data: {
        user,
      },
    });
  } catch (error) {
    next(error);
  }
};

const deleteMyAccount = async (req, res, next) => {
  try {
    await usersService.deleteUser(req.user.id);

    return res.status(200).json({
      success: true,
      message: 'Account deleted successfully.',
    });
  } catch (error) {
    next(error);
  }
};

export {
  getMyProfile,
  updateMyProfile,
  deleteMyAccount,
};