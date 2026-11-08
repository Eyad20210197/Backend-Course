import IdentityRequest from './identity-requests.model.js';

const create = async (requestData) => {
  return IdentityRequest.create(requestData);
};

const findById = async (requestId) => {
  return IdentityRequest.findById(requestId)
    .populate('messageId', 'content createdAt receiverId');
};

const findByMessageId = async (messageId) => {
  return IdentityRequest.findOne({ messageId })
    .populate('messageId', 'content createdAt receiverId');
};

const findBySenderId = async (senderId) => {
  return IdentityRequest.find({ senderId })
    .populate('messageId', 'content createdAt')
    .populate('receiverId', 'name email')
    .sort({ createdAt: -1 });
};

const updateStatusById = async (requestId, status) => {
  return IdentityRequest.findByIdAndUpdate(
    requestId,
    { status },
    { new: true },
  );
};

export {
  create,
  findById,
  findByMessageId,
  findBySenderId,
  updateStatusById,
};
