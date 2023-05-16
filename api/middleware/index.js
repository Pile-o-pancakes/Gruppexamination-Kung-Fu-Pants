const { findUserById } = require('../model/user')

const checkToken = async (req, res, next) => {
  const user_id = req.headers.authorization.split(' ')[1]
  try {
    if (!user_id) {
      return res.status(401).json({
        success: false,
        message: 'You are not authorized to access this route',
      })
    }
    const user = await findUserById(user_id)
    if (user) {
      req.user_id = user.Id
      next()
    } else {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      })
    }
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    })
  }
}

module.exports = checkToken
