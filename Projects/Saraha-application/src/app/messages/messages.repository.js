import Message from './messages.model.js';

const create = async (messageData) => {
  return Message.create(messageData);
};

const findById = async (messageId, options = {}) => {
  const query = Message.findById(messageId);

  if (options.includeSender === true) {
    query.select('+senderId');
  }

  return query;
};

const findByReceiverId = async (receiverId) => {
  return Message.find({ receiverId })
    .sort({ createdAt: -1 });
};

export {
  create,
  findById,
  findByReceiverId,
};
