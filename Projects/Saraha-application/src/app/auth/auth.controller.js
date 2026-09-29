import * as authService from './auth.service.js';
import {
  successResponse,
} from '../../common/utils/response.js';

const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const result = await authService.register({
      name,
      email,
      password,
    });

    res.cookie('sessionToken', result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    return successResponse(res, {
      statusCode: 201,
      message: 'User registered successfully.',
      data: {
        user: result.user,
      },
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const result = await authService.login({
      email,
      password,
    });

    res.cookie('sessionToken', result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    return successResponse(res, {
      
      message: 'Login successful.',
      data: {
        user: result.user,
      },
    });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    await authService.logout(req.session._id);

    res.clearCookie('sessionToken', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    });

    return successResponse(res, {
      
      message: 'Logout successful.',
    });
  } catch (error) {
    next(error);
  }
};

const verifyEmail = async (req, res, next) => {
  try {
    const { email, code } = req.body;

    const result = await authService.verifyEmail(
      email,
      code,
    );

    res.cookie('sessionToken', result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    return successResponse(res, {
      
      message: 'Email verified successfully.',
      data: {
        user: result.user,
      },
    });
  } 
  catch (error) {
    next(error);
  }
};

const resendVerification = async (req, res, next) => {
  try {
    const { email } = req.body;

    await authService.resendVerification(email);

    return successResponse(res, {
      message: 'Verification code sent successfully.',
    });
  } catch (error) {
    next(error);
  }
};

export {
  register,
  login,
  logout,
  verifyEmail,
  resendVerification,
};