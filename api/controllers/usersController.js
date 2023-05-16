const GroupTable = require('../model/group')
const UserGroupTable = require('../model/userGroup')

const usersController = {
  joinGroup: async (req, res) => {
    const user_id = req.user_id
    const { group_id } = req.params
    try {
      const isOwner = await GroupTable.findGroupByGroupIdAndOwnerId(
        group_id,
        user_id
      )
      if (isOwner) {
        return res.status(200).json({
          success: false,
          message: 'User is the owner of the group',
        })
      }

      const isMember = await UserGroupTable.getGroup(user_id, group_id)
      if (isMember) {
        return res.status(200).json({
          success: false,
          message: 'User is already a member of the group',
        })
      }
      await UserGroupTable.addNewMember(user_id, group_id)

      return res.status(200).json({
        success: true,
      })
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error?.message || 'Internal server error',
      })
    }
  },
}

module.exports = usersController
