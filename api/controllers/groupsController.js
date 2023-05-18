const db = require('../model/db');
const GroupTable = require('../model/group');
const MessageTable = require('../model/message');
const UserGroupTable = require('../model/usergroup');
const groupController = {
  createGroup: async (req, res) => {
    const { name } = req.body;
    const user_id = req.user_id;
    try {
      const group = await GroupTable.findGroupByName(name);
      if (group)
        return res.status(400).json({
          success: false,
          message: 'Group already exists',
        });
      const result = await GroupTable.createGroup(name, user_id);
      if (result) {
        const group = await GroupTable.findGroupByName(name);
        await UserGroupTable.addNewMember(group.Owner, group.Id);
        return res.status(201).json({
          success: true,
        });
      }
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error?.message || 'Internal server error',
      });
    }
  },

  getMessages: async (req, res) => {
    const { group_id } = req.params;
    let sort = '';
    if (req.query.sort) {
      const sortQuery = Number(req.query.sort);
      if (sortQuery !== 1 && sortQuery !== -1) {
        return res.status(400).json({
          success: false,
          message: 'Sort query must be 1 or -1',
        });
      }
      if (sortQuery === 1) {
        sort = 'ASC';
      }
      if (sortQuery === -1) {
        sort = 'DESC';
      }
    }
    try {
      const messages = await MessageTable.getMessages(group_id, sort);
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

  getMembers: async (req, res) => {
    const { group_id } = req.params;
    try {
      const members = await UserGroupTable.getAllMembers(group_id);
      return res.status(200).json({
        success: true,
        members,
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error?.message || 'Internal server error',
      });
    }
  },
};

module.exports = groupController;
