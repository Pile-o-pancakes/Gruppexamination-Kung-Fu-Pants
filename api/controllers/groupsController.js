const db = require('../model/db')
const GroupTable = require('../model/group')
const UserGroupTable = require('../model/usergroup')
const groupController = {
  createGroup: async (req, res) => {
    const { name } = req.body
    const user_id = req.user_id
    try {
      const group = await GroupTable.findGroupByName(name)
      if (group)
        return res.status(400).json({
          success: false,
          message: 'Group already exists',
        })
      const result = await GroupTable.createGroup(name, user_id)
      if (result) {
        return res.status(201).json({
          success: true,
        })
      }
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      })
    }
  },
}

module.exports = groupController
