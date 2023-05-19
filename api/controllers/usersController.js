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
      console.log(messages)
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
  updateMessage: async (req, res) => {
    const message_id = req.params.id;
    const update = req.body.message;
    try {
      const messages = await UserTable.updateUserPostedMessages(message_id, update);
      if (!messages.length) {
        return res.status(400).json({
          success: false,
          message: 'No messages found',
        });
      }
      return res.status(200).json({
        success: true,
        message: "Message updated",
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error?.message || 'Internal server error',
      });
    }
  },
  deleteMessage: async (req, res) => {
    const message_id = req.params.id;
    try {
      const messages = await UserTable.getUserSpecificMessage(message_id);
      //används för att kontrollera message.length innan deletion, då det ej går efter deletion
      if (!messages.length) {
        return res.status(400).json({
          success: false,
          message: 'No messages found',
        });
      }
      const deleteMessages = await UserTable.deleteUserPostedMessages(message_id);
      return res.status(200).json({
        success: true,
        message: "Message deleted",
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error?.message || 'Internal server error',
      });
    }
  },
  getOwnGroups: async (req, res) => {
    const user_id = req.params.user_id;
    try {
      const groupsOwned = await GroupTable.getUserOwnedGroups(user_id);

      if (!groupsOwned.length) {
        return res.status(400).json({
          success: false,
          message: 'No groups owned',
        });
      }
      return res.status(200).json({
        success: true,
        groupsOwned,
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error?.message || 'Internal server error',
      });
    }
  },
  getGroups: async (req, res) => {
    const user_id = req.headers.authorization.split(' ')[1];
    try {
      const groupsJoined = await UserGroupTable.getUserJoinedGroups(user_id);

      if (!groupsJoined.length) {
        return res.status(400).json({
          success: false,
          message: 'No groups joined',
        });
      }
      return res.status(200).json({
        success: true,
        groupsJoined,
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
