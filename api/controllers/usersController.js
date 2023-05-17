const GroupTable = require('../model/group');
const UserGroupTable = require('../model/usergroup');
const UserTable = require('../model/user');

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

      await UserGroupTable.deleteMember(user_id, group_id);
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
  postMessage: async (req, res) => {
    const user_id = req.user_id;
    const { group_id } = req.params;
    const { message } = req.body;
    try {
      const isOwner = await GroupTable.findGroupByGroupIdAndOwnerId(
        group_id,
        user_id
      );
      const isMember = await UserGroupTable.getGroup(user_id, group_id);
      if (!isOwner && !isMember) {
        return res.status(400).json({
          success: false,
          message: 'Cannot post message, you are not a member of the group',
        });
      }

      await GroupTable.createMessage(user_id, group_id, message);
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
  getUserPostedMessages: async (req, res) => {
    const user_id = req.user_id;
    try {
      const messages = await UserTable.getUserPostedMessages(user_id);

      if (!messages.length) {
        return res.status(400).json({
          success: false,
          message: 'No messages found',
        });
      }
      return res.status(200).json({
        success: true,
        messages,
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error?.message || 'Internal server error',
      });
    }
  },
};

module.exports = usersController;
