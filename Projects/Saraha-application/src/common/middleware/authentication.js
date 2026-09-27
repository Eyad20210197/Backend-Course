import * as sessionsService from '../../app/sessions/sessions.service.js';
import * as usersRepository from '../../app/users/users.repository.js';

const authentication = async (req, res, next) => {
  try {
    const token = req.cookies?.sessionToken;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required.',
        code: 'UNAUTHENTICATED',
      });
    }

    const session = await sessionsService.getSessionByToken(token);

    if (!session) {
      return res.status(401).json({
        success: false,
        message: 'Invalid or expired session.',
        code: 'INVALID_SESSION',
      });
    }

    const user = await usersRepository.findById(session.userId);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'User no longer exists.',
        code: 'USER_NOT_FOUND',
      });
    }

    req.user = user;
    req.session = session;

    next();
  } catch (error) {
    next(error);
  }
};

export default authentication;