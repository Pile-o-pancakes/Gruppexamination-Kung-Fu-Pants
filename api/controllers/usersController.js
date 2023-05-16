const GroupTable = require('../model/group');
const UserGroupTable = require('../model/usergroup');

const usersController = {
  joinGroup: async (req, res) => {
    const user_id = req.user_id;
    const { group_id } = req.params;
    try {
      let message = '';
      const isOwner = await GroupTable.findGroupByGroupIdAndOwnerId(
        group_id,
        user_id
      );
      if (isOwner) {
        message = 'User is the owner of the group';
      }

      const isMember = await UserGroupTable.getGroup(user_id, group_id);
      if (isMember) {
        message = 'User is already a member of the group';
      }

      console.log(message);
      if (message) {
        return res.status(400).json({
          success: false,
          message,
        });
      }

      await UserGroupTable.addNewMember(user_id, group_id);

      return res.status(200).json({
        success: true,
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error?.message || 'Internal server error',
      });
    }
  },
  leaveGroup: async (req, res) => {
    const user_id = req.user_id;
    const { group_id } = req.params;
    try {
      const isOwner = await GroupTable.findGroupByGroupIdAndOwnerId(
        group_id,
        user_id
      );
      if (isOwner) {
        return res.status(400).json({
          success: false,
          message: 'Cannot leave group as owner',
        });
      }

      console.log('next');
      await UserGroupTable.deleteMember(user_id, group_id);
      return res.status(200).json({
        success: true,
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error?.message || 'Internal server error',
      });
    }s
  },
};

module.exports = usersController;
