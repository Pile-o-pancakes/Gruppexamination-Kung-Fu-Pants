const UserTable = require('../model/user');
const MessageTable = require('../model/message');


const checkToken = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({
      success: false,
      message: 'You are not authorized to access this route',
    });
  }
  const user_id = req.headers.authorization.split(' ')[1];
  try {
    if (!user_id) {
      return res.status(401).json({
        success: false,
        message: 'You are not authorized to access this route',
      });
    }
    const user = await UserTable.findUserById(user_id);
    if (user) {
      req.user_id = user.Id;
      next();
    } else {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = checkToken;

const checkMessageId = async (req, res, next) => {
  const user_id = req.headers.authorization.split(' ')[1];
  try {
    const postOwner_id = await MessageTable.findMessageByMessageId(req.params.message_id);
    if (Number(user_id) === postOwner_id) {
      next();
    } else {
      return res.status(404).json({
        success: false,
        message: 'User not owner of the message',
      });
    }
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {checkToken, checkMessageId};
