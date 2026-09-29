import User from './users.model.js';

const create = async (userData) => {
    return User.create(userData);
};

const findById = async (userId, options = {}) => {
    const query = User.findById(userId);        
    if (options.includeDeleted !== true) {
        query.where({ deletedAt: null });
    }
    return query;
};

const findByEmail = async (email, options = {}) => {

    const query = User.findOne({ email });

    if (options.includeDeleted !== true) {
        query.where({ deletedAt: null });
    };
    if (options.includePassword === true) {
        query.select('+password');
    };

    return query;
};

const updateById = async (userId, updateData) => {
    return User.findOneAndUpdate(
        {
            _id: userId,
            deletedAt: null,
        },
        updateData,
        {
            new: true,
            runValidators: true,
        },
    );
};

const softDeleteById = async (userId) => {
    return User.findOneAndUpdate(
        {
            _id: userId,
            deletedAt: null,
        },
        {
            deletedAt: new Date(),
        },
        {
            new: true,
        },
    );
};

const restoreById = async (userId) => {
    return User.findOneAndUpdate(
        {
            _id: userId,
        },
        {
            deletedAt: null,
        },
        {
            new: true,
        },
    );
};

const existsByEmail = async (email, options = {}) => {
    const filter = { email };

    if (options.includeDeleted !== true) {
        filter.deletedAt = null;
    }

    return User.exists(filter);
};

const verifyEmailById = async (userId) => {
  return User.findOneAndUpdate(
    {
      _id: userId,
      deletedAt: null,
    },
    {
      isEmailVerified: true,
    },
    {
      new: true,
    },
  );
};

const findByIdWithPassword = async (userId) => {
  return User.findOne({
    _id: userId,
    deletedAt: null,
  }).select('+password');
};

export {
    create,
    findById,
    findByEmail,
    updateById,
    softDeleteById,
    restoreById,
    existsByEmail,
    verifyEmailById,
    findByIdWithPassword,
};